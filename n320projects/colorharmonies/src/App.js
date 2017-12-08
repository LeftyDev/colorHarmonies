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
}

class Display extends Component {
    constructor(props) {
        super(props);

        this.state = {
            color: this.props.colorChoice,
            harmony: this.props.harmonyChoice
        }
    }

    render() {
        return (
            <div>
                <p>Color: {this.state.color}</p>
                <p>Harmony: {this.state.harmony}</p>
            </div>
        )
    }
}

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentColor: "red",
            currentHarmony: "direct"
        };

        inputDataStore.register(this);
    }

    colorChosen(color) {
        this.setState({
            currentColor: color
        })
    }

    harmonyChosen(harmony) {
        this.setState({
            currentHarmony: harmony
        })
    }

    render() {
        return (
            <div className="App">
                <h1>Color Harmonies</h1>
                <Picker colorChosen={this.colorChosen.bind(this)} harmonyChosen={this.harmonyChosen.bind(this)}/>
                {this.state.currentColor === "red" && this.state.currentHarmony === "direct" ? <Display colorChoice={this.state.currentColor} harmonyChoice={this.state.currentHarmony} /> : null}
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


let inputDataStore = new DataStore(data);

export default App;
