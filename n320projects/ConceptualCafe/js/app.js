/**
 * Created by Brian on 9/28/2017.
 */

Vue.component("customer", {
    template: "#customerTemplate",
    //initiate return data
    data: function () {
        return {}
    },
    methods: {
        choice: function (customerChoice) {
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

            if (cdthis.customerChoice == "aeroPress") {
                //you ***CAN'T*** emit camelCased strings
                this.$emit("aero");
            }
        }
    }
});

var barista = Vue.component("barista", {
    template: "#baristaTemplate",
    data: function () {
        return {
            baristaPrompt: "Hello, how may I help you today?",
            customerChoice: "",
            choiceValue: "",
            machineMake: "",
            finishedBrew: ""
        }
    },
    //props are passed down from parent, in this case choice from App's this.choice
    //initiate prop names to be used by <barista> tag for v-bind statements
    props: [
        "choice",
        "choicevalue",
        "machinemake",
        "finished"
    ],
    watch: {
        choice: function (choice) {
            this.choice = choice;

            if (this.choice == "drip brew") {
                this.customerChoice = "One " + this.choice + "?";
                this.$emit('machinedrip');
            }
            if (this.choice == "french press") {
                this.customerChoice = "One " + this.choice + "?";
                this.$emit('machinefrench');
            }
            if (this.choice == "aeropress") {
                this.customerChoice = "One " + this.choice + "?";
                this.$emit('machineaero');
            }

            this.baristaPrompt = "";
            this.machineMake = "";
            this.finishedBrew = "";
        },
        choicevalue: function (choiceValue) {
            this.choiceValue = "That will be $" + choiceValue + ".";
        },
        machinemake: function (machineMake) {
            this.machineMake = "Waiting for " + machineMake;
            this.customerChoice = "";
            this.choiceValue = "";
        },
        finished: function (finished) {
            this.machineMake = "";
            this.finishedBrew = "Your " + finished + ". Here you go!";
        }
    }
});

Vue.component("coffee-machine", {
    template: "#machineTemplate",
    data: function () {
        return {
            machineMake: "nothing",
            brewing: ""
        }
    },
    props: ["machinemake", "brewing"],
    watch: {
        machinemake: function (machineMake) {
            this.machineMake = machineMake;

        },
        brewing: function (makingCoffee) {
            this.brewing = makingCoffee;
            if (this.brewing == "brewing drip...") {
                setTimeout(() => {
                    console.log("Your drip brew is done");
                    this.$emit("dripbrew-finished");
                    this.machineMake = "nothing";
                }, 10000);
            }

            if (this.brewing == "brewing french...") {
                setTimeout(() => {
                    console.log("Your french press is done");
                    this.$emit("frenchpress-finished");
                    this.machineMake = "nothing";
                }, 10000);
            }

            if (this.brewing == "brewing aero...") {
                setTimeout(() => {
                    console.log("Your aeropress is done");
                    this.$emit("aeropress-finished");
                    this.machineMake = "nothing";
                }, 10000);
            }
        }
    }

});


new Vue({
    el: "#app",
    data: function () {
        console.log("App is working.");

        //initiate return data
        return {
            choice: "nothing",
            choiceValue: "0.00",
            machineMake: "nothing",
            makingCoffee: "",
            finished: "nothing"
        }
    },
    methods: {

        //customer on events

        makeDrip: function () {
            this.choice = "drip brew";
            this.choiceValue = "3.00";
            //now we need to grab this data in the barista using v-bind
        },
        makeFrench: function () {
            this.choice = "french press";
            this.choiceValue = "4.00";
            //now we need to grab this data in the barista using v-bind
        },
        makeAero: function () {
            this.choice = "aeropress";
            this.choiceValue = "5.00";
            //now we need to grab this data in the barista using v-bind
        },

        //barista on events

        machineDrip: function () {
            setTimeout(() => {
                this.machineMake = "drip brew";
                console.log("Currently brewing coffee for the next ten seconds...");
                this.makingCoffee = "brewing drip...";
            }, 1500);

        },
        machineFrench: function () {
            setTimeout(() => {
                this.machineMake = "french press";
                console.log("Currently brewing coffee for the next ten seconds...");
                this.makingCoffee = "brewing french...";
            }, 1500);

        },
        machineAero: function () {
            setTimeout(() => {
                this.machineMake = "aeropress";
                console.log("Currently brewing coffee for the next ten seconds...");
                this.makingCoffee = "brewing aero...";
            }, 1500);
        },

        //coffee-machine on events

        dripFinished: function() {
            this.finished = "drip brew is finished";
        },
        frenchFinished: function() {
            this.finished = "french press is finished";
        },
        aeroFinished: function() {
            this.finished = "aeropress is finished";
        }
    }
});