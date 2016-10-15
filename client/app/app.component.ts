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
                    <a href="/" class="navbar-brand">Arithmetica</a>
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
                <div class="progress-bar progress-bar-success" style="min-width: 2%; max-width: 98%;" [ngStyle]="{'width.%': myPercentage}">
                    {{myScore}} points
                </div>

                <div class="progress-bar progress-bar-danger" style="min-width: 2%; max-width: 98%;"  [ngStyle]="{'width.%': theirPercentage}"> 
                    {{theirScore}} points
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
                                        type="text" 
                                        autocomplete="off" 
                                        class="form-control" 
                                        id="myAnswer" 
                                        [ngClass]="{'greenBackground': greenBackground, 'redBackground': redBackground }"
                                        [(ngModel)]="myAnswer" 
                                        name = "myAnswer"
                                        >
                                    <p [ngClass]="{'greenWriting': greenWriting, 'redWriting': redWriting }"><i>{{message}}</i></p>
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
                    <div id="my-answer" class="answer">
                        <label>Answer:</label>
                        <div class="form-group">
                            <input type="text" autocomplete="off" class="form-control" id="theirAnswer" [(ngModel)]="theirAnswer" name = "theirAnswer">
                        </div>
                    </div>
                </div>
            </div>
        </div>

            <div id="hints">
            <p><strong>Hint:</strong> {{hints}}</p> 
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
        this.getNewQuestionSet();
        this.getNewQuestion();
    }

    constructor(private userService:UserService, private questionsService:QuestionsService, private answeringService:AnsweringService){}

    user:User = null;
    opponent:User = null;
    myQuestion:string = null;
    myAnswer:string = null;
    theirAnswer:string = null;
    greenBackground: boolean = false;
    redBackground: boolean = false;
    greenWriting: boolean = false;
    redWriting: boolean = false;
    
    myScore = 0;
    theirScore = 0;
    
    myPercentage = 50;
    theirPercentage = 50;
    
    message = "";
    time = "02:00";
    hints = "This is a hint";

    theirQuestion = "7 + 3 = ?";

    updatePercentage():void{
        var tempMyScore = this.myScore;
        var tempTheirScore = this.theirScore;

        if(tempMyScore === 0){
            tempMyScore = 0.02;
        }

        if (tempTheirScore === 0){
            tempTheirScore = 0.02;
        }

        var total = tempMyScore + tempTheirScore;

        this.myPercentage = tempMyScore/total * 100;
        this.theirPercentage = 100 - this.myPercentage;

        console.log('my new percentage: ' + this.myPercentage);
    }

    sendMyAnswer(): void {
        var answerCorrect:boolean = this.answeringService.sendMyAnswer(this.myQuestion, this.myAnswer);
        if (answerCorrect){
            this.redBackground = false;
            this.redWriting = false;
            this.greenBackground = true;
            this.greenWriting = true;
            
            setTimeout(() => {
                    this.greenBackground = false;
                }, 180);

            this.myAnswer = null;
            this.getNewQuestion();
            this.myScore++;
            this.message = "Correct!";
        } else {
            this.greenBackground = false;
            this.greenWriting = false;
            this.redBackground = true;
            this.redWriting = true;
            this.myAnswer = null;
            this.message ="Ops, try again!";
        }
        this.updatePercentage();
    }

    getUser(): void {
        this.user = this.userService.getUser();
    }

    getOpponent(): void {
        this.opponent = this.userService.getOpponent();
    }

    getNewQuestionSet(): void {
        this.questionsService.getNewQuestionSet();
    }

    getNewQuestion():void{
        this.myQuestion = this.questionsService.getNewQuestion();
    }

    login(){
        console.log('login in');
    }

    signUp(){
        console.log('signing up');
    }

}