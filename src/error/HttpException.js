"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HttpException extends Error {
    constructor(status, message, detail) {
        super();
        this.detail = detail;
        this.message = message;
        this.status = status;
    }
}
exports.default = HttpException;
