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
                path: '/graph',
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
        //
        console.log('...initialize...');
    }
    createGame(gameObject, userId) {
        const gameId = newId();
        const game = {
            id: gameId,
            name: gameObject.gameName,
            players: gameObject.players,
            users: [
                userId
            ],
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
        if (game && game.started) {
            throw new Error(`Game ${game && game.id} already started.`);
        }
        if (game && game.id && game.name) {
            const gameUpdated = Object.assign({}, game, { started: true });
            return this.games.set(gameId, gameUpdated);
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

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = __webpack_require__(/*! apollo-server */ "apollo-server");
const get_1 = __importDefault(__webpack_require__(/*! lodash/get */ "lodash/get"));
const datasources_1 = __webpack_require__(/*! ../../datasources */ "./src/datasources/index.ts");
const pubsub = new apollo_server_1.PubSub();
const validMeepleColor = ['green', 'red', 'blue', 'yellow', 'black', 'gray'];
const sanitizeInput = (input) => String(input).replace(/[^\w\s]|\s{2,}/g, '').trim();
const validateColor = (color) => Boolean(~validMeepleColor.indexOf(color)) && String(color);
const validatePlayer = (playerName) => {
    const playerNumber = Number(playerName.replace(/player/, ''));
    if (playerNumber > 0 && playerNumber < 7) {
        return `player${playerNumber}`;
    }
    return false;
};
const AUTHOR_MUTATED = 'test';
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
        connectGames: {
            subscribe: () => {
                return pubsub.asyncIterator([AUTHOR_MUTATED]);
            }
        }
    },
    Mutation: {
        newGame(parent, args, context) {
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
                    key: playerKey
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
        },
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
            const userId = context && context.userData && context.userData.data && context.userData.data.username;
            const game = datasources_1.dataSources.gameService.getGame(gameId);
            if (!userId) {
                throw new apollo_server_1.ValidationError(`Unauthenticated user request`);
            }
            if (!game) {
                throw new apollo_server_1.ValidationError(`GameID not found`);
            }
            const index = game.players.indexOf(userId);
            const userIdMatches = game.players[index] === userId;
            if (~index && userIdMatches) {
                datasources_1.dataSources.gameService.startGame(gameId);
                return datasources_1.dataSources.gameService.getGame(gameId);
            }
            throw new apollo_server_1.ValidationError(`Unauthenticated user request`);
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
  }

  type Query {
    games: [Game]
    game(gameId: String!): Game
  }

  type Subscription {
    connectGames: [Game]
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29uZmlnLnRzIiwid2VicGFjazovLy8uL3NyYy9jb250cm9sbGVycy9hZG1pbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29udHJvbGxlcnMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRyb2xsZXJzL21haW4udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RhdGFzb3VyY2VzL2dhbWUuZGF0YS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZGF0YXNvdXJjZXMvZ2FtZS5zZXJ2aWNlLnRzIiwid2VicGFjazovLy8uL3NyYy9kYXRhc291cmNlcy9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZGF0YXNvdXJjZXMvdXNlci5kYXRhLnRzIiwid2VicGFjazovLy8uL3NyYy9kYXRhc291cmNlcy91c2VyLnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dyYXBocWwvcmVzb2x2ZXJzLnRzIiwid2VicGFjazovLy8uL3NyYy9ncmFwaHFsL3Jlc29sdmVycy9nYW1lLnJlc29sdmVycy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZ3JhcGhxbC9yZXNvbHZlcnMvdXNlcnMucmVzb2x2ZXJzLnRzIiwid2VicGFjazovLy8uL3NyYy9ncmFwaHFsL3R5cGVkZWZzLnRzIiwid2VicGFjazovLy8uL3NyYy9ncmFwaHFsL3R5cGVkZWZzL2dhbWUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dyYXBocWwvdHlwZWRlZnMvbG9nLnRzIiwid2VicGFjazovLy8uL3NyYy9ncmFwaHFsL3R5cGVkZWZzL3BsYXllci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZ3JhcGhxbC90eXBlZGVmcy91c2Vycy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JvdXRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcImFtYXpvbi1jb2duaXRvLWlkZW50aXR5LWpzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYXBvbGxvLWRhdGFzb3VyY2VcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJhcG9sbG8tc2VydmVyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYXBvbGxvLXNlcnZlci1leHByZXNzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYXdzLXNka1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImF4aW9zXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYm9keS1wYXJzZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJjb3JzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZG90ZW52XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZXhwcmVzc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImV4cHJlc3MtdmFsaWRhdG9yL2NoZWNrXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiaHR0cFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImpzb253ZWJ0b2tlblwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImp3ay10by1wZW1cIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJsb2Rhc2gvZ2V0XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibWVyZ2UtZ3JhcGhxbC1zY2hlbWFzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibW9yZ2FuXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidW5pcXVlLW5hbWVzLWdlbmVyYXRvclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInV1aWRcIiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7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Ozs7Ozs7Ozs7QUNBQSxrRDs7Ozs7Ozs7Ozs7QUNBQSxvQzs7Ozs7Ozs7Ozs7QUNBQSxrQzs7Ozs7Ozs7Ozs7QUNBQSx3Qzs7Ozs7Ozs7Ozs7QUNBQSxpQzs7Ozs7Ozs7Ozs7QUNBQSxtQzs7Ozs7Ozs7Ozs7QUNBQSxvQzs7Ozs7Ozs7Ozs7QUNBQSxvRDs7Ozs7Ozs7Ozs7QUNBQSxpQzs7Ozs7Ozs7Ozs7QUNBQSx5Qzs7Ozs7Ozs7Ozs7QUNBQSx1Qzs7Ozs7Ozs7Ozs7QUNBQSx1Qzs7Ozs7Ozs7Ozs7QUNBQSxrRDs7Ozs7Ozs7Ozs7QUNBQSxtQzs7Ozs7Ozs7Ozs7QUNBQSxtRDs7Ozs7Ozs7Ozs7QUNBQSxpQyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG52YXIgX19pbXBvcnRTdGFyID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydFN0YXIpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xuICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgcmVzdWx0W2tdID0gbW9kW2tdO1xuICAgIHJlc3VsdFtcImRlZmF1bHRcIl0gPSBtb2Q7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBleHByZXNzXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcImV4cHJlc3NcIikpO1xuY29uc3QgYXBvbGxvX3NlcnZlcl9leHByZXNzXzEgPSByZXF1aXJlKFwiYXBvbGxvLXNlcnZlci1leHByZXNzXCIpO1xuY29uc3QgbW9yZ2FuXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIm1vcmdhblwiKSk7XG5jb25zdCBjb3JzXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcImNvcnNcIikpO1xuY29uc3QgYm9keVBhcnNlciA9IF9faW1wb3J0U3RhcihyZXF1aXJlKFwiYm9keS1wYXJzZXJcIikpO1xuY29uc3QgYWRtaW5fMSA9IHJlcXVpcmUoXCIuL2NvbnRyb2xsZXJzL2FkbWluXCIpO1xuY29uc3QgY29uZmlnXzEgPSByZXF1aXJlKFwiLi9jb25maWdcIik7XG5jb25zdCB0eXBlZGVmc18xID0gcmVxdWlyZShcIi4vZ3JhcGhxbC90eXBlZGVmc1wiKTtcbmNvbnN0IHJlc29sdmVyc18xID0gcmVxdWlyZShcIi4vZ3JhcGhxbC9yZXNvbHZlcnNcIik7XG5jb25zdCByb3V0ZXJfMSA9IHJlcXVpcmUoXCIuL3JvdXRlclwiKTtcbmNsYXNzIEFwcCB7XG4gICAgY29uc3RydWN0b3IoYXBwQ29uZmlnKSB7XG4gICAgICAgIHRoaXMuYXBwSW5zdGFuY2UgPSBleHByZXNzXzEuZGVmYXVsdCgpO1xuICAgICAgICB0aGlzLmFkbWluID0gYWRtaW5fMS5hZG1pbkNvbnRyb2xsZXI7XG4gICAgICAgIHRoaXMuYXBwQ29uZmlnID0gYXBwQ29uZmlnO1xuICAgIH1cbiAgICBnZXRBcG9sbG9TZXJ2ZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZygpO1xuICAgIH1cbiAgICBjb25maWcoKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICB0aGlzLmFwcEluc3RhbmNlLnVzZShtb3JnYW5fMS5kZWZhdWx0KCdkZXYnKSk7XG4gICAgICAgICAgICB0aGlzLmFwcEluc3RhbmNlLmRpc2FibGUoJ3gtcG93ZXJlZC1ieScpO1xuICAgICAgICAgICAgdGhpcy5hcHBJbnN0YW5jZS51c2UoY29yc18xLmRlZmF1bHQoKSk7XG4gICAgICAgICAgICAvLyBTdXBwb3J0IGFwcGxpY2F0aW9uL2pzb24gdHlwZSBwb3N0IGRhdGFcbiAgICAgICAgICAgIHRoaXMuYXBwSW5zdGFuY2UudXNlKGJvZHlQYXJzZXIuanNvbigpKTtcbiAgICAgICAgICAgIC8vIFN1cHBvcnQgYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkIHBvc3QgZGF0YVxuICAgICAgICAgICAgdGhpcy5hcHBJbnN0YW5jZS51c2UoYm9keVBhcnNlci51cmxlbmNvZGVkKHsgZXh0ZW5kZWQ6IGZhbHNlIH0pKTtcbiAgICAgICAgICAgIHRoaXMuYXBwSW5zdGFuY2UudXNlKCcvJywgcm91dGVyXzEucm91dGVyKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmFwcGx5TWlkZGxld2FyZXModGhpcy5hcHBJbnN0YW5jZSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBhcHBseU1pZGRsZXdhcmVzKGV4cHJlc3NBcHApIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIGNvbnN0IGFwb2xsb1NlcnZlciA9IHlpZWxkIG5ldyBhcG9sbG9fc2VydmVyX2V4cHJlc3NfMS5BcG9sbG9TZXJ2ZXIoe1xuICAgICAgICAgICAgICAgIGNvbnRleHQ6ICh7IHJlcSB9KSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghcmVxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy8gQWxsb3cgR3JhcGhRTCBwbGF5Z3JvdW5kIGluIGRldmVsb3BtZW50IG1vZGVcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgb3JpZ2luVXJsID0gYGxvY2FsaG9zdDoke3RoaXMuYXBwQ29uZmlnLmdldFBvcnQoKX0ke3JlcS5iYXNlVXJsfWA7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlZyA9IG5ldyBSZWdFeHAoYCR7b3JpZ2luVXJsfSRgLCAnZ2knKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaXNQbGF5Z3JvdW5kID0gcmVnLnRlc3QoU3RyaW5nKHJlcS5oZWFkZXJzLnJlZmVyZXIpKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYXBwQ29uZmlnLmlzRGV2KCkgJiYgaXNQbGF5Z3JvdW5kKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJEYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJuYW1lOiAnZGVhOWFkYmEtNGVmMy00Njg3LWFjN2ItNTlhNTNmZmFmYzViJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjb25zdCBhdXRob3JpemF0aW9uID0gU3RyaW5nKHJlcS5oZWFkZXJzLmF1dGhvcml6YXRpb24pIHx8ICcnO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0b2tlbiA9IGF1dGhvcml6YXRpb24ucmVwbGFjZSgnQmVhcmVyICcsICcnKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHVzZXJEYXRhO1xuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdXNlckRhdGEgPSB5aWVsZCB0aGlzLmFkbWluLlZhbGlkYXRlVG9rZW4odG9rZW4pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdFcnJvcjonLCBlcnIubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgYXBvbGxvX3NlcnZlcl9leHByZXNzXzEuQXV0aGVudGljYXRpb25FcnJvcigneW91IG11c3QgYmUgbG9nZ2VkIGluJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ3VzZXJEYXRhJywgdXNlckRhdGEpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyB1c2VyRGF0YSB9O1xuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIHR5cGVEZWZzOiBhcG9sbG9fc2VydmVyX2V4cHJlc3NfMS5ncWwgYFxuICAgICAgICAke3R5cGVkZWZzXzEudHlwZURlZnN9XG4gICAgICBgLFxuICAgICAgICAgICAgICAgIHJlc29sdmVyczogcmVzb2x2ZXJzXzEucmVzb2x2ZXJzLFxuICAgICAgICAgICAgICAgIHBsYXlncm91bmQ6IHRoaXMuYXBwQ29uZmlnLmlzRGV2KCksXG4gICAgICAgICAgICAgICAgc3Vic2NyaXB0aW9uczoge1xuICAgICAgICAgICAgICAgICAgICBvbkNvbm5lY3Q6ICgpID0+IGNvbnNvbGUubG9nKCdDb25uZWN0ZWQgdG8gd2Vic29ja2V0JyksXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB0cmFjaW5nOiB0cnVlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB5aWVsZCBhcG9sbG9TZXJ2ZXIuYXBwbHlNaWRkbGV3YXJlKHtcbiAgICAgICAgICAgICAgICBhcHA6IGV4cHJlc3NBcHAsXG4gICAgICAgICAgICAgICAgcGF0aDogJy9ncmFwaCcsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBhcG9sbG9TZXJ2ZXI7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbmV4cG9ydHMuYXBwID0gbmV3IEFwcChjb25maWdfMS5jb25maWcpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBkb3RlbnZfMSA9IHJlcXVpcmUoXCJkb3RlbnZcIik7XG5jbGFzcyBDb25maWcge1xuICAgIHN0YXRpYyBnZXRJbnN0YW5jZSgpIHtcbiAgICAgICAgaWYgKCFDb25maWcuaW5zdGFuY2UpIHtcbiAgICAgICAgICAgIENvbmZpZy5pbnN0YW5jZSA9IG5ldyBDb25maWcoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gQ29uZmlnLmluc3RhbmNlO1xuICAgIH1cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5lbnZOYW1lID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgfHwgJ2RldmVsb3BtZW50JztcbiAgICAgICAgdGhpcy5wb3J0ID0gcHJvY2Vzcy5lbnYuUE9SVCB8fCAnODg4OCc7XG4gICAgICAgIGRvdGVudl8xLmNvbmZpZygpO1xuICAgIH1cbiAgICBnZXRFbnYoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVudk5hbWU7XG4gICAgfVxuICAgIGdldFBvcnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBvcnQ7XG4gICAgfVxuICAgIGlzRGV2KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5lbnZOYW1lID09PSAnZGV2ZWxvcG1lbnQnO1xuICAgIH1cbiAgICBpc0RlYnVnKCkge1xuICAgICAgICByZXR1cm4gcHJvY2Vzcy5lbnYuREVCVUcgPT09ICd0cnVlJztcbiAgICB9XG4gICAgZ2V0KHByb3BOYW1lKSB7XG4gICAgICAgIGlmIChwcm9wTmFtZSA9PT0gJ05PREVfRU5WJykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RW52KCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb3BOYW1lID09PSAnUE9SVCcpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFBvcnQoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcHJvY2Vzcy5lbnZbcHJvcE5hbWVdO1xuICAgIH1cbn1cbmV4cG9ydHMuY29uZmlnID0gQ29uZmlnLmdldEluc3RhbmNlKCk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgYW1hem9uX2NvZ25pdG9faWRlbnRpdHlfanNfMSA9IHJlcXVpcmUoXCJhbWF6b24tY29nbml0by1pZGVudGl0eS1qc1wiKTtcbmNvbnN0IGF4aW9zXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcImF4aW9zXCIpKTtcbmNvbnN0IGp3a190b19wZW1fMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiandrLXRvLXBlbVwiKSk7XG5jb25zdCBqc29ud2VidG9rZW5fMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwianNvbndlYnRva2VuXCIpKTtcbmNvbnN0IGF3c19zZGtfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiYXdzLXNka1wiKSk7XG5jb25zdCBjb25maWdfMSA9IHJlcXVpcmUoXCIuLi9jb25maWdcIik7XG5jbGFzcyBBZG1pbkNvbnRyb2xsZXIge1xuICAgIGNvbnN0cnVjdG9yKGFwcENvbmZpZykge1xuICAgICAgICB0aGlzLnBvb2xSZWdpb24gPSBhcHBDb25maWcuZ2V0KCdBUFBfUkVHSU9OJykgfHwgJyc7XG4gICAgICAgIGNvbnN0IHBvb2xJZCA9IGFwcENvbmZpZy5nZXQoJ0FQUF9VU0VSX1BPT0xfSUQnKSB8fCAnJztcbiAgICAgICAgY29uc3QgQ2xpZW50SWQgPSBhcHBDb25maWcuZ2V0KCdBUFBfQVBQX0NMSUVOVF9JRCcpIHx8ICcnO1xuICAgICAgICBjb25zdCBwb29sRGF0YSA9IHtcbiAgICAgICAgICAgIFVzZXJQb29sSWQ6IHBvb2xJZCxcbiAgICAgICAgICAgIENsaWVudElkLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLnVzZXJQb29sID0gbmV3IGFtYXpvbl9jb2duaXRvX2lkZW50aXR5X2pzXzEuQ29nbml0b1VzZXJQb29sKHBvb2xEYXRhKTtcbiAgICB9XG4gICAgcmVnaXN0ZXIodXNlcm5hbWUsIHBhc3N3b3JkKSB7XG4gICAgICAgIGNvbnN0IGF0dHJpYnV0ZUxpc3QgPSBbXG4gICAgICAgICAgICBuZXcgYW1hem9uX2NvZ25pdG9faWRlbnRpdHlfanNfMS5Db2duaXRvVXNlckF0dHJpYnV0ZSh7XG4gICAgICAgICAgICAgICAgTmFtZTogJ2VtYWlsJyxcbiAgICAgICAgICAgICAgICBWYWx1ZTogdXNlcm5hbWUsXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIG5ldyBhbWF6b25fY29nbml0b19pZGVudGl0eV9qc18xLkNvZ25pdG9Vc2VyQXR0cmlidXRlKHtcbiAgICAgICAgICAgICAgICBOYW1lOiAnbmlja25hbWUnLFxuICAgICAgICAgICAgICAgIFZhbHVlOiAnYW5kcmVhc29ubnk4MycsXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgXTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlcyA9PiB7XG4gICAgICAgICAgICB0aGlzLnVzZXJQb29sLnNpZ25VcCh1c2VybmFtZSwgcGFzc3dvcmQsIGF0dHJpYnV0ZUxpc3QsIFtdLCAoZXJyLCByZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXMoNDAzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgY29nbml0b1VzZXIgPSByZXN1bHQudXNlcjtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygndXNlciBuYW1lIGlzICcgKyBjb2duaXRvVXNlci5nZXRVc2VybmFtZSgpKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygncmVzdWx0IGlzOicsIHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcygyMDEpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBjb25maXJtQ29kZSh1c2VybmFtZSwgY29kZSkge1xuICAgICAgICBjb25zdCB1c2VyRGF0YSA9IHtcbiAgICAgICAgICAgIFVzZXJuYW1lOiB1c2VybmFtZSxcbiAgICAgICAgICAgIFBvb2w6IHRoaXMudXNlclBvb2wsXG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IGNvZ25pdG9Vc2VyID0gbmV3IGFtYXpvbl9jb2duaXRvX2lkZW50aXR5X2pzXzEuQ29nbml0b1VzZXIodXNlckRhdGEpO1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UocmVzID0+IHtcbiAgICAgICAgICAgIGNvZ25pdG9Vc2VyLmNvbmZpcm1SZWdpc3RyYXRpb24oY29kZSwgdHJ1ZSwgKGVyciwgcmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzKDQwMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjYWxsIHJlc3VsdDogJyArIHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgcmVzKDIwMCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIG5ld0NvbmZpcm1Db2RlKHVzZXJuYW1lKSB7XG4gICAgICAgIGNvbnN0IHVzZXJEYXRhID0ge1xuICAgICAgICAgICAgVXNlcm5hbWU6IHVzZXJuYW1lLFxuICAgICAgICAgICAgUG9vbDogdGhpcy51c2VyUG9vbCxcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgY29nbml0b1VzZXIgPSBuZXcgYW1hem9uX2NvZ25pdG9faWRlbnRpdHlfanNfMS5Db2duaXRvVXNlcih1c2VyRGF0YSk7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXMgPT4ge1xuICAgICAgICAgICAgY29nbml0b1VzZXIucmVzZW5kQ29uZmlybWF0aW9uQ29kZSgoZXJyLCByZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXMoNDAwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KTtcbiAgICAgICAgICAgICAgICByZXMoMjAwKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgbG9naW4odXNlcm5hbWUsIHBhc3N3b3JkKSB7XG4gICAgICAgIGNvbnN0IGF1dGhlbnRpY2F0aW9uRGF0YSA9IHtcbiAgICAgICAgICAgIFVzZXJuYW1lOiB1c2VybmFtZSxcbiAgICAgICAgICAgIFBhc3N3b3JkOiBwYXNzd29yZCxcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgYXV0aGVudGljYXRpb25EZXRhaWxzID0gbmV3IGFtYXpvbl9jb2duaXRvX2lkZW50aXR5X2pzXzEuQXV0aGVudGljYXRpb25EZXRhaWxzKGF1dGhlbnRpY2F0aW9uRGF0YSk7XG4gICAgICAgIGNvbnN0IHVzZXJEYXRhID0ge1xuICAgICAgICAgICAgVXNlcm5hbWU6IHVzZXJuYW1lLFxuICAgICAgICAgICAgUG9vbDogdGhpcy51c2VyUG9vbCxcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgY29nbml0b1VzZXIgPSBuZXcgYW1hem9uX2NvZ25pdG9faWRlbnRpdHlfanNfMS5Db2duaXRvVXNlcih1c2VyRGF0YSk7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXMgPT4ge1xuICAgICAgICAgICAgY29nbml0b1VzZXIuYXV0aGVudGljYXRlVXNlcihhdXRoZW50aWNhdGlvbkRldGFpbHMsIHtcbiAgICAgICAgICAgICAgICBvblN1Y2Nlc3M6IChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYWNjZXNzVG9rZW4gPSByZXN1bHQuZ2V0QWNjZXNzVG9rZW4oKS5nZXRKd3RUb2tlbigpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBpZFRva2VuID0gcmVzdWx0LmdldElkVG9rZW4oKS5nZXRKd3RUb2tlbigpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZWZyZXNoVG9rZW4gPSByZXN1bHQuZ2V0UmVmcmVzaFRva2VuKCkuZ2V0VG9rZW4oKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcyh7IHN0YXR1czogMjAwLCBkYXRhOiB7IGFjY2Vzc1Rva2VuLCBpZFRva2VuLCByZWZyZXNoVG9rZW4gfSB9KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uRmFpbHVyZTogKGVycikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyICYmIGVyci5jb2RlID09PSAnVXNlck5vdENvbmZpcm1lZEV4Y2VwdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXMoeyBzdGF0dXM6IDIyMywgZXJyb3I6IHRydWUgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcyh7IHN0YXR1czogNDAxLCBlcnJvcjogdHJ1ZSB9KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBWYWxpZGF0ZVRva2VuKHRva2VuKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICBjb25zdCB1cmwgPSBgaHR0cHM6Ly9jb2duaXRvLWlkcC4ke3RoaXMucG9vbFJlZ2lvbn0uYW1hem9uYXdzLmNvbS8ke3RoaXMudXNlclBvb2wuZ2V0VXNlclBvb2xJZCgpfS8ud2VsbC1rbm93bi9qd2tzLmpzb25gO1xuICAgICAgICAgICAgbGV0IHJlc3BvbnNlO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICByZXNwb25zZSA9IHlpZWxkIGF4aW9zXzEuZGVmYXVsdC5nZXQodXJsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NvbWV0aGluZyB3ZW50IHdyb25nIHdoaWxlIHZlcmlmeWluZyB0aGUgSldUJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIShyZXNwb25zZSAmJiByZXNwb25zZS5zdGF0dXMgPT09IDIwMCAmJiByZXNwb25zZS5kYXRhKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRXJyb3IhIFVuYWJsZSB0byBkb3dubG9hZCBKV0tzJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBib2R5ID0gcmVzcG9uc2UuZGF0YTtcbiAgICAgICAgICAgIGNvbnN0IHBlbXMgPSB7fTtcbiAgICAgICAgICAgIGNvbnN0IGtleXMgPSBib2R5LmtleXM7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBrZXlzKSB7XG4gICAgICAgICAgICAgICAgLy8gQ29udmVydCBlYWNoIGtleSB0byBQRU1cbiAgICAgICAgICAgICAgICBjb25zdCBrZXlJZCA9IGtleS5raWQ7XG4gICAgICAgICAgICAgICAgY29uc3QgbW9kdWx1cyA9IGtleS5uO1xuICAgICAgICAgICAgICAgIGNvbnN0IGV4cG9uZW50ID0ga2V5LmU7XG4gICAgICAgICAgICAgICAgY29uc3Qga2V5VHlwZSA9IGtleS5rdHk7XG4gICAgICAgICAgICAgICAgY29uc3QgandrID0geyBrdHk6IGtleVR5cGUsIG46IG1vZHVsdXMsIGU6IGV4cG9uZW50IH07XG4gICAgICAgICAgICAgICAgY29uc3QgY3VyclBlbSA9IGp3a190b19wZW1fMS5kZWZhdWx0KGp3ayk7XG4gICAgICAgICAgICAgICAgcGVtc1trZXlJZF0gPSBjdXJyUGVtO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gdmFsaWRhdGUgdGhlIHRva2VuXG4gICAgICAgICAgICBjb25zdCBkZWNvZGVkSnd0ID0ganNvbndlYnRva2VuXzEuZGVmYXVsdC5kZWNvZGUodG9rZW4sIHsgY29tcGxldGU6IHRydWUgfSk7XG4gICAgICAgICAgICBpZiAoIWRlY29kZWRKd3QpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdCBhIHZhbGlkIEpXVCB0b2tlbicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3Qgand0SGVhZGVyID0gZGVjb2RlZEp3dCAmJiBkZWNvZGVkSnd0LmhlYWRlcjtcbiAgICAgICAgICAgIGNvbnN0IGtpZCA9IGp3dEhlYWRlci5raWQ7XG4gICAgICAgICAgICBjb25zdCBwZW0gPSBwZW1zW2tpZF07XG4gICAgICAgICAgICBpZiAoIXBlbSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCB0b2tlbicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICBqc29ud2VidG9rZW5fMS5kZWZhdWx0LnZlcmlmeSh0b2tlbiwgcGVtLCAoZXJyLCBwYXlsb2FkKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBUb2tlbi4nKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdWYWxpZCBUb2tlbi4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXMoeyBzdGF0dXM6IDIwMCwgZGF0YTogcGF5bG9hZCB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBnZXRVc2VyKHVzZXJuYW1lKSB7XG4gICAgICAgIGNvbnN0IHVzZXJEYXRhID0ge1xuICAgICAgICAgICAgVXNlcm5hbWU6IHVzZXJuYW1lLFxuICAgICAgICAgICAgUG9vbDogdGhpcy51c2VyUG9vbCxcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgY29nbml0b1VzZXIgPSBuZXcgYW1hem9uX2NvZ25pdG9faWRlbnRpdHlfanNfMS5Db2duaXRvVXNlcih1c2VyRGF0YSk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCd1c2VyZGF0YScsIHVzZXJEYXRhKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coY29nbml0b1VzZXIpO1xuICAgICAgICByZXR1cm47XG4gICAgICAgIGlmIChjb2duaXRvVXNlciAhPT0gbnVsbCkge1xuICAgICAgICAgICAgY29nbml0b1VzZXIuZ2V0U2Vzc2lvbigoZXJyLCBzZXNzaW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzZXNzaW9uIHZhbGlkaXR5OiAnICsgc2Vzc2lvbi5pc1ZhbGlkKCkpO1xuICAgICAgICAgICAgICAgIGF3c19zZGtfMS5kZWZhdWx0LmNvbmZpZy5jcmVkZW50aWFscyA9IG5ldyBhd3Nfc2RrXzEuZGVmYXVsdC5Db2duaXRvSWRlbnRpdHlDcmVkZW50aWFscyh7XG4gICAgICAgICAgICAgICAgICAgIElkZW50aXR5UG9vbElkOiAnLi4uJyxcbiAgICAgICAgICAgICAgICAgICAgTG9naW5zOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBDaGFuZ2UgdGhlIGtleSBiZWxvdyBhY2NvcmRpbmcgdG8gdGhlIHNwZWNpZmljIHJlZ2lvbiB5b3VyIHVzZXIgcG9vbCBpcyBpbi5cbiAgICAgICAgICAgICAgICAgICAgICAgICdjb2duaXRvLWlkcC48cmVnaW9uPi5hbWF6b25hd3MuY29tLzxZT1VSX1VTRVJfUE9PTF9JRD4nOiBzZXNzaW9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldElkVG9rZW4oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXRKd3RUb2tlbigpLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIC8vIEluc3RhbnRpYXRlIGF3cyBzZGsgc2VydmljZSBvYmplY3RzIG5vdyB0aGF0IHRoZSBjcmVkZW50aWFscyBoYXZlIGJlZW4gdXBkYXRlZC5cbiAgICAgICAgICAgICAgICAvLyBleGFtcGxlOiB2YXIgczMgPSBuZXcgQVdTLlMzKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMuYWRtaW5Db250cm9sbGVyID0gbmV3IEFkbWluQ29udHJvbGxlcihjb25maWdfMS5jb25maWcpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5mdW5jdGlvbiBfX2V4cG9ydChtKSB7XG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAoIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xufVxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuX19leHBvcnQocmVxdWlyZShcIi4vbWFpblwiKSk7XG5fX2V4cG9ydChyZXF1aXJlKFwiLi9hZG1pblwiKSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgdXVpZF8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJ1dWlkXCIpKTtcbmNvbnN0IGNvbmZpZ18xID0gcmVxdWlyZShcIi4uL2NvbmZpZ1wiKTtcbmNsYXNzIE1haW5Db250cm9sbGVyIHtcbiAgICBjb25zdHJ1Y3Rvcihjb25maWdJbnN0YW5jZSkge1xuICAgICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZ0luc3RhbmNlO1xuICAgIH1cbiAgICByb290KHJlcSwgcmVzKSB7XG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuc2VuZCh7XG4gICAgICAgICAgICBtZXNzYWdlOiB0aGlzLmNvbmZpZy5nZXQoJ0FQUF9OQU1FJyksXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBzdGF0dXMocmVxLCByZXMpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuc2VuZCh7XG4gICAgICAgICAgICAgICAgYXBwTmFtZTogdGhpcy5jb25maWcuZ2V0KCdBUFBfTkFNRScpLFxuICAgICAgICAgICAgICAgIGRlYnVnOiB0aGlzLmNvbmZpZy5pc0RlYnVnKCksXG4gICAgICAgICAgICAgICAgZW52aXJvbm1lbnROYW1lOiB0aGlzLmNvbmZpZy5nZXRFbnYoKSxcbiAgICAgICAgICAgICAgICBzdGF0dXM6ICdvaycsXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogdXVpZF8xLmRlZmF1bHQudjQoKSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5leHBvcnRzLm1haW5Db250cm9sbGVyID0gbmV3IE1haW5Db250cm9sbGVyKGNvbmZpZ18xLmNvbmZpZyk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNsYXNzIEdhbWUge1xuICAgIGNvbnN0cnVjdG9yKHsgaWQsIG5hbWUsIHN0YXJ0ZWQsIGZpbmlzaGVkLCBwbGF5ZXJzLCB1c2VycywgbG9nIH0pIHtcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLnN0YXJ0ZWQgPSBzdGFydGVkIHx8IGZhbHNlO1xuICAgICAgICB0aGlzLmZpbmlzaGVkID0gZmluaXNoZWQgfHwgZmFsc2U7XG4gICAgICAgIHRoaXMucGxheWVycyA9IHBsYXllcnM7XG4gICAgICAgIHRoaXMudXNlcnMgPSB1c2VycyB8fCBbXTtcbiAgICAgICAgdGhpcy5sb2cgPSBsb2cgfHwgW107XG4gICAgfVxufVxuZXhwb3J0cy5HYW1lID0gR2FtZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgYXBvbGxvX2RhdGFzb3VyY2VfMSA9IHJlcXVpcmUoXCJhcG9sbG8tZGF0YXNvdXJjZVwiKTtcbmNvbnN0IHVuaXF1ZV9uYW1lc19nZW5lcmF0b3JfMSA9IHJlcXVpcmUoXCJ1bmlxdWUtbmFtZXMtZ2VuZXJhdG9yXCIpO1xuY29uc3QgZ2FtZV9kYXRhXzEgPSByZXF1aXJlKFwiLi9nYW1lLmRhdGFcIik7XG5jbGFzcyBHYW1lU2VydmljZSBleHRlbmRzIGFwb2xsb19kYXRhc291cmNlXzEuRGF0YVNvdXJjZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuZ2FtZXMgPSBuZXcgTWFwKCk7XG4gICAgfVxuICAgIGluaXRpYWxpemUoKSB7XG4gICAgICAgIC8vXG4gICAgICAgIGNvbnNvbGUubG9nKCcuLi5pbml0aWFsaXplLi4uJyk7XG4gICAgfVxuICAgIGNyZWF0ZUdhbWUoZ2FtZU9iamVjdCwgdXNlcklkKSB7XG4gICAgICAgIGNvbnN0IGdhbWVJZCA9IG5ld0lkKCk7XG4gICAgICAgIGNvbnN0IGdhbWUgPSB7XG4gICAgICAgICAgICBpZDogZ2FtZUlkLFxuICAgICAgICAgICAgbmFtZTogZ2FtZU9iamVjdC5nYW1lTmFtZSxcbiAgICAgICAgICAgIHBsYXllcnM6IGdhbWVPYmplY3QucGxheWVycyxcbiAgICAgICAgICAgIHVzZXJzOiBbXG4gICAgICAgICAgICAgICAgdXNlcklkXG4gICAgICAgICAgICBdLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmdhbWVzLnNldChnYW1lSWQsIG5ldyBnYW1lX2RhdGFfMS5HYW1lKGdhbWUpKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2FtZXMuZ2V0KGdhbWVJZCk7XG4gICAgfVxuICAgIHVwZGF0ZUdhbWUoZ2FtZVVwZGF0ZWQpIHtcbiAgICAgICAgY29uc3QgeyBpZCB9ID0gZ2FtZVVwZGF0ZWQ7XG4gICAgICAgIHRoaXMuZ2FtZXMuc2V0KGlkLCBnYW1lVXBkYXRlZCk7XG4gICAgICAgIHJldHVybiB0aGlzLmdhbWVzLmdldChpZCk7XG4gICAgfVxuICAgIGdldEdhbWUoZ2FtZUlkKSB7XG4gICAgICAgIGlmICghZ2FtZUlkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0EgZ2FtZSBpZCBzaG91bGQgYmUgc3BlY2lmaWVkLicpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmdhbWVzLmdldChnYW1lSWQpO1xuICAgIH1cbiAgICBzdGFydEdhbWUoZ2FtZUlkKSB7XG4gICAgICAgIGlmICghZ2FtZUlkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0EgZ2FtZSBpZCBzaG91bGQgYmUgc3BlY2lmaWVkLicpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGdhbWUgPSB0aGlzLmdhbWVzLmdldChnYW1lSWQpO1xuICAgICAgICBpZiAoZ2FtZSAmJiBnYW1lLnN0YXJ0ZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgR2FtZSAke2dhbWUgJiYgZ2FtZS5pZH0gYWxyZWFkeSBzdGFydGVkLmApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChnYW1lICYmIGdhbWUuaWQgJiYgZ2FtZS5uYW1lKSB7XG4gICAgICAgICAgICBjb25zdCBnYW1lVXBkYXRlZCA9IE9iamVjdC5hc3NpZ24oe30sIGdhbWUsIHsgc3RhcnRlZDogdHJ1ZSB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdhbWVzLnNldChnYW1lSWQsIGdhbWVVcGRhdGVkKTtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgZ2FtZScpO1xuICAgIH1cbiAgICBnZXRHYW1lcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2FtZXM7XG4gICAgfVxufVxuZXhwb3J0cy5HYW1lU2VydmljZSA9IEdhbWVTZXJ2aWNlO1xuLy8gLS0tLS0gSGVscGVyIEZ1bmN0aW9ucyAtLS0tLVxuZnVuY3Rpb24gbmV3SWQoKSB7XG4gICAgcmV0dXJuIHVuaXF1ZV9uYW1lc19nZW5lcmF0b3JfMS51bmlxdWVOYW1lc0dlbmVyYXRvcignXycpO1xufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBnYW1lX3NlcnZpY2VfMSA9IHJlcXVpcmUoXCIuL2dhbWUuc2VydmljZVwiKTtcbmNvbnN0IHVzZXJfc2VydmljZV8xID0gcmVxdWlyZShcIi4vdXNlci5zZXJ2aWNlXCIpO1xuLy8gVE9ETzogV2Ugd2lsbCBub3QgcGFzcyBkYXRhU291cmNlcyB2aWEgY29udGV4dCBiZWNhdXNlIHRoaXMgZG9lcyBub3Qgd29yayB3aXRoIHN1YnNjcmlwdGlvbnNcbi8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vYXBvbGxvZ3JhcGhxbC9hcG9sbG8tc2VydmVyL2lzc3Vlcy8xNTI2XG4vLyBTZXQgdXAgdGhlIGRhdGFTb3VyY2VzIG5lZWRlZCBieSBvdXIgcmVzb2x2ZXJzXG4vLyBleHBvcnQgY29uc3QgZGF0YVNvdXJjZXMgPSAoKSA9PiAoe1xuLy8gICAgIGdhbWVTZXJ2aWNlOiBuZXcgR2FtZVNlcnZpY2UoKVxuLy8gfSk7XG5leHBvcnRzLmRhdGFTb3VyY2VzID0ge1xuICAgIGdhbWVTZXJ2aWNlOiBuZXcgZ2FtZV9zZXJ2aWNlXzEuR2FtZVNlcnZpY2UoKSxcbiAgICB1c2VyU2VydmljZTogbmV3IHVzZXJfc2VydmljZV8xLlVzZXJTZXJ2aWNlKCksXG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jbGFzcyBVc2VyIHtcbiAgICBjb25zdHJ1Y3Rvcih1c2VySWQpIHtcbiAgICAgICAgdGhpcy5pZCA9IHVzZXJJZDtcbiAgICAgICAgdGhpcy5nYW1lcyA9IFtdO1xuICAgIH1cbn1cbmV4cG9ydHMuVXNlciA9IFVzZXI7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGFwb2xsb19kYXRhc291cmNlXzEgPSByZXF1aXJlKFwiYXBvbGxvLWRhdGFzb3VyY2VcIik7XG5jb25zdCB1c2VyX2RhdGFfMSA9IHJlcXVpcmUoXCIuL3VzZXIuZGF0YVwiKTtcbmNsYXNzIFVzZXJTZXJ2aWNlIGV4dGVuZHMgYXBvbGxvX2RhdGFzb3VyY2VfMS5EYXRhU291cmNlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy51c2VycyA9IG5ldyBNYXAoKTtcbiAgICB9XG4gICAgaW5pdGlhbGl6ZSgpIHtcbiAgICAgICAgY29uc29sZS5sb2coJy4uLmluaXRpYWxpemUuLi4nKTtcbiAgICB9XG4gICAgY3JlYXRlVXNlcih1c2VySWQpIHtcbiAgICAgICAgdGhpcy51c2Vycy5zZXQodXNlcklkLCBuZXcgdXNlcl9kYXRhXzEuVXNlcih1c2VySWQpKTtcbiAgICAgICAgcmV0dXJuIHRoaXMudXNlcnMuZ2V0KHVzZXJJZCk7XG4gICAgfVxuICAgIGdldFVzZXIodXNlcklkKSB7XG4gICAgICAgIGlmICghdXNlcklkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0EgdXNlciBpZCBzaG91bGQgYmUgc3BlY2lmaWVkLicpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy51c2Vycy5nZXQodXNlcklkKSkge1xuICAgICAgICAgICAgdGhpcy5jcmVhdGVVc2VyKHVzZXJJZCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMudXNlcnMuZ2V0KHVzZXJJZCk7XG4gICAgfVxuICAgIGdldFVzZXJzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy51c2VycztcbiAgICB9XG59XG5leHBvcnRzLlVzZXJTZXJ2aWNlID0gVXNlclNlcnZpY2U7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IG1lcmdlX2dyYXBocWxfc2NoZW1hc18xID0gcmVxdWlyZShcIm1lcmdlLWdyYXBocWwtc2NoZW1hc1wiKTtcbmNvbnN0IGdhbWVfcmVzb2x2ZXJzXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vcmVzb2x2ZXJzL2dhbWUucmVzb2x2ZXJzXCIpKTtcbmNvbnN0IHVzZXJzX3Jlc29sdmVyc18xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL3Jlc29sdmVycy91c2Vycy5yZXNvbHZlcnNcIikpO1xuY29uc3QgcmVzb2x2ZXJzQXJyYXkgPSBbZ2FtZV9yZXNvbHZlcnNfMS5kZWZhdWx0LCB1c2Vyc19yZXNvbHZlcnNfMS5kZWZhdWx0XTtcbmV4cG9ydHMucmVzb2x2ZXJzID0gbWVyZ2VfZ3JhcGhxbF9zY2hlbWFzXzEubWVyZ2VSZXNvbHZlcnMocmVzb2x2ZXJzQXJyYXkpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBhcG9sbG9fc2VydmVyXzEgPSByZXF1aXJlKFwiYXBvbGxvLXNlcnZlclwiKTtcbmNvbnN0IGdldF8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJsb2Rhc2gvZ2V0XCIpKTtcbmNvbnN0IGRhdGFzb3VyY2VzXzEgPSByZXF1aXJlKFwiLi4vLi4vZGF0YXNvdXJjZXNcIik7XG5jb25zdCBwdWJzdWIgPSBuZXcgYXBvbGxvX3NlcnZlcl8xLlB1YlN1YigpO1xuY29uc3QgdmFsaWRNZWVwbGVDb2xvciA9IFsnZ3JlZW4nLCAncmVkJywgJ2JsdWUnLCAneWVsbG93JywgJ2JsYWNrJywgJ2dyYXknXTtcbmNvbnN0IHNhbml0aXplSW5wdXQgPSAoaW5wdXQpID0+IFN0cmluZyhpbnB1dCkucmVwbGFjZSgvW15cXHdcXHNdfFxcc3syLH0vZywgJycpLnRyaW0oKTtcbmNvbnN0IHZhbGlkYXRlQ29sb3IgPSAoY29sb3IpID0+IEJvb2xlYW4ofnZhbGlkTWVlcGxlQ29sb3IuaW5kZXhPZihjb2xvcikpICYmIFN0cmluZyhjb2xvcik7XG5jb25zdCB2YWxpZGF0ZVBsYXllciA9IChwbGF5ZXJOYW1lKSA9PiB7XG4gICAgY29uc3QgcGxheWVyTnVtYmVyID0gTnVtYmVyKHBsYXllck5hbWUucmVwbGFjZSgvcGxheWVyLywgJycpKTtcbiAgICBpZiAocGxheWVyTnVtYmVyID4gMCAmJiBwbGF5ZXJOdW1iZXIgPCA3KSB7XG4gICAgICAgIHJldHVybiBgcGxheWVyJHtwbGF5ZXJOdW1iZXJ9YDtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufTtcbmNvbnN0IEFVVEhPUl9NVVRBVEVEID0gJ3Rlc3QnO1xuZXhwb3J0cy5kZWZhdWx0ID0ge1xuICAgIFF1ZXJ5OiB7XG4gICAgICAgIGdhbWUocGFyZW50LCBhcmdzLCBjb250ZXh0KSB7XG4gICAgICAgICAgICAvLyBpZiAoY29udGV4dC5hdXRoU2NvcGUgIT09ICdBRE1JTicpIHtcbiAgICAgICAgICAgIC8vICAgdGhyb3cgbmV3IEF1dGhlbnRpY2F0aW9uRXJyb3IoJ25vdCBhZG1pbicpO1xuICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgY29uc3QgeyBnYW1lSWQgfSA9IGFyZ3M7XG4gICAgICAgICAgICBjb25zdCBnYW1lID0gZGF0YXNvdXJjZXNfMS5kYXRhU291cmNlcy5nYW1lU2VydmljZS5nZXRHYW1lKGdhbWVJZCk7XG4gICAgICAgICAgICBpZiAoZ2FtZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBnYW1lO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gdGhyb3cgbmV3IEFwb2xsb0Vycm9yKGBHYW1lICR7YXJncy5pZH0gZG9lcyBub3QgZXhpc3RgKTtcbiAgICAgICAgICAgIHRocm93IG5ldyBhcG9sbG9fc2VydmVyXzEuVmFsaWRhdGlvbkVycm9yKGBHYW1lIElEIG5vdCBmb3VuZGApO1xuICAgICAgICB9LFxuICAgICAgICBnYW1lcygpIHtcbiAgICAgICAgICAgIHJldHVybiBkYXRhc291cmNlc18xLmRhdGFTb3VyY2VzLmdhbWVTZXJ2aWNlLmdldEdhbWVzKCk7XG4gICAgICAgIH0sXG4gICAgfSxcbiAgICBTdWJzY3JpcHRpb246IHtcbiAgICAgICAgY29ubmVjdEdhbWVzOiB7XG4gICAgICAgICAgICBzdWJzY3JpYmU6ICgpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcHVic3ViLmFzeW5jSXRlcmF0b3IoW0FVVEhPUl9NVVRBVEVEXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuICAgIE11dGF0aW9uOiB7XG4gICAgICAgIG5ld0dhbWUocGFyZW50LCBhcmdzLCBjb250ZXh0KSB7XG4gICAgICAgICAgICBjb25zdCB7IGdhbWVOYW1lLCBwbGF5ZXJzIH0gPSBhcmdzO1xuICAgICAgICAgICAgY29uc3QgdXNlcklkID0gZ2V0XzEuZGVmYXVsdChjb250ZXh0LCAndXNlckRhdGEuZGF0YS51c2VybmFtZScpO1xuICAgICAgICAgICAgY29uc3Qgc2FuaXRpemVkR2FtZU5hbWUgPSBzYW5pdGl6ZUlucHV0KGdhbWVOYW1lKTtcbiAgICAgICAgICAgIGNvbnN0IHNhbml0aXplZFBsYXllcnMgPSBwbGF5ZXJzLm1hcCgocGxheWVyKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBuYW1lLCBjb2xvciwga2V5IH0gPSBwbGF5ZXI7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ25hbWUnLCBuYW1lKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnY29sb3InLCBjb2xvcik7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2tleScsIGtleSk7XG4gICAgICAgICAgICAgICAgaWYgKCEobmFtZSAmJiBjb2xvciAmJiBrZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBhcG9sbG9fc2VydmVyXzEuVmFsaWRhdGlvbkVycm9yKGBJbnZhbGlkIHJlcXVlc3RgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgbWVlcGxlQ29sb3IgPSB2YWxpZGF0ZUNvbG9yKGNvbG9yKTtcbiAgICAgICAgICAgICAgICBjb25zdCBwbGF5ZXJLZXkgPSB2YWxpZGF0ZVBsYXllcihrZXkpO1xuICAgICAgICAgICAgICAgIGlmICghKG1lZXBsZUNvbG9yICYmIHBsYXllcktleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IGFwb2xsb19zZXJ2ZXJfMS5WYWxpZGF0aW9uRXJyb3IoYEludmFsaWQgcmVxdWVzdGApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiBzYW5pdGl6ZUlucHV0KHBsYXllci5uYW1lKSxcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6IG1lZXBsZUNvbG9yLFxuICAgICAgICAgICAgICAgICAgICBrZXk6IHBsYXllcktleVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNvbnN0IGlzVmFsaWRSZXF1ZXN0ID0gc2FuaXRpemVkR2FtZU5hbWUgJiYgc2FuaXRpemVkUGxheWVycyAmJiBBcnJheS5pc0FycmF5KHBsYXllcnMpICYmIHBsYXllcnMubGVuZ3RoIDwgNztcbiAgICAgICAgICAgIGlmICghaXNWYWxpZFJlcXVlc3QpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgYXBvbGxvX3NlcnZlcl8xLlZhbGlkYXRpb25FcnJvcihgSW52YWxpZCByZXF1ZXN0YCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBnYW1lT2JqID0ge1xuICAgICAgICAgICAgICAgIGdhbWVOYW1lOiBzYW5pdGl6ZWRHYW1lTmFtZSxcbiAgICAgICAgICAgICAgICBwbGF5ZXJzOiBzYW5pdGl6ZWRQbGF5ZXJzLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGlmICh1c2VySWQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBnYW1lID0gZGF0YXNvdXJjZXNfMS5kYXRhU291cmNlcy5nYW1lU2VydmljZS5jcmVhdGVHYW1lKGdhbWVPYmosIHVzZXJJZCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGFzb3VyY2VzXzEuZGF0YVNvdXJjZXMuZ2FtZVNlcnZpY2UuZ2V0R2FtZShnYW1lLmlkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRocm93IG5ldyBhcG9sbG9fc2VydmVyXzEuVmFsaWRhdGlvbkVycm9yKGBVbmF1dGhlbnRpY2F0ZWQgdXNlciByZXF1ZXN0YCk7XG4gICAgICAgIH0sXG4gICAgICAgIGpvaW5HYW1lKHBhcmVudCwgYXJncywgY29udGV4dCkge1xuICAgICAgICAgICAgY29uc3QgeyBnYW1lSWQgfSA9IGFyZ3M7XG4gICAgICAgICAgICBjb25zdCB1c2VySWQgPSBjb250ZXh0ICYmIGNvbnRleHQudXNlckRhdGEgJiYgY29udGV4dC51c2VyRGF0YS5kYXRhICYmIGNvbnRleHQudXNlckRhdGEuZGF0YS51c2VybmFtZTtcbiAgICAgICAgICAgIGNvbnN0IGdhbWUgPSBkYXRhc291cmNlc18xLmRhdGFTb3VyY2VzLmdhbWVTZXJ2aWNlLmdldEdhbWUoZ2FtZUlkKTtcbiAgICAgICAgICAgIGlmICghdXNlcklkKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1VuYXV0aGVudGljYXRlZCB1c2VyIHJlcXVlc3QnKTtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgYXBvbGxvX3NlcnZlcl8xLlZhbGlkYXRpb25FcnJvcihgVW5hdXRoZW50aWNhdGVkIHVzZXIgcmVxdWVzdGApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFnYW1lKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0dhbWVJRCBub3QgZm91bmQnKTtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgYXBvbGxvX3NlcnZlcl8xLlZhbGlkYXRpb25FcnJvcihgR2FtZUlEIG5vdCBmb3VuZGApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgaW5kZXggPSBnYW1lLnVzZXJzLmluZGV4T2YodXNlcklkKTtcbiAgICAgICAgICAgIGNvbnN0IHVzZXJJZE1hdGNoZXMgPSBnYW1lLnVzZXJzW2luZGV4XSA9PT0gdXNlcklkO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2dhbWUudXNlcnMnLCBnYW1lLnVzZXJzKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdpbmRleCcsIGluZGV4KTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCd1c2VySWRNYXRjaGVzJywgdXNlcklkTWF0Y2hlcyk7XG4gICAgICAgICAgICBpZiAoIXVzZXJJZE1hdGNoZXMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBnYW1lVXBkYXRlZCA9IE9iamVjdC5hc3NpZ24oe30sIGdhbWUsIHsgdXNlcnM6IFsuLi5nYW1lLnVzZXJzLCB1c2VySWRdIH0pO1xuICAgICAgICAgICAgICAgIGRhdGFzb3VyY2VzXzEuZGF0YVNvdXJjZXMuZ2FtZVNlcnZpY2UudXBkYXRlR2FtZShnYW1lVXBkYXRlZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZGF0YXNvdXJjZXNfMS5kYXRhU291cmNlcy5nYW1lU2VydmljZS5nZXRHYW1lKGdhbWVJZCk7XG4gICAgICAgIH0sXG4gICAgICAgIHN0YXJ0R2FtZShwYXJlbnQsIGFyZ3MsIGNvbnRleHQpIHtcbiAgICAgICAgICAgIGNvbnN0IHsgZ2FtZUlkIH0gPSBhcmdzO1xuICAgICAgICAgICAgY29uc3QgdXNlcklkID0gY29udGV4dCAmJiBjb250ZXh0LnVzZXJEYXRhICYmIGNvbnRleHQudXNlckRhdGEuZGF0YSAmJiBjb250ZXh0LnVzZXJEYXRhLmRhdGEudXNlcm5hbWU7XG4gICAgICAgICAgICBjb25zdCBnYW1lID0gZGF0YXNvdXJjZXNfMS5kYXRhU291cmNlcy5nYW1lU2VydmljZS5nZXRHYW1lKGdhbWVJZCk7XG4gICAgICAgICAgICBpZiAoIXVzZXJJZCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBhcG9sbG9fc2VydmVyXzEuVmFsaWRhdGlvbkVycm9yKGBVbmF1dGhlbnRpY2F0ZWQgdXNlciByZXF1ZXN0YCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWdhbWUpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgYXBvbGxvX3NlcnZlcl8xLlZhbGlkYXRpb25FcnJvcihgR2FtZUlEIG5vdCBmb3VuZGApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgaW5kZXggPSBnYW1lLnBsYXllcnMuaW5kZXhPZih1c2VySWQpO1xuICAgICAgICAgICAgY29uc3QgdXNlcklkTWF0Y2hlcyA9IGdhbWUucGxheWVyc1tpbmRleF0gPT09IHVzZXJJZDtcbiAgICAgICAgICAgIGlmICh+aW5kZXggJiYgdXNlcklkTWF0Y2hlcykge1xuICAgICAgICAgICAgICAgIGRhdGFzb3VyY2VzXzEuZGF0YVNvdXJjZXMuZ2FtZVNlcnZpY2Uuc3RhcnRHYW1lKGdhbWVJZCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGFzb3VyY2VzXzEuZGF0YVNvdXJjZXMuZ2FtZVNlcnZpY2UuZ2V0R2FtZShnYW1lSWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhyb3cgbmV3IGFwb2xsb19zZXJ2ZXJfMS5WYWxpZGF0aW9uRXJyb3IoYFVuYXV0aGVudGljYXRlZCB1c2VyIHJlcXVlc3RgKTtcbiAgICAgICAgfSxcbiAgICB9LFxufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgZGF0YXNvdXJjZXNfMSA9IHJlcXVpcmUoXCIuLi8uLi9kYXRhc291cmNlc1wiKTtcbmV4cG9ydHMuZGVmYXVsdCA9IHtcbiAgICBRdWVyeToge1xuICAgICAgICB1c2VyKHBhcmVudCwgYXJncywgY29udGV4dCkge1xuICAgICAgICAgICAgY29uc3QgdXNlciA9IGNvbnRleHQgJiYgY29udGV4dC51c2VyRGF0YSAmJiBjb250ZXh0LnVzZXJEYXRhLmRhdGE7XG4gICAgICAgICAgICBjb25zdCB1c2VySWQgPSB1c2VyICYmIHVzZXIudXNlcm5hbWU7XG4gICAgICAgICAgICByZXR1cm4gZGF0YXNvdXJjZXNfMS5kYXRhU291cmNlcy51c2VyU2VydmljZS5nZXRVc2VyKHVzZXJJZCk7XG4gICAgICAgIH0sXG4gICAgICAgIHVzZXJzKCkge1xuICAgICAgICAgICAgcmV0dXJuIGRhdGFzb3VyY2VzXzEuZGF0YVNvdXJjZXMudXNlclNlcnZpY2UuZ2V0VXNlcnMoKTtcbiAgICAgICAgfSxcbiAgICB9LFxufTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgbWVyZ2VfZ3JhcGhxbF9zY2hlbWFzXzEgPSByZXF1aXJlKFwibWVyZ2UtZ3JhcGhxbC1zY2hlbWFzXCIpO1xuY29uc3QgZ2FtZV8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL3R5cGVkZWZzL2dhbWVcIikpO1xuY29uc3QgbG9nXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vdHlwZWRlZnMvbG9nXCIpKTtcbmNvbnN0IHBsYXllcl8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL3R5cGVkZWZzL3BsYXllclwiKSk7XG5jb25zdCB1c2Vyc18xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL3R5cGVkZWZzL3VzZXJzXCIpKTtcbmNvbnN0IHR5cGVzID0gW2dhbWVfMS5kZWZhdWx0LCBsb2dfMS5kZWZhdWx0LCBwbGF5ZXJfMS5kZWZhdWx0LCB1c2Vyc18xLmRlZmF1bHRdO1xuLy8gTk9URTogMm5kIHBhcmFtIGlzIG9wdGlvbmFsLCBhbmQgZGVmYXVsdHMgdG8gZmFsc2Vcbi8vIE9ubHkgdXNlIGlmIHlvdSBoYXZlIGRlZmluZWQgdGhlIHNhbWUgdHlwZSBtdWx0aXBsZSB0aW1lcyBpblxuLy8gZGlmZmVyZW50IGZpbGVzIGFuZCB3aXNoIHRvIGF0dGVtcHQgbWVyZ2luZyB0aGVtIHRvZ2V0aGVyLlxuZXhwb3J0cy50eXBlRGVmcyA9IG1lcmdlX2dyYXBocWxfc2NoZW1hc18xLm1lcmdlVHlwZXModHlwZXMsIHsgYWxsOiB0cnVlIH0pO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmRlZmF1bHQgPSBgXG4gIGVudW0gQ29sb3Ige1xuICAgIHJlZFxuICAgIGdyZWVuXG4gICAgYmx1ZVxuICAgIHllbGxvd1xuICAgIGJsYWNrXG4gICAgZ3JheVxuICB9XG5cbiAgaW5wdXQgUGxheWVySW5mb0lucHV0IHtcbiAgICBuYW1lOiBTdHJpbmchXG4gICAga2V5OiBTdHJpbmchXG4gICAgY29sb3I6IENvbG9yIVxuICB9XG5cbiAgdHlwZSBQbGF5ZXJJbmZvIHtcbiAgICBuYW1lOiBTdHJpbmchXG4gICAga2V5OiBTdHJpbmchXG4gICAgY29sb3I6IENvbG9yIVxuICB9XG5cblxuICB0eXBlIEdhbWUge1xuICAgIGlkOiBJRCFcbiAgICBuYW1lOiBTdHJpbmchXG4gICAgcGxheWVyczogW1BsYXllckluZm9dIVxuICAgIHVzZXJzOiBbU3RyaW5nIV1cbiAgICBzdGFydGVkOiBCb29sZWFuIVxuICAgIGZpbmlzaGVkOiBCb29sZWFuIVxuICAgICMgbG9nOiBMb2dcbiAgfVxuXG4gIHR5cGUgTXV0YXRpb24ge1xuICAgIG5ld0dhbWUoZ2FtZU5hbWU6IFN0cmluZyEgcGxheWVyczogW1BsYXllckluZm9JbnB1dCFdISk6IEdhbWVcbiAgICBzdGFydEdhbWUoZ2FtZUlkOiBTdHJpbmchKTogR2FtZVxuICAgIGpvaW5HYW1lKGdhbWVJZDogU3RyaW5nISk6IEdhbWVcbiAgfVxuXG4gIHR5cGUgUXVlcnkge1xuICAgIGdhbWVzOiBbR2FtZV1cbiAgICBnYW1lKGdhbWVJZDogU3RyaW5nISk6IEdhbWVcbiAgfVxuXG4gIHR5cGUgU3Vic2NyaXB0aW9uIHtcbiAgICBjb25uZWN0R2FtZXM6IFtHYW1lXVxuICB9XG5gO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmRlZmF1bHQgPSBgXG4gIHR5cGUgTG9nIHtcbiAgICBwbGF5ZXJJZDogSUQhXG4gICAgdGltZXN0YW1wOiBJbnQhXG4gICAgc2NvcmU6IEludCFcbiAgfVxuYDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gYFxuICB0eXBlIFBsYXllciB7XG4gICAgaWQ6IElEIVxuICAgIG5hbWU6IFN0cmluZyFcbiAgICBjb2xvcjogQ29sb3IhXG4gICAgdG90YWxTY29yZTogSW50XG4gIH1cblxuICBlbnVtIENvbG9yIHtcbiAgICBSRURcbiAgICBCTFVFXG4gICAgR1JFRU5cbiAgICBZRUxMT1dcbiAgICBQVVJQTEVcbiAgICBCTEFDS1xuICAgIEdSRVlcbiAgfVxuYDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gYFxuICB0eXBlIFVzZXIge1xuICAgIGlkOiBJRCFcbiAgICBnYW1lczogW1N0cmluZyFdXG4gIH1cblxuICB0eXBlIFF1ZXJ5IHtcbiAgICB1c2VyczogW1VzZXIhXVxuICAgIHVzZXI6IFVzZXJcbiAgfVxuYDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3Qgc2VydmVyXzEgPSByZXF1aXJlKFwiLi9zZXJ2ZXJcIik7XG5jb25zdCBjb25maWdfMSA9IHJlcXVpcmUoXCIuL2NvbmZpZ1wiKTtcbmNvbnN0IGFwcF8xID0gcmVxdWlyZShcIi4vYXBwXCIpO1xuY29uc3QgcG9ydCA9IGNvbmZpZ18xLmNvbmZpZy5nZXRQb3J0KCk7XG5jb25zdCBodHRwU2VydmVyID0gc2VydmVyXzEuc2VydmVyLmluaXQoYXBwXzEuYXBwLmFwcEluc3RhbmNlLCBwb3J0KTtcbmFwcF8xLmFwcC5nZXRBcG9sbG9TZXJ2ZXIoKS50aGVuKChhcG9sbG9TZXJ2ZXIpID0+IHtcbiAgICBhcG9sbG9TZXJ2ZXIuaW5zdGFsbFN1YnNjcmlwdGlvbkhhbmRsZXJzKGh0dHBTZXJ2ZXIpO1xuICAgIHNlcnZlcl8xLnNlcnZlci5zdGFydChhcG9sbG9TZXJ2ZXIpO1xufSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9faW1wb3J0U3RhciA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnRTdGFyKSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcbiAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIHJlc3VsdFtrXSA9IG1vZFtrXTtcbiAgICByZXN1bHRbXCJkZWZhdWx0XCJdID0gbW9kO1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgZXhwcmVzcyA9IF9faW1wb3J0U3RhcihyZXF1aXJlKFwiZXhwcmVzc1wiKSk7XG5jb25zdCBjb250cm9sbGVyc18xID0gcmVxdWlyZShcIi4vY29udHJvbGxlcnNcIik7XG5jb25zdCBjaGVja18xID0gcmVxdWlyZShcImV4cHJlc3MtdmFsaWRhdG9yL2NoZWNrXCIpO1xuY2xhc3MgTWFpblJvdXRlcyB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMucm91dGVyID0gZXhwcmVzcy5Sb3V0ZXIoKTtcbiAgICAgICAgdGhpcy5jb25maWcoKTtcbiAgICB9XG4gICAgY29uZmlnKCkge1xuICAgICAgICB0aGlzLnJvdXRlci5nZXQoJy8nLCAocmVxLCByZXMpID0+IGNvbnRyb2xsZXJzXzEubWFpbkNvbnRyb2xsZXIucm9vdChyZXEsIHJlcykpO1xuICAgICAgICB0aGlzLnJvdXRlci5nZXQoJy9zdGF0dXMnLCAocmVxLCByZXMpID0+IGNvbnRyb2xsZXJzXzEubWFpbkNvbnRyb2xsZXIuc3RhdHVzKHJlcSwgcmVzKSk7XG4gICAgICAgIHRoaXMucm91dGVyLnBvc3QoJy9yZWdpc3RlcicsIFtjaGVja18xLmNoZWNrKCd1c2VybmFtZScpLmlzRW1haWwoKSwgY2hlY2tfMS5jaGVjaygncGFzc3dvcmQnKS5pc0xlbmd0aCh7IG1pbjogNiB9KV0sIChyZXEsIHJlcykgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgY29uc3QgeyB1c2VybmFtZSwgcGFzc3dvcmQgfSA9IHJlcS5ib2R5O1xuICAgICAgICAgICAgY29uc3QgZXJyb3JzID0gY2hlY2tfMS52YWxpZGF0aW9uUmVzdWx0KHJlcSk7XG4gICAgICAgICAgICBpZiAoIWVycm9ycy5pc0VtcHR5KCkpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygndmFsaWRhdGlvblJlc3VsdCcsIGVycm9ycy5hcnJheSgpKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnNlbmRTdGF0dXMoNDAzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHN0YXR1cyA9IHlpZWxkIGNvbnRyb2xsZXJzXzEuYWRtaW5Db250cm9sbGVyLnJlZ2lzdGVyKHVzZXJuYW1lLCBwYXNzd29yZCk7XG4gICAgICAgICAgICByZXMuc2VuZFN0YXR1cyhzdGF0dXMpO1xuICAgICAgICB9KSk7XG4gICAgICAgIHRoaXMucm91dGVyLnBvc3QoJy9jb25maXJtLWNvZGUnLCBbXG4gICAgICAgICAgICBjaGVja18xLmNoZWNrKCd1c2VybmFtZScpLmlzRW1haWwoKSxcbiAgICAgICAgICAgIGNoZWNrXzEuY2hlY2soJ2NvZGUnKVxuICAgICAgICAgICAgICAgIC5pc051bWVyaWMoKVxuICAgICAgICAgICAgICAgIC5pc0xlbmd0aCh7IG1pbjogNiwgbWF4OiA2IH0pLFxuICAgICAgICBdLCAocmVxLCByZXMpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIGNvbnN0IHsgdXNlcm5hbWUsIGNvZGUgfSA9IHJlcS5ib2R5O1xuICAgICAgICAgICAgY29uc3QgZXJyb3JzID0gY2hlY2tfMS52YWxpZGF0aW9uUmVzdWx0KHJlcSk7XG4gICAgICAgICAgICBpZiAoIWVycm9ycy5pc0VtcHR5KCkpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygndmFsaWRhdGlvblJlc3VsdCcsIGVycm9ycy5hcnJheSgpKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnNlbmRTdGF0dXMoNDAzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHN0YXR1cyA9IHlpZWxkIGNvbnRyb2xsZXJzXzEuYWRtaW5Db250cm9sbGVyLmNvbmZpcm1Db2RlKHVzZXJuYW1lLCBjb2RlKTtcbiAgICAgICAgICAgIHJlcy5zZW5kU3RhdHVzKHN0YXR1cyk7XG4gICAgICAgIH0pKTtcbiAgICAgICAgdGhpcy5yb3V0ZXIucG9zdCgnL25ldy1jb25maXJtLWNvZGUnLCBbY2hlY2tfMS5jaGVjaygndXNlcm5hbWUnKS5pc0VtYWlsKCldLCAocmVxLCByZXMpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIGNvbnN0IHsgdXNlcm5hbWUgfSA9IHJlcS5ib2R5O1xuICAgICAgICAgICAgY29uc3QgZXJyb3JzID0gY2hlY2tfMS52YWxpZGF0aW9uUmVzdWx0KHJlcSk7XG4gICAgICAgICAgICBpZiAoIWVycm9ycy5pc0VtcHR5KCkpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygndmFsaWRhdGlvblJlc3VsdCcsIGVycm9ycy5hcnJheSgpKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnNlbmRTdGF0dXMoNDAzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHN0YXR1cyA9IHlpZWxkIGNvbnRyb2xsZXJzXzEuYWRtaW5Db250cm9sbGVyLm5ld0NvbmZpcm1Db2RlKHVzZXJuYW1lKTtcbiAgICAgICAgICAgIHJlcy5zZW5kU3RhdHVzKHN0YXR1cyk7XG4gICAgICAgIH0pKTtcbiAgICAgICAgdGhpcy5yb3V0ZXIucG9zdCgnL2xvZ2luJywgKHJlcSwgcmVzKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICBjb25zdCB7IHVzZXJuYW1lLCBwYXNzd29yZCB9ID0gcmVxLmJvZHk7XG4gICAgICAgICAgICBjb25zdCB1c2VyRGV0YWlscyA9IHlpZWxkIGNvbnRyb2xsZXJzXzEuYWRtaW5Db250cm9sbGVyLmxvZ2luKHVzZXJuYW1lLCBwYXNzd29yZCk7XG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyh1c2VyRGV0YWlscy5zdGF0dXMpLnNlbmQodXNlckRldGFpbHMpO1xuICAgICAgICB9KSk7XG4gICAgICAgIHRoaXMucm91dGVyLnBvc3QoJy92ZXJpZnktdXNlcicsIChyZXEsIHJlcykgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgbGV0IHVzZXJTdGF0dXM7XG4gICAgICAgICAgICBjb25zdCB7IHRva2VuIH0gPSByZXEuYm9keTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgdXNlclN0YXR1cyA9IHlpZWxkIGNvbnRyb2xsZXJzXzEuYWRtaW5Db250cm9sbGVyLlZhbGlkYXRlVG9rZW4odG9rZW4pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zZW5kU3RhdHVzKDQwMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh1c2VyU3RhdHVzKTtcbiAgICAgICAgICAgIHJldHVybiByZXMuc2VuZFN0YXR1cygyMDApO1xuICAgICAgICAgICAgLy8gcmV0dXJuIHJlcy5zdGF0dXModXNlclN0YXR1cy5zdGF0dXMpLnNlbmQodXNlclN0YXR1cyk7XG4gICAgICAgIH0pKTtcbiAgICAgICAgdGhpcy5yb3V0ZXIuZ2V0KCcvdXNlcicsIChyZXEsIHJlcykgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgY29uc3QgeyB1c2VybmFtZSB9ID0gcmVxLmJvZHk7XG4gICAgICAgICAgICBjb25zdCB1c2VyRGF0YSA9IHlpZWxkIGNvbnRyb2xsZXJzXzEuYWRtaW5Db250cm9sbGVyLmdldFVzZXIodXNlcm5hbWUpO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ3VzZXJEYXRhJywgdXNlckRhdGEpO1xuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5zZW5kKHVzZXJEYXRhKTtcbiAgICAgICAgfSkpO1xuICAgIH1cbn1cbmV4cG9ydHMucm91dGVyID0gbmV3IE1haW5Sb3V0ZXMoKS5yb3V0ZXI7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGh0dHBfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiaHR0cFwiKSk7XG5jbGFzcyBTZXJ2ZXIge1xuICAgIGluaXQoZXhwcmVzc0FwcCwgcG9ydE51bWJlcikge1xuICAgICAgICBpZiAodGhpcy5zZXJ2ZXJJbnN0YW5jZSkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgVGhlIHNlcnZlciBpcyBhbHJlYWR5IHJ1bm5pbmcgb24gcG9ydCAke3RoaXMucG9ydE51bWJlcn1gKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNlcnZlckluc3RhbmNlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucG9ydE51bWJlciA9IHBvcnROdW1iZXI7XG4gICAgICAgIHRoaXMuc2VydmVySW5zdGFuY2UgPSBodHRwXzEuZGVmYXVsdC5jcmVhdGVTZXJ2ZXIoZXhwcmVzc0FwcCk7XG4gICAgICAgIHJldHVybiB0aGlzLnNlcnZlckluc3RhbmNlO1xuICAgIH1cbiAgICBzdGFydChhcG9sbG9TZXJ2ZXJBcHApIHtcbiAgICAgICAgaWYgKCF0aGlzLnNlcnZlckluc3RhbmNlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGBObyBzZXJ2ZXIgaGFzIGJlZW4gaW5pdGlhbGl6ZWRgKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNlcnZlckluc3RhbmNlLmxpc3Rlbih0aGlzLnBvcnROdW1iZXIsICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGFkZHJlc3NJbmZvID0gdGhpcy5zZXJ2ZXJJbnN0YW5jZSAmJiB0aGlzLnNlcnZlckluc3RhbmNlLmFkZHJlc3MoKTtcbiAgICAgICAgICAgIGNvbnN0IHBvcnQgPSAncG9ydCcgaW4gYWRkcmVzc0luZm8gPyBhZGRyZXNzSW5mby5wb3J0IDogbnVsbDtcbiAgICAgICAgICAgIGNvbnN0IGFkZHJlc3MgPSAnYWRkcmVzcycgaW4gYWRkcmVzc0luZm9cbiAgICAgICAgICAgICAgICA/IGFkZHJlc3NJbmZvLmFkZHJlc3MgPT09ICc6OidcbiAgICAgICAgICAgICAgICAgICAgPyAnaHR0cDovL2xvY2FsaG9zdDonXG4gICAgICAgICAgICAgICAgICAgIDogYWRkcmVzc0luZm8uYWRkcmVzc1xuICAgICAgICAgICAgICAgIDogJyc7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhg8J+agCAgU2VydmVyIGxpc3RlbmluZyBvbiAke2FkZHJlc3N9JHtwb3J0fWApO1xuICAgICAgICAgICAgY29uc29sZS5sb2coYPCfmoAgIEdyYXBoUUwgcGxheWdyb3VuZCBsaXN0ZW5pbmcgb24gJHthZGRyZXNzfSR7cG9ydH0ke2Fwb2xsb1NlcnZlckFwcC5ncmFwaHFsUGF0aH1gKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGDwn5qAICBTdWJzY3JpcHRpb25zIHJlYWR5IGF0IHdzOi8vbG9jYWxob3N0OiR7cG9ydH0ke2Fwb2xsb1NlcnZlckFwcC5zdWJzY3JpcHRpb25zUGF0aH1gKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuZXhwb3J0cy5zZXJ2ZXIgPSBuZXcgU2VydmVyKCk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJhbWF6b24tY29nbml0by1pZGVudGl0eS1qc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJhcG9sbG8tZGF0YXNvdXJjZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJhcG9sbG8tc2VydmVyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImFwb2xsby1zZXJ2ZXItZXhwcmVzc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJhd3Mtc2RrXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImF4aW9zXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJvZHktcGFyc2VyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvcnNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZG90ZW52XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImV4cHJlc3NcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZXhwcmVzcy12YWxpZGF0b3IvY2hlY2tcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaHR0cFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJqc29ud2VidG9rZW5cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiandrLXRvLXBlbVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJsb2Rhc2gvZ2V0XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1lcmdlLWdyYXBocWwtc2NoZW1hc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtb3JnYW5cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidW5pcXVlLW5hbWVzLWdlbmVyYXRvclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ1dWlkXCIpOyJdLCJzb3VyY2VSb290IjoiIn0=