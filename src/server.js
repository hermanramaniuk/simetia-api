"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const ErrorMiddleware_1 = __importDefault(require("./error/ErrorMiddleware"));
const cron = require('node-cron');
var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
};
const app = express_1.default();
app.use(express_1.default.json());
app.use(cors_1.default(corsOptions));
app.use(routes_1.default);
app.use(ErrorMiddleware_1.default);
const port = process.env.PORT || 4001;
//if(process.env.NODE_ENV === 'production') {
app.use(express_1.default.static('swagger/build'));
app.get('*', (req, res) => {
    res.sendFile(path_1.default.resolve(__dirname, 'client', 'build', 'index.html'));
});
//}
app.listen(port, () => console.log(`Server started on port ${port}`));
