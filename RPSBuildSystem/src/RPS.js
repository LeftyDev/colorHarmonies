/**
 * Created by Brian on 9/26/2017.
 */

let rps = Vue.component("rock-paper-scissors", {
    template: "#rps-template",
    data: function() {
        return {
            computerMove: "nothing",
            userMove: "nothing",
            outcome: "tie"
        }
    },
    methods: {
        choose: function(userMove) {
            this.userMove = userMove;
            var possibleMoves = ["rock", "paper", "scissors"];
            this.computerMove = possibleMoves[Math.floor(Math.random() * 3)];

            if (this.userMove == "rock") {
                if (this.computerMove == "rock") this.outcome = "tie";
                if (this.computerMove == "paper") this.outcome = "lose";
                if (this.computerMove == "scissors") this.outcome = "win";
            }

            if (this.userMove == "paper") {
                if (this.computerMove == "rock") this.outcome = "win";
                if (this.computerMove == "paper") this.outcome = "tie";
                if (this.computerMove == "scissors") this.outcome = "lose";
            }

            if (this.userMove == "scissors") {
                if (this.computerMove == "rock") this.outcome = "lose";
                if (this.computerMove == "paper") this.outcome = "win";
                if (this.computerMove == "scissors") this.outcome = "tie";
            }

            //raise events
            if (this.outcome == "win") this.$emit("win");
            if (this.outcome == "lose") this.$emit("lose");
        }
    }
});

export default rps;