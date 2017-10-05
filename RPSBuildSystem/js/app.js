/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__WinMeter__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__RPS__ = __webpack_require__(2);
/**
 * Created by Brian on 9/26/2017.
 */




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

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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

/* unused harmony default export */ var _unused_webpack_default_export = (winmeter);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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

/* unused harmony default export */ var _unused_webpack_default_export = (rps);

/***/ })
/******/ ]);