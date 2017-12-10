import React, {Component} from 'react';
import './App.css';
import _ from 'underscore';

//set initial harmony state values for initial color (red)
let appState = {
    harmonyColor: 'green',
    harmonyHex: '(#2ecc71)'
};

class DataStore {

    constructor() {
        //empty array for our watchers
        //watchers are objects that want to be informed about when the data changes
        this.registeredWatchers = [];
    }

    //add a new watcher (app component) to the list
    register(watcher) {
        this.registeredWatchers.push(watcher);
    }

    displayHarmonies(color, harmony) {
        //initialize data object
        let data = {};

        fetch("data/data.json").then((response) => {
            //if we actually got something
            if (response.ok) {
                //then return the text we loaded
                return response.text();
            }
        }).then((textResponse) => {
            //assigned parsed json to data object
            data = JSON.parse(textResponse);

            this.registeredWatchers.map((watcher) => {
                console.log(harmony);
                console.log(data.colors);

                //initialize results
                let result = "";
                let resultHex = "";

                //filter color data by color selection and assign to colorData
                let colorData = _.where(data.colors, {color: color});

                //filter harmony data by colorData and assign to findHarmony
                let findHarmony = _.where(colorData[0].harmonies, {harmony: harmony});
                console.log(findHarmony);
                console.log(findHarmony[0].colors);

                //conditionals since split and analogous harmonies output more than a single result color
                if (harmony === "direct") {
                    result = findHarmony[0].color;
                    resultHex = "(" + findHarmony[0].hex + ")";

                } else if (harmony === "split" || harmony === "analogous") {
                    result = findHarmony[0].colors[0].color + " (" +  findHarmony[0].colors[0].hex + "), ";
                    resultHex = findHarmony[0].colors[1].color + " (" + findHarmony[0].colors[1].hex + ")";
                }

                //assign new result and resultHex to appState values
                appState.harmonyColor = result;
                appState.harmonyHex = resultHex;

                //call to app component's onDataChange() method, where new states will be set using the new appState data
                watcher.onDataChange();
            })
        });
    }
}

class Display extends Component {
    //constructor
    constructor(props) {
        //make sure this stays a React component
        super(props);

        console.log("Display component prop data: " + this.props.harmonyColor + " " + this.props.harmonyHex);

        //set states
        this.state = {
            color: this.props.colorChoice,
            harmony: this.props.harmonyChoice,
            harmonyColor: this.props.harmonyColor,
            harmonyHex: this.props.harmonyHex
        }
    }

    //calls when App component parent rerenders and sends its new states over to Display child component as props
    //built-in react method
    //receives updated props from parent and pushes in as variable called nextProps rather than using this.props
    componentWillReceiveProps(nextProps) {
        this.setState({
            color: nextProps.colorChoice,
            harmony: nextProps.harmonyChoice,
            harmonyColor: nextProps.harmonyColor,
            harmonyHex: nextProps.harmonyHex
        });
    }

    render() {
        return (
            <div>
                <p><b>Color:</b> {this.state.color}</p>
                <p><b>Harmony:</b> {this.state.harmony}</p>
                <p><b>Harmony Color(s):</b> {this.state.harmonyColor && this.state.harmonyHex ? this.state.harmonyColor + " " + this.state.harmonyHex : null}</p>
                {console.log(this.state.harmonyColor + " x " + this.state.harmonyHex)}

                {/* The Harmony Color display box renders for Direct color scheme */}
                <div className={this.state.harmonyColor === "red" ? "displayColor displayRed" : null}></div>
                <div className={this.state.harmonyColor === "yellow" ? "displayColor displayYellow" : null}></div>
                <div className={this.state.harmonyColor === "green" ? "displayColor displayGreen" : null}></div>
                <div className={this.state.harmonyColor === "blue" ? "displayColor displayBlue" : null}></div>
                <div className={this.state.harmonyColor === "orange" ? "displayColor displayOrange" : null}></div>
                <div className={this.state.harmonyColor === "violet" ? "displayColor displayViolet" : null}></div>


                {/* The Harmony Color display box renders for split and analogous color schemes */}
                <div className={this.state.harmonyColor === "yellow (#f1c40f), " && this.state.harmonyHex === "blue (#3498db)" ? "displayColor displayYellow" : null}></div>
                <div className={this.state.harmonyColor === "yellow (#f1c40f), " && this.state.harmonyHex === "blue (#3498db)" ? "displayColor displayBlue" : null}></div>

                <div className={this.state.harmonyColor === "red (#e74c3c), " && this.state.harmonyHex === "blue (#3498db)" ? "displayColor displayRed" : null}></div>
                <div className={this.state.harmonyColor === "red (#e74c3c), " && this.state.harmonyHex === "blue (#3498db)" ? "displayColor displayBlue" : null}></div>

                <div className={this.state.harmonyColor === "orange (#e67e22), " && this.state.harmonyHex === "violet (#9b59b6)" ? "displayColor displayOrange" : null}></div>
                <div className={this.state.harmonyColor === "orange (#e67e22), " && this.state.harmonyHex === "violet (#9b59b6)" ? "displayColor displayViolet" : null}></div>

                <div className={this.state.harmonyColor === "red (#e74c3c), " && this.state.harmonyHex === "yellow (#f1c40f)" ? "displayColor displayRed" : null}></div>
                <div className={this.state.harmonyColor === "red (#e74c3c), " && this.state.harmonyHex === "yellow (#f1c40f)" ? "displayColor displayYellow" : null}></div>

                <div className={this.state.harmonyColor === "green (#2ecc71), " && this.state.harmonyHex === "violet (#9b59b6)" ? "displayColor displayGreen" : null}></div>
                <div className={this.state.harmonyColor === "green (#2ecc71), " && this.state.harmonyHex === "violet (#9b59b6)" ? "displayColor displayViolet" : null}></div>

                <div className={this.state.harmonyColor === "green (#2ecc71), " && this.state.harmonyHex === "orange (#e67e22)" ? "displayColor displayGreen" : null}></div>
                <div className={this.state.harmonyColor === "green (#2ecc71), " && this.state.harmonyHex === "orange (#e67e22)" ? "displayColor displayOrange" : null}></div>
            </div>
        )
    }
}

//initiate array for sending selections to dataStore
//first array is color, second is harmony
let colorAndHarmony = [['red'],['direct']];

class App extends Component {
    //constructor for the App controller component
    constructor(props) {
        //make sure this stays a React component
        super(props);

        // 1. initiate states
        this.state = {
            currentColor: "red",
            currentHarmony: "direct",
            harmonyColor: appState.harmonyColor,
            harmonyHex: appState.harmonyHex,
            activeHarmony: "direct"
        };

        //register App component as a watcher for a change in data
        harmoniesDataStore.register(this);
    }

    colorChosen(color) {
        //make sure first array is emptied before passing in the color
        colorAndHarmony[0].length = 0;
        colorAndHarmony[0].push(color);

        //send this.SelectHarmonies() method the chosen color
        this.selectHarmonies(colorAndHarmony[0][0], colorAndHarmony[1][0]);

        //update state to chosen color
        this.setState({
            currentColor: color
        });
    }

    harmonyChosen(harmony) {
        //make sure second array is emptied before passing the color
        colorAndHarmony[1].length = 0;
        colorAndHarmony[1].push(harmony);
        // console.log(colorAndHarmony[0][0] + colorAndHarmony[1][0]);

        //send this.SelectHarmonies() method the chosen harmony
        this.selectHarmonies(colorAndHarmony[0][0], colorAndHarmony[1][0]);

        //update state to chosen harmony, and make sure activeHarmony is set for a conditional in Picker component
        this.setState({
            currentHarmony: harmony,
            activeHarmony: harmony
        });
    }

    selectHarmonies(color, harmony) {
        //send the chosen color and harmony to the displayHarmonies() method in DataStore to determine what harmony color(s) to display, determined by color & harmony choice
        harmoniesDataStore.displayHarmonies(color, harmony);
    }

    onDataChange() {
        console.log("onDataChange - using appStates: " + appState.harmonyColor + " " + appState.harmonyHex);

        this.setState({
            harmonyColor: appState.harmonyColor,
            harmonyHex: appState.harmonyHex
        });
    }

    render() {
        return (
            <div className="App">
                <h1>Color Harmonies</h1>
                {/* 1. assigns App's colorChosen() & harmonyChosen() methods as properties to be called in Picker component */}
                <Picker colorChosen={this.colorChosen.bind(this)} harmonyChosen={this.harmonyChosen.bind(this)} activeHarmony={this.state.activeHarmony}/>
                {/* give Display component props that are dynamically set with states */}
                <Display colorChoice={this.state.currentColor} harmonyChoice={this.state.currentHarmony} harmonyColor={this.state.harmonyColor} harmonyHex={this.state.harmonyHex} />
            </div>
        );
    }
}

class Picker extends Component {
    render() {
        return(
            <div>
                <b>Pick a Color</b>
                <ul className="colors">
                    {/* 2. Picker uses methods from App as props...onClicks passes values into them */}
                    <li onClick={() => {this.props.colorChosen('red')}} className="color">Red</li>
                    <li onClick={() => {this.props.colorChosen('yellow')}} className="color">Yellow</li>
                    <li onClick={() => {this.props.colorChosen('green')}} className="color">Green</li>
                    <li onClick={() => {this.props.colorChosen('blue')}} className="color">Blue</li>
                    <li onClick={() => {this.props.colorChosen('orange')}} className="color">Orange</li>
                    <li onClick={() => {this.props.colorChosen('violet')}} className="color">Violet</li>
                </ul>
                <b>Pick a Harmony</b>
                <ul className="harmonies">
                    {/* 2.5. Picker uses methods from App as props...onClicks passes values into them */}
                    <li onClick={() => {this.props.harmonyChosen('direct')}} className={this.props.activeHarmony === "direct" ? "activeHarmony harmony" : "harmony"}>Direct</li>
                    <li onClick={() => {this.props.harmonyChosen('split')}} className={this.props.activeHarmony === "split" ? "activeHarmony harmony" : "harmony"}>Split</li>
                    <li onClick={() => {this.props.harmonyChosen('analogous')}} className={this.props.activeHarmony === "analogous" ? "activeHarmony harmony" : "harmony"}>Analogous</li>
                </ul>
            </div>
        )
    }
}

//make an instance of the dataStore
//pass in data variable from line 15
let harmoniesDataStore = new DataStore();

export default App;
