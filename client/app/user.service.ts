import {Injectable} from '@angular/core';
import{User} from './shared/models/User';

import {CURRENT_USER} from './shared/mock/mock-users';
import {CURRENT_OPPONENT} from './shared/mock/mock-users';

@Injectable()
export class UserService{

    user:User = null;
    opponent:User = null;
    
    getUser():User{
        if (this.user === null){
            this.user = CURRENT_USER;
        }
        return this.user;
    }

    addStar(newStarCount){
        if (this.user === null){
            this.user = CURRENT_USER;
        }
        this.user.stars += newStarCount;
        this.updateRank();
    }

    removeStar(removeStarCount){
        if (this.user === null){
            this.user = CURRENT_USER;
        }
        if (this.user.stars > 0){this.user.stars-=removeStarCount};
        this.updateRank();
    }

    updateRank(){
        this.user.rank = Math.floor(this.user.stars/3) + 1;
    }

    getOpponent():User{
        if(this.opponent === null){this.opponent = CURRENT_OPPONENT};
        return this.opponent;
    }

}

