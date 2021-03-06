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
var mock_users_1 = require('./shared/mock/mock-users');
var mock_users_2 = require('./shared/mock/mock-users');
var UserService = (function () {
    function UserService() {
        this.user = null;
        this.opponent = null;
    }
    UserService.prototype.getUser = function () {
        if (this.user === null) {
            this.user = mock_users_1.CURRENT_USER;
        }
        return this.user;
    };
    UserService.prototype.addStar = function (newStarCount) {
        if (this.user === null) {
            this.user = mock_users_1.CURRENT_USER;
        }
        this.user.stars += newStarCount;
        this.updateRank();
    };
    UserService.prototype.removeStar = function (removeStarCount) {
        if (this.user === null) {
            this.user = mock_users_1.CURRENT_USER;
        }
        if (this.user.stars > 0) {
            this.user.stars -= removeStarCount;
        }
        ;
        this.updateRank();
    };
    UserService.prototype.updateRank = function () {
        this.user.rank = Math.floor(this.user.stars / 3) + 1;
    };
    UserService.prototype.getOpponent = function () {
        if (this.opponent === null) {
            this.opponent = mock_users_2.CURRENT_OPPONENT;
        }
        ;
        return this.opponent;
    };
    UserService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map