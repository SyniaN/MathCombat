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
var http_1 = require('@angular/http');
require('rxjs/add/operator/toPromise');
var QuestionsService = (function () {
    function QuestionsService(http) {
        this.http = http;
        this.questionSetURL = 'api/getQuestionSet';
        this.player = {
            "User": {
                counter: 0,
                nextQuestionSet: [],
                currentQuestionSet: [Math.floor(Math.random() * 10) + " + " + Math.floor(Math.random() * 10)]
            },
            "Opponent": {
                counter: 0,
                nextQuestionSet: [],
                currentQuestionSet: [Math.floor(Math.random() * 10) + " + " + Math.floor(Math.random() * 10)]
            }
        };
    }
    QuestionsService.prototype.getNewQuestionSet = function (forWhom, levelIn) {
        var _this = this;
        var params = new http_1.URLSearchParams();
        params.set('level', levelIn);
        this.http.get('api/getQuestionSet', { search: params })
            .toPromise()
            .then(function (response) { return _this.player[forWhom].nextQuestionSet = response.json().data; })
            .catch(function () { console.log('something went wrong'); });
    };
    QuestionsService.prototype.updateCurrentQuestionSet = function (forWhom) {
        this.player[forWhom].currentQuestionSet = this.player[forWhom].nextQuestionSet;
    };
    QuestionsService.prototype.getNewQuestion = function (forWhom, levelIn) {
        if (this.player[forWhom].counter >= this.player[forWhom].currentQuestionSet.length) {
            var returnQuestion = this.player[forWhom].nextQuestionSet[0];
            this.player[forWhom].counter = 1;
            this.updateCurrentQuestionSet(forWhom);
            this.getNewQuestionSet(forWhom, levelIn);
        }
        else {
            var returnQuestion = this.player[forWhom].currentQuestionSet[this.player[forWhom].counter];
            this.player[forWhom].counter++;
        }
        return returnQuestion;
    };
    QuestionsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], QuestionsService);
    return QuestionsService;
}());
exports.QuestionsService = QuestionsService;
//# sourceMappingURL=questions.service.js.map