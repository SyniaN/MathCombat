import {Injectable} from '@angular/core'

@Injectable()
export class AnsweringService{

    sendMyAnswer(question, ans):boolean{

        question = question.replace('x', '*');
        question = question.replace('÷', '/');

        if (eval(question) === parseInt(ans)){
            return true;
        } else {
            return false;
        }
        
    }
    
}