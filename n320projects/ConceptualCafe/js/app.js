/**
 * Created by Brian on 9/28/2017.
 */

Vue.component("customer", {
    template: "#customerTemplate",
    //initiate return data
    data: function () {
        return {
            customerChoice: "nothing"
        }
    },
    methods: {
        choice: function(customerChoice) {
            this.customerChoice = customerChoice;

            if (this.customerChoice == "dripBrew") {
                //you ***CAN'T*** emit camelCased strings
                //what you emit is used in your <customer> tag following v-on...i.e. <customer v-on:drip="makeDrip"></customer>;
                //makeDrip from <customer v-on:drip="makeDrip"></customer> is then sent down to line 58 to be used AS the app's methods!
                this.$emit("drip");
            }

            if (this.customerChoice == "frenchPress") {
                //you ***CAN'T*** emit camelCased strings
                this.$emit("french");
            }

            if (this.customerChoice == "aeroPress") {
                //you ***CAN'T*** emit camelCased strings
                this.$emit("aero");
            }
        }
    }
});

Vue.component("barista", {
    template: "#baristaTemplate"
});

Vue.component("coffeeMachine", {
    template: "#machineTemplate"
});


new Vue({
    el: "#app",
    data: function() {
        alert("App is working.");
        //initiate return data
        return {
            choice: "nothing"
        }
    },
    methods: {
        makeDrip: function () {
            this.choice = "You ordered drip.";
            alert(this.choice);
            //now we need to send this data to the barista
        },
        makeFrench: function () {
            this.choice = "You ordered french press.";
            alert(this.choice);
            //now we need to send this data to the barista
        },
        makeAero: function () {
            this.choice = "You ordered aeropress.";
            alert(this.choice);
            //now we need to send this data to the barista
        }
    }
});