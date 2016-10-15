import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

import {MyQuestions} from './shared/mock/mock-questions';
import {TheirQuestions} from './shared/mock/mock-questions';

@Injectable()
export class QuestionsService{

    player = {
        "User":{
            counter: 0,
            nextQuestionSet:  null,
            currentQuestionSet: null

        },
        "Opponent":{
            counter: 0,
            nextQuestionSet: null,
            currentQuestionSet: null
        }
    };

    theirCounter:number = 0;
    theirCurrentQuestionSet: string[] = null;
    theirNextQuestionSet: string[] = null;

    getNewQuestionSet(forWhom:string):void{

            this.player[forWhom].currentQuestionSet = this.player[forWhom].nextQuestionSet;

            if (forWhom === "User"){
                this.player[forWhom].nextQuestionSet = MyQuestions;
            } else {
                this.player[forWhom].nextQuestionSet = TheirQuestions;
            }

    }

    getNewQuestion(forWhom:string):string{

        if( this.player[forWhom].currentQuestionSet === null || this.player[forWhom].counter === this.player[forWhom].currentQuestionSet.length){
            var returnQuestion = this.player[forWhom].nextQuestionSet[0];
            this.player[forWhom].counter = 1;
            this.getNewQuestionSet(forWhom);
        } else {
            var returnQuestion = this.player[forWhom].currentQuestionSet[this.player[forWhom].counter];
            this.player[forWhom].counter++;
        }
             
        return returnQuestion;
    }


}
