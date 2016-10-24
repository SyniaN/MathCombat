import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';

import 'rxjs/add/operator/toPromise';
import {Subject} from 'rxjs/Subject';

import {MyQuestions} from './shared/mock/mock-questions';
import {TheirQuestions} from './shared/mock/mock-questions';



@Injectable()
export class QuestionsService{

    private questionSetURL = 'api/getQuestionSet';

    player = {
        "User":{
            counter: 0,
            nextQuestionSet:  [],
            currentQuestionSet: ["1+1"]

        },
        "Opponent":{
            counter: 0,
            nextQuestionSet:  [],
            currentQuestionSet: ["1+1"]
        }
    };

    constructor(private http: Http){}

    initializeQuestionSets():void{
        this.getNewQuestionSet("User");
        this.getNewQuestionSet("Opponent");
    }

    getNewQuestionSet(forWhom:string):void{
        this.http.get('api/getQuestionSet')
            .toPromise()
            .then(response => this.player[forWhom].nextQuestionSet = response.json().data)
            .catch(function(){console.log('something went wrong')});
    }

    updateCurrentQuestionSet(forWhom:string):void{
         this.player[forWhom].currentQuestionSet = this.player[forWhom].nextQuestionSet;
    }

    getNewQuestion(forWhom:string):string{

        if( this.player[forWhom].counter >= this.player[forWhom].currentQuestionSet.length){
            var returnQuestion = this.player[forWhom].nextQuestionSet[0];
            this.player[forWhom].counter = 1;
            this.updateCurrentQuestionSet(forWhom);
            this.getNewQuestionSet(forWhom);
        } else {
            var returnQuestion = this.player[forWhom].currentQuestionSet[this.player[forWhom].counter];
            this.player[forWhom].counter++;
        }
             
        return returnQuestion;
    }


}
