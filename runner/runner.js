(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('states/Preload'), require('states/Main')) :
	typeof define === 'function' && define.amd ? define(['states/Preload', 'states/Main'], factory) :
	(factory(global.Preload,global.Main));
}(this, (function (Preload,Main) { 'use strict';

Preload = Preload && Preload.hasOwnProperty('default') ? Preload['default'] : Preload;
Main = Main && Main.hasOwnProperty('default') ? Main['default'] : Main;

/*
  Game start stuff
*/
class Game extends Phaser.Game {
  constructor() {
    super(800, 300, Phaser.AUTO, 'runnerGame');
    
    this.state.add('Preload', Preload, false);
    this.state.add('Main', Main, false);
  }
}

new Game();

})));
