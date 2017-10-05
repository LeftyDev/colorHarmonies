/**
 * Created by Brian on 9/26/2017.
 */

import winmeter from "./WinMeter"
import rps from "./RPS"

//Start app
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