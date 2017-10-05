//class is _not fully supported yet_

class Tamagotchi {

    //constructs this object - helpt to get it set up
    constructor(name, type, energy, selector) {
        this.name = name;
        this.type = type;
        this.energy = energy;
        this.element = document.querySelector(selector);

        //start the Tamagotchi simulation
        setInterval(this.update.bind(this), 1000);
    }

    //expose some debug data...
    report() {
        console.log(this.name + " is a " + this.type + " type and has " + this.energy + " energy.");
    }

    //add energy to the tamagotchi
    eat() {
        this.energy += 10;
    }

    //common video game method
    //runs the tamagotchi 'sim'/simulation
    update() {
        if (this.energy <= 0) {
            this.element.innerHTML = this.name + " has run away because you don't know how to take care of anything.";
        } else {
            this.energy--;
            this.report();
            this.element.innerHTML = this.name + " has " + this.energy + " energy.";
        }
    }
}

//make an instance of a tamagotchi
var myTamagotchi = new Tamagotchi("Druid", "Heart", 24, "#dvInfo");
myTamagotchi.report(); //have the tamagotchi expose some debug data
