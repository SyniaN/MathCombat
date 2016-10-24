import {Injectable} from '@angular/core'
import {GameStates} from'./shared/models/GameStates'


@Injectable()
export class GameStateService{

    gameState = GameStates.init;

    init(){
        this.gameState = GameStates.init;
    }

    countdown(){
        this.gameState = GameStates.countdown;
    }

    inProgress(){
        this.gameState = GameStates.inProgress;
    }

    gameOver(){
        this.gameState = GameStates.gameOver;
    }

    getGameState(){
        return this.gameState;
    }


}