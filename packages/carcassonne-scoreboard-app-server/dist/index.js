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
        this.app = express_1.default();
        this.admin = admin_1.adminController;
        this.appConfig = appConfig;
        this.config();
    }
    config() {
        this.app.use(morgan_1.default('dev'));
        this.app.disable('x-powered-by');
        this.app.use(cors_1.default());
        // Support application/json type post data
        this.app.use(bodyParser.json());
        // Support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use('/', router_1.router);
        this.applyMiddlewares(this.app);
    }
    applyMiddlewares(expressApp) {
        const apolloServer = new apollo_server_express_1.ApolloServer({
            context: ({ req }) => __awaiter(this, void 0, void 0, function* () {
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
        });
        apolloServer.applyMiddleware({
            app: expressApp,
            path: '/graph',
        });
    }
}
exports.app = new App(config_1.config).app;


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
    constructor({ id, name, started, finished, players, log }) {
        this.id = id;
        this.name = name;
        this.started = started || false;
        this.finished = finished || false;
        this.players = players;
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
    createGame(userId) {
        const gameId = newId();
        const game = {
            id: gameId,
            name: gameId,
            players: [
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

Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = __webpack_require__(/*! apollo-server */ "apollo-server");
const datasources_1 = __webpack_require__(/*! ../../datasources */ "./src/datasources/index.ts");
exports.default = {
    Query: {
        game(parent, args, context) {
            console.log('parent', parent);
            console.log('args', args);
            console.log('context', context);
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
    Mutation: {
        newGame(parent, args, context) {
            const userId = context && context.userData && context.userData.data && context.userData.data.username;
            if (userId) {
                const game = datasources_1.dataSources.gameService.createGame(userId);
                return datasources_1.dataSources.gameService.getGame(game.id);
            }
            throw new apollo_server_1.ValidationError(`Unauthenticated user request`);
        },
        joinGame(parent, args, context) {
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
                const gameUpdated = Object.assign({}, game, { players: [...game.players, userId] });
                datasources_1.dataSources.gameService.updateGame(gameUpdated);
                return datasources_1.dataSources.gameService.getGame(gameId);
            }
            throw new apollo_server_1.ValidationError(`Unauthenticated user request`);
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
  type Game {
    id: ID!
    name: String!
    players: [String!]
    # log: Log
    started: Boolean!
    finished: Boolean!
  }

  type Mutation {
    newGame: Game
    startGame(gameId: String!): Game
    joinGame(gameId: String!): Game
  }

  type Query {
    games: [Game]
    game(gameId: String!): Game
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
server_1.server.start(app_1.app, port);


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

Object.defineProperty(exports, "__esModule", { value: true });
class Server {
    start(expressApp, portNumber) {
        if (this.serverInstance) {
            console.error(`The server is already running on port ${portNumber}`);
            return this.serverInstance;
        }
        this.serverInstance = expressApp.listen(portNumber, () => {
            const addressInfo = this.serverInstance && this.serverInstance.address();
            const port = 'port' in addressInfo ? addressInfo.port : null;
            const address = 'address' in addressInfo
                ? addressInfo.address === '::'
                    ? 'http://localhost:'
                    : addressInfo.address
                : '';
            console.log(`Server listening on ${address}${port}`);
            console.log(`GraphQL playground listening on ${address}${port}/graph`);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29uZmlnLnRzIiwid2VicGFjazovLy8uL3NyYy9jb250cm9sbGVycy9hZG1pbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29udHJvbGxlcnMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRyb2xsZXJzL21haW4udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RhdGFzb3VyY2VzL2dhbWUuZGF0YS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZGF0YXNvdXJjZXMvZ2FtZS5zZXJ2aWNlLnRzIiwid2VicGFjazovLy8uL3NyYy9kYXRhc291cmNlcy9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZGF0YXNvdXJjZXMvdXNlci5kYXRhLnRzIiwid2VicGFjazovLy8uL3NyYy9kYXRhc291cmNlcy91c2VyLnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dyYXBocWwvcmVzb2x2ZXJzLnRzIiwid2VicGFjazovLy8uL3NyYy9ncmFwaHFsL3Jlc29sdmVycy9nYW1lLnJlc29sdmVycy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZ3JhcGhxbC9yZXNvbHZlcnMvdXNlcnMucmVzb2x2ZXJzLnRzIiwid2VicGFjazovLy8uL3NyYy9ncmFwaHFsL3R5cGVkZWZzLnRzIiwid2VicGFjazovLy8uL3NyYy9ncmFwaHFsL3R5cGVkZWZzL2dhbWUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dyYXBocWwvdHlwZWRlZnMvbG9nLnRzIiwid2VicGFjazovLy8uL3NyYy9ncmFwaHFsL3R5cGVkZWZzL3BsYXllci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZ3JhcGhxbC90eXBlZGVmcy91c2Vycy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JvdXRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcImFtYXpvbi1jb2duaXRvLWlkZW50aXR5LWpzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYXBvbGxvLWRhdGFzb3VyY2VcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJhcG9sbG8tc2VydmVyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYXBvbGxvLXNlcnZlci1leHByZXNzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYXdzLXNka1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImF4aW9zXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYm9keS1wYXJzZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJjb3JzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZG90ZW52XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZXhwcmVzc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImV4cHJlc3MtdmFsaWRhdG9yL2NoZWNrXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwianNvbndlYnRva2VuXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiandrLXRvLXBlbVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1lcmdlLWdyYXBocWwtc2NoZW1hc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1vcmdhblwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInVuaXF1ZS1uYW1lcy1nZW5lcmF0b3JcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ1dWlkXCIiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtB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O0FBQ1Q7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyQkEsdUQ7Ozs7Ozs7Ozs7O0FDQUEsOEM7Ozs7Ozs7Ozs7O0FDQUEsMEM7Ozs7Ozs7Ozs7O0FDQUEsa0Q7Ozs7Ozs7Ozs7O0FDQUEsb0M7Ozs7Ozs7Ozs7O0FDQUEsa0M7Ozs7Ozs7Ozs7O0FDQUEsd0M7Ozs7Ozs7Ozs7O0FDQUEsaUM7Ozs7Ozs7Ozs7O0FDQUEsbUM7Ozs7Ozs7Ozs7O0FDQUEsb0M7Ozs7Ozs7Ozs7O0FDQUEsb0Q7Ozs7Ozs7Ozs7O0FDQUEseUM7Ozs7Ozs7Ozs7O0FDQUEsdUM7Ozs7Ozs7Ozs7O0FDQUEsa0Q7Ozs7Ozs7Ozs7O0FDQUEsbUM7Ozs7Ozs7Ozs7O0FDQUEsbUQ7Ozs7Ozs7Ozs7O0FDQUEsaUMiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xudmFyIF9faW1wb3J0U3RhciA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnRTdGFyKSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcbiAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIHJlc3VsdFtrXSA9IG1vZFtrXTtcbiAgICByZXN1bHRbXCJkZWZhdWx0XCJdID0gbW9kO1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgZXhwcmVzc18xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJleHByZXNzXCIpKTtcbmNvbnN0IGFwb2xsb19zZXJ2ZXJfZXhwcmVzc18xID0gcmVxdWlyZShcImFwb2xsby1zZXJ2ZXItZXhwcmVzc1wiKTtcbmNvbnN0IG1vcmdhbl8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJtb3JnYW5cIikpO1xuY29uc3QgY29yc18xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJjb3JzXCIpKTtcbmNvbnN0IGJvZHlQYXJzZXIgPSBfX2ltcG9ydFN0YXIocmVxdWlyZShcImJvZHktcGFyc2VyXCIpKTtcbmNvbnN0IGFkbWluXzEgPSByZXF1aXJlKFwiLi9jb250cm9sbGVycy9hZG1pblwiKTtcbmNvbnN0IGNvbmZpZ18xID0gcmVxdWlyZShcIi4vY29uZmlnXCIpO1xuY29uc3QgdHlwZWRlZnNfMSA9IHJlcXVpcmUoXCIuL2dyYXBocWwvdHlwZWRlZnNcIik7XG5jb25zdCByZXNvbHZlcnNfMSA9IHJlcXVpcmUoXCIuL2dyYXBocWwvcmVzb2x2ZXJzXCIpO1xuY29uc3Qgcm91dGVyXzEgPSByZXF1aXJlKFwiLi9yb3V0ZXJcIik7XG5jbGFzcyBBcHAge1xuICAgIGNvbnN0cnVjdG9yKGFwcENvbmZpZykge1xuICAgICAgICB0aGlzLmFwcCA9IGV4cHJlc3NfMS5kZWZhdWx0KCk7XG4gICAgICAgIHRoaXMuYWRtaW4gPSBhZG1pbl8xLmFkbWluQ29udHJvbGxlcjtcbiAgICAgICAgdGhpcy5hcHBDb25maWcgPSBhcHBDb25maWc7XG4gICAgICAgIHRoaXMuY29uZmlnKCk7XG4gICAgfVxuICAgIGNvbmZpZygpIHtcbiAgICAgICAgdGhpcy5hcHAudXNlKG1vcmdhbl8xLmRlZmF1bHQoJ2RldicpKTtcbiAgICAgICAgdGhpcy5hcHAuZGlzYWJsZSgneC1wb3dlcmVkLWJ5Jyk7XG4gICAgICAgIHRoaXMuYXBwLnVzZShjb3JzXzEuZGVmYXVsdCgpKTtcbiAgICAgICAgLy8gU3VwcG9ydCBhcHBsaWNhdGlvbi9qc29uIHR5cGUgcG9zdCBkYXRhXG4gICAgICAgIHRoaXMuYXBwLnVzZShib2R5UGFyc2VyLmpzb24oKSk7XG4gICAgICAgIC8vIFN1cHBvcnQgYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkIHBvc3QgZGF0YVxuICAgICAgICB0aGlzLmFwcC51c2UoYm9keVBhcnNlci51cmxlbmNvZGVkKHsgZXh0ZW5kZWQ6IGZhbHNlIH0pKTtcbiAgICAgICAgdGhpcy5hcHAudXNlKCcvJywgcm91dGVyXzEucm91dGVyKTtcbiAgICAgICAgdGhpcy5hcHBseU1pZGRsZXdhcmVzKHRoaXMuYXBwKTtcbiAgICB9XG4gICAgYXBwbHlNaWRkbGV3YXJlcyhleHByZXNzQXBwKSB7XG4gICAgICAgIGNvbnN0IGFwb2xsb1NlcnZlciA9IG5ldyBhcG9sbG9fc2VydmVyX2V4cHJlc3NfMS5BcG9sbG9TZXJ2ZXIoe1xuICAgICAgICAgICAgY29udGV4dDogKHsgcmVxIH0pID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICAvLyBBbGxvdyBHcmFwaFFMIHBsYXlncm91bmQgaW4gZGV2ZWxvcG1lbnQgbW9kZVxuICAgICAgICAgICAgICAgIGNvbnN0IG9yaWdpblVybCA9IGBsb2NhbGhvc3Q6JHt0aGlzLmFwcENvbmZpZy5nZXRQb3J0KCl9JHtyZXEuYmFzZVVybH1gO1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlZyA9IG5ldyBSZWdFeHAoYCR7b3JpZ2luVXJsfSRgLCAnZ2knKTtcbiAgICAgICAgICAgICAgICBjb25zdCBpc1BsYXlncm91bmQgPSByZWcudGVzdChTdHJpbmcocmVxLmhlYWRlcnMucmVmZXJlcikpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFwcENvbmZpZy5pc0RldigpICYmIGlzUGxheWdyb3VuZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdXNlckRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJuYW1lOiAnZGVhOWFkYmEtNGVmMy00Njg3LWFjN2ItNTlhNTNmZmFmYzViJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgYXV0aG9yaXphdGlvbiA9IFN0cmluZyhyZXEuaGVhZGVycy5hdXRob3JpemF0aW9uKSB8fCAnJztcbiAgICAgICAgICAgICAgICBjb25zdCB0b2tlbiA9IGF1dGhvcml6YXRpb24ucmVwbGFjZSgnQmVhcmVyICcsICcnKTtcbiAgICAgICAgICAgICAgICBsZXQgdXNlckRhdGE7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgdXNlckRhdGEgPSB5aWVsZCB0aGlzLmFkbWluLlZhbGlkYXRlVG9rZW4odG9rZW4pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdFcnJvcjonLCBlcnIubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBhcG9sbG9fc2VydmVyX2V4cHJlc3NfMS5BdXRoZW50aWNhdGlvbkVycm9yKCd5b3UgbXVzdCBiZSBsb2dnZWQgaW4nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ3VzZXJEYXRhJywgdXNlckRhdGEpO1xuICAgICAgICAgICAgICAgIHJldHVybiB7IHVzZXJEYXRhIH07XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIHR5cGVEZWZzOiBhcG9sbG9fc2VydmVyX2V4cHJlc3NfMS5ncWwgYFxuICAgICAgICAke3R5cGVkZWZzXzEudHlwZURlZnN9XG4gICAgICBgLFxuICAgICAgICAgICAgcmVzb2x2ZXJzOiByZXNvbHZlcnNfMS5yZXNvbHZlcnMsXG4gICAgICAgICAgICBwbGF5Z3JvdW5kOiB0aGlzLmFwcENvbmZpZy5pc0RldigpLFxuICAgICAgICB9KTtcbiAgICAgICAgYXBvbGxvU2VydmVyLmFwcGx5TWlkZGxld2FyZSh7XG4gICAgICAgICAgICBhcHA6IGV4cHJlc3NBcHAsXG4gICAgICAgICAgICBwYXRoOiAnL2dyYXBoJyxcbiAgICAgICAgfSk7XG4gICAgfVxufVxuZXhwb3J0cy5hcHAgPSBuZXcgQXBwKGNvbmZpZ18xLmNvbmZpZykuYXBwO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBkb3RlbnZfMSA9IHJlcXVpcmUoXCJkb3RlbnZcIik7XG5jbGFzcyBDb25maWcge1xuICAgIHN0YXRpYyBnZXRJbnN0YW5jZSgpIHtcbiAgICAgICAgaWYgKCFDb25maWcuaW5zdGFuY2UpIHtcbiAgICAgICAgICAgIENvbmZpZy5pbnN0YW5jZSA9IG5ldyBDb25maWcoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gQ29uZmlnLmluc3RhbmNlO1xuICAgIH1cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5lbnZOYW1lID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgfHwgJ2RldmVsb3BtZW50JztcbiAgICAgICAgdGhpcy5wb3J0ID0gcHJvY2Vzcy5lbnYuUE9SVCB8fCAnODg4OCc7XG4gICAgICAgIGRvdGVudl8xLmNvbmZpZygpO1xuICAgIH1cbiAgICBnZXRFbnYoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVudk5hbWU7XG4gICAgfVxuICAgIGdldFBvcnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBvcnQ7XG4gICAgfVxuICAgIGlzRGV2KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5lbnZOYW1lID09PSAnZGV2ZWxvcG1lbnQnO1xuICAgIH1cbiAgICBpc0RlYnVnKCkge1xuICAgICAgICByZXR1cm4gcHJvY2Vzcy5lbnYuREVCVUcgPT09ICd0cnVlJztcbiAgICB9XG4gICAgZ2V0KHByb3BOYW1lKSB7XG4gICAgICAgIGlmIChwcm9wTmFtZSA9PT0gJ05PREVfRU5WJykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RW52KCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb3BOYW1lID09PSAnUE9SVCcpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFBvcnQoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcHJvY2Vzcy5lbnZbcHJvcE5hbWVdO1xuICAgIH1cbn1cbmV4cG9ydHMuY29uZmlnID0gQ29uZmlnLmdldEluc3RhbmNlKCk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgYW1hem9uX2NvZ25pdG9faWRlbnRpdHlfanNfMSA9IHJlcXVpcmUoXCJhbWF6b24tY29nbml0by1pZGVudGl0eS1qc1wiKTtcbmNvbnN0IGF4aW9zXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcImF4aW9zXCIpKTtcbmNvbnN0IGp3a190b19wZW1fMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiandrLXRvLXBlbVwiKSk7XG5jb25zdCBqc29ud2VidG9rZW5fMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwianNvbndlYnRva2VuXCIpKTtcbmNvbnN0IGF3c19zZGtfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiYXdzLXNka1wiKSk7XG5jb25zdCBjb25maWdfMSA9IHJlcXVpcmUoXCIuLi9jb25maWdcIik7XG5jbGFzcyBBZG1pbkNvbnRyb2xsZXIge1xuICAgIGNvbnN0cnVjdG9yKGFwcENvbmZpZykge1xuICAgICAgICB0aGlzLnBvb2xSZWdpb24gPSBhcHBDb25maWcuZ2V0KCdBUFBfUkVHSU9OJykgfHwgJyc7XG4gICAgICAgIGNvbnN0IHBvb2xJZCA9IGFwcENvbmZpZy5nZXQoJ0FQUF9VU0VSX1BPT0xfSUQnKSB8fCAnJztcbiAgICAgICAgY29uc3QgQ2xpZW50SWQgPSBhcHBDb25maWcuZ2V0KCdBUFBfQVBQX0NMSUVOVF9JRCcpIHx8ICcnO1xuICAgICAgICBjb25zdCBwb29sRGF0YSA9IHtcbiAgICAgICAgICAgIFVzZXJQb29sSWQ6IHBvb2xJZCxcbiAgICAgICAgICAgIENsaWVudElkLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLnVzZXJQb29sID0gbmV3IGFtYXpvbl9jb2duaXRvX2lkZW50aXR5X2pzXzEuQ29nbml0b1VzZXJQb29sKHBvb2xEYXRhKTtcbiAgICB9XG4gICAgcmVnaXN0ZXIodXNlcm5hbWUsIHBhc3N3b3JkKSB7XG4gICAgICAgIGNvbnN0IGF0dHJpYnV0ZUxpc3QgPSBbXG4gICAgICAgICAgICBuZXcgYW1hem9uX2NvZ25pdG9faWRlbnRpdHlfanNfMS5Db2duaXRvVXNlckF0dHJpYnV0ZSh7XG4gICAgICAgICAgICAgICAgTmFtZTogJ2VtYWlsJyxcbiAgICAgICAgICAgICAgICBWYWx1ZTogdXNlcm5hbWUsXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIG5ldyBhbWF6b25fY29nbml0b19pZGVudGl0eV9qc18xLkNvZ25pdG9Vc2VyQXR0cmlidXRlKHtcbiAgICAgICAgICAgICAgICBOYW1lOiAnbmlja25hbWUnLFxuICAgICAgICAgICAgICAgIFZhbHVlOiAnYW5kcmVhc29ubnk4MycsXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgXTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlcyA9PiB7XG4gICAgICAgICAgICB0aGlzLnVzZXJQb29sLnNpZ25VcCh1c2VybmFtZSwgcGFzc3dvcmQsIGF0dHJpYnV0ZUxpc3QsIFtdLCAoZXJyLCByZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXMoNDAzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgY29nbml0b1VzZXIgPSByZXN1bHQudXNlcjtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygndXNlciBuYW1lIGlzICcgKyBjb2duaXRvVXNlci5nZXRVc2VybmFtZSgpKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygncmVzdWx0IGlzOicsIHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcygyMDEpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBjb25maXJtQ29kZSh1c2VybmFtZSwgY29kZSkge1xuICAgICAgICBjb25zdCB1c2VyRGF0YSA9IHtcbiAgICAgICAgICAgIFVzZXJuYW1lOiB1c2VybmFtZSxcbiAgICAgICAgICAgIFBvb2w6IHRoaXMudXNlclBvb2wsXG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IGNvZ25pdG9Vc2VyID0gbmV3IGFtYXpvbl9jb2duaXRvX2lkZW50aXR5X2pzXzEuQ29nbml0b1VzZXIodXNlckRhdGEpO1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UocmVzID0+IHtcbiAgICAgICAgICAgIGNvZ25pdG9Vc2VyLmNvbmZpcm1SZWdpc3RyYXRpb24oY29kZSwgdHJ1ZSwgKGVyciwgcmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzKDQwMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjYWxsIHJlc3VsdDogJyArIHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgcmVzKDIwMCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIG5ld0NvbmZpcm1Db2RlKHVzZXJuYW1lKSB7XG4gICAgICAgIGNvbnN0IHVzZXJEYXRhID0ge1xuICAgICAgICAgICAgVXNlcm5hbWU6IHVzZXJuYW1lLFxuICAgICAgICAgICAgUG9vbDogdGhpcy51c2VyUG9vbCxcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgY29nbml0b1VzZXIgPSBuZXcgYW1hem9uX2NvZ25pdG9faWRlbnRpdHlfanNfMS5Db2duaXRvVXNlcih1c2VyRGF0YSk7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXMgPT4ge1xuICAgICAgICAgICAgY29nbml0b1VzZXIucmVzZW5kQ29uZmlybWF0aW9uQ29kZSgoZXJyLCByZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXMoNDAwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KTtcbiAgICAgICAgICAgICAgICByZXMoMjAwKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgbG9naW4odXNlcm5hbWUsIHBhc3N3b3JkKSB7XG4gICAgICAgIGNvbnN0IGF1dGhlbnRpY2F0aW9uRGF0YSA9IHtcbiAgICAgICAgICAgIFVzZXJuYW1lOiB1c2VybmFtZSxcbiAgICAgICAgICAgIFBhc3N3b3JkOiBwYXNzd29yZCxcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgYXV0aGVudGljYXRpb25EZXRhaWxzID0gbmV3IGFtYXpvbl9jb2duaXRvX2lkZW50aXR5X2pzXzEuQXV0aGVudGljYXRpb25EZXRhaWxzKGF1dGhlbnRpY2F0aW9uRGF0YSk7XG4gICAgICAgIGNvbnN0IHVzZXJEYXRhID0ge1xuICAgICAgICAgICAgVXNlcm5hbWU6IHVzZXJuYW1lLFxuICAgICAgICAgICAgUG9vbDogdGhpcy51c2VyUG9vbCxcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgY29nbml0b1VzZXIgPSBuZXcgYW1hem9uX2NvZ25pdG9faWRlbnRpdHlfanNfMS5Db2duaXRvVXNlcih1c2VyRGF0YSk7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXMgPT4ge1xuICAgICAgICAgICAgY29nbml0b1VzZXIuYXV0aGVudGljYXRlVXNlcihhdXRoZW50aWNhdGlvbkRldGFpbHMsIHtcbiAgICAgICAgICAgICAgICBvblN1Y2Nlc3M6IChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYWNjZXNzVG9rZW4gPSByZXN1bHQuZ2V0QWNjZXNzVG9rZW4oKS5nZXRKd3RUb2tlbigpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBpZFRva2VuID0gcmVzdWx0LmdldElkVG9rZW4oKS5nZXRKd3RUb2tlbigpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZWZyZXNoVG9rZW4gPSByZXN1bHQuZ2V0UmVmcmVzaFRva2VuKCkuZ2V0VG9rZW4oKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcyh7IHN0YXR1czogMjAwLCBkYXRhOiB7IGFjY2Vzc1Rva2VuLCBpZFRva2VuLCByZWZyZXNoVG9rZW4gfSB9KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uRmFpbHVyZTogKGVycikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyICYmIGVyci5jb2RlID09PSAnVXNlck5vdENvbmZpcm1lZEV4Y2VwdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXMoeyBzdGF0dXM6IDIyMywgZXJyb3I6IHRydWUgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcyh7IHN0YXR1czogNDAxLCBlcnJvcjogdHJ1ZSB9KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBWYWxpZGF0ZVRva2VuKHRva2VuKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICBjb25zdCB1cmwgPSBgaHR0cHM6Ly9jb2duaXRvLWlkcC4ke3RoaXMucG9vbFJlZ2lvbn0uYW1hem9uYXdzLmNvbS8ke3RoaXMudXNlclBvb2wuZ2V0VXNlclBvb2xJZCgpfS8ud2VsbC1rbm93bi9qd2tzLmpzb25gO1xuICAgICAgICAgICAgbGV0IHJlc3BvbnNlO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICByZXNwb25zZSA9IHlpZWxkIGF4aW9zXzEuZGVmYXVsdC5nZXQodXJsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NvbWV0aGluZyB3ZW50IHdyb25nIHdoaWxlIHZlcmlmeWluZyB0aGUgSldUJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIShyZXNwb25zZSAmJiByZXNwb25zZS5zdGF0dXMgPT09IDIwMCAmJiByZXNwb25zZS5kYXRhKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRXJyb3IhIFVuYWJsZSB0byBkb3dubG9hZCBKV0tzJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBib2R5ID0gcmVzcG9uc2UuZGF0YTtcbiAgICAgICAgICAgIGNvbnN0IHBlbXMgPSB7fTtcbiAgICAgICAgICAgIGNvbnN0IGtleXMgPSBib2R5LmtleXM7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBrZXlzKSB7XG4gICAgICAgICAgICAgICAgLy8gQ29udmVydCBlYWNoIGtleSB0byBQRU1cbiAgICAgICAgICAgICAgICBjb25zdCBrZXlJZCA9IGtleS5raWQ7XG4gICAgICAgICAgICAgICAgY29uc3QgbW9kdWx1cyA9IGtleS5uO1xuICAgICAgICAgICAgICAgIGNvbnN0IGV4cG9uZW50ID0ga2V5LmU7XG4gICAgICAgICAgICAgICAgY29uc3Qga2V5VHlwZSA9IGtleS5rdHk7XG4gICAgICAgICAgICAgICAgY29uc3QgandrID0geyBrdHk6IGtleVR5cGUsIG46IG1vZHVsdXMsIGU6IGV4cG9uZW50IH07XG4gICAgICAgICAgICAgICAgY29uc3QgY3VyclBlbSA9IGp3a190b19wZW1fMS5kZWZhdWx0KGp3ayk7XG4gICAgICAgICAgICAgICAgcGVtc1trZXlJZF0gPSBjdXJyUGVtO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gdmFsaWRhdGUgdGhlIHRva2VuXG4gICAgICAgICAgICBjb25zdCBkZWNvZGVkSnd0ID0ganNvbndlYnRva2VuXzEuZGVmYXVsdC5kZWNvZGUodG9rZW4sIHsgY29tcGxldGU6IHRydWUgfSk7XG4gICAgICAgICAgICBpZiAoIWRlY29kZWRKd3QpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdCBhIHZhbGlkIEpXVCB0b2tlbicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3Qgand0SGVhZGVyID0gZGVjb2RlZEp3dCAmJiBkZWNvZGVkSnd0LmhlYWRlcjtcbiAgICAgICAgICAgIGNvbnN0IGtpZCA9IGp3dEhlYWRlci5raWQ7XG4gICAgICAgICAgICBjb25zdCBwZW0gPSBwZW1zW2tpZF07XG4gICAgICAgICAgICBpZiAoIXBlbSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCB0b2tlbicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICBqc29ud2VidG9rZW5fMS5kZWZhdWx0LnZlcmlmeSh0b2tlbiwgcGVtLCAoZXJyLCBwYXlsb2FkKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBUb2tlbi4nKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdWYWxpZCBUb2tlbi4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXMoeyBzdGF0dXM6IDIwMCwgZGF0YTogcGF5bG9hZCB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBnZXRVc2VyKHVzZXJuYW1lKSB7XG4gICAgICAgIGNvbnN0IHVzZXJEYXRhID0ge1xuICAgICAgICAgICAgVXNlcm5hbWU6IHVzZXJuYW1lLFxuICAgICAgICAgICAgUG9vbDogdGhpcy51c2VyUG9vbCxcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgY29nbml0b1VzZXIgPSBuZXcgYW1hem9uX2NvZ25pdG9faWRlbnRpdHlfanNfMS5Db2duaXRvVXNlcih1c2VyRGF0YSk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCd1c2VyZGF0YScsIHVzZXJEYXRhKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coY29nbml0b1VzZXIpO1xuICAgICAgICByZXR1cm47XG4gICAgICAgIGlmIChjb2duaXRvVXNlciAhPT0gbnVsbCkge1xuICAgICAgICAgICAgY29nbml0b1VzZXIuZ2V0U2Vzc2lvbigoZXJyLCBzZXNzaW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzZXNzaW9uIHZhbGlkaXR5OiAnICsgc2Vzc2lvbi5pc1ZhbGlkKCkpO1xuICAgICAgICAgICAgICAgIGF3c19zZGtfMS5kZWZhdWx0LmNvbmZpZy5jcmVkZW50aWFscyA9IG5ldyBhd3Nfc2RrXzEuZGVmYXVsdC5Db2duaXRvSWRlbnRpdHlDcmVkZW50aWFscyh7XG4gICAgICAgICAgICAgICAgICAgIElkZW50aXR5UG9vbElkOiAnLi4uJyxcbiAgICAgICAgICAgICAgICAgICAgTG9naW5zOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBDaGFuZ2UgdGhlIGtleSBiZWxvdyBhY2NvcmRpbmcgdG8gdGhlIHNwZWNpZmljIHJlZ2lvbiB5b3VyIHVzZXIgcG9vbCBpcyBpbi5cbiAgICAgICAgICAgICAgICAgICAgICAgICdjb2duaXRvLWlkcC48cmVnaW9uPi5hbWF6b25hd3MuY29tLzxZT1VSX1VTRVJfUE9PTF9JRD4nOiBzZXNzaW9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldElkVG9rZW4oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXRKd3RUb2tlbigpLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIC8vIEluc3RhbnRpYXRlIGF3cyBzZGsgc2VydmljZSBvYmplY3RzIG5vdyB0aGF0IHRoZSBjcmVkZW50aWFscyBoYXZlIGJlZW4gdXBkYXRlZC5cbiAgICAgICAgICAgICAgICAvLyBleGFtcGxlOiB2YXIgczMgPSBuZXcgQVdTLlMzKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMuYWRtaW5Db250cm9sbGVyID0gbmV3IEFkbWluQ29udHJvbGxlcihjb25maWdfMS5jb25maWcpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5mdW5jdGlvbiBfX2V4cG9ydChtKSB7XG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAoIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xufVxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuX19leHBvcnQocmVxdWlyZShcIi4vbWFpblwiKSk7XG5fX2V4cG9ydChyZXF1aXJlKFwiLi9hZG1pblwiKSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgdXVpZF8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJ1dWlkXCIpKTtcbmNvbnN0IGNvbmZpZ18xID0gcmVxdWlyZShcIi4uL2NvbmZpZ1wiKTtcbmNsYXNzIE1haW5Db250cm9sbGVyIHtcbiAgICBjb25zdHJ1Y3Rvcihjb25maWdJbnN0YW5jZSkge1xuICAgICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZ0luc3RhbmNlO1xuICAgIH1cbiAgICByb290KHJlcSwgcmVzKSB7XG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuc2VuZCh7XG4gICAgICAgICAgICBtZXNzYWdlOiB0aGlzLmNvbmZpZy5nZXQoJ0FQUF9OQU1FJyksXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBzdGF0dXMocmVxLCByZXMpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuc2VuZCh7XG4gICAgICAgICAgICAgICAgYXBwTmFtZTogdGhpcy5jb25maWcuZ2V0KCdBUFBfTkFNRScpLFxuICAgICAgICAgICAgICAgIGRlYnVnOiB0aGlzLmNvbmZpZy5pc0RlYnVnKCksXG4gICAgICAgICAgICAgICAgZW52aXJvbm1lbnROYW1lOiB0aGlzLmNvbmZpZy5nZXRFbnYoKSxcbiAgICAgICAgICAgICAgICBzdGF0dXM6ICdvaycsXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogdXVpZF8xLmRlZmF1bHQudjQoKSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5leHBvcnRzLm1haW5Db250cm9sbGVyID0gbmV3IE1haW5Db250cm9sbGVyKGNvbmZpZ18xLmNvbmZpZyk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNsYXNzIEdhbWUge1xuICAgIGNvbnN0cnVjdG9yKHsgaWQsIG5hbWUsIHN0YXJ0ZWQsIGZpbmlzaGVkLCBwbGF5ZXJzLCBsb2cgfSkge1xuICAgICAgICB0aGlzLmlkID0gaWQ7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMuc3RhcnRlZCA9IHN0YXJ0ZWQgfHwgZmFsc2U7XG4gICAgICAgIHRoaXMuZmluaXNoZWQgPSBmaW5pc2hlZCB8fCBmYWxzZTtcbiAgICAgICAgdGhpcy5wbGF5ZXJzID0gcGxheWVycztcbiAgICAgICAgdGhpcy5sb2cgPSBsb2cgfHwgW107XG4gICAgfVxufVxuZXhwb3J0cy5HYW1lID0gR2FtZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgYXBvbGxvX2RhdGFzb3VyY2VfMSA9IHJlcXVpcmUoXCJhcG9sbG8tZGF0YXNvdXJjZVwiKTtcbmNvbnN0IHVuaXF1ZV9uYW1lc19nZW5lcmF0b3JfMSA9IHJlcXVpcmUoXCJ1bmlxdWUtbmFtZXMtZ2VuZXJhdG9yXCIpO1xuY29uc3QgZ2FtZV9kYXRhXzEgPSByZXF1aXJlKFwiLi9nYW1lLmRhdGFcIik7XG5jbGFzcyBHYW1lU2VydmljZSBleHRlbmRzIGFwb2xsb19kYXRhc291cmNlXzEuRGF0YVNvdXJjZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuZ2FtZXMgPSBuZXcgTWFwKCk7XG4gICAgfVxuICAgIGluaXRpYWxpemUoKSB7XG4gICAgICAgIC8vXG4gICAgICAgIGNvbnNvbGUubG9nKCcuLi5pbml0aWFsaXplLi4uJyk7XG4gICAgfVxuICAgIGNyZWF0ZUdhbWUodXNlcklkKSB7XG4gICAgICAgIGNvbnN0IGdhbWVJZCA9IG5ld0lkKCk7XG4gICAgICAgIGNvbnN0IGdhbWUgPSB7XG4gICAgICAgICAgICBpZDogZ2FtZUlkLFxuICAgICAgICAgICAgbmFtZTogZ2FtZUlkLFxuICAgICAgICAgICAgcGxheWVyczogW1xuICAgICAgICAgICAgICAgIHVzZXJJZFxuICAgICAgICAgICAgXSxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5nYW1lcy5zZXQoZ2FtZUlkLCBuZXcgZ2FtZV9kYXRhXzEuR2FtZShnYW1lKSk7XG4gICAgICAgIHJldHVybiB0aGlzLmdhbWVzLmdldChnYW1lSWQpO1xuICAgIH1cbiAgICB1cGRhdGVHYW1lKGdhbWVVcGRhdGVkKSB7XG4gICAgICAgIGNvbnN0IHsgaWQgfSA9IGdhbWVVcGRhdGVkO1xuICAgICAgICB0aGlzLmdhbWVzLnNldChpZCwgZ2FtZVVwZGF0ZWQpO1xuICAgICAgICByZXR1cm4gdGhpcy5nYW1lcy5nZXQoaWQpO1xuICAgIH1cbiAgICBnZXRHYW1lKGdhbWVJZCkge1xuICAgICAgICBpZiAoIWdhbWVJZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBIGdhbWUgaWQgc2hvdWxkIGJlIHNwZWNpZmllZC4nKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5nYW1lcy5nZXQoZ2FtZUlkKTtcbiAgICB9XG4gICAgc3RhcnRHYW1lKGdhbWVJZCkge1xuICAgICAgICBpZiAoIWdhbWVJZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBIGdhbWUgaWQgc2hvdWxkIGJlIHNwZWNpZmllZC4nKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBnYW1lID0gdGhpcy5nYW1lcy5nZXQoZ2FtZUlkKTtcbiAgICAgICAgaWYgKGdhbWUgJiYgZ2FtZS5zdGFydGVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEdhbWUgJHtnYW1lICYmIGdhbWUuaWR9IGFscmVhZHkgc3RhcnRlZC5gKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZ2FtZSAmJiBnYW1lLmlkICYmIGdhbWUubmFtZSkge1xuICAgICAgICAgICAgY29uc3QgZ2FtZVVwZGF0ZWQgPSBPYmplY3QuYXNzaWduKHt9LCBnYW1lLCB7IHN0YXJ0ZWQ6IHRydWUgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nYW1lcy5zZXQoZ2FtZUlkLCBnYW1lVXBkYXRlZCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGdhbWUnKTtcbiAgICB9XG4gICAgZ2V0R2FtZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdhbWVzO1xuICAgIH1cbn1cbmV4cG9ydHMuR2FtZVNlcnZpY2UgPSBHYW1lU2VydmljZTtcbi8vIC0tLS0tIEhlbHBlciBGdW5jdGlvbnMgLS0tLS1cbmZ1bmN0aW9uIG5ld0lkKCkge1xuICAgIHJldHVybiB1bmlxdWVfbmFtZXNfZ2VuZXJhdG9yXzEudW5pcXVlTmFtZXNHZW5lcmF0b3IoJ18nKTtcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgZ2FtZV9zZXJ2aWNlXzEgPSByZXF1aXJlKFwiLi9nYW1lLnNlcnZpY2VcIik7XG5jb25zdCB1c2VyX3NlcnZpY2VfMSA9IHJlcXVpcmUoXCIuL3VzZXIuc2VydmljZVwiKTtcbi8vIFRPRE86IFdlIHdpbGwgbm90IHBhc3MgZGF0YVNvdXJjZXMgdmlhIGNvbnRleHQgYmVjYXVzZSB0aGlzIGRvZXMgbm90IHdvcmsgd2l0aCBzdWJzY3JpcHRpb25zXG4vLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2Fwb2xsb2dyYXBocWwvYXBvbGxvLXNlcnZlci9pc3N1ZXMvMTUyNlxuLy8gU2V0IHVwIHRoZSBkYXRhU291cmNlcyBuZWVkZWQgYnkgb3VyIHJlc29sdmVyc1xuLy8gZXhwb3J0IGNvbnN0IGRhdGFTb3VyY2VzID0gKCkgPT4gKHtcbi8vICAgICBnYW1lU2VydmljZTogbmV3IEdhbWVTZXJ2aWNlKClcbi8vIH0pO1xuZXhwb3J0cy5kYXRhU291cmNlcyA9IHtcbiAgICBnYW1lU2VydmljZTogbmV3IGdhbWVfc2VydmljZV8xLkdhbWVTZXJ2aWNlKCksXG4gICAgdXNlclNlcnZpY2U6IG5ldyB1c2VyX3NlcnZpY2VfMS5Vc2VyU2VydmljZSgpLFxufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY2xhc3MgVXNlciB7XG4gICAgY29uc3RydWN0b3IodXNlcklkKSB7XG4gICAgICAgIHRoaXMuaWQgPSB1c2VySWQ7XG4gICAgICAgIHRoaXMuZ2FtZXMgPSBbXTtcbiAgICB9XG59XG5leHBvcnRzLlVzZXIgPSBVc2VyO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBhcG9sbG9fZGF0YXNvdXJjZV8xID0gcmVxdWlyZShcImFwb2xsby1kYXRhc291cmNlXCIpO1xuY29uc3QgdXNlcl9kYXRhXzEgPSByZXF1aXJlKFwiLi91c2VyLmRhdGFcIik7XG5jbGFzcyBVc2VyU2VydmljZSBleHRlbmRzIGFwb2xsb19kYXRhc291cmNlXzEuRGF0YVNvdXJjZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMudXNlcnMgPSBuZXcgTWFwKCk7XG4gICAgfVxuICAgIGluaXRpYWxpemUoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCcuLi5pbml0aWFsaXplLi4uJyk7XG4gICAgfVxuICAgIGNyZWF0ZVVzZXIodXNlcklkKSB7XG4gICAgICAgIHRoaXMudXNlcnMuc2V0KHVzZXJJZCwgbmV3IHVzZXJfZGF0YV8xLlVzZXIodXNlcklkKSk7XG4gICAgICAgIHJldHVybiB0aGlzLnVzZXJzLmdldCh1c2VySWQpO1xuICAgIH1cbiAgICBnZXRVc2VyKHVzZXJJZCkge1xuICAgICAgICBpZiAoIXVzZXJJZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBIHVzZXIgaWQgc2hvdWxkIGJlIHNwZWNpZmllZC4nKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMudXNlcnMuZ2V0KHVzZXJJZCkpIHtcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlVXNlcih1c2VySWQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnVzZXJzLmdldCh1c2VySWQpO1xuICAgIH1cbiAgICBnZXRVc2VycygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudXNlcnM7XG4gICAgfVxufVxuZXhwb3J0cy5Vc2VyU2VydmljZSA9IFVzZXJTZXJ2aWNlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBtZXJnZV9ncmFwaHFsX3NjaGVtYXNfMSA9IHJlcXVpcmUoXCJtZXJnZS1ncmFwaHFsLXNjaGVtYXNcIik7XG5jb25zdCBnYW1lX3Jlc29sdmVyc18xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL3Jlc29sdmVycy9nYW1lLnJlc29sdmVyc1wiKSk7XG5jb25zdCB1c2Vyc19yZXNvbHZlcnNfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9yZXNvbHZlcnMvdXNlcnMucmVzb2x2ZXJzXCIpKTtcbmNvbnN0IHJlc29sdmVyc0FycmF5ID0gW2dhbWVfcmVzb2x2ZXJzXzEuZGVmYXVsdCwgdXNlcnNfcmVzb2x2ZXJzXzEuZGVmYXVsdF07XG5leHBvcnRzLnJlc29sdmVycyA9IG1lcmdlX2dyYXBocWxfc2NoZW1hc18xLm1lcmdlUmVzb2x2ZXJzKHJlc29sdmVyc0FycmF5KTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgYXBvbGxvX3NlcnZlcl8xID0gcmVxdWlyZShcImFwb2xsby1zZXJ2ZXJcIik7XG5jb25zdCBkYXRhc291cmNlc18xID0gcmVxdWlyZShcIi4uLy4uL2RhdGFzb3VyY2VzXCIpO1xuZXhwb3J0cy5kZWZhdWx0ID0ge1xuICAgIFF1ZXJ5OiB7XG4gICAgICAgIGdhbWUocGFyZW50LCBhcmdzLCBjb250ZXh0KSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygncGFyZW50JywgcGFyZW50KTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdhcmdzJywgYXJncyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnY29udGV4dCcsIGNvbnRleHQpO1xuICAgICAgICAgICAgLy8gaWYgKGNvbnRleHQuYXV0aFNjb3BlICE9PSAnQURNSU4nKSB7XG4gICAgICAgICAgICAvLyAgIHRocm93IG5ldyBBdXRoZW50aWNhdGlvbkVycm9yKCdub3QgYWRtaW4nKTtcbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgIGNvbnN0IHsgZ2FtZUlkIH0gPSBhcmdzO1xuICAgICAgICAgICAgY29uc3QgZ2FtZSA9IGRhdGFzb3VyY2VzXzEuZGF0YVNvdXJjZXMuZ2FtZVNlcnZpY2UuZ2V0R2FtZShnYW1lSWQpO1xuICAgICAgICAgICAgaWYgKGdhbWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZ2FtZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIHRocm93IG5ldyBBcG9sbG9FcnJvcihgR2FtZSAke2FyZ3MuaWR9IGRvZXMgbm90IGV4aXN0YCk7XG4gICAgICAgICAgICB0aHJvdyBuZXcgYXBvbGxvX3NlcnZlcl8xLlZhbGlkYXRpb25FcnJvcihgR2FtZSBJRCBub3QgZm91bmRgKTtcbiAgICAgICAgfSxcbiAgICAgICAgZ2FtZXMoKSB7XG4gICAgICAgICAgICByZXR1cm4gZGF0YXNvdXJjZXNfMS5kYXRhU291cmNlcy5nYW1lU2VydmljZS5nZXRHYW1lcygpO1xuICAgICAgICB9LFxuICAgIH0sXG4gICAgTXV0YXRpb246IHtcbiAgICAgICAgbmV3R2FtZShwYXJlbnQsIGFyZ3MsIGNvbnRleHQpIHtcbiAgICAgICAgICAgIGNvbnN0IHVzZXJJZCA9IGNvbnRleHQgJiYgY29udGV4dC51c2VyRGF0YSAmJiBjb250ZXh0LnVzZXJEYXRhLmRhdGEgJiYgY29udGV4dC51c2VyRGF0YS5kYXRhLnVzZXJuYW1lO1xuICAgICAgICAgICAgaWYgKHVzZXJJZCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGdhbWUgPSBkYXRhc291cmNlc18xLmRhdGFTb3VyY2VzLmdhbWVTZXJ2aWNlLmNyZWF0ZUdhbWUodXNlcklkKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YXNvdXJjZXNfMS5kYXRhU291cmNlcy5nYW1lU2VydmljZS5nZXRHYW1lKGdhbWUuaWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhyb3cgbmV3IGFwb2xsb19zZXJ2ZXJfMS5WYWxpZGF0aW9uRXJyb3IoYFVuYXV0aGVudGljYXRlZCB1c2VyIHJlcXVlc3RgKTtcbiAgICAgICAgfSxcbiAgICAgICAgam9pbkdhbWUocGFyZW50LCBhcmdzLCBjb250ZXh0KSB7XG4gICAgICAgICAgICBjb25zdCB7IGdhbWVJZCB9ID0gYXJncztcbiAgICAgICAgICAgIGNvbnN0IHVzZXJJZCA9IGNvbnRleHQgJiYgY29udGV4dC51c2VyRGF0YSAmJiBjb250ZXh0LnVzZXJEYXRhLmRhdGEgJiYgY29udGV4dC51c2VyRGF0YS5kYXRhLnVzZXJuYW1lO1xuICAgICAgICAgICAgY29uc3QgZ2FtZSA9IGRhdGFzb3VyY2VzXzEuZGF0YVNvdXJjZXMuZ2FtZVNlcnZpY2UuZ2V0R2FtZShnYW1lSWQpO1xuICAgICAgICAgICAgaWYgKCF1c2VySWQpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgYXBvbGxvX3NlcnZlcl8xLlZhbGlkYXRpb25FcnJvcihgVW5hdXRoZW50aWNhdGVkIHVzZXIgcmVxdWVzdGApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFnYW1lKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IGFwb2xsb19zZXJ2ZXJfMS5WYWxpZGF0aW9uRXJyb3IoYEdhbWVJRCBub3QgZm91bmRgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gZ2FtZS5wbGF5ZXJzLmluZGV4T2YodXNlcklkKTtcbiAgICAgICAgICAgIGNvbnN0IHVzZXJJZE1hdGNoZXMgPSBnYW1lLnBsYXllcnNbaW5kZXhdID09PSB1c2VySWQ7XG4gICAgICAgICAgICBpZiAofmluZGV4ICYmIHVzZXJJZE1hdGNoZXMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBnYW1lVXBkYXRlZCA9IE9iamVjdC5hc3NpZ24oe30sIGdhbWUsIHsgcGxheWVyczogWy4uLmdhbWUucGxheWVycywgdXNlcklkXSB9KTtcbiAgICAgICAgICAgICAgICBkYXRhc291cmNlc18xLmRhdGFTb3VyY2VzLmdhbWVTZXJ2aWNlLnVwZGF0ZUdhbWUoZ2FtZVVwZGF0ZWQpO1xuICAgICAgICAgICAgICAgIHJldHVybiBkYXRhc291cmNlc18xLmRhdGFTb3VyY2VzLmdhbWVTZXJ2aWNlLmdldEdhbWUoZ2FtZUlkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRocm93IG5ldyBhcG9sbG9fc2VydmVyXzEuVmFsaWRhdGlvbkVycm9yKGBVbmF1dGhlbnRpY2F0ZWQgdXNlciByZXF1ZXN0YCk7XG4gICAgICAgIH0sXG4gICAgICAgIHN0YXJ0R2FtZShwYXJlbnQsIGFyZ3MsIGNvbnRleHQpIHtcbiAgICAgICAgICAgIGNvbnN0IHsgZ2FtZUlkIH0gPSBhcmdzO1xuICAgICAgICAgICAgY29uc3QgdXNlcklkID0gY29udGV4dCAmJiBjb250ZXh0LnVzZXJEYXRhICYmIGNvbnRleHQudXNlckRhdGEuZGF0YSAmJiBjb250ZXh0LnVzZXJEYXRhLmRhdGEudXNlcm5hbWU7XG4gICAgICAgICAgICBjb25zdCBnYW1lID0gZGF0YXNvdXJjZXNfMS5kYXRhU291cmNlcy5nYW1lU2VydmljZS5nZXRHYW1lKGdhbWVJZCk7XG4gICAgICAgICAgICBpZiAoIXVzZXJJZCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBhcG9sbG9fc2VydmVyXzEuVmFsaWRhdGlvbkVycm9yKGBVbmF1dGhlbnRpY2F0ZWQgdXNlciByZXF1ZXN0YCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWdhbWUpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgYXBvbGxvX3NlcnZlcl8xLlZhbGlkYXRpb25FcnJvcihgR2FtZUlEIG5vdCBmb3VuZGApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgaW5kZXggPSBnYW1lLnBsYXllcnMuaW5kZXhPZih1c2VySWQpO1xuICAgICAgICAgICAgY29uc3QgdXNlcklkTWF0Y2hlcyA9IGdhbWUucGxheWVyc1tpbmRleF0gPT09IHVzZXJJZDtcbiAgICAgICAgICAgIGlmICh+aW5kZXggJiYgdXNlcklkTWF0Y2hlcykge1xuICAgICAgICAgICAgICAgIGRhdGFzb3VyY2VzXzEuZGF0YVNvdXJjZXMuZ2FtZVNlcnZpY2Uuc3RhcnRHYW1lKGdhbWVJZCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGFzb3VyY2VzXzEuZGF0YVNvdXJjZXMuZ2FtZVNlcnZpY2UuZ2V0R2FtZShnYW1lSWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhyb3cgbmV3IGFwb2xsb19zZXJ2ZXJfMS5WYWxpZGF0aW9uRXJyb3IoYFVuYXV0aGVudGljYXRlZCB1c2VyIHJlcXVlc3RgKTtcbiAgICAgICAgfSxcbiAgICB9LFxufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgZGF0YXNvdXJjZXNfMSA9IHJlcXVpcmUoXCIuLi8uLi9kYXRhc291cmNlc1wiKTtcbmV4cG9ydHMuZGVmYXVsdCA9IHtcbiAgICBRdWVyeToge1xuICAgICAgICB1c2VyKHBhcmVudCwgYXJncywgY29udGV4dCkge1xuICAgICAgICAgICAgY29uc3QgdXNlciA9IGNvbnRleHQgJiYgY29udGV4dC51c2VyRGF0YSAmJiBjb250ZXh0LnVzZXJEYXRhLmRhdGE7XG4gICAgICAgICAgICBjb25zdCB1c2VySWQgPSB1c2VyICYmIHVzZXIudXNlcm5hbWU7XG4gICAgICAgICAgICByZXR1cm4gZGF0YXNvdXJjZXNfMS5kYXRhU291cmNlcy51c2VyU2VydmljZS5nZXRVc2VyKHVzZXJJZCk7XG4gICAgICAgIH0sXG4gICAgICAgIHVzZXJzKCkge1xuICAgICAgICAgICAgcmV0dXJuIGRhdGFzb3VyY2VzXzEuZGF0YVNvdXJjZXMudXNlclNlcnZpY2UuZ2V0VXNlcnMoKTtcbiAgICAgICAgfSxcbiAgICB9LFxufTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgbWVyZ2VfZ3JhcGhxbF9zY2hlbWFzXzEgPSByZXF1aXJlKFwibWVyZ2UtZ3JhcGhxbC1zY2hlbWFzXCIpO1xuY29uc3QgZ2FtZV8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL3R5cGVkZWZzL2dhbWVcIikpO1xuY29uc3QgbG9nXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vdHlwZWRlZnMvbG9nXCIpKTtcbmNvbnN0IHBsYXllcl8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL3R5cGVkZWZzL3BsYXllclwiKSk7XG5jb25zdCB1c2Vyc18xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL3R5cGVkZWZzL3VzZXJzXCIpKTtcbmNvbnN0IHR5cGVzID0gW2dhbWVfMS5kZWZhdWx0LCBsb2dfMS5kZWZhdWx0LCBwbGF5ZXJfMS5kZWZhdWx0LCB1c2Vyc18xLmRlZmF1bHRdO1xuLy8gTk9URTogMm5kIHBhcmFtIGlzIG9wdGlvbmFsLCBhbmQgZGVmYXVsdHMgdG8gZmFsc2Vcbi8vIE9ubHkgdXNlIGlmIHlvdSBoYXZlIGRlZmluZWQgdGhlIHNhbWUgdHlwZSBtdWx0aXBsZSB0aW1lcyBpblxuLy8gZGlmZmVyZW50IGZpbGVzIGFuZCB3aXNoIHRvIGF0dGVtcHQgbWVyZ2luZyB0aGVtIHRvZ2V0aGVyLlxuZXhwb3J0cy50eXBlRGVmcyA9IG1lcmdlX2dyYXBocWxfc2NoZW1hc18xLm1lcmdlVHlwZXModHlwZXMsIHsgYWxsOiB0cnVlIH0pO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmRlZmF1bHQgPSBgXG4gIHR5cGUgR2FtZSB7XG4gICAgaWQ6IElEIVxuICAgIG5hbWU6IFN0cmluZyFcbiAgICBwbGF5ZXJzOiBbU3RyaW5nIV1cbiAgICAjIGxvZzogTG9nXG4gICAgc3RhcnRlZDogQm9vbGVhbiFcbiAgICBmaW5pc2hlZDogQm9vbGVhbiFcbiAgfVxuXG4gIHR5cGUgTXV0YXRpb24ge1xuICAgIG5ld0dhbWU6IEdhbWVcbiAgICBzdGFydEdhbWUoZ2FtZUlkOiBTdHJpbmchKTogR2FtZVxuICAgIGpvaW5HYW1lKGdhbWVJZDogU3RyaW5nISk6IEdhbWVcbiAgfVxuXG4gIHR5cGUgUXVlcnkge1xuICAgIGdhbWVzOiBbR2FtZV1cbiAgICBnYW1lKGdhbWVJZDogU3RyaW5nISk6IEdhbWVcbiAgfVxuYDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gYFxuICB0eXBlIExvZyB7XG4gICAgcGxheWVySWQ6IElEIVxuICAgIHRpbWVzdGFtcDogSW50IVxuICAgIHNjb3JlOiBJbnQhXG4gIH1cbmA7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGBcbiAgdHlwZSBQbGF5ZXIge1xuICAgIGlkOiBJRCFcbiAgICBuYW1lOiBTdHJpbmchXG4gICAgY29sb3I6IENvbG9yIVxuICAgIHRvdGFsU2NvcmU6IEludFxuICB9XG5cbiAgZW51bSBDb2xvciB7XG4gICAgUkVEXG4gICAgQkxVRVxuICAgIEdSRUVOXG4gICAgWUVMTE9XXG4gICAgUFVSUExFXG4gICAgQkxBQ0tcbiAgICBHUkVZXG4gIH1cbmA7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGBcbiAgdHlwZSBVc2VyIHtcbiAgICBpZDogSUQhXG4gICAgZ2FtZXM6IFtTdHJpbmchXVxuICB9XG5cbiAgdHlwZSBRdWVyeSB7XG4gICAgdXNlcnM6IFtVc2VyIV1cbiAgICB1c2VyOiBVc2VyXG4gIH1cbmA7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IHNlcnZlcl8xID0gcmVxdWlyZShcIi4vc2VydmVyXCIpO1xuY29uc3QgY29uZmlnXzEgPSByZXF1aXJlKFwiLi9jb25maWdcIik7XG5jb25zdCBhcHBfMSA9IHJlcXVpcmUoXCIuL2FwcFwiKTtcbmNvbnN0IHBvcnQgPSBjb25maWdfMS5jb25maWcuZ2V0UG9ydCgpO1xuc2VydmVyXzEuc2VydmVyLnN0YXJ0KGFwcF8xLmFwcCwgcG9ydCk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9faW1wb3J0U3RhciA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnRTdGFyKSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcbiAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIHJlc3VsdFtrXSA9IG1vZFtrXTtcbiAgICByZXN1bHRbXCJkZWZhdWx0XCJdID0gbW9kO1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgZXhwcmVzcyA9IF9faW1wb3J0U3RhcihyZXF1aXJlKFwiZXhwcmVzc1wiKSk7XG5jb25zdCBjb250cm9sbGVyc18xID0gcmVxdWlyZShcIi4vY29udHJvbGxlcnNcIik7XG5jb25zdCBjaGVja18xID0gcmVxdWlyZShcImV4cHJlc3MtdmFsaWRhdG9yL2NoZWNrXCIpO1xuY2xhc3MgTWFpblJvdXRlcyB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMucm91dGVyID0gZXhwcmVzcy5Sb3V0ZXIoKTtcbiAgICAgICAgdGhpcy5jb25maWcoKTtcbiAgICB9XG4gICAgY29uZmlnKCkge1xuICAgICAgICB0aGlzLnJvdXRlci5nZXQoJy8nLCAocmVxLCByZXMpID0+IGNvbnRyb2xsZXJzXzEubWFpbkNvbnRyb2xsZXIucm9vdChyZXEsIHJlcykpO1xuICAgICAgICB0aGlzLnJvdXRlci5nZXQoJy9zdGF0dXMnLCAocmVxLCByZXMpID0+IGNvbnRyb2xsZXJzXzEubWFpbkNvbnRyb2xsZXIuc3RhdHVzKHJlcSwgcmVzKSk7XG4gICAgICAgIHRoaXMucm91dGVyLnBvc3QoJy9yZWdpc3RlcicsIFtjaGVja18xLmNoZWNrKCd1c2VybmFtZScpLmlzRW1haWwoKSwgY2hlY2tfMS5jaGVjaygncGFzc3dvcmQnKS5pc0xlbmd0aCh7IG1pbjogNiB9KV0sIChyZXEsIHJlcykgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgY29uc3QgeyB1c2VybmFtZSwgcGFzc3dvcmQgfSA9IHJlcS5ib2R5O1xuICAgICAgICAgICAgY29uc3QgZXJyb3JzID0gY2hlY2tfMS52YWxpZGF0aW9uUmVzdWx0KHJlcSk7XG4gICAgICAgICAgICBpZiAoIWVycm9ycy5pc0VtcHR5KCkpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygndmFsaWRhdGlvblJlc3VsdCcsIGVycm9ycy5hcnJheSgpKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnNlbmRTdGF0dXMoNDAzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHN0YXR1cyA9IHlpZWxkIGNvbnRyb2xsZXJzXzEuYWRtaW5Db250cm9sbGVyLnJlZ2lzdGVyKHVzZXJuYW1lLCBwYXNzd29yZCk7XG4gICAgICAgICAgICByZXMuc2VuZFN0YXR1cyhzdGF0dXMpO1xuICAgICAgICB9KSk7XG4gICAgICAgIHRoaXMucm91dGVyLnBvc3QoJy9jb25maXJtLWNvZGUnLCBbXG4gICAgICAgICAgICBjaGVja18xLmNoZWNrKCd1c2VybmFtZScpLmlzRW1haWwoKSxcbiAgICAgICAgICAgIGNoZWNrXzEuY2hlY2soJ2NvZGUnKVxuICAgICAgICAgICAgICAgIC5pc051bWVyaWMoKVxuICAgICAgICAgICAgICAgIC5pc0xlbmd0aCh7IG1pbjogNiwgbWF4OiA2IH0pLFxuICAgICAgICBdLCAocmVxLCByZXMpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIGNvbnN0IHsgdXNlcm5hbWUsIGNvZGUgfSA9IHJlcS5ib2R5O1xuICAgICAgICAgICAgY29uc3QgZXJyb3JzID0gY2hlY2tfMS52YWxpZGF0aW9uUmVzdWx0KHJlcSk7XG4gICAgICAgICAgICBpZiAoIWVycm9ycy5pc0VtcHR5KCkpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygndmFsaWRhdGlvblJlc3VsdCcsIGVycm9ycy5hcnJheSgpKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnNlbmRTdGF0dXMoNDAzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHN0YXR1cyA9IHlpZWxkIGNvbnRyb2xsZXJzXzEuYWRtaW5Db250cm9sbGVyLmNvbmZpcm1Db2RlKHVzZXJuYW1lLCBjb2RlKTtcbiAgICAgICAgICAgIHJlcy5zZW5kU3RhdHVzKHN0YXR1cyk7XG4gICAgICAgIH0pKTtcbiAgICAgICAgdGhpcy5yb3V0ZXIucG9zdCgnL25ldy1jb25maXJtLWNvZGUnLCBbY2hlY2tfMS5jaGVjaygndXNlcm5hbWUnKS5pc0VtYWlsKCldLCAocmVxLCByZXMpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIGNvbnN0IHsgdXNlcm5hbWUgfSA9IHJlcS5ib2R5O1xuICAgICAgICAgICAgY29uc3QgZXJyb3JzID0gY2hlY2tfMS52YWxpZGF0aW9uUmVzdWx0KHJlcSk7XG4gICAgICAgICAgICBpZiAoIWVycm9ycy5pc0VtcHR5KCkpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygndmFsaWRhdGlvblJlc3VsdCcsIGVycm9ycy5hcnJheSgpKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnNlbmRTdGF0dXMoNDAzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHN0YXR1cyA9IHlpZWxkIGNvbnRyb2xsZXJzXzEuYWRtaW5Db250cm9sbGVyLm5ld0NvbmZpcm1Db2RlKHVzZXJuYW1lKTtcbiAgICAgICAgICAgIHJlcy5zZW5kU3RhdHVzKHN0YXR1cyk7XG4gICAgICAgIH0pKTtcbiAgICAgICAgdGhpcy5yb3V0ZXIucG9zdCgnL2xvZ2luJywgKHJlcSwgcmVzKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICBjb25zdCB7IHVzZXJuYW1lLCBwYXNzd29yZCB9ID0gcmVxLmJvZHk7XG4gICAgICAgICAgICBjb25zdCB1c2VyRGV0YWlscyA9IHlpZWxkIGNvbnRyb2xsZXJzXzEuYWRtaW5Db250cm9sbGVyLmxvZ2luKHVzZXJuYW1lLCBwYXNzd29yZCk7XG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyh1c2VyRGV0YWlscy5zdGF0dXMpLnNlbmQodXNlckRldGFpbHMpO1xuICAgICAgICB9KSk7XG4gICAgICAgIHRoaXMucm91dGVyLnBvc3QoJy92ZXJpZnktdXNlcicsIChyZXEsIHJlcykgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgbGV0IHVzZXJTdGF0dXM7XG4gICAgICAgICAgICBjb25zdCB7IHRva2VuIH0gPSByZXEuYm9keTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgdXNlclN0YXR1cyA9IHlpZWxkIGNvbnRyb2xsZXJzXzEuYWRtaW5Db250cm9sbGVyLlZhbGlkYXRlVG9rZW4odG9rZW4pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zZW5kU3RhdHVzKDQwMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh1c2VyU3RhdHVzKTtcbiAgICAgICAgICAgIHJldHVybiByZXMuc2VuZFN0YXR1cygyMDApO1xuICAgICAgICAgICAgLy8gcmV0dXJuIHJlcy5zdGF0dXModXNlclN0YXR1cy5zdGF0dXMpLnNlbmQodXNlclN0YXR1cyk7XG4gICAgICAgIH0pKTtcbiAgICAgICAgdGhpcy5yb3V0ZXIuZ2V0KCcvdXNlcicsIChyZXEsIHJlcykgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgY29uc3QgeyB1c2VybmFtZSB9ID0gcmVxLmJvZHk7XG4gICAgICAgICAgICBjb25zdCB1c2VyRGF0YSA9IHlpZWxkIGNvbnRyb2xsZXJzXzEuYWRtaW5Db250cm9sbGVyLmdldFVzZXIodXNlcm5hbWUpO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ3VzZXJEYXRhJywgdXNlckRhdGEpO1xuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5zZW5kKHVzZXJEYXRhKTtcbiAgICAgICAgfSkpO1xuICAgIH1cbn1cbmV4cG9ydHMucm91dGVyID0gbmV3IE1haW5Sb3V0ZXMoKS5yb3V0ZXI7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNsYXNzIFNlcnZlciB7XG4gICAgc3RhcnQoZXhwcmVzc0FwcCwgcG9ydE51bWJlcikge1xuICAgICAgICBpZiAodGhpcy5zZXJ2ZXJJbnN0YW5jZSkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgVGhlIHNlcnZlciBpcyBhbHJlYWR5IHJ1bm5pbmcgb24gcG9ydCAke3BvcnROdW1iZXJ9YCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zZXJ2ZXJJbnN0YW5jZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNlcnZlckluc3RhbmNlID0gZXhwcmVzc0FwcC5saXN0ZW4ocG9ydE51bWJlciwgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgYWRkcmVzc0luZm8gPSB0aGlzLnNlcnZlckluc3RhbmNlICYmIHRoaXMuc2VydmVySW5zdGFuY2UuYWRkcmVzcygpO1xuICAgICAgICAgICAgY29uc3QgcG9ydCA9ICdwb3J0JyBpbiBhZGRyZXNzSW5mbyA/IGFkZHJlc3NJbmZvLnBvcnQgOiBudWxsO1xuICAgICAgICAgICAgY29uc3QgYWRkcmVzcyA9ICdhZGRyZXNzJyBpbiBhZGRyZXNzSW5mb1xuICAgICAgICAgICAgICAgID8gYWRkcmVzc0luZm8uYWRkcmVzcyA9PT0gJzo6J1xuICAgICAgICAgICAgICAgICAgICA/ICdodHRwOi8vbG9jYWxob3N0OidcbiAgICAgICAgICAgICAgICAgICAgOiBhZGRyZXNzSW5mby5hZGRyZXNzXG4gICAgICAgICAgICAgICAgOiAnJztcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBTZXJ2ZXIgbGlzdGVuaW5nIG9uICR7YWRkcmVzc30ke3BvcnR9YCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgR3JhcGhRTCBwbGF5Z3JvdW5kIGxpc3RlbmluZyBvbiAke2FkZHJlc3N9JHtwb3J0fS9ncmFwaGApO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5leHBvcnRzLnNlcnZlciA9IG5ldyBTZXJ2ZXIoKTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImFtYXpvbi1jb2duaXRvLWlkZW50aXR5LWpzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImFwb2xsby1kYXRhc291cmNlXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImFwb2xsby1zZXJ2ZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYXBvbGxvLXNlcnZlci1leHByZXNzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImF3cy1zZGtcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYXhpb3NcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYm9keS1wYXJzZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY29yc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJkb3RlbnZcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZXhwcmVzc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJleHByZXNzLXZhbGlkYXRvci9jaGVja1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJqc29ud2VidG9rZW5cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiandrLXRvLXBlbVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtZXJnZS1ncmFwaHFsLXNjaGVtYXNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibW9yZ2FuXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInVuaXF1ZS1uYW1lcy1nZW5lcmF0b3JcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidXVpZFwiKTsiXSwic291cmNlUm9vdCI6IiJ9