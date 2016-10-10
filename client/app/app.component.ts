import {Component} from '@angular/core';

@Component({
    selector: 'my-app',
    template: `
    <header>
        <nav class="navbar navbar-default navbar-fixed-top">
            <div class="container">
                <div class="navbar-header">
                    <a href="/" class="navbar-brand">Arithmetica</a>
                </div>
                <div class="navbar-collapse collapse">
                    <ul class="nav navbar-nav navbar-right">
                        <li>
                            <a>Login</a>
                        </li>
                        <li>
                            <a>Sign Up</a>
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
                        <span class="badge">Rank 1</span>
                        User
                    </li>
                    <li class="list-group-item">
                        <span class="badge">4/5</span>
                        Stars
                    </li>
                </ul>
                <div id="timer" class="col-xs-4">
                    <h4>Time:</h4>
                    <h1  >02:00</h1>
                </div>

                <ul class="list-group col-xs-4 player-info-panel">
                    <li class="list-group-item">
                        <span class="badge">Rank 1</span>
                        Opponent
                    </li>
                    <li class="list-group-item">
                        <span class="badge">4/5</span>
                        Stars
                    </li>
                </ul>
            </div>

            <div class="progress progress-striped">
                <div class="progress-bar progress-bar-success " style="width: 50%">
                    0 points
                </div>

                <div class="progress-bar progress-bar-danger" style="width: 50%">
                    0 points
                </div>
            </div>
           
            <div id="battlePanels" class="row">
                <div id="friendlyPanel" class="col-xs-6 ">
                    <div class="jumbotron battlePanel">
                        <div id="my-question" class="question">
                        <label>Question:</label>
                        <h2>5 + 2 = ? </h2>
                        </div>

                        <div id="my-answer" class="answer">
                        <label for="usr">Answer:</label>
                        <div class="form-group">
                            <input type="text" class="form-control" id="usr">
                        </div>
                        </div>             
                    </div>
                </div>

                <div id="opponentPanel" class="col-xs-6 ">
                    <div class="jumbotron battlePanel">
                    <div id="my-question" class="question">
                    <label>Question:</label>
                        </div>

                        <div id="my-answer" class="answer">
                        <label>Answer:</label>
                        </div>
                    </div>
                </div>
            </div>

            <div id="hints">
            <p><strong>Hint:</strong> 1 x 1 = 1</p> 
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

    `]
})
export class AppComponent{

}