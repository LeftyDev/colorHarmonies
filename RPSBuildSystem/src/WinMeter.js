/**
 * Created by Brian on 9/26/2017.
 */

let winmeter = Vue.component("win-meter", {
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

export default winmeter;