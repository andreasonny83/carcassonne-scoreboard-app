/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(__webpack_require__(/*! express */ "express"));
const apollo_server_express_1 = __webpack_require__(/*! apollo-server-express */ "apollo-server-express");
const morgan_1 = __importDefault(__webpack_require__(/*! morgan */ "morgan"));
const cors_1 = __importDefault(__webpack_require__(/*! cors */ "cors"));
const bodyParser = __importStar(__webpack_require__(/*! body-parser */ "body-parser"));
const admin_1 = __webpack_require__(/*! ./controllers/admin */ "./src/controllers/admin.ts");
const config_1 = __webpack_require__(/*! ./config */ "./src/config.ts");
const typedefs_1 = __webpack_require__(/*! ./graphql/typedefs */ "./src/graphql/typedefs.ts");
const resolvers_1 = __webpack_require__(/*! ./graphql/resolvers */ "./src/graphql/resolvers.ts");
const router_1 = __webpack_require__(/*! ./router */ "./src/router.ts");
class App {
    constructor(appConfig) {
        this.appInstance = express_1.default();
        this.admin = admin_1.adminController;
        this.appConfig = appConfig;
    }
    getApolloServer() {
        return this.config();
    }
    config() {
        return __awaiter(this, void 0, void 0, function* () {
            this.appInstance.use(morgan_1.default('dev'));
            this.appInstance.disable('x-powered-by');
            this.appInstance.use(cors_1.default());
            // Support application/json type post data
            this.appInstance.use(bodyParser.json());
            // Support application/x-www-form-urlencoded post data
            this.appInstance.use(bodyParser.urlencoded({ extended: false }));
            this.appInstance.use('/', router_1.router);
            return this.applyMiddlewares(this.appInstance);
        });
    }
    applyMiddlewares(expressApp) {
        return __awaiter(this, void 0, void 0, function* () {
            const apolloServer = yield new apollo_server_express_1.ApolloServer({
                context: ({ req }) => __awaiter(this, void 0, void 0, function* () {
                    if (!req) {
                        return;
                    }
                    // Allow GraphQL playground in development mode
                    const originUrl = `localhost:${this.appConfig.getPort()}${req.baseUrl}`;
                    const reg = new RegExp(`${originUrl}$`, 'gi');
                    const isPlayground = reg.test(String(req.headers.referer));
                    if (this.appConfig.isDev() && isPlayground) {
                        return {
                            userData: {
                                data: {
                                    username: 'dea9adba-4ef3-4687-ac7b-59a53ffafc5b',
                                },
                            },
                        };
                    }
                    const authorization = String(req.headers.authorization) || '';
                    const token = authorization.replace('Bearer ', '');
                    let userData;
                    try {
                        userData = yield this.admin.ValidateToken(token);
                    }
                    catch (err) {
                        console.log('Error:', err.message);
                        throw new apollo_server_express_1.AuthenticationError('you must be logged in');
                    }
                    // console.log('userData', userData);
                    return { userData };
                }),
                typeDefs: apollo_server_express_1.gql `
        ${typedefs_1.typeDefs}
      `,
                resolvers: resolvers_1.resolvers,
                playground: this.appConfig.isDev(),
                subscriptions: {
                    onConnect: () => console.log('Connected to websocket'),
                },
                tracing: true,
            });
            yield apolloServer.applyMiddleware({
                app: expressApp,
                path: '/graphql',
            });
            return apolloServer;
        });
    }
}
exports.app = new App(config_1.config);


/***/ }),

/***/ "./src/config.ts":
/*!***********************!*\
  !*** ./src/config.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __webpack_require__(/*! dotenv */ "dotenv");
class Config {
    static getInstance() {
        if (!Config.instance) {
            Config.instance = new Config();
        }
        return Config.instance;
    }
    constructor() {
        this.envName = "development" || false;
        this.port = process.env.PORT || '8888';
        dotenv_1.config();
    }
    getEnv() {
        return this.envName;
    }
    getPort() {
        return this.port;
    }
    isDev() {
        return this.envName === 'development';
    }
    isDebug() {
        return process.env.DEBUG === 'true';
    }
    get(propName) {
        if (propName === 'NODE_ENV') {
            return this.getEnv();
        }
        if (propName === 'PORT') {
            return this.getPort();
        }
        return process.env[propName];
    }
}
exports.config = Config.getInstance();


/***/ }),

/***/ "./src/controllers/admin.ts":
/*!**********************************!*\
  !*** ./src/controllers/admin.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const amazon_cognito_identity_js_1 = __webpack_require__(/*! amazon-cognito-identity-js */ "amazon-cognito-identity-js");
const axios_1 = __importDefault(__webpack_require__(/*! axios */ "axios"));
const jwk_to_pem_1 = __importDefault(__webpack_require__(/*! jwk-to-pem */ "jwk-to-pem"));
const jsonwebtoken_1 = __importDefault(__webpack_require__(/*! jsonwebtoken */ "jsonwebtoken"));
const aws_sdk_1 = __importDefault(__webpack_require__(/*! aws-sdk */ "aws-sdk"));
const config_1 = __webpack_require__(/*! ../config */ "./src/config.ts");
class AdminController {
    constructor(appConfig) {
        this.poolRegion = appConfig.get('APP_REGION') || '';
        const poolId = appConfig.get('APP_USER_POOL_ID') || '';
        const ClientId = appConfig.get('APP_APP_CLIENT_ID') || '';
        const poolData = {
            UserPoolId: poolId,
            ClientId,
        };
        this.userPool = new amazon_cognito_identity_js_1.CognitoUserPool(poolData);
    }
    register(username, password) {
        const attributeList = [
            new amazon_cognito_identity_js_1.CognitoUserAttribute({
                Name: 'email',
                Value: username,
            }),
            new amazon_cognito_identity_js_1.CognitoUserAttribute({
                Name: 'nickname',
                Value: 'andreasonny83',
            }),
        ];
        return new Promise(res => {
            this.userPool.signUp(username, password, attributeList, [], (err, result) => {
                if (err) {
                    console.log(err);
                    return res(403);
                }
                const cognitoUser = result.user;
                console.log('user name is ' + cognitoUser.getUsername());
                console.log('result is:', result);
                return res(201);
            });
        });
    }
    confirmCode(username, code) {
        const userData = {
            Username: username,
            Pool: this.userPool,
        };
        const cognitoUser = new amazon_cognito_identity_js_1.CognitoUser(userData);
        return new Promise(res => {
            cognitoUser.confirmRegistration(code, true, (err, result) => {
                if (err) {
                    console.log(err);
                    return res(400);
                }
                console.log('call result: ' + result);
                res(200);
            });
        });
    }
    newConfirmCode(username) {
        const userData = {
            Username: username,
            Pool: this.userPool,
        };
        const cognitoUser = new amazon_cognito_identity_js_1.CognitoUser(userData);
        return new Promise(res => {
            cognitoUser.resendConfirmationCode((err, result) => {
                if (err) {
                    console.log(err);
                    return res(400);
                }
                console.log(result);
                res(200);
            });
        });
    }
    login(username, password) {
        const authenticationData = {
            Username: username,
            Password: password,
        };
        const authenticationDetails = new amazon_cognito_identity_js_1.AuthenticationDetails(authenticationData);
        const userData = {
            Username: username,
            Pool: this.userPool,
        };
        const cognitoUser = new amazon_cognito_identity_js_1.CognitoUser(userData);
        return new Promise(res => {
            cognitoUser.authenticateUser(authenticationDetails, {
                onSuccess: (result) => {
                    const accessToken = result.getAccessToken().getJwtToken();
                    const idToken = result.getIdToken().getJwtToken();
                    const refreshToken = result.getRefreshToken().getToken();
                    return res({ status: 200, data: { accessToken, idToken, refreshToken } });
                },
                onFailure: (err) => {
                    console.log(err);
                    if (err && err.code === 'UserNotConfirmedException') {
                        return res({ status: 223, error: true });
                    }
                    return res({ status: 401, error: true });
                },
            });
        });
    }
    ValidateToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `https://cognito-idp.${this.poolRegion}.amazonaws.com/${this.userPool.getUserPoolId()}/.well-known/jwks.json`;
            let response;
            try {
                response = yield axios_1.default.get(url);
            }
            catch (err) {
                throw new Error('Something went wrong while verifying the JWT');
            }
            if (!(response && response.status === 200 && response.data)) {
                throw new Error('Error! Unable to download JWKs');
            }
            const body = response.data;
            const pems = {};
            const keys = body.keys;
            for (const key of keys) {
                // Convert each key to PEM
                const keyId = key.kid;
                const modulus = key.n;
                const exponent = key.e;
                const keyType = key.kty;
                const jwk = { kty: keyType, n: modulus, e: exponent };
                const currPem = jwk_to_pem_1.default(jwk);
                pems[keyId] = currPem;
            }
            // validate the token
            const decodedJwt = jsonwebtoken_1.default.decode(token, { complete: true });
            if (!decodedJwt) {
                throw new Error('Not a valid JWT token');
            }
            const jwtHeader = decodedJwt && decodedJwt.header;
            const kid = jwtHeader.kid;
            const pem = pems[kid];
            if (!pem) {
                throw new Error('Invalid token');
            }
            return new Promise((res) => {
                jsonwebtoken_1.default.verify(token, pem, (err, payload) => {
                    if (err) {
                        throw new Error('Invalid Token.');
                    }
                    else {
                        console.log('Valid Token.');
                        return res({ status: 200, data: payload });
                    }
                });
            });
        });
    }
    getUser(username) {
        const userData = {
            Username: username,
            Pool: this.userPool,
        };
        const cognitoUser = new amazon_cognito_identity_js_1.CognitoUser(userData);
        // console.log('userdata', userData);
        // console.log(cognitoUser);
        return;
        if (cognitoUser !== null) {
            cognitoUser.getSession((err, session) => {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log('session validity: ' + session.isValid());
                aws_sdk_1.default.config.credentials = new aws_sdk_1.default.CognitoIdentityCredentials({
                    IdentityPoolId: '...',
                    Logins: {
                        // Change the key below according to the specific region your user pool is in.
                        'cognito-idp.<region>.amazonaws.com/<YOUR_USER_POOL_ID>': session
                            .getIdToken()
                            .getJwtToken(),
                    },
                });
                // Instantiate aws sdk service objects now that the credentials have been updated.
                // example: var s3 = new AWS.S3();
            });
        }
    }
}
exports.adminController = new AdminController(config_1.config);


/***/ }),

/***/ "./src/controllers/index.ts":
/*!**********************************!*\
  !*** ./src/controllers/index.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(/*! ./main */ "./src/controllers/main.ts"));
__export(__webpack_require__(/*! ./admin */ "./src/controllers/admin.ts"));


/***/ }),

/***/ "./src/controllers/main.ts":
/*!*********************************!*\
  !*** ./src/controllers/main.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = __importDefault(__webpack_require__(/*! uuid */ "uuid"));
const config_1 = __webpack_require__(/*! ../config */ "./src/config.ts");
class MainController {
    constructor(configInstance) {
        this.config = configInstance;
    }
    root(req, res) {
        return res.status(200).send({
            message: this.config.get('APP_NAME'),
        });
    }
    status(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return res.status(200).send({
                appName: this.config.get('APP_NAME'),
                debug: this.config.isDebug(),
                environmentName: this.config.getEnv(),
                status: 'ok',
                message: uuid_1.default.v4(),
            });
        });
    }
}
exports.mainController = new MainController(config_1.config);


/***/ }),

/***/ "./src/datasources/game.data.ts":
/*!**************************************!*\
  !*** ./src/datasources/game.data.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Game {
    constructor({ id, name, started, finished, players, users, log }) {
        this.id = id;
        this.name = name;
        this.started = started || false;
        this.finished = finished || false;
        this.players = players;
        this.users = users || [];
        this.log = log || [];
    }
}
exports.Game = Game;


/***/ }),

/***/ "./src/datasources/game.service.ts":
/*!*****************************************!*\
  !*** ./src/datasources/game.service.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const apollo_datasource_1 = __webpack_require__(/*! apollo-datasource */ "apollo-datasource");
const unique_names_generator_1 = __webpack_require__(/*! unique-names-generator */ "unique-names-generator");
const game_data_1 = __webpack_require__(/*! ./game.data */ "./src/datasources/game.data.ts");
class GameService extends apollo_datasource_1.DataSource {
    constructor() {
        super();
        this.games = new Map();
    }
    initialize() {
        console.log('...initialize...');
    }
    createGame(gameObject, userId) {
        const gameId = newId();
        const game = {
            id: gameId,
            name: gameObject.gameName,
            players: gameObject.players,
            users: [userId],
        };
        this.games.set(gameId, new game_data_1.Game(game));
        return this.games.get(gameId);
    }
    updateGame(gameUpdated) {
        const { id } = gameUpdated;
        this.games.set(id, gameUpdated);
        return this.games.get(id);
    }
    getGame(gameId) {
        if (!gameId) {
            throw new Error('A game id should be specified.');
        }
        return this.games.get(gameId);
    }
    startGame(gameId) {
        if (!gameId) {
            throw new Error('A game id should be specified.');
        }
        const game = this.games.get(gameId);
        if (game) {
            if (game.started) {
                return game;
            }
            if (game && game.id && game.name) {
                const gameUpdated = Object.assign({}, game, { started: true });
                this.games.set(gameId, gameUpdated);
            }
            return this.games.get(gameId);
        }
        throw new Error('Invalid game');
    }
    getGames() {
        return this.games;
    }
}
exports.GameService = GameService;
// ----- Helper Functions -----
function newId() {
    return unique_names_generator_1.uniqueNamesGenerator('_');
}


/***/ }),

/***/ "./src/datasources/index.ts":
/*!**********************************!*\
  !*** ./src/datasources/index.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const game_service_1 = __webpack_require__(/*! ./game.service */ "./src/datasources/game.service.ts");
const user_service_1 = __webpack_require__(/*! ./user.service */ "./src/datasources/user.service.ts");
// TODO: We will not pass dataSources via context because this does not work with subscriptions
// See https://github.com/apollographql/apollo-server/issues/1526
// Set up the dataSources needed by our resolvers
// export const dataSources = () => ({
//     gameService: new GameService()
// });
exports.dataSources = {
    gameService: new game_service_1.GameService(),
    userService: new user_service_1.UserService(),
};


/***/ }),

/***/ "./src/datasources/user.data.ts":
/*!**************************************!*\
  !*** ./src/datasources/user.data.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(userId) {
        this.id = userId;
        this.games = [];
    }
}
exports.User = User;


/***/ }),

/***/ "./src/datasources/user.service.ts":
/*!*****************************************!*\
  !*** ./src/datasources/user.service.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const apollo_datasource_1 = __webpack_require__(/*! apollo-datasource */ "apollo-datasource");
const user_data_1 = __webpack_require__(/*! ./user.data */ "./src/datasources/user.data.ts");
class UserService extends apollo_datasource_1.DataSource {
    constructor() {
        super();
        this.users = new Map();
    }
    initialize() {
        console.log('...initialize...');
    }
    createUser(userId) {
        this.users.set(userId, new user_data_1.User(userId));
        return this.users.get(userId);
    }
    getUser(userId) {
        if (!userId) {
            throw new Error('A user id should be specified.');
        }
        if (!this.users.get(userId)) {
            this.createUser(userId);
        }
        return this.users.get(userId);
    }
    getUsers() {
        return this.users;
    }
}
exports.UserService = UserService;


/***/ }),

/***/ "./src/graphql/resolvers.ts":
/*!**********************************!*\
  !*** ./src/graphql/resolvers.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const merge_graphql_schemas_1 = __webpack_require__(/*! merge-graphql-schemas */ "merge-graphql-schemas");
const game_resolvers_1 = __importDefault(__webpack_require__(/*! ./resolvers/game.resolvers */ "./src/graphql/resolvers/game.resolvers.ts"));
const users_resolvers_1 = __importDefault(__webpack_require__(/*! ./resolvers/users.resolvers */ "./src/graphql/resolvers/users.resolvers.ts"));
const resolversArray = [game_resolvers_1.default, users_resolvers_1.default];
exports.resolvers = merge_graphql_schemas_1.mergeResolvers(resolversArray);


/***/ }),

/***/ "./src/graphql/resolvers/game.resolvers.ts":
/*!*************************************************!*\
  !*** ./src/graphql/resolvers/game.resolvers.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = __webpack_require__(/*! apollo-server */ "apollo-server");
const get_1 = __importDefault(__webpack_require__(/*! lodash/get */ "lodash/get"));
const pubsub = new apollo_server_1.PubSub();
const datasources_1 = __webpack_require__(/*! ../../datasources */ "./src/datasources/index.ts");
const validMeepleColor = ['green', 'red', 'blue', 'yellow', 'black', 'gray'];
const sanitizeInput = (input) => String(input)
    .replace(/[^\w\s]|\s{2,}/g, '')
    .trim();
const validateColor = (color) => Boolean(~validMeepleColor.indexOf(color)) && String(color);
const validatePlayer = (playerName) => {
    const playerNumber = Number(playerName.replace(/player/, ''));
    if (playerNumber > 0 && playerNumber < 7) {
        return `player${playerNumber}`;
    }
    return false;
};
const GAME_UPDATED = 'GAME_UPDATED';
exports.default = {
    Query: {
        game(parent, args, context) {
            // if (context.authScope !== 'ADMIN') {
            //   throw new AuthenticationError('not admin');
            // }
            const { gameId } = args;
            const game = datasources_1.dataSources.gameService.getGame(gameId);
            if (game) {
                return game;
            }
            // throw new ApolloError(`Game ${args.id} does not exist`);
            throw new apollo_server_1.ValidationError(`Game ID not found`);
        },
        games() {
            return datasources_1.dataSources.gameService.getGames();
        },
    },
    Subscription: {
        gameUpdated: {
            subscribe: (root, args, context) => {
                console.log('root', root);
                console.log('args', args);
                console.log('context', context);
                return pubsub.asyncIterator(GAME_UPDATED);
            },
        },
    },
    Mutation: {
        newGame: (parent, args, context) => __awaiter(this, void 0, void 0, function* () {
            const { gameName, players } = args;
            const userId = get_1.default(context, 'userData.data.username');
            const sanitizedGameName = sanitizeInput(gameName);
            const sanitizedPlayers = players.map((player) => {
                const { name, color, key } = player;
                console.log('name', name);
                console.log('color', color);
                console.log('key', key);
                if (!(name && color && key)) {
                    throw new apollo_server_1.ValidationError(`Invalid request`);
                }
                const meepleColor = validateColor(color);
                const playerKey = validatePlayer(key);
                if (!(meepleColor && playerKey)) {
                    throw new apollo_server_1.ValidationError(`Invalid request`);
                }
                return {
                    name: sanitizeInput(player.name),
                    color: meepleColor,
                    key: playerKey,
                };
            });
            const isValidRequest = sanitizedGameName && sanitizedPlayers && Array.isArray(players) && players.length < 7;
            if (!isValidRequest) {
                throw new apollo_server_1.ValidationError(`Invalid request`);
            }
            const gameObj = {
                gameName: sanitizedGameName,
                players: sanitizedPlayers,
            };
            if (userId) {
                const game = datasources_1.dataSources.gameService.createGame(gameObj, userId);
                return datasources_1.dataSources.gameService.getGame(game.id);
            }
            throw new apollo_server_1.ValidationError(`Unauthenticated user request`);
        }),
        joinGame(parent, args, context) {
            const { gameId } = args;
            const userId = context && context.userData && context.userData.data && context.userData.data.username;
            const game = datasources_1.dataSources.gameService.getGame(gameId);
            if (!userId) {
                console.log('Unauthenticated user request');
                throw new apollo_server_1.ValidationError(`Unauthenticated user request`);
            }
            if (!game) {
                console.log('GameID not found');
                throw new apollo_server_1.ValidationError(`GameID not found`);
            }
            const index = game.users.indexOf(userId);
            const userIdMatches = game.users[index] === userId;
            console.log('game.users', game.users);
            console.log('index', index);
            console.log('userIdMatches', userIdMatches);
            if (!userIdMatches) {
                const gameUpdated = Object.assign({}, game, { users: [...game.users, userId] });
                datasources_1.dataSources.gameService.updateGame(gameUpdated);
            }
            return datasources_1.dataSources.gameService.getGame(gameId);
        },
        startGame(parent, args, context) {
            const { gameId } = args;
            const userId = context.userData && context.userData.data && context.userData.data.username;
            const game = datasources_1.dataSources.gameService.getGame(gameId);
            if (!userId) {
                throw new apollo_server_1.ValidationError(`Unauthenticated user request`);
            }
            if (!game) {
                throw new apollo_server_1.ValidationError(`GameID not found`);
            }
            const index = game.users.indexOf(userId);
            const userIdMatches = game.users[index] === userId;
            if (userIdMatches) {
                let gameUpdated;
                if (!game.started) {
                    datasources_1.dataSources.gameService.startGame(gameId);
                    gameUpdated = datasources_1.dataSources.gameService.getGame(gameId);
                    pubsub.publish(GAME_UPDATED, { gameUpdated });
                }
                return gameUpdated;
            }
            throw new apollo_server_1.ValidationError(`Unauthenticated user request`);
        },
        updateGame(parent, args, context) {
            const { gameId, playerKey, score } = args;
            const userId = context.userData && context.userData.data && context.userData.data.username;
            const game = datasources_1.dataSources.gameService.getGame(gameId);
            if (!userId) {
                throw new apollo_server_1.ValidationError(`Unauthenticated user request`);
            }
            if (!game) {
                throw new apollo_server_1.ValidationError(`GameID not found`);
            }
            if (!game.started) {
                throw new apollo_server_1.ValidationError(`Game not yet started`);
            }
            if (game.finished) {
                throw new apollo_server_1.ValidationError(`Cannot update a finished game`);
            }
            const index = game.users.indexOf(userId);
            const userIdMatches = game.users[index] === userId;
            if (!userIdMatches) {
                throw new apollo_server_1.ValidationError(`Unauthenticated user request`);
            }
            const playersUpdated = game.players.map(player => {
                if (player.key === playerKey) {
                    return Object.assign({}, player, { score: (player.score || 0) + score });
                }
                return player;
            });
            const gameUpdated = datasources_1.dataSources.gameService.updateGame(Object.assign({}, game, { players: playersUpdated }));
            pubsub.publish(GAME_UPDATED, { gameUpdated });
            return gameUpdated;
        },
    },
};


/***/ }),

/***/ "./src/graphql/resolvers/users.resolvers.ts":
/*!**************************************************!*\
  !*** ./src/graphql/resolvers/users.resolvers.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const datasources_1 = __webpack_require__(/*! ../../datasources */ "./src/datasources/index.ts");
exports.default = {
    Query: {
        user(parent, args, context) {
            const user = context && context.userData && context.userData.data;
            const userId = user && user.username;
            return datasources_1.dataSources.userService.getUser(userId);
        },
        users() {
            return datasources_1.dataSources.userService.getUsers();
        },
    },
};


/***/ }),

/***/ "./src/graphql/typedefs.ts":
/*!*********************************!*\
  !*** ./src/graphql/typedefs.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const merge_graphql_schemas_1 = __webpack_require__(/*! merge-graphql-schemas */ "merge-graphql-schemas");
const game_1 = __importDefault(__webpack_require__(/*! ./typedefs/game */ "./src/graphql/typedefs/game.ts"));
const log_1 = __importDefault(__webpack_require__(/*! ./typedefs/log */ "./src/graphql/typedefs/log.ts"));
const player_1 = __importDefault(__webpack_require__(/*! ./typedefs/player */ "./src/graphql/typedefs/player.ts"));
const users_1 = __importDefault(__webpack_require__(/*! ./typedefs/users */ "./src/graphql/typedefs/users.ts"));
const types = [game_1.default, log_1.default, player_1.default, users_1.default];
// NOTE: 2nd param is optional, and defaults to false
// Only use if you have defined the same type multiple times in
// different files and wish to attempt merging them together.
exports.typeDefs = merge_graphql_schemas_1.mergeTypes(types, { all: true });


/***/ }),

/***/ "./src/graphql/typedefs/game.ts":
/*!**************************************!*\
  !*** ./src/graphql/typedefs/game.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = `
  enum Color {
    red
    green
    blue
    yellow
    black
    gray
  }

  input PlayerInfoInput {
    name: String!
    key: String!
    color: Color!
  }

  type PlayerInfo {
    name: String!
    key: String!
    color: Color!
    score: Int
  }


  type Game {
    id: ID!
    name: String!
    players: [PlayerInfo]!
    users: [String!]
    started: Boolean!
    finished: Boolean!
    # log: Log
  }

  type Mutation {
    newGame(gameName: String! players: [PlayerInfoInput!]!): Game
    startGame(gameId: String!): Game
    joinGame(gameId: String!): Game
    updateGame(gameId: String, playerKey: String, score: Int): Game
  }

  type Query {
    games: [Game]
    game(gameId: String!): Game
  }

  type Subscription {
    gameCreated: Game
    gameUpdated: Game
  }
`;


/***/ }),

/***/ "./src/graphql/typedefs/log.ts":
/*!*************************************!*\
  !*** ./src/graphql/typedefs/log.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = `
  type Log {
    playerId: ID!
    timestamp: Int!
    score: Int!
  }
`;


/***/ }),

/***/ "./src/graphql/typedefs/player.ts":
/*!****************************************!*\
  !*** ./src/graphql/typedefs/player.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = `
  type Player {
    id: ID!
    name: String!
    color: Color!
    totalScore: Int
  }

  enum Color {
    RED
    BLUE
    GREEN
    YELLOW
    PURPLE
    BLACK
    GREY
  }
`;


/***/ }),

/***/ "./src/graphql/typedefs/users.ts":
/*!***************************************!*\
  !*** ./src/graphql/typedefs/users.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = `
  type User {
    id: ID!
    games: [String!]
  }

  type Query {
    users: [User!]
    user: User
  }
`;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __webpack_require__(/*! ./server */ "./src/server.ts");
const config_1 = __webpack_require__(/*! ./config */ "./src/config.ts");
const app_1 = __webpack_require__(/*! ./app */ "./src/app.ts");
const port = config_1.config.getPort();
const httpServer = server_1.server.init(app_1.app.appInstance, port);
app_1.app.getApolloServer().then((apolloServer) => {
    apolloServer.installSubscriptionHandlers(httpServer);
    server_1.server.start(apolloServer);
});


/***/ }),

/***/ "./src/router.ts":
/*!***********************!*\
  !*** ./src/router.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(__webpack_require__(/*! express */ "express"));
const controllers_1 = __webpack_require__(/*! ./controllers */ "./src/controllers/index.ts");
const check_1 = __webpack_require__(/*! express-validator/check */ "express-validator/check");
class MainRoutes {
    constructor() {
        this.router = express.Router();
        this.config();
    }
    config() {
        this.router.get('/', (req, res) => controllers_1.mainController.root(req, res));
        this.router.get('/status', (req, res) => controllers_1.mainController.status(req, res));
        this.router.post('/register', [check_1.check('username').isEmail(), check_1.check('password').isLength({ min: 6 })], (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { username, password } = req.body;
            const errors = check_1.validationResult(req);
            if (!errors.isEmpty()) {
                console.log('validationResult', errors.array());
                return res.sendStatus(403);
            }
            const status = yield controllers_1.adminController.register(username, password);
            res.sendStatus(status);
        }));
        this.router.post('/confirm-code', [
            check_1.check('username').isEmail(),
            check_1.check('code')
                .isNumeric()
                .isLength({ min: 6, max: 6 }),
        ], (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { username, code } = req.body;
            const errors = check_1.validationResult(req);
            if (!errors.isEmpty()) {
                console.log('validationResult', errors.array());
                return res.sendStatus(403);
            }
            const status = yield controllers_1.adminController.confirmCode(username, code);
            res.sendStatus(status);
        }));
        this.router.post('/new-confirm-code', [check_1.check('username').isEmail()], (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { username } = req.body;
            const errors = check_1.validationResult(req);
            if (!errors.isEmpty()) {
                console.log('validationResult', errors.array());
                return res.sendStatus(403);
            }
            const status = yield controllers_1.adminController.newConfirmCode(username);
            res.sendStatus(status);
        }));
        this.router.post('/login', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { username, password } = req.body;
            const userDetails = yield controllers_1.adminController.login(username, password);
            return res.status(userDetails.status).send(userDetails);
        }));
        this.router.post('/verify-user', (req, res) => __awaiter(this, void 0, void 0, function* () {
            let userStatus;
            const { token } = req.body;
            try {
                userStatus = yield controllers_1.adminController.ValidateToken(token);
            }
            catch (err) {
                console.log(err);
                return res.sendStatus(401);
            }
            console.log(userStatus);
            return res.sendStatus(200);
            // return res.status(userStatus.status).send(userStatus);
        }));
        this.router.get('/user', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { username } = req.body;
            const userData = yield controllers_1.adminController.getUser(username);
            // console.log('userData', userData);
            return res.status(200).send(userData);
        }));
    }
}
exports.router = new MainRoutes().router;


/***/ }),

/***/ "./src/server.ts":
/*!***********************!*\
  !*** ./src/server.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(__webpack_require__(/*! http */ "http"));
class Server {
    init(expressApp, portNumber) {
        if (this.serverInstance) {
            console.error(`The server is already running on port ${this.portNumber}`);
            return this.serverInstance;
        }
        this.portNumber = portNumber;
        this.serverInstance = http_1.default.createServer(expressApp);
        return this.serverInstance;
    }
    start(apolloServerApp) {
        if (!this.serverInstance) {
            console.error(`No server has been initialized`);
            return;
        }
        this.serverInstance.listen(this.portNumber, () => {
            const addressInfo = this.serverInstance && this.serverInstance.address();
            const port = 'port' in addressInfo ? addressInfo.port : null;
            const address = 'address' in addressInfo
                ? addressInfo.address === '::'
                    ? 'http://localhost:'
                    : addressInfo.address
                : '';
            console.log(`🚀  Server listening on ${address}${port}`);
            console.log(`🚀  GraphQL playground listening on ${address}${port}${apolloServerApp.graphqlPath}`);
            console.log(`🚀  Subscriptions ready at ws://localhost:${port}${apolloServerApp.subscriptionsPath}`);
        });
    }
}
exports.server = new Server();


/***/ }),

/***/ 0:
/*!****************************!*\
  !*** multi ./src/index.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/azornada/sonny/carcassonne-scoreboard-app/packages/carcassonne-scoreboard-app-server/src/index.ts */"./src/index.ts");


/***/ }),

/***/ "amazon-cognito-identity-js":
/*!*********************************************!*\
  !*** external "amazon-cognito-identity-js" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("amazon-cognito-identity-js");

/***/ }),

/***/ "apollo-datasource":
/*!************************************!*\
  !*** external "apollo-datasource" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("apollo-datasource");

/***/ }),

/***/ "apollo-server":
/*!********************************!*\
  !*** external "apollo-server" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("apollo-server");

/***/ }),

/***/ "apollo-server-express":
/*!****************************************!*\
  !*** external "apollo-server-express" ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("apollo-server-express");

/***/ }),

/***/ "aws-sdk":
/*!**************************!*\
  !*** external "aws-sdk" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("aws-sdk");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("cors");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ "express-validator/check":
/*!******************************************!*\
  !*** external "express-validator/check" ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express-validator/check");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ "jwk-to-pem":
/*!*****************************!*\
  !*** external "jwk-to-pem" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("jwk-to-pem");

/***/ }),

/***/ "lodash/get":
/*!*****************************!*\
  !*** external "lodash/get" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("lodash/get");

/***/ }),

/***/ "merge-graphql-schemas":
/*!****************************************!*\
  !*** external "merge-graphql-schemas" ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("merge-graphql-schemas");

/***/ }),

/***/ "morgan":
/*!*************************!*\
  !*** external "morgan" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("morgan");

/***/ }),

/***/ "unique-names-generator":
/*!*****************************************!*\
  !*** external "unique-names-generator" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("unique-names-generator");

/***/ }),

/***/ "uuid":
/*!***********************!*\
  !*** external "uuid" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("uuid");

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29uZmlnLnRzIiwid2VicGFjazovLy8uL3NyYy9jb250cm9sbGVycy9hZG1pbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29udHJvbGxlcnMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRyb2xsZXJzL21haW4udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RhdGFzb3VyY2VzL2dhbWUuZGF0YS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZGF0YXNvdXJjZXMvZ2FtZS5zZXJ2aWNlLnRzIiwid2VicGFjazovLy8uL3NyYy9kYXRhc291cmNlcy9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZGF0YXNvdXJjZXMvdXNlci5kYXRhLnRzIiwid2VicGFjazovLy8uL3NyYy9kYXRhc291cmNlcy91c2VyLnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dyYXBocWwvcmVzb2x2ZXJzLnRzIiwid2VicGFjazovLy8uL3NyYy9ncmFwaHFsL3Jlc29sdmVycy9nYW1lLnJlc29sdmVycy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZ3JhcGhxbC9yZXNvbHZlcnMvdXNlcnMucmVzb2x2ZXJzLnRzIiwid2VicGFjazovLy8uL3NyYy9ncmFwaHFsL3R5cGVkZWZzLnRzIiwid2VicGFjazovLy8uL3NyYy9ncmFwaHFsL3R5cGVkZWZzL2dhbWUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dyYXBocWwvdHlwZWRlZnMvbG9nLnRzIiwid2VicGFjazovLy8uL3NyYy9ncmFwaHFsL3R5cGVkZWZzL3BsYXllci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZ3JhcGhxbC90eXBlZGVmcy91c2Vycy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JvdXRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcImFtYXpvbi1jb2duaXRvLWlkZW50aXR5LWpzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYXBvbGxvLWRhdGFzb3VyY2VcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJhcG9sbG8tc2VydmVyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYXBvbGxvLXNlcnZlci1leHByZXNzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYXdzLXNka1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImF4aW9zXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYm9keS1wYXJzZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJjb3JzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZG90ZW52XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZXhwcmVzc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImV4cHJlc3MtdmFsaWRhdG9yL2NoZWNrXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiaHR0cFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImpzb253ZWJ0b2tlblwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImp3ay10by1wZW1cIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJsb2Rhc2gvZ2V0XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibWVyZ2UtZ3JhcGhxbC1zY2hlbWFzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibW9yZ2FuXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidW5pcXVlLW5hbWVzLWdlbmVyYXRvclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInV1aWRcIiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7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LG1CQUFtQixXQUFXO0FBQzlCO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUMxRmE7QUFDYjtBQUNBLDRDQUE0QztBQUM1QztBQUNBLDhDQUE4QyxjQUFjO0FBQzVELCtCQUErQixtQkFBTyxDQUFDLGtCQUFNO0FBQzdDO0FBQ0E7QUFDQTtBQUNBLG1FQUFtRSxnQkFBZ0I7QUFDbkY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtREFBbUQsUUFBUSxFQUFFLEtBQUs7QUFDbEUsK0RBQStELFFBQVEsRUFBRSxLQUFLLEVBQUUsNEJBQTRCO0FBQzVHLHFFQUFxRSxLQUFLLEVBQUUsa0NBQWtDO0FBQzlHLFNBQVM7QUFDVDtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ25DQSx1RDs7Ozs7Ozs7Ozs7QUNBQSw4Qzs7Ozs7Ozs7Ozs7QUNBQSwwQzs7Ozs7Ozs7Ozs7QUNBQSxrRDs7Ozs7Ozs7Ozs7QUNBQSxvQzs7Ozs7Ozs7Ozs7QUNBQSxrQzs7Ozs7Ozs7Ozs7QUNBQSx3Qzs7Ozs7Ozs7Ozs7QUNBQSxpQzs7Ozs7Ozs7Ozs7QUNBQSxtQzs7Ozs7Ozs7Ozs7QUNBQSxvQzs7Ozs7Ozs7Ozs7QUNBQSxvRDs7Ozs7Ozs7Ozs7QUNBQSxpQzs7Ozs7Ozs7Ozs7QUNBQSx5Qzs7Ozs7Ozs7Ozs7QUNBQSx1Qzs7Ozs7Ozs7Ozs7QUNBQSx1Qzs7Ozs7Ozs7Ozs7QUNBQSxrRDs7Ozs7Ozs7Ozs7QUNBQSxtQzs7Ozs7Ozs7Ozs7QUNBQSxtRDs7Ozs7Ozs7Ozs7QUNBQSxpQyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG52YXIgX19pbXBvcnRTdGFyID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydFN0YXIpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xuICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgcmVzdWx0W2tdID0gbW9kW2tdO1xuICAgIHJlc3VsdFtcImRlZmF1bHRcIl0gPSBtb2Q7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBleHByZXNzXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcImV4cHJlc3NcIikpO1xuY29uc3QgYXBvbGxvX3NlcnZlcl9leHByZXNzXzEgPSByZXF1aXJlKFwiYXBvbGxvLXNlcnZlci1leHByZXNzXCIpO1xuY29uc3QgbW9yZ2FuXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIm1vcmdhblwiKSk7XG5jb25zdCBjb3JzXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcImNvcnNcIikpO1xuY29uc3QgYm9keVBhcnNlciA9IF9faW1wb3J0U3RhcihyZXF1aXJlKFwiYm9keS1wYXJzZXJcIikpO1xuY29uc3QgYWRtaW5fMSA9IHJlcXVpcmUoXCIuL2NvbnRyb2xsZXJzL2FkbWluXCIpO1xuY29uc3QgY29uZmlnXzEgPSByZXF1aXJlKFwiLi9jb25maWdcIik7XG5jb25zdCB0eXBlZGVmc18xID0gcmVxdWlyZShcIi4vZ3JhcGhxbC90eXBlZGVmc1wiKTtcbmNvbnN0IHJlc29sdmVyc18xID0gcmVxdWlyZShcIi4vZ3JhcGhxbC9yZXNvbHZlcnNcIik7XG5jb25zdCByb3V0ZXJfMSA9IHJlcXVpcmUoXCIuL3JvdXRlclwiKTtcbmNsYXNzIEFwcCB7XG4gICAgY29uc3RydWN0b3IoYXBwQ29uZmlnKSB7XG4gICAgICAgIHRoaXMuYXBwSW5zdGFuY2UgPSBleHByZXNzXzEuZGVmYXVsdCgpO1xuICAgICAgICB0aGlzLmFkbWluID0gYWRtaW5fMS5hZG1pbkNvbnRyb2xsZXI7XG4gICAgICAgIHRoaXMuYXBwQ29uZmlnID0gYXBwQ29uZmlnO1xuICAgIH1cbiAgICBnZXRBcG9sbG9TZXJ2ZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZygpO1xuICAgIH1cbiAgICBjb25maWcoKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICB0aGlzLmFwcEluc3RhbmNlLnVzZShtb3JnYW5fMS5kZWZhdWx0KCdkZXYnKSk7XG4gICAgICAgICAgICB0aGlzLmFwcEluc3RhbmNlLmRpc2FibGUoJ3gtcG93ZXJlZC1ieScpO1xuICAgICAgICAgICAgdGhpcy5hcHBJbnN0YW5jZS51c2UoY29yc18xLmRlZmF1bHQoKSk7XG4gICAgICAgICAgICAvLyBTdXBwb3J0IGFwcGxpY2F0aW9uL2pzb24gdHlwZSBwb3N0IGRhdGFcbiAgICAgICAgICAgIHRoaXMuYXBwSW5zdGFuY2UudXNlKGJvZHlQYXJzZXIuanNvbigpKTtcbiAgICAgICAgICAgIC8vIFN1cHBvcnQgYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkIHBvc3QgZGF0YVxuICAgICAgICAgICAgdGhpcy5hcHBJbnN0YW5jZS51c2UoYm9keVBhcnNlci51cmxlbmNvZGVkKHsgZXh0ZW5kZWQ6IGZhbHNlIH0pKTtcbiAgICAgICAgICAgIHRoaXMuYXBwSW5zdGFuY2UudXNlKCcvJywgcm91dGVyXzEucm91dGVyKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmFwcGx5TWlkZGxld2FyZXModGhpcy5hcHBJbnN0YW5jZSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBhcHBseU1pZGRsZXdhcmVzKGV4cHJlc3NBcHApIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIGNvbnN0IGFwb2xsb1NlcnZlciA9IHlpZWxkIG5ldyBhcG9sbG9fc2VydmVyX2V4cHJlc3NfMS5BcG9sbG9TZXJ2ZXIoe1xuICAgICAgICAgICAgICAgIGNvbnRleHQ6ICh7IHJlcSB9KSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghcmVxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy8gQWxsb3cgR3JhcGhRTCBwbGF5Z3JvdW5kIGluIGRldmVsb3BtZW50IG1vZGVcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgb3JpZ2luVXJsID0gYGxvY2FsaG9zdDoke3RoaXMuYXBwQ29uZmlnLmdldFBvcnQoKX0ke3JlcS5iYXNlVXJsfWA7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlZyA9IG5ldyBSZWdFeHAoYCR7b3JpZ2luVXJsfSRgLCAnZ2knKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaXNQbGF5Z3JvdW5kID0gcmVnLnRlc3QoU3RyaW5nKHJlcS5oZWFkZXJzLnJlZmVyZXIpKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYXBwQ29uZmlnLmlzRGV2KCkgJiYgaXNQbGF5Z3JvdW5kKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJEYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJuYW1lOiAnZGVhOWFkYmEtNGVmMy00Njg3LWFjN2ItNTlhNTNmZmFmYzViJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjb25zdCBhdXRob3JpemF0aW9uID0gU3RyaW5nKHJlcS5oZWFkZXJzLmF1dGhvcml6YXRpb24pIHx8ICcnO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0b2tlbiA9IGF1dGhvcml6YXRpb24ucmVwbGFjZSgnQmVhcmVyICcsICcnKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHVzZXJEYXRhO1xuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdXNlckRhdGEgPSB5aWVsZCB0aGlzLmFkbWluLlZhbGlkYXRlVG9rZW4odG9rZW4pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdFcnJvcjonLCBlcnIubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgYXBvbGxvX3NlcnZlcl9leHByZXNzXzEuQXV0aGVudGljYXRpb25FcnJvcigneW91IG11c3QgYmUgbG9nZ2VkIGluJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ3VzZXJEYXRhJywgdXNlckRhdGEpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyB1c2VyRGF0YSB9O1xuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIHR5cGVEZWZzOiBhcG9sbG9fc2VydmVyX2V4cHJlc3NfMS5ncWwgYFxuICAgICAgICAke3R5cGVkZWZzXzEudHlwZURlZnN9XG4gICAgICBgLFxuICAgICAgICAgICAgICAgIHJlc29sdmVyczogcmVzb2x2ZXJzXzEucmVzb2x2ZXJzLFxuICAgICAgICAgICAgICAgIHBsYXlncm91bmQ6IHRoaXMuYXBwQ29uZmlnLmlzRGV2KCksXG4gICAgICAgICAgICAgICAgc3Vic2NyaXB0aW9uczoge1xuICAgICAgICAgICAgICAgICAgICBvbkNvbm5lY3Q6ICgpID0+IGNvbnNvbGUubG9nKCdDb25uZWN0ZWQgdG8gd2Vic29ja2V0JyksXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB0cmFjaW5nOiB0cnVlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB5aWVsZCBhcG9sbG9TZXJ2ZXIuYXBwbHlNaWRkbGV3YXJlKHtcbiAgICAgICAgICAgICAgICBhcHA6IGV4cHJlc3NBcHAsXG4gICAgICAgICAgICAgICAgcGF0aDogJy9ncmFwaHFsJyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIGFwb2xsb1NlcnZlcjtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuZXhwb3J0cy5hcHAgPSBuZXcgQXBwKGNvbmZpZ18xLmNvbmZpZyk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGRvdGVudl8xID0gcmVxdWlyZShcImRvdGVudlwiKTtcbmNsYXNzIENvbmZpZyB7XG4gICAgc3RhdGljIGdldEluc3RhbmNlKCkge1xuICAgICAgICBpZiAoIUNvbmZpZy5pbnN0YW5jZSkge1xuICAgICAgICAgICAgQ29uZmlnLmluc3RhbmNlID0gbmV3IENvbmZpZygpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBDb25maWcuaW5zdGFuY2U7XG4gICAgfVxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmVudk5hbWUgPSBwcm9jZXNzLmVudi5OT0RFX0VOViB8fCAnZGV2ZWxvcG1lbnQnO1xuICAgICAgICB0aGlzLnBvcnQgPSBwcm9jZXNzLmVudi5QT1JUIHx8ICc4ODg4JztcbiAgICAgICAgZG90ZW52XzEuY29uZmlnKCk7XG4gICAgfVxuICAgIGdldEVudigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZW52TmFtZTtcbiAgICB9XG4gICAgZ2V0UG9ydCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucG9ydDtcbiAgICB9XG4gICAgaXNEZXYoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVudk5hbWUgPT09ICdkZXZlbG9wbWVudCc7XG4gICAgfVxuICAgIGlzRGVidWcoKSB7XG4gICAgICAgIHJldHVybiBwcm9jZXNzLmVudi5ERUJVRyA9PT0gJ3RydWUnO1xuICAgIH1cbiAgICBnZXQocHJvcE5hbWUpIHtcbiAgICAgICAgaWYgKHByb3BOYW1lID09PSAnTk9ERV9FTlYnKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRFbnYoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvcE5hbWUgPT09ICdQT1JUJykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UG9ydCgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwcm9jZXNzLmVudltwcm9wTmFtZV07XG4gICAgfVxufVxuZXhwb3J0cy5jb25maWcgPSBDb25maWcuZ2V0SW5zdGFuY2UoKTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBhbWF6b25fY29nbml0b19pZGVudGl0eV9qc18xID0gcmVxdWlyZShcImFtYXpvbi1jb2duaXRvLWlkZW50aXR5LWpzXCIpO1xuY29uc3QgYXhpb3NfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiYXhpb3NcIikpO1xuY29uc3QgandrX3RvX3BlbV8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJqd2stdG8tcGVtXCIpKTtcbmNvbnN0IGpzb253ZWJ0b2tlbl8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJqc29ud2VidG9rZW5cIikpO1xuY29uc3QgYXdzX3Nka18xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJhd3Mtc2RrXCIpKTtcbmNvbnN0IGNvbmZpZ18xID0gcmVxdWlyZShcIi4uL2NvbmZpZ1wiKTtcbmNsYXNzIEFkbWluQ29udHJvbGxlciB7XG4gICAgY29uc3RydWN0b3IoYXBwQ29uZmlnKSB7XG4gICAgICAgIHRoaXMucG9vbFJlZ2lvbiA9IGFwcENvbmZpZy5nZXQoJ0FQUF9SRUdJT04nKSB8fCAnJztcbiAgICAgICAgY29uc3QgcG9vbElkID0gYXBwQ29uZmlnLmdldCgnQVBQX1VTRVJfUE9PTF9JRCcpIHx8ICcnO1xuICAgICAgICBjb25zdCBDbGllbnRJZCA9IGFwcENvbmZpZy5nZXQoJ0FQUF9BUFBfQ0xJRU5UX0lEJykgfHwgJyc7XG4gICAgICAgIGNvbnN0IHBvb2xEYXRhID0ge1xuICAgICAgICAgICAgVXNlclBvb2xJZDogcG9vbElkLFxuICAgICAgICAgICAgQ2xpZW50SWQsXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMudXNlclBvb2wgPSBuZXcgYW1hem9uX2NvZ25pdG9faWRlbnRpdHlfanNfMS5Db2duaXRvVXNlclBvb2wocG9vbERhdGEpO1xuICAgIH1cbiAgICByZWdpc3Rlcih1c2VybmFtZSwgcGFzc3dvcmQpIHtcbiAgICAgICAgY29uc3QgYXR0cmlidXRlTGlzdCA9IFtcbiAgICAgICAgICAgIG5ldyBhbWF6b25fY29nbml0b19pZGVudGl0eV9qc18xLkNvZ25pdG9Vc2VyQXR0cmlidXRlKHtcbiAgICAgICAgICAgICAgICBOYW1lOiAnZW1haWwnLFxuICAgICAgICAgICAgICAgIFZhbHVlOiB1c2VybmFtZSxcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgbmV3IGFtYXpvbl9jb2duaXRvX2lkZW50aXR5X2pzXzEuQ29nbml0b1VzZXJBdHRyaWJ1dGUoe1xuICAgICAgICAgICAgICAgIE5hbWU6ICduaWNrbmFtZScsXG4gICAgICAgICAgICAgICAgVmFsdWU6ICdhbmRyZWFzb25ueTgzJyxcbiAgICAgICAgICAgIH0pLFxuICAgICAgICBdO1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UocmVzID0+IHtcbiAgICAgICAgICAgIHRoaXMudXNlclBvb2wuc2lnblVwKHVzZXJuYW1lLCBwYXNzd29yZCwgYXR0cmlidXRlTGlzdCwgW10sIChlcnIsIHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcyg0MDMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBjb2duaXRvVXNlciA9IHJlc3VsdC51c2VyO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCd1c2VyIG5hbWUgaXMgJyArIGNvZ25pdG9Vc2VyLmdldFVzZXJuYW1lKCkpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdyZXN1bHQgaXM6JywgcmVzdWx0KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzKDIwMSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGNvbmZpcm1Db2RlKHVzZXJuYW1lLCBjb2RlKSB7XG4gICAgICAgIGNvbnN0IHVzZXJEYXRhID0ge1xuICAgICAgICAgICAgVXNlcm5hbWU6IHVzZXJuYW1lLFxuICAgICAgICAgICAgUG9vbDogdGhpcy51c2VyUG9vbCxcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgY29nbml0b1VzZXIgPSBuZXcgYW1hem9uX2NvZ25pdG9faWRlbnRpdHlfanNfMS5Db2duaXRvVXNlcih1c2VyRGF0YSk7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXMgPT4ge1xuICAgICAgICAgICAgY29nbml0b1VzZXIuY29uZmlybVJlZ2lzdHJhdGlvbihjb2RlLCB0cnVlLCAoZXJyLCByZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXMoNDAwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2NhbGwgcmVzdWx0OiAnICsgcmVzdWx0KTtcbiAgICAgICAgICAgICAgICByZXMoMjAwKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgbmV3Q29uZmlybUNvZGUodXNlcm5hbWUpIHtcbiAgICAgICAgY29uc3QgdXNlckRhdGEgPSB7XG4gICAgICAgICAgICBVc2VybmFtZTogdXNlcm5hbWUsXG4gICAgICAgICAgICBQb29sOiB0aGlzLnVzZXJQb29sLFxuICAgICAgICB9O1xuICAgICAgICBjb25zdCBjb2duaXRvVXNlciA9IG5ldyBhbWF6b25fY29nbml0b19pZGVudGl0eV9qc18xLkNvZ25pdG9Vc2VyKHVzZXJEYXRhKTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlcyA9PiB7XG4gICAgICAgICAgICBjb2duaXRvVXNlci5yZXNlbmRDb25maXJtYXRpb25Db2RlKChlcnIsIHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcyg0MDApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgICAgICAgICAgICAgIHJlcygyMDApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBsb2dpbih1c2VybmFtZSwgcGFzc3dvcmQpIHtcbiAgICAgICAgY29uc3QgYXV0aGVudGljYXRpb25EYXRhID0ge1xuICAgICAgICAgICAgVXNlcm5hbWU6IHVzZXJuYW1lLFxuICAgICAgICAgICAgUGFzc3dvcmQ6IHBhc3N3b3JkLFxuICAgICAgICB9O1xuICAgICAgICBjb25zdCBhdXRoZW50aWNhdGlvbkRldGFpbHMgPSBuZXcgYW1hem9uX2NvZ25pdG9faWRlbnRpdHlfanNfMS5BdXRoZW50aWNhdGlvbkRldGFpbHMoYXV0aGVudGljYXRpb25EYXRhKTtcbiAgICAgICAgY29uc3QgdXNlckRhdGEgPSB7XG4gICAgICAgICAgICBVc2VybmFtZTogdXNlcm5hbWUsXG4gICAgICAgICAgICBQb29sOiB0aGlzLnVzZXJQb29sLFxuICAgICAgICB9O1xuICAgICAgICBjb25zdCBjb2duaXRvVXNlciA9IG5ldyBhbWF6b25fY29nbml0b19pZGVudGl0eV9qc18xLkNvZ25pdG9Vc2VyKHVzZXJEYXRhKTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlcyA9PiB7XG4gICAgICAgICAgICBjb2duaXRvVXNlci5hdXRoZW50aWNhdGVVc2VyKGF1dGhlbnRpY2F0aW9uRGV0YWlscywge1xuICAgICAgICAgICAgICAgIG9uU3VjY2VzczogKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBhY2Nlc3NUb2tlbiA9IHJlc3VsdC5nZXRBY2Nlc3NUb2tlbigpLmdldEp3dFRva2VuKCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGlkVG9rZW4gPSByZXN1bHQuZ2V0SWRUb2tlbigpLmdldEp3dFRva2VuKCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlZnJlc2hUb2tlbiA9IHJlc3VsdC5nZXRSZWZyZXNoVG9rZW4oKS5nZXRUb2tlbigpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzKHsgc3RhdHVzOiAyMDAsIGRhdGE6IHsgYWNjZXNzVG9rZW4sIGlkVG9rZW4sIHJlZnJlc2hUb2tlbiB9IH0pO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb25GYWlsdXJlOiAoZXJyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnIgJiYgZXJyLmNvZGUgPT09ICdVc2VyTm90Q29uZmlybWVkRXhjZXB0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcyh7IHN0YXR1czogMjIzLCBlcnJvcjogdHJ1ZSB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzKHsgc3RhdHVzOiA0MDEsIGVycm9yOiB0cnVlIH0pO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFZhbGlkYXRlVG9rZW4odG9rZW4pIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIGNvbnN0IHVybCA9IGBodHRwczovL2NvZ25pdG8taWRwLiR7dGhpcy5wb29sUmVnaW9ufS5hbWF6b25hd3MuY29tLyR7dGhpcy51c2VyUG9vbC5nZXRVc2VyUG9vbElkKCl9Ly53ZWxsLWtub3duL2p3a3MuanNvbmA7XG4gICAgICAgICAgICBsZXQgcmVzcG9uc2U7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlID0geWllbGQgYXhpb3NfMS5kZWZhdWx0LmdldCh1cmwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignU29tZXRoaW5nIHdlbnQgd3Jvbmcgd2hpbGUgdmVyaWZ5aW5nIHRoZSBKV1QnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghKHJlc3BvbnNlICYmIHJlc3BvbnNlLnN0YXR1cyA9PT0gMjAwICYmIHJlc3BvbnNlLmRhdGEpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFcnJvciEgVW5hYmxlIHRvIGRvd25sb2FkIEpXS3MnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGJvZHkgPSByZXNwb25zZS5kYXRhO1xuICAgICAgICAgICAgY29uc3QgcGVtcyA9IHt9O1xuICAgICAgICAgICAgY29uc3Qga2V5cyA9IGJvZHkua2V5cztcbiAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IG9mIGtleXMpIHtcbiAgICAgICAgICAgICAgICAvLyBDb252ZXJ0IGVhY2gga2V5IHRvIFBFTVxuICAgICAgICAgICAgICAgIGNvbnN0IGtleUlkID0ga2V5LmtpZDtcbiAgICAgICAgICAgICAgICBjb25zdCBtb2R1bHVzID0ga2V5Lm47XG4gICAgICAgICAgICAgICAgY29uc3QgZXhwb25lbnQgPSBrZXkuZTtcbiAgICAgICAgICAgICAgICBjb25zdCBrZXlUeXBlID0ga2V5Lmt0eTtcbiAgICAgICAgICAgICAgICBjb25zdCBqd2sgPSB7IGt0eToga2V5VHlwZSwgbjogbW9kdWx1cywgZTogZXhwb25lbnQgfTtcbiAgICAgICAgICAgICAgICBjb25zdCBjdXJyUGVtID0gandrX3RvX3BlbV8xLmRlZmF1bHQoandrKTtcbiAgICAgICAgICAgICAgICBwZW1zW2tleUlkXSA9IGN1cnJQZW07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyB2YWxpZGF0ZSB0aGUgdG9rZW5cbiAgICAgICAgICAgIGNvbnN0IGRlY29kZWRKd3QgPSBqc29ud2VidG9rZW5fMS5kZWZhdWx0LmRlY29kZSh0b2tlbiwgeyBjb21wbGV0ZTogdHJ1ZSB9KTtcbiAgICAgICAgICAgIGlmICghZGVjb2RlZEp3dCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTm90IGEgdmFsaWQgSldUIHRva2VuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBqd3RIZWFkZXIgPSBkZWNvZGVkSnd0ICYmIGRlY29kZWRKd3QuaGVhZGVyO1xuICAgICAgICAgICAgY29uc3Qga2lkID0gand0SGVhZGVyLmtpZDtcbiAgICAgICAgICAgIGNvbnN0IHBlbSA9IHBlbXNba2lkXTtcbiAgICAgICAgICAgIGlmICghcGVtKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHRva2VuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgIGpzb253ZWJ0b2tlbl8xLmRlZmF1bHQudmVyaWZ5KHRva2VuLCBwZW0sIChlcnIsIHBheWxvYWQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIFRva2VuLicpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1ZhbGlkIFRva2VuLicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcyh7IHN0YXR1czogMjAwLCBkYXRhOiBwYXlsb2FkIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGdldFVzZXIodXNlcm5hbWUpIHtcbiAgICAgICAgY29uc3QgdXNlckRhdGEgPSB7XG4gICAgICAgICAgICBVc2VybmFtZTogdXNlcm5hbWUsXG4gICAgICAgICAgICBQb29sOiB0aGlzLnVzZXJQb29sLFxuICAgICAgICB9O1xuICAgICAgICBjb25zdCBjb2duaXRvVXNlciA9IG5ldyBhbWF6b25fY29nbml0b19pZGVudGl0eV9qc18xLkNvZ25pdG9Vc2VyKHVzZXJEYXRhKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ3VzZXJkYXRhJywgdXNlckRhdGEpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhjb2duaXRvVXNlcik7XG4gICAgICAgIHJldHVybjtcbiAgICAgICAgaWYgKGNvZ25pdG9Vc2VyICE9PSBudWxsKSB7XG4gICAgICAgICAgICBjb2duaXRvVXNlci5nZXRTZXNzaW9uKChlcnIsIHNlc3Npb24pID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3Nlc3Npb24gdmFsaWRpdHk6ICcgKyBzZXNzaW9uLmlzVmFsaWQoKSk7XG4gICAgICAgICAgICAgICAgYXdzX3Nka18xLmRlZmF1bHQuY29uZmlnLmNyZWRlbnRpYWxzID0gbmV3IGF3c19zZGtfMS5kZWZhdWx0LkNvZ25pdG9JZGVudGl0eUNyZWRlbnRpYWxzKHtcbiAgICAgICAgICAgICAgICAgICAgSWRlbnRpdHlQb29sSWQ6ICcuLi4nLFxuICAgICAgICAgICAgICAgICAgICBMb2dpbnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIENoYW5nZSB0aGUga2V5IGJlbG93IGFjY29yZGluZyB0byB0aGUgc3BlY2lmaWMgcmVnaW9uIHlvdXIgdXNlciBwb29sIGlzIGluLlxuICAgICAgICAgICAgICAgICAgICAgICAgJ2NvZ25pdG8taWRwLjxyZWdpb24+LmFtYXpvbmF3cy5jb20vPFlPVVJfVVNFUl9QT09MX0lEPic6IHNlc3Npb25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0SWRUb2tlbigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldEp3dFRva2VuKCksXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgLy8gSW5zdGFudGlhdGUgYXdzIHNkayBzZXJ2aWNlIG9iamVjdHMgbm93IHRoYXQgdGhlIGNyZWRlbnRpYWxzIGhhdmUgYmVlbiB1cGRhdGVkLlxuICAgICAgICAgICAgICAgIC8vIGV4YW1wbGU6IHZhciBzMyA9IG5ldyBBV1MuUzMoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0cy5hZG1pbkNvbnRyb2xsZXIgPSBuZXcgQWRtaW5Db250cm9sbGVyKGNvbmZpZ18xLmNvbmZpZyk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbmZ1bmN0aW9uIF9fZXhwb3J0KG0pIHtcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmICghZXhwb3J0cy5oYXNPd25Qcm9wZXJ0eShwKSkgZXhwb3J0c1twXSA9IG1bcF07XG59XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5fX2V4cG9ydChyZXF1aXJlKFwiLi9tYWluXCIpKTtcbl9fZXhwb3J0KHJlcXVpcmUoXCIuL2FkbWluXCIpKTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCB1dWlkXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcInV1aWRcIikpO1xuY29uc3QgY29uZmlnXzEgPSByZXF1aXJlKFwiLi4vY29uZmlnXCIpO1xuY2xhc3MgTWFpbkNvbnRyb2xsZXIge1xuICAgIGNvbnN0cnVjdG9yKGNvbmZpZ0luc3RhbmNlKSB7XG4gICAgICAgIHRoaXMuY29uZmlnID0gY29uZmlnSW5zdGFuY2U7XG4gICAgfVxuICAgIHJvb3QocmVxLCByZXMpIHtcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5zZW5kKHtcbiAgICAgICAgICAgIG1lc3NhZ2U6IHRoaXMuY29uZmlnLmdldCgnQVBQX05BTUUnKSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHN0YXR1cyhyZXEsIHJlcykge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5zZW5kKHtcbiAgICAgICAgICAgICAgICBhcHBOYW1lOiB0aGlzLmNvbmZpZy5nZXQoJ0FQUF9OQU1FJyksXG4gICAgICAgICAgICAgICAgZGVidWc6IHRoaXMuY29uZmlnLmlzRGVidWcoKSxcbiAgICAgICAgICAgICAgICBlbnZpcm9ubWVudE5hbWU6IHRoaXMuY29uZmlnLmdldEVudigpLFxuICAgICAgICAgICAgICAgIHN0YXR1czogJ29rJyxcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiB1dWlkXzEuZGVmYXVsdC52NCgpLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbmV4cG9ydHMubWFpbkNvbnRyb2xsZXIgPSBuZXcgTWFpbkNvbnRyb2xsZXIoY29uZmlnXzEuY29uZmlnKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY2xhc3MgR2FtZSB7XG4gICAgY29uc3RydWN0b3IoeyBpZCwgbmFtZSwgc3RhcnRlZCwgZmluaXNoZWQsIHBsYXllcnMsIHVzZXJzLCBsb2cgfSkge1xuICAgICAgICB0aGlzLmlkID0gaWQ7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMuc3RhcnRlZCA9IHN0YXJ0ZWQgfHwgZmFsc2U7XG4gICAgICAgIHRoaXMuZmluaXNoZWQgPSBmaW5pc2hlZCB8fCBmYWxzZTtcbiAgICAgICAgdGhpcy5wbGF5ZXJzID0gcGxheWVycztcbiAgICAgICAgdGhpcy51c2VycyA9IHVzZXJzIHx8IFtdO1xuICAgICAgICB0aGlzLmxvZyA9IGxvZyB8fCBbXTtcbiAgICB9XG59XG5leHBvcnRzLkdhbWUgPSBHYW1lO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBhcG9sbG9fZGF0YXNvdXJjZV8xID0gcmVxdWlyZShcImFwb2xsby1kYXRhc291cmNlXCIpO1xuY29uc3QgdW5pcXVlX25hbWVzX2dlbmVyYXRvcl8xID0gcmVxdWlyZShcInVuaXF1ZS1uYW1lcy1nZW5lcmF0b3JcIik7XG5jb25zdCBnYW1lX2RhdGFfMSA9IHJlcXVpcmUoXCIuL2dhbWUuZGF0YVwiKTtcbmNsYXNzIEdhbWVTZXJ2aWNlIGV4dGVuZHMgYXBvbGxvX2RhdGFzb3VyY2VfMS5EYXRhU291cmNlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5nYW1lcyA9IG5ldyBNYXAoKTtcbiAgICB9XG4gICAgaW5pdGlhbGl6ZSgpIHtcbiAgICAgICAgY29uc29sZS5sb2coJy4uLmluaXRpYWxpemUuLi4nKTtcbiAgICB9XG4gICAgY3JlYXRlR2FtZShnYW1lT2JqZWN0LCB1c2VySWQpIHtcbiAgICAgICAgY29uc3QgZ2FtZUlkID0gbmV3SWQoKTtcbiAgICAgICAgY29uc3QgZ2FtZSA9IHtcbiAgICAgICAgICAgIGlkOiBnYW1lSWQsXG4gICAgICAgICAgICBuYW1lOiBnYW1lT2JqZWN0LmdhbWVOYW1lLFxuICAgICAgICAgICAgcGxheWVyczogZ2FtZU9iamVjdC5wbGF5ZXJzLFxuICAgICAgICAgICAgdXNlcnM6IFt1c2VySWRdLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmdhbWVzLnNldChnYW1lSWQsIG5ldyBnYW1lX2RhdGFfMS5HYW1lKGdhbWUpKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2FtZXMuZ2V0KGdhbWVJZCk7XG4gICAgfVxuICAgIHVwZGF0ZUdhbWUoZ2FtZVVwZGF0ZWQpIHtcbiAgICAgICAgY29uc3QgeyBpZCB9ID0gZ2FtZVVwZGF0ZWQ7XG4gICAgICAgIHRoaXMuZ2FtZXMuc2V0KGlkLCBnYW1lVXBkYXRlZCk7XG4gICAgICAgIHJldHVybiB0aGlzLmdhbWVzLmdldChpZCk7XG4gICAgfVxuICAgIGdldEdhbWUoZ2FtZUlkKSB7XG4gICAgICAgIGlmICghZ2FtZUlkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0EgZ2FtZSBpZCBzaG91bGQgYmUgc3BlY2lmaWVkLicpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmdhbWVzLmdldChnYW1lSWQpO1xuICAgIH1cbiAgICBzdGFydEdhbWUoZ2FtZUlkKSB7XG4gICAgICAgIGlmICghZ2FtZUlkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0EgZ2FtZSBpZCBzaG91bGQgYmUgc3BlY2lmaWVkLicpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGdhbWUgPSB0aGlzLmdhbWVzLmdldChnYW1lSWQpO1xuICAgICAgICBpZiAoZ2FtZSkge1xuICAgICAgICAgICAgaWYgKGdhbWUuc3RhcnRlZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBnYW1lO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGdhbWUgJiYgZ2FtZS5pZCAmJiBnYW1lLm5hbWUpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBnYW1lVXBkYXRlZCA9IE9iamVjdC5hc3NpZ24oe30sIGdhbWUsIHsgc3RhcnRlZDogdHJ1ZSB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWVzLnNldChnYW1lSWQsIGdhbWVVcGRhdGVkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdhbWVzLmdldChnYW1lSWQpO1xuICAgICAgICB9XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBnYW1lJyk7XG4gICAgfVxuICAgIGdldEdhbWVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nYW1lcztcbiAgICB9XG59XG5leHBvcnRzLkdhbWVTZXJ2aWNlID0gR2FtZVNlcnZpY2U7XG4vLyAtLS0tLSBIZWxwZXIgRnVuY3Rpb25zIC0tLS0tXG5mdW5jdGlvbiBuZXdJZCgpIHtcbiAgICByZXR1cm4gdW5pcXVlX25hbWVzX2dlbmVyYXRvcl8xLnVuaXF1ZU5hbWVzR2VuZXJhdG9yKCdfJyk7XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGdhbWVfc2VydmljZV8xID0gcmVxdWlyZShcIi4vZ2FtZS5zZXJ2aWNlXCIpO1xuY29uc3QgdXNlcl9zZXJ2aWNlXzEgPSByZXF1aXJlKFwiLi91c2VyLnNlcnZpY2VcIik7XG4vLyBUT0RPOiBXZSB3aWxsIG5vdCBwYXNzIGRhdGFTb3VyY2VzIHZpYSBjb250ZXh0IGJlY2F1c2UgdGhpcyBkb2VzIG5vdCB3b3JrIHdpdGggc3Vic2NyaXB0aW9uc1xuLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9hcG9sbG9ncmFwaHFsL2Fwb2xsby1zZXJ2ZXIvaXNzdWVzLzE1MjZcbi8vIFNldCB1cCB0aGUgZGF0YVNvdXJjZXMgbmVlZGVkIGJ5IG91ciByZXNvbHZlcnNcbi8vIGV4cG9ydCBjb25zdCBkYXRhU291cmNlcyA9ICgpID0+ICh7XG4vLyAgICAgZ2FtZVNlcnZpY2U6IG5ldyBHYW1lU2VydmljZSgpXG4vLyB9KTtcbmV4cG9ydHMuZGF0YVNvdXJjZXMgPSB7XG4gICAgZ2FtZVNlcnZpY2U6IG5ldyBnYW1lX3NlcnZpY2VfMS5HYW1lU2VydmljZSgpLFxuICAgIHVzZXJTZXJ2aWNlOiBuZXcgdXNlcl9zZXJ2aWNlXzEuVXNlclNlcnZpY2UoKSxcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNsYXNzIFVzZXIge1xuICAgIGNvbnN0cnVjdG9yKHVzZXJJZCkge1xuICAgICAgICB0aGlzLmlkID0gdXNlcklkO1xuICAgICAgICB0aGlzLmdhbWVzID0gW107XG4gICAgfVxufVxuZXhwb3J0cy5Vc2VyID0gVXNlcjtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgYXBvbGxvX2RhdGFzb3VyY2VfMSA9IHJlcXVpcmUoXCJhcG9sbG8tZGF0YXNvdXJjZVwiKTtcbmNvbnN0IHVzZXJfZGF0YV8xID0gcmVxdWlyZShcIi4vdXNlci5kYXRhXCIpO1xuY2xhc3MgVXNlclNlcnZpY2UgZXh0ZW5kcyBhcG9sbG9fZGF0YXNvdXJjZV8xLkRhdGFTb3VyY2Uge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnVzZXJzID0gbmV3IE1hcCgpO1xuICAgIH1cbiAgICBpbml0aWFsaXplKCkge1xuICAgICAgICBjb25zb2xlLmxvZygnLi4uaW5pdGlhbGl6ZS4uLicpO1xuICAgIH1cbiAgICBjcmVhdGVVc2VyKHVzZXJJZCkge1xuICAgICAgICB0aGlzLnVzZXJzLnNldCh1c2VySWQsIG5ldyB1c2VyX2RhdGFfMS5Vc2VyKHVzZXJJZCkpO1xuICAgICAgICByZXR1cm4gdGhpcy51c2Vycy5nZXQodXNlcklkKTtcbiAgICB9XG4gICAgZ2V0VXNlcih1c2VySWQpIHtcbiAgICAgICAgaWYgKCF1c2VySWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQSB1c2VyIGlkIHNob3VsZCBiZSBzcGVjaWZpZWQuJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLnVzZXJzLmdldCh1c2VySWQpKSB7XG4gICAgICAgICAgICB0aGlzLmNyZWF0ZVVzZXIodXNlcklkKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy51c2Vycy5nZXQodXNlcklkKTtcbiAgICB9XG4gICAgZ2V0VXNlcnMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnVzZXJzO1xuICAgIH1cbn1cbmV4cG9ydHMuVXNlclNlcnZpY2UgPSBVc2VyU2VydmljZTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgbWVyZ2VfZ3JhcGhxbF9zY2hlbWFzXzEgPSByZXF1aXJlKFwibWVyZ2UtZ3JhcGhxbC1zY2hlbWFzXCIpO1xuY29uc3QgZ2FtZV9yZXNvbHZlcnNfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9yZXNvbHZlcnMvZ2FtZS5yZXNvbHZlcnNcIikpO1xuY29uc3QgdXNlcnNfcmVzb2x2ZXJzXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vcmVzb2x2ZXJzL3VzZXJzLnJlc29sdmVyc1wiKSk7XG5jb25zdCByZXNvbHZlcnNBcnJheSA9IFtnYW1lX3Jlc29sdmVyc18xLmRlZmF1bHQsIHVzZXJzX3Jlc29sdmVyc18xLmRlZmF1bHRdO1xuZXhwb3J0cy5yZXNvbHZlcnMgPSBtZXJnZV9ncmFwaHFsX3NjaGVtYXNfMS5tZXJnZVJlc29sdmVycyhyZXNvbHZlcnNBcnJheSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgYXBvbGxvX3NlcnZlcl8xID0gcmVxdWlyZShcImFwb2xsby1zZXJ2ZXJcIik7XG5jb25zdCBnZXRfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwibG9kYXNoL2dldFwiKSk7XG5jb25zdCBwdWJzdWIgPSBuZXcgYXBvbGxvX3NlcnZlcl8xLlB1YlN1YigpO1xuY29uc3QgZGF0YXNvdXJjZXNfMSA9IHJlcXVpcmUoXCIuLi8uLi9kYXRhc291cmNlc1wiKTtcbmNvbnN0IHZhbGlkTWVlcGxlQ29sb3IgPSBbJ2dyZWVuJywgJ3JlZCcsICdibHVlJywgJ3llbGxvdycsICdibGFjaycsICdncmF5J107XG5jb25zdCBzYW5pdGl6ZUlucHV0ID0gKGlucHV0KSA9PiBTdHJpbmcoaW5wdXQpXG4gICAgLnJlcGxhY2UoL1teXFx3XFxzXXxcXHN7Mix9L2csICcnKVxuICAgIC50cmltKCk7XG5jb25zdCB2YWxpZGF0ZUNvbG9yID0gKGNvbG9yKSA9PiBCb29sZWFuKH52YWxpZE1lZXBsZUNvbG9yLmluZGV4T2YoY29sb3IpKSAmJiBTdHJpbmcoY29sb3IpO1xuY29uc3QgdmFsaWRhdGVQbGF5ZXIgPSAocGxheWVyTmFtZSkgPT4ge1xuICAgIGNvbnN0IHBsYXllck51bWJlciA9IE51bWJlcihwbGF5ZXJOYW1lLnJlcGxhY2UoL3BsYXllci8sICcnKSk7XG4gICAgaWYgKHBsYXllck51bWJlciA+IDAgJiYgcGxheWVyTnVtYmVyIDwgNykge1xuICAgICAgICByZXR1cm4gYHBsYXllciR7cGxheWVyTnVtYmVyfWA7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn07XG5jb25zdCBHQU1FX1VQREFURUQgPSAnR0FNRV9VUERBVEVEJztcbmV4cG9ydHMuZGVmYXVsdCA9IHtcbiAgICBRdWVyeToge1xuICAgICAgICBnYW1lKHBhcmVudCwgYXJncywgY29udGV4dCkge1xuICAgICAgICAgICAgLy8gaWYgKGNvbnRleHQuYXV0aFNjb3BlICE9PSAnQURNSU4nKSB7XG4gICAgICAgICAgICAvLyAgIHRocm93IG5ldyBBdXRoZW50aWNhdGlvbkVycm9yKCdub3QgYWRtaW4nKTtcbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgIGNvbnN0IHsgZ2FtZUlkIH0gPSBhcmdzO1xuICAgICAgICAgICAgY29uc3QgZ2FtZSA9IGRhdGFzb3VyY2VzXzEuZGF0YVNvdXJjZXMuZ2FtZVNlcnZpY2UuZ2V0R2FtZShnYW1lSWQpO1xuICAgICAgICAgICAgaWYgKGdhbWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZ2FtZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIHRocm93IG5ldyBBcG9sbG9FcnJvcihgR2FtZSAke2FyZ3MuaWR9IGRvZXMgbm90IGV4aXN0YCk7XG4gICAgICAgICAgICB0aHJvdyBuZXcgYXBvbGxvX3NlcnZlcl8xLlZhbGlkYXRpb25FcnJvcihgR2FtZSBJRCBub3QgZm91bmRgKTtcbiAgICAgICAgfSxcbiAgICAgICAgZ2FtZXMoKSB7XG4gICAgICAgICAgICByZXR1cm4gZGF0YXNvdXJjZXNfMS5kYXRhU291cmNlcy5nYW1lU2VydmljZS5nZXRHYW1lcygpO1xuICAgICAgICB9LFxuICAgIH0sXG4gICAgU3Vic2NyaXB0aW9uOiB7XG4gICAgICAgIGdhbWVVcGRhdGVkOiB7XG4gICAgICAgICAgICBzdWJzY3JpYmU6IChyb290LCBhcmdzLCBjb250ZXh0KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3Jvb3QnLCByb290KTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnYXJncycsIGFyZ3MpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjb250ZXh0JywgY29udGV4dCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHB1YnN1Yi5hc3luY0l0ZXJhdG9yKEdBTUVfVVBEQVRFRCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgIH0sXG4gICAgTXV0YXRpb246IHtcbiAgICAgICAgbmV3R2FtZTogKHBhcmVudCwgYXJncywgY29udGV4dCkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgY29uc3QgeyBnYW1lTmFtZSwgcGxheWVycyB9ID0gYXJncztcbiAgICAgICAgICAgIGNvbnN0IHVzZXJJZCA9IGdldF8xLmRlZmF1bHQoY29udGV4dCwgJ3VzZXJEYXRhLmRhdGEudXNlcm5hbWUnKTtcbiAgICAgICAgICAgIGNvbnN0IHNhbml0aXplZEdhbWVOYW1lID0gc2FuaXRpemVJbnB1dChnYW1lTmFtZSk7XG4gICAgICAgICAgICBjb25zdCBzYW5pdGl6ZWRQbGF5ZXJzID0gcGxheWVycy5tYXAoKHBsYXllcikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgbmFtZSwgY29sb3IsIGtleSB9ID0gcGxheWVyO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCduYW1lJywgbmFtZSk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2NvbG9yJywgY29sb3IpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdrZXknLCBrZXkpO1xuICAgICAgICAgICAgICAgIGlmICghKG5hbWUgJiYgY29sb3IgJiYga2V5KSkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgYXBvbGxvX3NlcnZlcl8xLlZhbGlkYXRpb25FcnJvcihgSW52YWxpZCByZXF1ZXN0YCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IG1lZXBsZUNvbG9yID0gdmFsaWRhdGVDb2xvcihjb2xvcik7XG4gICAgICAgICAgICAgICAgY29uc3QgcGxheWVyS2V5ID0gdmFsaWRhdGVQbGF5ZXIoa2V5KTtcbiAgICAgICAgICAgICAgICBpZiAoIShtZWVwbGVDb2xvciAmJiBwbGF5ZXJLZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBhcG9sbG9fc2VydmVyXzEuVmFsaWRhdGlvbkVycm9yKGBJbnZhbGlkIHJlcXVlc3RgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogc2FuaXRpemVJbnB1dChwbGF5ZXIubmFtZSksXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiBtZWVwbGVDb2xvcixcbiAgICAgICAgICAgICAgICAgICAga2V5OiBwbGF5ZXJLZXksXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY29uc3QgaXNWYWxpZFJlcXVlc3QgPSBzYW5pdGl6ZWRHYW1lTmFtZSAmJiBzYW5pdGl6ZWRQbGF5ZXJzICYmIEFycmF5LmlzQXJyYXkocGxheWVycykgJiYgcGxheWVycy5sZW5ndGggPCA3O1xuICAgICAgICAgICAgaWYgKCFpc1ZhbGlkUmVxdWVzdCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBhcG9sbG9fc2VydmVyXzEuVmFsaWRhdGlvbkVycm9yKGBJbnZhbGlkIHJlcXVlc3RgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGdhbWVPYmogPSB7XG4gICAgICAgICAgICAgICAgZ2FtZU5hbWU6IHNhbml0aXplZEdhbWVOYW1lLFxuICAgICAgICAgICAgICAgIHBsYXllcnM6IHNhbml0aXplZFBsYXllcnMsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaWYgKHVzZXJJZCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGdhbWUgPSBkYXRhc291cmNlc18xLmRhdGFTb3VyY2VzLmdhbWVTZXJ2aWNlLmNyZWF0ZUdhbWUoZ2FtZU9iaiwgdXNlcklkKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YXNvdXJjZXNfMS5kYXRhU291cmNlcy5nYW1lU2VydmljZS5nZXRHYW1lKGdhbWUuaWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhyb3cgbmV3IGFwb2xsb19zZXJ2ZXJfMS5WYWxpZGF0aW9uRXJyb3IoYFVuYXV0aGVudGljYXRlZCB1c2VyIHJlcXVlc3RgKTtcbiAgICAgICAgfSksXG4gICAgICAgIGpvaW5HYW1lKHBhcmVudCwgYXJncywgY29udGV4dCkge1xuICAgICAgICAgICAgY29uc3QgeyBnYW1lSWQgfSA9IGFyZ3M7XG4gICAgICAgICAgICBjb25zdCB1c2VySWQgPSBjb250ZXh0ICYmIGNvbnRleHQudXNlckRhdGEgJiYgY29udGV4dC51c2VyRGF0YS5kYXRhICYmIGNvbnRleHQudXNlckRhdGEuZGF0YS51c2VybmFtZTtcbiAgICAgICAgICAgIGNvbnN0IGdhbWUgPSBkYXRhc291cmNlc18xLmRhdGFTb3VyY2VzLmdhbWVTZXJ2aWNlLmdldEdhbWUoZ2FtZUlkKTtcbiAgICAgICAgICAgIGlmICghdXNlcklkKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1VuYXV0aGVudGljYXRlZCB1c2VyIHJlcXVlc3QnKTtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgYXBvbGxvX3NlcnZlcl8xLlZhbGlkYXRpb25FcnJvcihgVW5hdXRoZW50aWNhdGVkIHVzZXIgcmVxdWVzdGApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFnYW1lKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0dhbWVJRCBub3QgZm91bmQnKTtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgYXBvbGxvX3NlcnZlcl8xLlZhbGlkYXRpb25FcnJvcihgR2FtZUlEIG5vdCBmb3VuZGApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgaW5kZXggPSBnYW1lLnVzZXJzLmluZGV4T2YodXNlcklkKTtcbiAgICAgICAgICAgIGNvbnN0IHVzZXJJZE1hdGNoZXMgPSBnYW1lLnVzZXJzW2luZGV4XSA9PT0gdXNlcklkO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2dhbWUudXNlcnMnLCBnYW1lLnVzZXJzKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdpbmRleCcsIGluZGV4KTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCd1c2VySWRNYXRjaGVzJywgdXNlcklkTWF0Y2hlcyk7XG4gICAgICAgICAgICBpZiAoIXVzZXJJZE1hdGNoZXMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBnYW1lVXBkYXRlZCA9IE9iamVjdC5hc3NpZ24oe30sIGdhbWUsIHsgdXNlcnM6IFsuLi5nYW1lLnVzZXJzLCB1c2VySWRdIH0pO1xuICAgICAgICAgICAgICAgIGRhdGFzb3VyY2VzXzEuZGF0YVNvdXJjZXMuZ2FtZVNlcnZpY2UudXBkYXRlR2FtZShnYW1lVXBkYXRlZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZGF0YXNvdXJjZXNfMS5kYXRhU291cmNlcy5nYW1lU2VydmljZS5nZXRHYW1lKGdhbWVJZCk7XG4gICAgICAgIH0sXG4gICAgICAgIHN0YXJ0R2FtZShwYXJlbnQsIGFyZ3MsIGNvbnRleHQpIHtcbiAgICAgICAgICAgIGNvbnN0IHsgZ2FtZUlkIH0gPSBhcmdzO1xuICAgICAgICAgICAgY29uc3QgdXNlcklkID0gY29udGV4dC51c2VyRGF0YSAmJiBjb250ZXh0LnVzZXJEYXRhLmRhdGEgJiYgY29udGV4dC51c2VyRGF0YS5kYXRhLnVzZXJuYW1lO1xuICAgICAgICAgICAgY29uc3QgZ2FtZSA9IGRhdGFzb3VyY2VzXzEuZGF0YVNvdXJjZXMuZ2FtZVNlcnZpY2UuZ2V0R2FtZShnYW1lSWQpO1xuICAgICAgICAgICAgaWYgKCF1c2VySWQpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgYXBvbGxvX3NlcnZlcl8xLlZhbGlkYXRpb25FcnJvcihgVW5hdXRoZW50aWNhdGVkIHVzZXIgcmVxdWVzdGApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFnYW1lKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IGFwb2xsb19zZXJ2ZXJfMS5WYWxpZGF0aW9uRXJyb3IoYEdhbWVJRCBub3QgZm91bmRgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gZ2FtZS51c2Vycy5pbmRleE9mKHVzZXJJZCk7XG4gICAgICAgICAgICBjb25zdCB1c2VySWRNYXRjaGVzID0gZ2FtZS51c2Vyc1tpbmRleF0gPT09IHVzZXJJZDtcbiAgICAgICAgICAgIGlmICh1c2VySWRNYXRjaGVzKSB7XG4gICAgICAgICAgICAgICAgbGV0IGdhbWVVcGRhdGVkO1xuICAgICAgICAgICAgICAgIGlmICghZ2FtZS5zdGFydGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGFzb3VyY2VzXzEuZGF0YVNvdXJjZXMuZ2FtZVNlcnZpY2Uuc3RhcnRHYW1lKGdhbWVJZCk7XG4gICAgICAgICAgICAgICAgICAgIGdhbWVVcGRhdGVkID0gZGF0YXNvdXJjZXNfMS5kYXRhU291cmNlcy5nYW1lU2VydmljZS5nZXRHYW1lKGdhbWVJZCk7XG4gICAgICAgICAgICAgICAgICAgIHB1YnN1Yi5wdWJsaXNoKEdBTUVfVVBEQVRFRCwgeyBnYW1lVXBkYXRlZCB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGdhbWVVcGRhdGVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhyb3cgbmV3IGFwb2xsb19zZXJ2ZXJfMS5WYWxpZGF0aW9uRXJyb3IoYFVuYXV0aGVudGljYXRlZCB1c2VyIHJlcXVlc3RgKTtcbiAgICAgICAgfSxcbiAgICAgICAgdXBkYXRlR2FtZShwYXJlbnQsIGFyZ3MsIGNvbnRleHQpIHtcbiAgICAgICAgICAgIGNvbnN0IHsgZ2FtZUlkLCBwbGF5ZXJLZXksIHNjb3JlIH0gPSBhcmdzO1xuICAgICAgICAgICAgY29uc3QgdXNlcklkID0gY29udGV4dC51c2VyRGF0YSAmJiBjb250ZXh0LnVzZXJEYXRhLmRhdGEgJiYgY29udGV4dC51c2VyRGF0YS5kYXRhLnVzZXJuYW1lO1xuICAgICAgICAgICAgY29uc3QgZ2FtZSA9IGRhdGFzb3VyY2VzXzEuZGF0YVNvdXJjZXMuZ2FtZVNlcnZpY2UuZ2V0R2FtZShnYW1lSWQpO1xuICAgICAgICAgICAgaWYgKCF1c2VySWQpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgYXBvbGxvX3NlcnZlcl8xLlZhbGlkYXRpb25FcnJvcihgVW5hdXRoZW50aWNhdGVkIHVzZXIgcmVxdWVzdGApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFnYW1lKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IGFwb2xsb19zZXJ2ZXJfMS5WYWxpZGF0aW9uRXJyb3IoYEdhbWVJRCBub3QgZm91bmRgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghZ2FtZS5zdGFydGVkKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IGFwb2xsb19zZXJ2ZXJfMS5WYWxpZGF0aW9uRXJyb3IoYEdhbWUgbm90IHlldCBzdGFydGVkYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZ2FtZS5maW5pc2hlZCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBhcG9sbG9fc2VydmVyXzEuVmFsaWRhdGlvbkVycm9yKGBDYW5ub3QgdXBkYXRlIGEgZmluaXNoZWQgZ2FtZWApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgaW5kZXggPSBnYW1lLnVzZXJzLmluZGV4T2YodXNlcklkKTtcbiAgICAgICAgICAgIGNvbnN0IHVzZXJJZE1hdGNoZXMgPSBnYW1lLnVzZXJzW2luZGV4XSA9PT0gdXNlcklkO1xuICAgICAgICAgICAgaWYgKCF1c2VySWRNYXRjaGVzKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IGFwb2xsb19zZXJ2ZXJfMS5WYWxpZGF0aW9uRXJyb3IoYFVuYXV0aGVudGljYXRlZCB1c2VyIHJlcXVlc3RgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHBsYXllcnNVcGRhdGVkID0gZ2FtZS5wbGF5ZXJzLm1hcChwbGF5ZXIgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChwbGF5ZXIua2V5ID09PSBwbGF5ZXJLZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHBsYXllciwgeyBzY29yZTogKHBsYXllci5zY29yZSB8fCAwKSArIHNjb3JlIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gcGxheWVyO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjb25zdCBnYW1lVXBkYXRlZCA9IGRhdGFzb3VyY2VzXzEuZGF0YVNvdXJjZXMuZ2FtZVNlcnZpY2UudXBkYXRlR2FtZShPYmplY3QuYXNzaWduKHt9LCBnYW1lLCB7IHBsYXllcnM6IHBsYXllcnNVcGRhdGVkIH0pKTtcbiAgICAgICAgICAgIHB1YnN1Yi5wdWJsaXNoKEdBTUVfVVBEQVRFRCwgeyBnYW1lVXBkYXRlZCB9KTtcbiAgICAgICAgICAgIHJldHVybiBnYW1lVXBkYXRlZDtcbiAgICAgICAgfSxcbiAgICB9LFxufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgZGF0YXNvdXJjZXNfMSA9IHJlcXVpcmUoXCIuLi8uLi9kYXRhc291cmNlc1wiKTtcbmV4cG9ydHMuZGVmYXVsdCA9IHtcbiAgICBRdWVyeToge1xuICAgICAgICB1c2VyKHBhcmVudCwgYXJncywgY29udGV4dCkge1xuICAgICAgICAgICAgY29uc3QgdXNlciA9IGNvbnRleHQgJiYgY29udGV4dC51c2VyRGF0YSAmJiBjb250ZXh0LnVzZXJEYXRhLmRhdGE7XG4gICAgICAgICAgICBjb25zdCB1c2VySWQgPSB1c2VyICYmIHVzZXIudXNlcm5hbWU7XG4gICAgICAgICAgICByZXR1cm4gZGF0YXNvdXJjZXNfMS5kYXRhU291cmNlcy51c2VyU2VydmljZS5nZXRVc2VyKHVzZXJJZCk7XG4gICAgICAgIH0sXG4gICAgICAgIHVzZXJzKCkge1xuICAgICAgICAgICAgcmV0dXJuIGRhdGFzb3VyY2VzXzEuZGF0YVNvdXJjZXMudXNlclNlcnZpY2UuZ2V0VXNlcnMoKTtcbiAgICAgICAgfSxcbiAgICB9LFxufTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgbWVyZ2VfZ3JhcGhxbF9zY2hlbWFzXzEgPSByZXF1aXJlKFwibWVyZ2UtZ3JhcGhxbC1zY2hlbWFzXCIpO1xuY29uc3QgZ2FtZV8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL3R5cGVkZWZzL2dhbWVcIikpO1xuY29uc3QgbG9nXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vdHlwZWRlZnMvbG9nXCIpKTtcbmNvbnN0IHBsYXllcl8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL3R5cGVkZWZzL3BsYXllclwiKSk7XG5jb25zdCB1c2Vyc18xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL3R5cGVkZWZzL3VzZXJzXCIpKTtcbmNvbnN0IHR5cGVzID0gW2dhbWVfMS5kZWZhdWx0LCBsb2dfMS5kZWZhdWx0LCBwbGF5ZXJfMS5kZWZhdWx0LCB1c2Vyc18xLmRlZmF1bHRdO1xuLy8gTk9URTogMm5kIHBhcmFtIGlzIG9wdGlvbmFsLCBhbmQgZGVmYXVsdHMgdG8gZmFsc2Vcbi8vIE9ubHkgdXNlIGlmIHlvdSBoYXZlIGRlZmluZWQgdGhlIHNhbWUgdHlwZSBtdWx0aXBsZSB0aW1lcyBpblxuLy8gZGlmZmVyZW50IGZpbGVzIGFuZCB3aXNoIHRvIGF0dGVtcHQgbWVyZ2luZyB0aGVtIHRvZ2V0aGVyLlxuZXhwb3J0cy50eXBlRGVmcyA9IG1lcmdlX2dyYXBocWxfc2NoZW1hc18xLm1lcmdlVHlwZXModHlwZXMsIHsgYWxsOiB0cnVlIH0pO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmRlZmF1bHQgPSBgXG4gIGVudW0gQ29sb3Ige1xuICAgIHJlZFxuICAgIGdyZWVuXG4gICAgYmx1ZVxuICAgIHllbGxvd1xuICAgIGJsYWNrXG4gICAgZ3JheVxuICB9XG5cbiAgaW5wdXQgUGxheWVySW5mb0lucHV0IHtcbiAgICBuYW1lOiBTdHJpbmchXG4gICAga2V5OiBTdHJpbmchXG4gICAgY29sb3I6IENvbG9yIVxuICB9XG5cbiAgdHlwZSBQbGF5ZXJJbmZvIHtcbiAgICBuYW1lOiBTdHJpbmchXG4gICAga2V5OiBTdHJpbmchXG4gICAgY29sb3I6IENvbG9yIVxuICAgIHNjb3JlOiBJbnRcbiAgfVxuXG5cbiAgdHlwZSBHYW1lIHtcbiAgICBpZDogSUQhXG4gICAgbmFtZTogU3RyaW5nIVxuICAgIHBsYXllcnM6IFtQbGF5ZXJJbmZvXSFcbiAgICB1c2VyczogW1N0cmluZyFdXG4gICAgc3RhcnRlZDogQm9vbGVhbiFcbiAgICBmaW5pc2hlZDogQm9vbGVhbiFcbiAgICAjIGxvZzogTG9nXG4gIH1cblxuICB0eXBlIE11dGF0aW9uIHtcbiAgICBuZXdHYW1lKGdhbWVOYW1lOiBTdHJpbmchIHBsYXllcnM6IFtQbGF5ZXJJbmZvSW5wdXQhXSEpOiBHYW1lXG4gICAgc3RhcnRHYW1lKGdhbWVJZDogU3RyaW5nISk6IEdhbWVcbiAgICBqb2luR2FtZShnYW1lSWQ6IFN0cmluZyEpOiBHYW1lXG4gICAgdXBkYXRlR2FtZShnYW1lSWQ6IFN0cmluZywgcGxheWVyS2V5OiBTdHJpbmcsIHNjb3JlOiBJbnQpOiBHYW1lXG4gIH1cblxuICB0eXBlIFF1ZXJ5IHtcbiAgICBnYW1lczogW0dhbWVdXG4gICAgZ2FtZShnYW1lSWQ6IFN0cmluZyEpOiBHYW1lXG4gIH1cblxuICB0eXBlIFN1YnNjcmlwdGlvbiB7XG4gICAgZ2FtZUNyZWF0ZWQ6IEdhbWVcbiAgICBnYW1lVXBkYXRlZDogR2FtZVxuICB9XG5gO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmRlZmF1bHQgPSBgXG4gIHR5cGUgTG9nIHtcbiAgICBwbGF5ZXJJZDogSUQhXG4gICAgdGltZXN0YW1wOiBJbnQhXG4gICAgc2NvcmU6IEludCFcbiAgfVxuYDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gYFxuICB0eXBlIFBsYXllciB7XG4gICAgaWQ6IElEIVxuICAgIG5hbWU6IFN0cmluZyFcbiAgICBjb2xvcjogQ29sb3IhXG4gICAgdG90YWxTY29yZTogSW50XG4gIH1cblxuICBlbnVtIENvbG9yIHtcbiAgICBSRURcbiAgICBCTFVFXG4gICAgR1JFRU5cbiAgICBZRUxMT1dcbiAgICBQVVJQTEVcbiAgICBCTEFDS1xuICAgIEdSRVlcbiAgfVxuYDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gYFxuICB0eXBlIFVzZXIge1xuICAgIGlkOiBJRCFcbiAgICBnYW1lczogW1N0cmluZyFdXG4gIH1cblxuICB0eXBlIFF1ZXJ5IHtcbiAgICB1c2VyczogW1VzZXIhXVxuICAgIHVzZXI6IFVzZXJcbiAgfVxuYDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3Qgc2VydmVyXzEgPSByZXF1aXJlKFwiLi9zZXJ2ZXJcIik7XG5jb25zdCBjb25maWdfMSA9IHJlcXVpcmUoXCIuL2NvbmZpZ1wiKTtcbmNvbnN0IGFwcF8xID0gcmVxdWlyZShcIi4vYXBwXCIpO1xuY29uc3QgcG9ydCA9IGNvbmZpZ18xLmNvbmZpZy5nZXRQb3J0KCk7XG5jb25zdCBodHRwU2VydmVyID0gc2VydmVyXzEuc2VydmVyLmluaXQoYXBwXzEuYXBwLmFwcEluc3RhbmNlLCBwb3J0KTtcbmFwcF8xLmFwcC5nZXRBcG9sbG9TZXJ2ZXIoKS50aGVuKChhcG9sbG9TZXJ2ZXIpID0+IHtcbiAgICBhcG9sbG9TZXJ2ZXIuaW5zdGFsbFN1YnNjcmlwdGlvbkhhbmRsZXJzKGh0dHBTZXJ2ZXIpO1xuICAgIHNlcnZlcl8xLnNlcnZlci5zdGFydChhcG9sbG9TZXJ2ZXIpO1xufSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9faW1wb3J0U3RhciA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnRTdGFyKSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcbiAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIHJlc3VsdFtrXSA9IG1vZFtrXTtcbiAgICByZXN1bHRbXCJkZWZhdWx0XCJdID0gbW9kO1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgZXhwcmVzcyA9IF9faW1wb3J0U3RhcihyZXF1aXJlKFwiZXhwcmVzc1wiKSk7XG5jb25zdCBjb250cm9sbGVyc18xID0gcmVxdWlyZShcIi4vY29udHJvbGxlcnNcIik7XG5jb25zdCBjaGVja18xID0gcmVxdWlyZShcImV4cHJlc3MtdmFsaWRhdG9yL2NoZWNrXCIpO1xuY2xhc3MgTWFpblJvdXRlcyB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMucm91dGVyID0gZXhwcmVzcy5Sb3V0ZXIoKTtcbiAgICAgICAgdGhpcy5jb25maWcoKTtcbiAgICB9XG4gICAgY29uZmlnKCkge1xuICAgICAgICB0aGlzLnJvdXRlci5nZXQoJy8nLCAocmVxLCByZXMpID0+IGNvbnRyb2xsZXJzXzEubWFpbkNvbnRyb2xsZXIucm9vdChyZXEsIHJlcykpO1xuICAgICAgICB0aGlzLnJvdXRlci5nZXQoJy9zdGF0dXMnLCAocmVxLCByZXMpID0+IGNvbnRyb2xsZXJzXzEubWFpbkNvbnRyb2xsZXIuc3RhdHVzKHJlcSwgcmVzKSk7XG4gICAgICAgIHRoaXMucm91dGVyLnBvc3QoJy9yZWdpc3RlcicsIFtjaGVja18xLmNoZWNrKCd1c2VybmFtZScpLmlzRW1haWwoKSwgY2hlY2tfMS5jaGVjaygncGFzc3dvcmQnKS5pc0xlbmd0aCh7IG1pbjogNiB9KV0sIChyZXEsIHJlcykgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgY29uc3QgeyB1c2VybmFtZSwgcGFzc3dvcmQgfSA9IHJlcS5ib2R5O1xuICAgICAgICAgICAgY29uc3QgZXJyb3JzID0gY2hlY2tfMS52YWxpZGF0aW9uUmVzdWx0KHJlcSk7XG4gICAgICAgICAgICBpZiAoIWVycm9ycy5pc0VtcHR5KCkpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygndmFsaWRhdGlvblJlc3VsdCcsIGVycm9ycy5hcnJheSgpKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnNlbmRTdGF0dXMoNDAzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHN0YXR1cyA9IHlpZWxkIGNvbnRyb2xsZXJzXzEuYWRtaW5Db250cm9sbGVyLnJlZ2lzdGVyKHVzZXJuYW1lLCBwYXNzd29yZCk7XG4gICAgICAgICAgICByZXMuc2VuZFN0YXR1cyhzdGF0dXMpO1xuICAgICAgICB9KSk7XG4gICAgICAgIHRoaXMucm91dGVyLnBvc3QoJy9jb25maXJtLWNvZGUnLCBbXG4gICAgICAgICAgICBjaGVja18xLmNoZWNrKCd1c2VybmFtZScpLmlzRW1haWwoKSxcbiAgICAgICAgICAgIGNoZWNrXzEuY2hlY2soJ2NvZGUnKVxuICAgICAgICAgICAgICAgIC5pc051bWVyaWMoKVxuICAgICAgICAgICAgICAgIC5pc0xlbmd0aCh7IG1pbjogNiwgbWF4OiA2IH0pLFxuICAgICAgICBdLCAocmVxLCByZXMpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIGNvbnN0IHsgdXNlcm5hbWUsIGNvZGUgfSA9IHJlcS5ib2R5O1xuICAgICAgICAgICAgY29uc3QgZXJyb3JzID0gY2hlY2tfMS52YWxpZGF0aW9uUmVzdWx0KHJlcSk7XG4gICAgICAgICAgICBpZiAoIWVycm9ycy5pc0VtcHR5KCkpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygndmFsaWRhdGlvblJlc3VsdCcsIGVycm9ycy5hcnJheSgpKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnNlbmRTdGF0dXMoNDAzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHN0YXR1cyA9IHlpZWxkIGNvbnRyb2xsZXJzXzEuYWRtaW5Db250cm9sbGVyLmNvbmZpcm1Db2RlKHVzZXJuYW1lLCBjb2RlKTtcbiAgICAgICAgICAgIHJlcy5zZW5kU3RhdHVzKHN0YXR1cyk7XG4gICAgICAgIH0pKTtcbiAgICAgICAgdGhpcy5yb3V0ZXIucG9zdCgnL25ldy1jb25maXJtLWNvZGUnLCBbY2hlY2tfMS5jaGVjaygndXNlcm5hbWUnKS5pc0VtYWlsKCldLCAocmVxLCByZXMpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIGNvbnN0IHsgdXNlcm5hbWUgfSA9IHJlcS5ib2R5O1xuICAgICAgICAgICAgY29uc3QgZXJyb3JzID0gY2hlY2tfMS52YWxpZGF0aW9uUmVzdWx0KHJlcSk7XG4gICAgICAgICAgICBpZiAoIWVycm9ycy5pc0VtcHR5KCkpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygndmFsaWRhdGlvblJlc3VsdCcsIGVycm9ycy5hcnJheSgpKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnNlbmRTdGF0dXMoNDAzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHN0YXR1cyA9IHlpZWxkIGNvbnRyb2xsZXJzXzEuYWRtaW5Db250cm9sbGVyLm5ld0NvbmZpcm1Db2RlKHVzZXJuYW1lKTtcbiAgICAgICAgICAgIHJlcy5zZW5kU3RhdHVzKHN0YXR1cyk7XG4gICAgICAgIH0pKTtcbiAgICAgICAgdGhpcy5yb3V0ZXIucG9zdCgnL2xvZ2luJywgKHJlcSwgcmVzKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICBjb25zdCB7IHVzZXJuYW1lLCBwYXNzd29yZCB9ID0gcmVxLmJvZHk7XG4gICAgICAgICAgICBjb25zdCB1c2VyRGV0YWlscyA9IHlpZWxkIGNvbnRyb2xsZXJzXzEuYWRtaW5Db250cm9sbGVyLmxvZ2luKHVzZXJuYW1lLCBwYXNzd29yZCk7XG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyh1c2VyRGV0YWlscy5zdGF0dXMpLnNlbmQodXNlckRldGFpbHMpO1xuICAgICAgICB9KSk7XG4gICAgICAgIHRoaXMucm91dGVyLnBvc3QoJy92ZXJpZnktdXNlcicsIChyZXEsIHJlcykgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgbGV0IHVzZXJTdGF0dXM7XG4gICAgICAgICAgICBjb25zdCB7IHRva2VuIH0gPSByZXEuYm9keTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgdXNlclN0YXR1cyA9IHlpZWxkIGNvbnRyb2xsZXJzXzEuYWRtaW5Db250cm9sbGVyLlZhbGlkYXRlVG9rZW4odG9rZW4pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zZW5kU3RhdHVzKDQwMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh1c2VyU3RhdHVzKTtcbiAgICAgICAgICAgIHJldHVybiByZXMuc2VuZFN0YXR1cygyMDApO1xuICAgICAgICAgICAgLy8gcmV0dXJuIHJlcy5zdGF0dXModXNlclN0YXR1cy5zdGF0dXMpLnNlbmQodXNlclN0YXR1cyk7XG4gICAgICAgIH0pKTtcbiAgICAgICAgdGhpcy5yb3V0ZXIuZ2V0KCcvdXNlcicsIChyZXEsIHJlcykgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgY29uc3QgeyB1c2VybmFtZSB9ID0gcmVxLmJvZHk7XG4gICAgICAgICAgICBjb25zdCB1c2VyRGF0YSA9IHlpZWxkIGNvbnRyb2xsZXJzXzEuYWRtaW5Db250cm9sbGVyLmdldFVzZXIodXNlcm5hbWUpO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ3VzZXJEYXRhJywgdXNlckRhdGEpO1xuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5zZW5kKHVzZXJEYXRhKTtcbiAgICAgICAgfSkpO1xuICAgIH1cbn1cbmV4cG9ydHMucm91dGVyID0gbmV3IE1haW5Sb3V0ZXMoKS5yb3V0ZXI7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGh0dHBfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiaHR0cFwiKSk7XG5jbGFzcyBTZXJ2ZXIge1xuICAgIGluaXQoZXhwcmVzc0FwcCwgcG9ydE51bWJlcikge1xuICAgICAgICBpZiAodGhpcy5zZXJ2ZXJJbnN0YW5jZSkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgVGhlIHNlcnZlciBpcyBhbHJlYWR5IHJ1bm5pbmcgb24gcG9ydCAke3RoaXMucG9ydE51bWJlcn1gKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNlcnZlckluc3RhbmNlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucG9ydE51bWJlciA9IHBvcnROdW1iZXI7XG4gICAgICAgIHRoaXMuc2VydmVySW5zdGFuY2UgPSBodHRwXzEuZGVmYXVsdC5jcmVhdGVTZXJ2ZXIoZXhwcmVzc0FwcCk7XG4gICAgICAgIHJldHVybiB0aGlzLnNlcnZlckluc3RhbmNlO1xuICAgIH1cbiAgICBzdGFydChhcG9sbG9TZXJ2ZXJBcHApIHtcbiAgICAgICAgaWYgKCF0aGlzLnNlcnZlckluc3RhbmNlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGBObyBzZXJ2ZXIgaGFzIGJlZW4gaW5pdGlhbGl6ZWRgKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNlcnZlckluc3RhbmNlLmxpc3Rlbih0aGlzLnBvcnROdW1iZXIsICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGFkZHJlc3NJbmZvID0gdGhpcy5zZXJ2ZXJJbnN0YW5jZSAmJiB0aGlzLnNlcnZlckluc3RhbmNlLmFkZHJlc3MoKTtcbiAgICAgICAgICAgIGNvbnN0IHBvcnQgPSAncG9ydCcgaW4gYWRkcmVzc0luZm8gPyBhZGRyZXNzSW5mby5wb3J0IDogbnVsbDtcbiAgICAgICAgICAgIGNvbnN0IGFkZHJlc3MgPSAnYWRkcmVzcycgaW4gYWRkcmVzc0luZm9cbiAgICAgICAgICAgICAgICA/IGFkZHJlc3NJbmZvLmFkZHJlc3MgPT09ICc6OidcbiAgICAgICAgICAgICAgICAgICAgPyAnaHR0cDovL2xvY2FsaG9zdDonXG4gICAgICAgICAgICAgICAgICAgIDogYWRkcmVzc0luZm8uYWRkcmVzc1xuICAgICAgICAgICAgICAgIDogJyc7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhg8J+agCAgU2VydmVyIGxpc3RlbmluZyBvbiAke2FkZHJlc3N9JHtwb3J0fWApO1xuICAgICAgICAgICAgY29uc29sZS5sb2coYPCfmoAgIEdyYXBoUUwgcGxheWdyb3VuZCBsaXN0ZW5pbmcgb24gJHthZGRyZXNzfSR7cG9ydH0ke2Fwb2xsb1NlcnZlckFwcC5ncmFwaHFsUGF0aH1gKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGDwn5qAICBTdWJzY3JpcHRpb25zIHJlYWR5IGF0IHdzOi8vbG9jYWxob3N0OiR7cG9ydH0ke2Fwb2xsb1NlcnZlckFwcC5zdWJzY3JpcHRpb25zUGF0aH1gKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuZXhwb3J0cy5zZXJ2ZXIgPSBuZXcgU2VydmVyKCk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJhbWF6b24tY29nbml0by1pZGVudGl0eS1qc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJhcG9sbG8tZGF0YXNvdXJjZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJhcG9sbG8tc2VydmVyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImFwb2xsby1zZXJ2ZXItZXhwcmVzc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJhd3Mtc2RrXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImF4aW9zXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJvZHktcGFyc2VyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvcnNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZG90ZW52XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImV4cHJlc3NcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZXhwcmVzcy12YWxpZGF0b3IvY2hlY2tcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaHR0cFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJqc29ud2VidG9rZW5cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiandrLXRvLXBlbVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJsb2Rhc2gvZ2V0XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1lcmdlLWdyYXBocWwtc2NoZW1hc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtb3JnYW5cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidW5pcXVlLW5hbWVzLWdlbmVyYXRvclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ1dWlkXCIpOyJdLCJzb3VyY2VSb290IjoiIn0=