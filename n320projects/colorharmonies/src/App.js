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

let appState = {
    harmonyColor: 'green',
    harmonyHex: '#00FF00'
};

class DataStore {

    constructor(data) {
        //store that data in the object
        this.data = data;

        //empty array for our watchers
        //watchers are objects that want to be informed about when the data changes
        this.registeredWatchers = [];
    }

    //add a new watcher (component) to the list
    register(watcher) {
        this.registeredWatchers.push(watcher);
    }

    displayHarmonies(color, harmony) {
        console.log(color + " is the color and " + harmony + " is the harmony...and dataStore.displayHarmonies says: " + this.data);

        this.registeredWatchers.map((watcher) => {
            let result = "not green";
            let resultHex = "#HEX";

            appState.harmonyColor = result;
            appState.harmonyHex = resultHex;

            watcher.onDataChange();
        })
    }
}



class Display extends Component {
    constructor(props) {
        super(props);

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
                <p>Color: {this.state.color}</p>
                <p>Harmony: {this.state.harmony}</p>
                <p>Harmony Color: {this.state.harmonyColor} ({this.state.harmonyHex})</p>
            </div>
        )
    }
}

//initiate array for sending selections to dataStore
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
        colorAndHarmony[0].length = 0;
        colorAndHarmony[0].push(color);

        this.selectHarmonies(colorAndHarmony[0][0], colorAndHarmony[1][0]);

        this.setState({
            currentColor: color
        });
    }

    harmonyChosen(harmony) {
        colorAndHarmony[1].length = 0;
        colorAndHarmony[1].push(harmony);
        // console.log(colorAndHarmony[0][0] + colorAndHarmony[1][0]);

        this.selectHarmonies(colorAndHarmony[0][0], colorAndHarmony[1][0]);

        this.setState({
            currentHarmony: harmony
        });
    }

    selectHarmonies(color, harmony) {
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
                <Picker colorChosen={this.colorChosen.bind(this)} harmonyChosen={this.harmonyChosen.bind(this)}/>
                <Display colorChoice={this.state.currentColor} harmonyChoice={this.state.currentHarmony} harmonyColor={this.state.harmonyColor} harmonyHex={this.state.harmonyHex} />
            </div>
        );
    }
}

class Picker extends Component {
    render() {
        return(
            <div>
                <ul className="colors">
                    <li onClick={() => {this.props.colorChosen('red')}}>Red</li>
                    <li onClick={() => {this.props.colorChosen('yellow')}}>Yellow</li>
                    <li onClick={() => {this.props.colorChosen('green')}}>Green</li>
                    <li onClick={() => {this.props.colorChosen('blue')}}>Blue</li>
                    <li onClick={() => {this.props.colorChosen('orange')}}>Orange</li>
                    <li onClick={() => {this.props.colorChosen('yellow')}}>Yellow</li>
                </ul>
                <ul>
                    <li onClick={() => {this.props.harmonyChosen('direct')}}>Direct</li>
                    <li onClick={() => {this.props.harmonyChosen('split')}}>Split</li>
                    <li onClick={() => {this.props.harmonyChosen('analogous')}}>Analogous</li>
                </ul>
            </div>
        )
    }
}

//make an instance of the dataStore
let harmoniesDataStore = new DataStore(data);

export default App;
