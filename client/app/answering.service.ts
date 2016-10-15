import {Injectable} from '@angular/core'

@Injectable()
export class AnsweringService{

    isCorrect(question, ans):boolean{
       var realAnswer = this.solveQuestion(question);

        if (realAnswer === parseInt(ans)){
            return true;
        } else {
            return false;
        }
    }

    solveQuestion(question):number{
        question = question.replace('x', '*');
        question = question.replace('÷', '/');
        return eval(question);
    }
    
}