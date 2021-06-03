import bcrypt from 'bcrypt';
import * as jwt from '../authentication/jwt';
import { Response, Request, NextFunction } from 'express';
import HttpException from '../error/HttpException';
import { UsersRepo } from './../repositories/users/UsersRepo';
import { UserMapper } from '../mappers/UserMapper';

export default class LoginController {

    usersRepo: UsersRepo;
    userMapper: UserMapper;

    constructor(usersRepo: UsersRepo, userMapper: UserMapper) {
        this.usersRepo = usersRepo;
        this.userMapper = userMapper;
    }

    public login = async(request: Request, response: Response, next: NextFunction) => {
        const body = request.body;
        const email = body.email;
        const password = body.password;
        // const [, hash] = request.headers.authorization.split(' ');
        // const [email, password] = Buffer.from(hash, 'base64').toString().split(":")

        if (email === undefined || password === undefined) {
            return response.status(401).send("Unauthorized");
        }

        try {
            const user = await this.usersRepo.getUserByCondition({"email": email})

            if (!user) {
                return response.status(401).send("Unauthorized");
            }

            let passwordIsCorrect = await bcrypt.compare(password, user.password)

            if (!passwordIsCorrect) {
                return response.status(401).send("Unauthorized");
            }

            const token = await jwt.sign({user: user.id});
            return response.status(200).send({user, token});
        } catch (err) {
            next(new HttpException(500, err.message || 'Unexpected error', ''));
        }        
    }
}
