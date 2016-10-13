import {Injectable} from '@angular/core';
import{User} from './shared/models/User';

import {CURRENT_USER} from './shared/mock/mock-users';
import {CURRENT_OPPONENT} from './shared/mock/mock-users';

@Injectable()
export class UserService{
    
    getUser():User{
        return CURRENT_USER;
    }

    getOpponent():User{
        return CURRENT_OPPONENT;
    }
}

