"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRepo = void 0;
const connection_1 = __importDefault(require("../../database/connection"));
const HttpException_1 = __importDefault(require("../../error/HttpException"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class UsersRepo {
    async getUserById(id) {
        const user = await connection_1.default('user').select('*').where({ id: id })
            .catch((err) => {
            throw new Error(err.detail);
        });
        return user[0];
    }
    async getUserByCondition(condition) {
        const user = await connection_1.default('user').select('*').where(condition).catch((err) => {
            throw new Error(err.detail);
        });
        return user[0];
    }
    async findAllUsers() {
        const users = await connection_1.default('user').select('*')
            .catch((err) => {
            throw new Error(err.detail);
        });
        return users;
    }
    exists(t) {
        throw new Error("Method not implemented.");
    }
    async delete(id) {
        const user = await connection_1.default('user').select('*').where({ id_user: id }).del().catch((err) => {
            throw new Error(err.detail);
        });
        return user;
    }
    async save(t) {
        const users = await this.findAllUsers();
        if (users.length > 0) {
            t.role = 'USER';
        }
        else {
            t.role = 'ADMIN';
        }
        const user = await connection_1.default('user').insert({
            name: t.name,
            email: t.email,
            password: t.password,
            role: t.role,
            createdAt: new Date().toLocaleString(),
        }).returning('id').then(async (id_user) => {
            const userInserted = await this.getUserById(id_user[0]);
            return userInserted;
        }).catch((err) => {
            throw new HttpException_1.default(400, err.detail, '');
        });
        return user;
    }
    async update(t, id) {
        let salt = await bcrypt_1.default.genSalt(10);
        t.password = await bcrypt_1.default.hash(t.password, salt);
        const user = await connection_1.default('user').where({ id_user: id }).update({
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
    async getUserActivities(username, size) {
        const activities = await connection_1.default('user')
            .join('activity_interaction', 'user.id_user', '=', 'activity_interaction.user_id')
            .join('activity', 'activity.id_activity', '=', 'activity_interaction.activity_id')
            .select('activity.name', 'activity.creation', 'activity.last_update', 'activity.start_date', 'activity.end_date', 'activity.description')
            .where('username', username)
            .catch((err) => {
            throw new Error(err.detail);
        });
        if (size < activities.length) {
            return activities.slice(0, size);
        }
        else {
            return activities;
        }
    }
    async getUserLastPlacesPassed(username, size) {
        const activities = await connection_1.default('user')
            .join('activity_interaction', 'user.id_user', '=', 'activity_interaction.user_id')
            .join('activity', 'activity.id_activity', '=', 'activity_interaction.activity_id')
            .join('place', 'place.id_place', '=', 'activity.place_id')
            .select('place.id_place', 'place.name', 'place.maximum_capacity', 'place.open_area', 'activity_interaction.creation as date')
            .where('username', username)
            .catch((err) => {
            throw new Error(err.detail);
        });
        if (size < activities.length) {
            return activities.slice(0, size);
        }
        else {
            return activities;
        }
    }
}
exports.UsersRepo = UsersRepo;
