"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = __importDefault(require("uuid"));
const appConfig_1 = require("./appConfig");
class MainController {
    root(req, res) {
        return res.status(200).send({
            message: appConfig_1.APP_NAME,
        });
    }
    status(req, res) {
        return res.status(200).send({
            appName: appConfig_1.APP_NAME,
            status: 'ok',
            message: uuid_1.default.v4()
        });
    }
}
exports.mainController = new MainController();
