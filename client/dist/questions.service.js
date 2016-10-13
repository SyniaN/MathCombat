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
var QuestionsService = (function () {
    function QuestionsService() {
        this.counter = 0;
        this.nextQuestionSet = null;
        this.currentQuestionSet = null;
    }
    QuestionsService.prototype.getNewQuestionSet = function () {
        this.currentQuestionSet = this.nextQuestionSet;
        this.nextQuestionSet = mock_questions_1.MyQuestions;
    };
    QuestionsService.prototype.getNewQuestion = function () {
        if (this.currentQuestionSet === null || this.counter === this.currentQuestionSet.length) {
            var returnQuestion = this.nextQuestionSet[0];
            this.counter = 1;
            this.getNewQuestionSet();
        }
        else {
            var returnQuestion = this.currentQuestionSet[this.counter];
            this.counter++;
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