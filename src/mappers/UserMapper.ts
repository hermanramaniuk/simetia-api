import moment from 'moment';
import UserInput from '../models/UserInput';
import User from './../models/User';
import { Mapper } from './Mapper';

export class UserMapper implements Mapper<User, UserInput> {

    constructor() {}

    toDTO(user: any): any {
        const userModel  = {
            id : user.id,
            name : user.name,
            role: user.role,
            email : user.email,
            password : user.password,
        };
        return userModel;
    }

    toPersistence(userInput: UserInput): User {
        const user = new User();
        user.name = userInput.name,
        user.email = userInput.email;
        user.password = userInput.password;
        user.createdAt = moment().format();
        return user;
    }

}