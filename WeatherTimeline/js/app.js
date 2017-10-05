
//weather meter component
Vue.component("weather-meter", {
    template: "#weather-meter-template",
    data: function() {
        return {
            high: 40,
            shownHigh: 40,
            ourFeelings: "Not too bad."
        }
    },
    created: function() {
        this.interval = setInterval(this.updateWeather, 4000)
    },
    methods: {
        updateWeather: function() {
            //random number between 20 and 90
            this.high = Math.round(Math.random() * 70) + 20;

            if(this.high > 75) {
                this.ourFeelings = "TOO HOT."
            } else if (this.high < 32) {
                this.ourFeelings = "TOO COLD."
            } else {
                this.ourFeelings = "Not too bad."
            }
        }
    },
    watch: {
        high: function(newValue, oldValue) {
            //tween the "shownHigh" value to the new value over .7 seconds
            TweenMax.to(this, .7, { shownHigh: newValue })
        }
    }
});

new Vue({
    el: '#app',
    data: function() {
        return {
            showing: true
        }
    }
});