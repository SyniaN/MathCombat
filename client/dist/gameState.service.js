"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var GameStates_1 = require('./shared/models/GameStates');
var GameStateService = (function () {
    function GameStateService() {
        this.gameState = GameStates_1.GameStates.init;
    }
    GameStateService.prototype.init = function () {
        this.gameState = GameStates_1.GameStates.init;
    };
    GameStateService.prototype.countdown = function () {
        this.gameState = GameStates_1.GameStates.countdown;
    };
    GameStateService.prototype.inProgress = function () {
        this.gameState = GameStates_1.GameStates.inProgress;
    };
    GameStateService.prototype.gameOver = function () {
        this.gameState = GameStates_1.GameStates.gameOver;
    };
    GameStateService.prototype.getGameState = function () {
        return this.gameState;
    };
    GameStateService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], GameStateService);
    return GameStateService;
}());
exports.GameStateService = GameStateService;
//# sourceMappingURL=gameState.service.js.map