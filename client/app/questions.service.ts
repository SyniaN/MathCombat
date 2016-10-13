import {Injectable} from '@angular/core';

import {MyQuestions} from './shared/mock/mock-questions';

@Injectable()
export class QuestionsService{

    counter:number = 0;
    nextQuestionSet:string[] = null;
    currentQuestionSet: string[] = null;

    getNewQuestionSet():void{
        this.currentQuestionSet = this.nextQuestionSet;
        this.nextQuestionSet = MyQuestions;
    }

    getNewQuestion():string{

        if( this.currentQuestionSet === null || this.counter === this.currentQuestionSet.length){
             var returnQuestion = this.nextQuestionSet[0];
            this.counter = 1;
            this.getNewQuestionSet();
        } else {
            var returnQuestion = this.currentQuestionSet[this.counter];
            this.counter++;
        }
        
        return returnQuestion;
    }

}
