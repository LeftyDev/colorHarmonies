import React, { Component } from 'react';
import './App.css';

let data = {
    "crops":[
        ["X", "O", "X"],
        ["O", "X", "O"],
        ["X", "O", "X"]
    ]
};

class Box extends Component {
    render(){
        return (
            <div>
            </div>
        )
    }
}

class Grid extends Component {
    render(){
        return(
            <div>
            </div>
        )
    }
}

class App extends Component {
    render() {
        return(
            <div>
                <h1> Tic Tac Toe</h1>
                <Grid />
            </div>
        )
    }

}

export default App;
