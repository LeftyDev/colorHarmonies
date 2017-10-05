
/**
 * Created by Brian on 9/7/2017.
 */

Vue.component('dice-roller', {
    template: "<div class='diceRoller'><div class='currentRoll'> {{ currentRoll }} </div> <button v-on:click='rollDie'>Roll Die</button> </div>",
    data: function() {
        return {
            currentRoll: 0
        }
    },
    methods: {
        rollDie: function() {
            this.currentRoll = 1 + Math.floor(Math.random() * 6);
        }
    }
});

//start a new vue application
new Vue({
    el: "#app"
});