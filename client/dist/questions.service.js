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
var mock_questions_1 = require('./shared/mock/mock-questions');
var mock_questions_2 = require('./shared/mock/mock-questions');
var QuestionsService = (function () {
    function QuestionsService() {
        this.player = {
            "User": {
                counter: 0,
                nextQuestionSet: null,
                currentQuestionSet: null
            },
            "Opponent": {
                counter: 0,
                nextQuestionSet: null,
                currentQuestionSet: null
            }
        };
        this.theirCounter = 0;
        this.theirCurrentQuestionSet = null;
        this.theirNextQuestionSet = null;
    }
    QuestionsService.prototype.getNewQuestionSet = function (forWhom) {
        this.player[forWhom].currentQuestionSet = this.player[forWhom].nextQuestionSet;
        if (forWhom === "User") {
            this.player[forWhom].nextQuestionSet = mock_questions_1.MyQuestions;
        }
        else {
            this.player[forWhom].nextQuestionSet = mock_questions_2.TheirQuestions;
        }
    };
    QuestionsService.prototype.getNewQuestion = function (forWhom) {
        if (this.player[forWhom].currentQuestionSet === null || this.player[forWhom].counter === this.player[forWhom].currentQuestionSet.length) {
            var returnQuestion = this.player[forWhom].nextQuestionSet[0];
            this.player[forWhom].counter = 1;
            this.getNewQuestionSet(forWhom);
        }
        else {
            var returnQuestion = this.player[forWhom].currentQuestionSet[this.player[forWhom].counter];
            this.player[forWhom].counter++;
        }
        return returnQuestion;
    };
    QuestionsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], QuestionsService);
    return QuestionsService;
}());
exports.QuestionsService = QuestionsService;
//# sourceMappingURL=questions.service.js.map