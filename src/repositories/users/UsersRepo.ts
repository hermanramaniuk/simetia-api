import User from "../../models/User";
import db from '../../database/connection';
import { UsersIRepo } from "./UsersIRepo";
import HttpException from "../../error/HttpException";
import bcrypt from 'bcrypt';

export class UsersRepo implements UsersIRepo {

    public async getUserById(id: string): Promise<User> {
        const user = await db('user').select('*').where({ id: id })
        .catch((err) => {
            throw new Error(err.detail);
        });
        return user[0];
    }

    public async getUserByCondition(condition: Object) {
        const user = await db('user').select('*').where(condition).catch((err) => {
            throw new Error(err.detail);
        });
        return user[0];
    }
    
    public async findAllUsers(): Promise<any[]> {
        const users = await db('user').select('*')
        .catch((err) => {
            throw new Error(err.detail);
        });
        return users;
    }

    exists(t: User): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    public async delete(id: String): Promise<any> {
        const user = await db('user').select('*').where({id_user: id}).del().catch((err) => {
            throw new Error(err.detail);
        });
        return user;
    }

    public async save(t: User): Promise<any> {
        const users = await this.findAllUsers();
        if (users.length > 0) {
            t.role = 'USER';
        } else {
            t.role = 'ADMIN';
        }

        const user = await db('user').insert({
            name: t.name,
            email: t.email,
            password: t.password,
            role: t.role,
            createdAt: new Date().toLocaleString(),
        }).returning('id').then(async (id_user) => {
            const userInserted = await this.getUserById(id_user[0]);
            return userInserted;
        }).catch((err) => {
            throw new HttpException(400, err.detail, '');
        });
        
        return user;
    }

    public async update(t: User, id: string): Promise<any> {
        let salt = await bcrypt.genSalt(10)
        t.password = await bcrypt.hash(t.password, salt)
        const user = await db('user').where({id_user: id}).update({
            name: t.name,
            email: t.email,
            password: t.password,
            role: t.role,
            createdAt: new Date().toLocaleString(),
        }).then(async (resp) => {
            
        }).catch((err) => {
            throw new Error(err.detail);
        });
        return user;
    }

    async getUserActivities(username: string, size: number): Promise<any> {
        const activities = await db('user')
            .join('activity_interaction', 'user.id_user', '=', 'activity_interaction.user_id')
            .join('activity', 'activity.id_activity', '=', 'activity_interaction.activity_id')
            .select('activity.name','activity.creation', 'activity.last_update', 'activity.start_date', 'activity.end_date', 'activity.description')
            .where('username', username)
            .catch((err) => {
                throw new Error(err.detail);
        });
        if (size < activities.length) {
            return activities.slice(0,size);
        } else {
            return activities;
        }
    }

    async getUserLastPlacesPassed(username: string, size: number): Promise<any> {
        const activities = await db('user')
            .join('activity_interaction', 'user.id_user', '=', 'activity_interaction.user_id')
            .join('activity', 'activity.id_activity', '=', 'activity_interaction.activity_id')
            .join('place', 'place.id_place', '=', 'activity.place_id')
            .select('place.id_place','place.name', 'place.maximum_capacity', 'place.open_area', 'activity_interaction.creation as date')
            .where('username', username)
            .catch((err) => {
                throw new Error(err.detail);
        });
        
        if (size < activities.length) {
            return activities.slice(0,size);
        } else {
            return activities;
        }
    }
}