import React, {Component} from 'react';
import './App.css';

let data = {
    "inputs": [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ]
};

class DataStore {

    constructor(data) {
        //store that data in the object
        this.data = data;

        //empty array for our watchers
        //watchers are objects that want to be informed about when the data changes
        this.registeredWatchers = [];
    }

    //add a new watcher to the list
    register(watcher) {
        this.registeredWatchers.push(watcher);
    }

    setInput(newInputState, row, col) {
        //make sure the selected input box is empty
        if (this.data[row][col] === "") {
            //if empty, update data with user input
            this.data[row][col] = newInputState;

        } else {
            console.log("Cannot choose a square that has been used");
        }

        //inform all watching objects..
        this.registeredWatchers.map((watcher) => {
            watcher.dataUpdated();
        })
    }

    switchPlayer(currentPlayer) {
        if (currentPlayer === "x") {
            console.log("Switch Player method in DataStore called. Current player is " + currentPlayer);
            this.registeredWatchers.map((watcher) => {
                watcher.switchPlayer(currentPlayer);
            })
        }
    }
}

class Dispatcher {

    constructor() {
        this.registeredHandlers = []; //D:
    }

    register(callback) {
        this.registeredHandlers.push(callback);
    }

    dispatch(action) {
        //call every method in our registered handlers array
        //with this action as an input
        this.registeredHandlers.map((handler) => {
            //call that individual function in the array..
            handler(action);
        });
    }
}

class Box extends Component {

    render() {
        return (
            <div className="box"
                 onClick={this.handleClick.bind(this)}>
                {this.props.input}
            </div>
        )
    }

    handleClick() {
        //try a test dispatch
        console.log("handleClick turn prop =" + this.props.turn);
        if (this.props.turn === "x") {
            inputDispatcher.dispatch({type: "play", player: "x", playerMove: "x", row: this.props.rowNum, col: this.props.colNum,});
            // this.props.turn = "o";
        } else if (this.prop.turn === "o") {
            inputDispatcher.dispatch({type: "play", player: "o", playerMove: "o", row: this.props.rowNum, col: this.props.colNum,});
            // this.props.turn = "x";
        }
    }
}

class Grid extends Component {
    constructor(props) {
        //make sure this stays a react component
        super(props);

        this.state = {
            inputs: this.props.inputs,
            turn: "x"
        };

        //ensure we're listening to the data store and adding grid as a watcher
        inputDataStore.register(this);
    }

    dataUpdated() {
        this.setState({
            inputs: inputDataStore.data
        })
    }

    switchPlayer(currentPlayer) {
        console.log("Grid Switch Player Method says this.state.turn is " + this.state.turn);
        if (currentPlayer === "x" && this.state.turn === "x") {
            this.setState({
                turn: "o"
            })
        } else if (this.state.turn === "o") {
            this.setState({
                turn: "x"
            })
        }
    }

    render() {
        return (
            <div>
                {
                    data.inputs.map((row, rowNum) => {
                        return (
                            <div className="row">
                                {
                                    row.map((input, colNum) => {
                                        return <Box input={input} rowNum={rowNum} colNum={colNum} turn={this.state.turn}/>
                                    })
                                }
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

class App extends Component {
    render() {
        return (
            <div>
                <h1>Tic Tac Toe</h1>
                <Grid inputs={data.inputs} />
            </div>
        )
    }

}

//start of app
let inputDispatcher = new Dispatcher();
let inputDataStore = new DataStore(data.inputs);

inputDispatcher.register((action) => {
    if (action.type === "play") {
        //actually want to handle it
        inputDataStore.setInput(action.playerMove, action.row, action.col);
        //data.crops[action.row][action.col] = " ";

        if (data.inputs[0][0] === action.playerMove &&
            data.inputs[0][1] === action.playerMove &&
            data.inputs[0][2] === action.playerMove) {
            console.log("Player " + action.player + " wins");
        } else
        if (data.inputs[0][0] === action.playerMove &&
            data.inputs[1][1] === action.playerMove &&
            data.inputs[2][2] === action.playerMove) {
            console.log("Player " + action.player + " wins");
        } else
        if (data.inputs[0][0] === action.playerMove &&
            data.inputs[1][0] === action.playerMove &&
            data.inputs[2][0] === action.playerMove) {
            console.log("Player " + action.player + " wins");
        } else
        if (data.inputs[0][1] === action.playerMove &&
            data.inputs[1][1] === action.playerMove &&
            data.inputs[2][1] === action.playerMove) {
            console.log("Player " + action.player + " wins");
        } else
        if (data.inputs[0][2] === action.playerMove &&
            data.inputs[1][2] === action.playerMove &&
            data.inputs[2][2] === action.playerMove) {
            console.log("Player " + action.player + " wins");
        }  else
        if (data.inputs[0][2] === action.playerMove &&
            data.inputs[1][1] === action.playerMove &&
            data.inputs[2][0] === action.playerMove) {
            console.log("Player " + action.player + " wins");
        }  else
        if (data.inputs[1][0] === action.playerMove &&
            data.inputs[1][1] === action.playerMove &&
            data.inputs[1][2] === action.playerMove) {
            console.log("Player " + action.player + " wins");
        } else
        if (data.inputs[2][0] === action.playerMove &&
            data.inputs[2][1] === action.playerMove &&
            data.inputs[2][2] === action.playerMove) {
            console.log("Player " + action.player + " wins");
        }

        inputDataStore.switchPlayer(action.player);
    }
});

export default App;
