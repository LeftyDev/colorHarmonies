
class WarningKlaxon {

    constructor(selector) {
        //setup a counter
        this.count = 0;

        //save a reference to this component's root element
        this.el = document.querySelector(selector);

        //get references to those two zones
        this.dangerZone = this.el.querySelector(".dangerZone");
        this.feedback = this.el.querySelector(".feedback");

        //listen for a mouseover on the danger zone
        //run the danger entered method if the mouse does enter..
        this.dangerZone.addEventListener("mouseover", this.dangerEntered.bind(this));
        this.dangerZone.addEventListener("mouseout", this.dangerLeft.bind(this));
    }

    dangerEntered() {
        this.count++;
        this.feedback.innerHTML = "Danger entered. You have entered " + this.count + " times. Leave quickly?"
    }

    dangerLeft() {
        this.feedback.innerHTML = "";
    }
}

//starts/gets the component going!
var myWarningKlaxon = new WarningKlaxon("#myWarningKlaxon");
