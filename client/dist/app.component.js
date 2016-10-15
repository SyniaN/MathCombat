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
var user_service_1 = require('./user.service');
var questions_service_1 = require('./questions.service');
var answering_service_1 = require('./answering.service');
var AppComponent = (function () {
    function AppComponent(userService, questionsService, answeringService) {
        this.userService = userService;
        this.questionsService = questionsService;
        this.answeringService = answeringService;
        this.gameStarted = false;
        this.gameOver = false;
        this.user = null;
        this.opponent = null;
        this.myQuestion = null;
        this.theirQuestion = null;
        this.you_win = null;
        this.timer = null;
        this.p = {
            "User": {
                greenBackground: false,
                redBackground: false,
                greenWriting: false,
                redWriting: false,
                message: "",
                score: 0,
                percentage: 50,
                answer: null
            },
            "Opponent": {
                greenBackground: false,
                redBackground: false,
                greenWriting: false,
                redWriting: false,
                message: "",
                score: 0,
                percentage: 50,
                answer: null
            }
        };
        this.hints = "This is a hint";
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        var hesitationChance = 0.5;
        setInterval(function () {
            if (_this.p.User.score > _this.p.Opponent.score) {
                hesitationChance = 0.2;
            }
            else if (_this.p.User.score < _this.p.Opponent.score) {
                hesitationChance = 0.7;
            }
            if (Math.random() > hesitationChance && _this.gameStarted) {
                _this.reiceiveOpponentAnswer();
            }
        }, 800);
    };
    AppComponent.prototype.startGame = function () {
        this.resetStats();
        this.getUser();
        this.getOpponent();
        this.gameStarted = true;
        this.getNewQuestionSet("User");
        this.getNewQuestionSet("Opponent");
        this.getNewQuestion("User");
        this.getNewQuestion("Opponent");
        this.startTimer();
    };
    AppComponent.prototype.endGame = function () {
        this.gameStarted = false;
        this.gameOver = true;
        if (this.p.User.score > this.p.Opponent.score) {
            this.you_win = "You Win!";
        }
        else if (this.p.User.score < this.p.Opponent.score) {
            this.you_win = "You Lose!";
        }
        else {
            this.you_win = "Draw!";
        }
    };
    AppComponent.prototype.startTimer = function () {
        var _this = this;
        var time = 90;
        var minutesString;
        var secondsString;
        var interval = setInterval(function () {
            time--;
            if (time === 0) {
                clearInterval(interval);
                _this.endGame();
            }
            console.log('time:' + time);
            var minutes = Math.floor(time / 60);
            var seconds = time - minutes * 60;
            if (minutes < 10) {
                minutesString = "0" + minutes;
            }
            else {
                minutesString = minutes.toString();
            }
            if (seconds < 10) {
                secondsString = "0" + seconds;
            }
            else {
                secondsString = seconds.toString();
            }
            _this.timer = minutesString + ":" + secondsString;
        }, 1000);
    };
    AppComponent.prototype.resetStats = function () {
        this.gameStarted = false;
        this.gameOver = false;
        this.user = null;
        this.opponent = null;
        this.myQuestion = null;
        this.theirQuestion = null;
        this.timer = null;
        this.p = {
            "User": {
                greenBackground: false,
                redBackground: false,
                greenWriting: false,
                redWriting: false,
                message: "",
                score: 0,
                percentage: 50,
                answer: null
            },
            "Opponent": {
                greenBackground: false,
                redBackground: false,
                greenWriting: false,
                redWriting: false,
                message: "",
                score: 0,
                percentage: 50,
                answer: null
            }
        };
        this.hints = "This is a hint";
    };
    AppComponent.prototype.updatePercentage = function () {
        var tempMyScore = this.p.User.score;
        var tempTheirScore = this.p.Opponent.score;
        if (tempMyScore === 0) {
            tempMyScore = 0.02;
        }
        if (tempTheirScore === 0) {
            tempTheirScore = 0.02;
        }
        var difference = Math.abs(tempMyScore - tempTheirScore);
        if (difference < 20) {
            if (tempMyScore < tempTheirScore) {
                tempMyScore = 2;
                tempTheirScore = 2 + difference;
            }
            else {
                tempTheirScore = 2;
                tempMyScore = 2 + difference;
            }
            var total = tempMyScore + tempTheirScore;
        }
        else {
            if (tempMyScore < tempTheirScore) {
                tempMyScore = 0.5;
                tempTheirScore = difference;
            }
            else {
                tempTheirScore = 0.5;
                tempMyScore = difference;
            }
        }
        var total = tempMyScore + tempTheirScore;
        this.p.User.percentage = tempMyScore / total * 100;
        this.p.Opponent.percentage = 100 - this.p.User.percentage;
    };
    AppComponent.prototype.sendMyAnswer = function () {
        var answerCorrect = this.answeringService.isCorrect(this.myQuestion, this.p.User.answer);
        this.markInput("User", answerCorrect);
    };
    AppComponent.prototype.markInput = function (forWhom, answerCorrect) {
        var _this = this;
        console.log('marking Input where p...answer:' + this.p[forWhom].answer);
        if (answerCorrect) {
            this.p[forWhom].redBackground = false;
            this.p[forWhom].redWriting = false;
            this.p[forWhom].greenBackground = true;
            this.p[forWhom].greenWriting = true;
            setTimeout(function () {
                _this.p[forWhom].greenBackground = false;
            }, 230);
            this.p[forWhom].answer = null;
            this.getNewQuestion(forWhom);
            this.p[forWhom].score++;
            this.p[forWhom].message = "Correct!";
        }
        else {
            this.p[forWhom].score--;
            this.p[forWhom].greenBackground = false;
            this.p[forWhom].greenWriting = false;
            this.p[forWhom].redBackground = true;
            this.p[forWhom].redWriting = true;
            this.p[forWhom].answer = null;
            this.p[forWhom].message = "Ops, try again!";
        }
        this.updatePercentage();
    };
    AppComponent.prototype.reiceiveOpponentAnswer = function () {
        var _this = this;
        console.log('receiving opponent answer');
        var opponentAnswer = this.answeringService.solveQuestion(this.theirQuestion);
        var correctChance = 0.95;
        if (Math.random() > correctChance) {
            opponentAnswer = Math.floor(opponentAnswer * Math.random());
        }
        this.p.Opponent.answer = opponentAnswer.toString();
        setTimeout(function () {
            var answerCorrect = _this.answeringService.isCorrect(_this.theirQuestion, _this.p.Opponent.answer);
            _this.markInput("Opponent", answerCorrect);
        }, 500);
    };
    AppComponent.prototype.getUser = function () {
        this.user = this.userService.getUser();
    };
    AppComponent.prototype.getOpponent = function () {
        this.opponent = this.userService.getOpponent();
    };
    AppComponent.prototype.getNewQuestionSet = function (forWhom) {
        this.questionsService.getNewQuestionSet(forWhom);
    };
    AppComponent.prototype.getNewQuestion = function (forWhom) {
        if (forWhom === "User") {
            this.myQuestion = this.questionsService.getNewQuestion("User");
        }
        else {
            this.theirQuestion = this.questionsService.getNewQuestion("Opponent");
        }
    };
    AppComponent.prototype.login = function () {
        console.log('login in');
    };
    AppComponent.prototype.signUp = function () {
        console.log('signing up');
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: "\n    <script src=\"/socket.io/socket.io.js\"></script>\n    <script>\n        var socket = io();\n    </script>\n\n    <header>\n        <nav class=\"navbar navbar-default\">\n            <div class=\"container\">\n                <div class=\"navbar-header\">\n                    <a href=\"/\" class=\"navbar-brand\">Math Combat</a>\n                </div>\n                <div class=\"navbar-collapse collapse\">\n                    <ul class=\"nav navbar-nav navbar-right\">\n                        <li>\n                            <a href='#' (click)=\"login()\">Login</a>\n                        </li>\n                        <li>\n                            <a href='#' (click)=\"signUp()\">Sign Up</a>\n                        </li>\n                    </ul>\n                </div>\n            </div>\n        </nav>\n    </header>\n    <main class=\"container\">\n\n\n        <div id=\"arena\">\n\n            <div *ngIf=\"gameStarted\" class=\"row\">\n                <ul class=\"list-group col-xs-4 player-info-panel\">\n                    <li class=\"list-group-item\">\n                        <span class=\"badge\">Rank {{user.rank}}</span>\n                        {{user.name}}\n                    </li>\n                    <li class=\"list-group-item\">\n                        <span class=\"badge\">{{user.stars}}/5</span>\n                        Stars\n                    </li>\n                </ul>\n                <div id=\"timer\" class=\"col-xs-4\">\n                    <h4>Time:</h4>\n                    <h1>{{timer}}</h1>\n                </div>\n\n                <ul class=\"list-group col-xs-4 player-info-panel\">\n                    <li class=\"list-group-item\">\n                        <span class=\"badge\">Rank {{opponent.rank}}</span>\n                        {{opponent.name}}\n                    </li>\n                    <li class=\"list-group-item\">\n                        <span class=\"badge\">{{opponent.stars}}/5</span>\n                        Stars\n                    </li>\n                </ul>\n            </div>\n\n            <div *ngIf=\"gameStarted\" class=\"progress progress-striped\">\n                <div class=\"progress-bar progress-bar-success\" style=\"min-width: 2%; max-width: 98%;\" [ngStyle]=\"{'width.%': p.User.percentage}\">\n                    {{p.User.score}} points\n                </div>\n\n                <div class=\"progress-bar progress-bar-danger\" style=\"min-width: 2%; max-width: 98%;\"  [ngStyle]=\"{'width.%': p.Opponent.percentage}\"> \n                    {{p.Opponent.score}} points\n                </div>\n            </div>\n\n            <div *ngIf=\"!gameStarted && !gameOver\" id=\"startButton\" (click)=\"startGame()\"><h1> Start</h1> </div>\n           \n            <div *ngIf=\"gameOver\">\n                <h2>Time Up</h2>\n                <h1>{{you_win}}</h1>\n\n                <div class=\"col-xs-6\">\n                    <h2>{{user.name}}</h2>\n                    <h3>{{p.User.score}}</h3>\n                </div>\n\n                <div class=\"col-xs-6\">\n                    <h2>{{opponent.name}}</h2>\n                    <h3>{{p.Opponent.score}}</h3>\n                </div>\n\n                <button class=\"btn btn-success\" (click)=\"resetStats()\">Close</button>\n\n            </div>\n\n\n            <div *ngIf=\"gameStarted\" id=\"battlePanels\" class=\"row\">\n                <div id=\"friendlyPanel\" class=\"col-xs-6 \">\n                    <div class=\"jumbotron battlePanel\">\n                        <form (submit)=\"sendMyAnswer()\" >\n                            <div id=\"my-question\" class=\"question\">\n                                <label>Question:</label>\n                                <h2>{{myQuestion}} = ?</h2>\n                            </div>\n\n                            <div id=\"my-answer\" class=\"answer\">\n                                <label>Answer:</label>\n                                <div class=\"form-group\">\n                                    <input \n                                        type=\"number\" \n                                        autocomplete=\"off\" \n                                        class=\"form-control\" \n                                        id=\"myAnswer\" \n                                        [ngClass]=\"{'greenBackground': p.User.greenBackground, 'redBackground': p.User.redBackground }\"\n                                        [(ngModel)]=\"p.User.answer\" \n                                        name = \"myAnswer\"\n                                        autofocus=\"autofocus\"\n                                        >\n                                    <p [ngClass]=\"{'greenWriting': p.User.greenWriting, 'redWriting': p.User.redWriting }\"><i>{{p.User.message}}</i></p>\n                                </div>\n                            </div>\n                        </form>             \n                    </div>\n                </div>\n\n                <div id=\"opponentPanel\" class=\"col-xs-6 \">\n                    <div class=\"jumbotron battlePanel\">\n                    <div id=\"my-question\" class=\"question\">\n                        <label>Question:</label>\n                        <h2>{{theirQuestion}}</h2>\n                    </div>\n                    <div id=\"their-answer\" class=\"answer\">\n                        <label>Answer:</label>\n                        <div class=\"form-group\">\n                            <input \n                                type=\"number\" \n                                autocomplete=\"off\" \n                                class=\"form-control\" \n                                id=\"theirAnswer\" \n                                [ngClass]=\"{'greenBackground': p.Opponent.greenBackground, 'redBackground': p.Opponent.redBackground }\"\n                                value=\"{{p.Opponent.answer}}\"\n                                name = \"theirAnswer\">\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <div id=\"hints\">\n                <p><strong>Hint:</strong> {{hints}}{{p.Opponent.answer}}</p> \n            </div>\n        </div>    \n        </div>\n\n    </main>\n    <hr>\n    <footer>\n\n        <div class=\"container\">\n\n            <div class=\"row\">\n\n            <ul class=\"list-unstyled\">\n                <li class=\"pull-right\"><p>Copyright &copy; 2016</p></li>\n                <li><a href=\"#\">About</a></li>\n                <li><a href=\"#\">Twitter</a></li>\n                <li><a href=\"#\">GitHub</a></li>\n                <li><a href=\"#\">Contact</a></li>\n            </ul>\n\n            </div>           \n\n        </div>\n    </footer>\n    ",
            styles: ["\n\n        #startButton{\n            width: 25em;\n            height: 6em;\n            border: 1px solid black;\n            margin: auto;\n            margin-top: 15%;\n        }\n\n        #startButton h1{\n            magin:auto;\n        }\n\n        .greenWriting {\n            color: #00FF00;\n        }\n\n        .redWriting {\n            color: red;\n        }\n\n        .greenBackground {\n            background-color: #00FF00;\n        }\n\n        .redBackground {\n            background-color: red;\n        }\n\n        .jumbotron { \n            box-shadow: 0 2px 0 rgba(0, 0, 0, 0.2);\n        }\n        \n        .question-panel {\n            text-align: center;\n        }\n\n        #arena{\n            text-align: center;\n            height: 60%;\n            margin-top:5%;\n            margin-bottom:10%;\n        }\n\n        .battlePanel{\n            height:80%;\n        }\n\n        .question{\n            height:60%;\n        }\n\n        .player-info-panel{\n            text-align: left;\n            padding: 15px;\n        }\n\n        #timer{\n            padding:0;\n        }\n\n        footer li {\n            float: left;\n            margin-right: 1.5em;\n        }\n\n        .battlePanel{\n            min-height: 20em;\n        }\n\n    "],
            providers: [user_service_1.UserService, questions_service_1.QuestionsService, answering_service_1.AnsweringService]
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService, questions_service_1.QuestionsService, answering_service_1.AnsweringService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map