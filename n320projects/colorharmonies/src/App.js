import React, {Component} from 'react';
import './App.css';
import _ from 'underscore';

let data = [];

//use polyfill for older browsers to do Ajax request
fetch("data/data.json").then((response) => {
    //if we actually got something
    if (response.ok) {
        //then return the text we loaded
        return response.text();
    }
}).then((textResponse) => {
    data = JSON.parse(textResponse);
});

//set initial harmony state values for initial color (red)
let appState = {
    harmonyColor: 'green',
    harmonyHex: '#00FF00'
};

class DataStore {

    constructor(data) {
        //store that data in the object
        //data is not being received from object instance of dataStore on line 187
        this.data = data;

        //empty array for our watchers
        //watchers are objects that want to be informed about when the data changes
        this.registeredWatchers = [];
    }

    //add a new watcher (app component) to the list
    register(watcher) {
        this.registeredWatchers.push(watcher);
    }

    displayHarmonies(color, harmony) {
        //color and harmony pass in dynamically just fine...this.data will not return anything, not even "undefined"
        console.log(color + " is the color and " + harmony + " is the harmony...and dataStore.displayHarmonies says: " + this.data);

        this.registeredWatchers.map((watcher) => {
            let result = "not green"; //result and resultHex will be determined with an underscore statement that will associate the color & harmony choice (primary + foreign key concept) and will return correct harmony color(s)
            let resultHex = "#HEX";

            appState.harmonyColor = result;
            appState.harmonyHex = resultHex;

            //call to app component's onDataChange() method, where new states will be set using the the appState data we just set in lines 49 and 50
            watcher.onDataChange();
        })
    }
}

class Display extends Component {
    //constructor
    constructor(props) {
        //make sure this stays a React component
        super(props);

        //set states to the props being sent to component dynamically
        this.state = {
            color: this.props.colorChoice,
            harmony: this.props.harmonyChoice,
            harmonyColor: this.props.harmonyColor,
            harmonyHex: this.props.harmonyHex
        }
    }

    render() {
        return (
            <div>
                {/* these aren't changing even though states are being set */}
                <p><b>Color:</b> {this.state.color}</p>
                <p><b>Harmony:</b> {this.state.harmony}</p>
                <p><b>Harmony Color(s):</b> {this.state.harmonyColor} ({this.state.harmonyHex})</p>
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

        //initiate states
        this.state = {
            currentColor: "red",
            currentHarmony: "direct",
            harmonyColor: appState.harmonyColor,
            harmonyHex: appState.harmonyHex
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

        //update state to chosen harmony
        this.setState({
            currentHarmony: harmony
        });
    }

    selectHarmonies(color, harmony) {
        //send the chosen color and harmony to the displayHarmonies() method in DataStore to determine what harmony color(s) to display determined by color & harmony choice
        harmoniesDataStore.displayHarmonies(color, harmony);
    }

    onDataChange() {
        console.log("onDataChange() in App called");
        this.setState({
            harmonyColor: appState.harmonyColor,
            harmonyHex: appState.harmonyHex
        })
    }

    render() {
        return (
            <div className="App">
                <h1>Color Harmonies</h1>
                {/* assigns this.colorChosen() & this.harmonyChosen() methods as properties to be called in Picker component */}
                <Picker colorChosen={this.colorChosen.bind(this)} harmonyChosen={this.harmonyChosen.bind(this)}/>
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
                <ul className="colors"> <b>Pick a Color</b>
                    {/* Picker uses methods from App as props...onClicks passes values into them */}
                    <li onClick={() => {this.props.colorChosen('red')}}>Red</li>
                    <li onClick={() => {this.props.colorChosen('yellow')}}>Yellow</li>
                    <li onClick={() => {this.props.colorChosen('green')}}>Green</li>
                    <li onClick={() => {this.props.colorChosen('blue')}}>Blue</li>
                    <li onClick={() => {this.props.colorChosen('orange')}}>Orange</li>
                    <li onClick={() => {this.props.colorChosen('yellow')}}>Yellow</li>
                </ul>
                <ul> <b>Pick a Harmony</b>
                    <li onClick={() => {this.props.harmonyChosen('direct')}}>Direct</li>
                    <li onClick={() => {this.props.harmonyChosen('split')}}>Split</li>
                    <li onClick={() => {this.props.harmonyChosen('analogous')}}>Analogous</li>
                </ul>
            </div>
        )
    }
}

//make an instance of the dataStore
//pass in data variable from line 15
let harmoniesDataStore = new DataStore(data);

export default App;
