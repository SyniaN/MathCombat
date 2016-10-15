import {Component} from '@angular/core';
import {User} from './shared/models/User';
import {UserService} from'./user.service';
import {QuestionsService} from'./questions.service';
import {AnsweringService} from './answering.service';

import {OnInit} from '@angular/core';
import {Observable} from 'rxjs/Rx';

@Component({
    selector: 'my-app',
    template: `
    <script src="/socket.io/socket.io.js"></script>
    <script>
        var socket = io();
    </script>

    <header>
        <nav class="navbar navbar-default">
            <div class="container">
                <div class="navbar-header">
                    <a href="/" class="navbar-brand">Math Combat</a>
                </div>
                <div class="navbar-collapse collapse">
                    <ul class="nav navbar-nav navbar-right">
                        <li>
                            <a href='#' (click)="login()">Login</a>
                        </li>
                        <li>
                            <a href='#' (click)="signUp()">Sign Up</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
    <main class="container">


        <div id="arena">

            <div class="row">
                <ul class="list-group col-xs-4 player-info-panel">
                    <li class="list-group-item">
                        <span class="badge">Rank {{user.rank}}</span>
                        {{user.name}}
                    </li>
                    <li class="list-group-item">
                        <span class="badge">{{user.stars}}/5</span>
                        Stars
                    </li>
                </ul>
                <div id="timer" class="col-xs-4">
                    <h4>Time:</h4>
                    <h1>{{time}}</h1>
                </div>

                <ul class="list-group col-xs-4 player-info-panel">
                    <li class="list-group-item">
                        <span class="badge">Rank {{opponent.rank}}</span>
                        {{opponent.name}}
                    </li>
                    <li class="list-group-item">
                        <span class="badge">{{opponent.stars}}/5</span>
                        Stars
                    </li>
                </ul>
            </div>

            <div class="progress progress-striped">
                <div class="progress-bar progress-bar-success" style="min-width: 2%; max-width: 98%;" [ngStyle]="{'width.%': p.User.percentage}">
                    {{p.User.score}} points
                </div>

                <div class="progress-bar progress-bar-danger" style="min-width: 2%; max-width: 98%;"  [ngStyle]="{'width.%': p.Opponent.percentage}"> 
                    {{p.Opponent.score}} points
                </div>
            </div>
           
            <div id="battlePanels" class="row">
                <div id="friendlyPanel" class="col-xs-6 ">
                    <div class="jumbotron battlePanel">
                        <form (submit)="sendMyAnswer()" >
                            <div id="my-question" class="question">
                                <label>Question:</label>
                                <h2>{{myQuestion}} = ?</h2>
                            </div>

                            <div id="my-answer" class="answer">
                                <label>Answer:</label>
                                <div class="form-group">
                                    <input 
                                        type="number" 
                                        autocomplete="off" 
                                        class="form-control" 
                                        id="myAnswer" 
                                        [ngClass]="{'greenBackground': p.User.greenBackground, 'redBackground': p.User.redBackground }"
                                        [(ngModel)]="p.User.answer" 
                                        name = "myAnswer"
                                        >
                                    <p [ngClass]="{'greenWriting': p.User.greenWriting, 'redWriting': p.User.redWriting }"><i>{{p.User.message}}</i></p>
                                </div>
                            </div>
                        </form>             
                    </div>
                </div>

                <div id="opponentPanel" class="col-xs-6 ">
                    <div class="jumbotron battlePanel">
                    <div id="my-question" class="question">
                        <label>Question:</label>
                        <h2>{{theirQuestion}}</h2>
                    </div>
                    <div id="their-answer" class="answer">
                        <label>Answer:</label>
                        <div class="form-group">
                            <input 
                                type="number" 
                                autocomplete="off" 
                                class="form-control" 
                                id="theirAnswer" 
                                [ngClass]="{'greenBackground': p.Opponent.greenBackground, 'redBackground': p.Opponent.redBackground }"
                                value="{{p.Opponent.answer}}"
                                name = "theirAnswer">
                        </div>
                    </div>
                </div>
            </div>
        </div>

            <div id="hints">
            <p><strong>Hint:</strong> {{hints}}{{p.Opponent.answer}}</p> 
            </div>
        </div>

    </main>
    <hr>
    <footer>

        <div class="container">

            <div class="row">

            <ul class="list-unstyled">
                <li class="pull-right"><p>Copyright &copy; 2016</p></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Twitter</a></li>
                <li><a href="#">GitHub</a></li>
                <li><a href="#">Contact</a></li>
            </ul>

            </div>           

        </div>
    </footer>
    `,
    styles: [`

        .greenWriting {
            color: #00FF00;
        }

        .redWriting {
            color: red;
        }

        .greenBackground {
            background-color: #00FF00;
        }

        .redBackground {
            background-color: red;
        }

        .jumbotron { 
            box-shadow: 0 2px 0 rgba(0, 0, 0, 0.2);
        }
        
        .question-panel {
            text-align: center;
        }

        #arena{
            text-align: center;
            height: 60%;
            margin-top:5%;
            margin-bottom:10%;
        }

        .battlePanel{
            height:80%;
        }

        .question{
            height:60%;
        }

        .player-info-panel{
            text-align: left;
            padding: 15px;
        }

        #timer{
            padding:0;
        }

        footer li {
            float: left;
            margin-right: 1.5em;
        }

        .battlePanel{
            min-height: 20em;
        }

    `],
    providers: [UserService, QuestionsService, AnsweringService]
})

export class AppComponent implements OnInit{

    ngOnInit():void{
        this.getUser();
        this.getOpponent();
        this.getNewQuestionSet("User");
        this.getNewQuestionSet("Opponent");
        this.getNewQuestion("User");
        this.getNewQuestion("Opponent");
        setInterval(() => {
            if(Math.random()<0.3){
                this.reiceiveOpponentAnswer();
                
            }
        }, 400);
    }

    constructor(private userService:UserService, private questionsService:QuestionsService, private answeringService:AnsweringService){}

    user:User = null;
    opponent:User = null;

    myQuestion:string = null;
    
    theirQuestion:string = null;

    p = {
        "User":{
            greenBackground: false,
            redBackground: false,
            greenWriting: false,
            redWriting: false,
            message: "",
            score: 0,
            percentage: 50,
            answer: null

        },
        "Opponent":{
            greenBackground: false,
            redBackground: false,
            greenWriting: false,
            redWriting: false,
            message: "",
            score: 0,
            percentage: 50,
            answer: null
        }
    }
    
    
    time = "02:00";
    hints = "This is a hint";

    updatePercentage():void{
        var tempMyScore = this.p.User.score;
        var tempTheirScore = this.p.Opponent.score;

        if(tempMyScore === 0){
            tempMyScore = 0.02;
        }

        if (tempTheirScore === 0){
            tempTheirScore = 0.02;
        }

        var total = tempMyScore + tempTheirScore;

        this.p.User.percentage = tempMyScore/total * 100;
        this.p.Opponent.percentage = 100 - this.p.User.percentage;
    }

    sendMyAnswer(): void {
        var answerCorrect:boolean = this.answeringService.isCorrect(this.myQuestion, this.p.User.answer);
        this.markInput("User", answerCorrect);
    }

    markInput(forWhom:string, answerCorrect): void{
        console.log('marking Input where p...answer:' + this.p[forWhom].answer);
        if (forWhom === 'User'){
            var Other = 'Opponent';
        } else {
            var Other = "User";
        }


        if (answerCorrect){
            this.p[forWhom].redBackground = false;
            this.p[forWhom].redWriting = false;
            this.p[forWhom].greenBackground = true;
            this.p[forWhom].greenWriting = true;
            
            setTimeout(() => {
                    this.p[forWhom].greenBackground = false;
                }, 180);

            this.p[forWhom].answer = null;
            this.getNewQuestion(forWhom);
            if (this.p[forWhom].score < 15){
                this.p[forWhom].score ++;
            }
            if ((this.p[Other].score + this.p[forWhom].score >= 16) && (this.p[Other].score > 0)){
                this.p[Other].score--;
            }
            this.p[forWhom].message = "Correct!";
        } else {
            this.p[forWhom].greenBackground = false;
            this.p[forWhom].greenWriting = false;
            this.p[forWhom].redBackground = true;
            this.p[forWhom].redWriting = true;
            this.p[forWhom].answer = null;
            this.p[forWhom].message ="Ops, try again!";
        }
        this.updatePercentage();
    }

    reiceiveOpponentAnswer(): void {
        console.log('receiving opponent answer');
        var opponentAnswer:number = this.answeringService.solveQuestion(this.theirQuestion);
        var correctChance = 0.9;
        if (Math.random() > correctChance){
            opponentAnswer = Math.floor(opponentAnswer * Math.random());
        } 
        this.p.Opponent.answer = opponentAnswer.toString();
        setTimeout(() => {
            var answerCorrect:boolean = this.answeringService.isCorrect(this.theirQuestion, this.p.Opponent.answer)
            this.markInput("Opponent",answerCorrect);
        }, 500);

        
    }

    getUser(): void {
        this.user = this.userService.getUser();
    }

    getOpponent(): void {
        this.opponent = this.userService.getOpponent();
    }

    getNewQuestionSet(forWhom:string): void {
        this.questionsService.getNewQuestionSet(forWhom);
    }

    getNewQuestion(forWhom:string): void{
        if (forWhom === "User"){
            this.myQuestion = this.questionsService.getNewQuestion("User");
        } else {
            this.theirQuestion = this.questionsService.getNewQuestion("Opponent");
        }
    }



    login(){
        console.log('login in');
    }

    signUp(){
        console.log('signing up');
    }

}