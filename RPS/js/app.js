/**
 * Created by Brian on 9/21/2017.
 */

//2. Create components for app to access
Vue.component("win-meter", {
    template: "<div class='meter' v-bind:style='{ width: shownAmount+\"px\" }'></div>",
    data: function() {
        return {
            shownAmount: 5
        }
    },
    props: [ "amount" ],
    watch: {
        amount: function(newValue, oldValue) {
            TweenMax.to(this, .7, { shownAmount: newValue });
        }
    }
});

Vue.component("rock-paper-scissors", {
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

//1. Start app
new Vue({
    el: "#app",
    data: function() {
        return {
            currentWins: 50
        }
    },
    methods: {
        win: function() {
            this.currentWins ++;
        },
        lose: function() {
            this.currentWins --;
        }
    }
});