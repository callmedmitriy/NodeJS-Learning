"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var joi_1 = __importDefault(require("@hapi/joi"));
var app = express_1.default();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
// Function for id generate
var idGenerator = function (startId) {
    var firstId = startId;
    return function () {
        return firstId++;
    };
};
var createId = idGenerator(1);
var userList = [];
// Filter user list by start string and return limit count
var getAutoSuggestUsers = function (loginSubstring, limit) {
    var newList = userList.filter(function (user) { return user.login.startsWith(loginSubstring); });
    newList.sort(function (first, second) { return first.login > second.login ? 1 : -1; });
    newList = newList.slice(0, limit);
    return newList;
};
// Server-side validation for create/update operations of User entity
var schema = joi_1.default.object({
    id: joi_1.default.number()
        .integer(),
    login: joi_1.default.string()
        .alphanum()
        .min(3)
        .max(20)
        .required(),
    password: joi_1.default.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),
    age: joi_1.default.number()
        .integer()
        .min(4)
        .max(130)
        .required(),
});
// Server start
app.listen(3000, function () {
    // tslint:disable-next-line:no-console
    console.log('App was running and listening port 3000');
});
app.route('/user/:id')
    .get(function (req, res) {
    // const userById: User = userList.filter( user => user.id === parseIntreq.params.id )[0];
    // const sendData: string = userById ? JSON.stringify(userById, null, ' ') : 'Deleted successfully';
    // res.send(sendData);
    res.json(userList.find(function (user) { return user.id === parseInt(req.params.id, 10); }));
})
    .delete(function (req, res) {
    var deleted = false;
    userList = userList.map(function (user) {
        if (user.id === parseInt(req.params.id, 10)) {
            user.isDeleted = true;
            deleted = true;
        }
        return user;
    });
    var sendData = deleted ? 'Deleted successfully' : 'User not founded';
    res.send(sendData);
});
app.route('/user')
    .get(function (req, res) {
    res.send(userList);
})
    .post(function (req, res) {
    var params = req.body;
    var _a = schema.validate(params), error = _a.error, value = _a.value;
    var sendData;
    if (error) {
        sendData = error.message;
        res.status(400);
    }
    else if (params.id) {
        userList = userList.map(function (user) {
            if (user.id === params.id) {
                user = __assign(__assign({}, user), params);
            }
            return user;
        });
        sendData = 'User updated successfully';
    }
    else {
        var newUser = __assign(__assign({ id: createId() }, params), { isDeleted: false });
        userList = __spreadArrays(userList, [newUser]);
        sendData = 'User created successfully';
    }
    res.send(sendData);
});
app.get('/filter', function (req, res) {
    var starts = req.query.starts;
    var limit = req.query.limit || 5;
    res.send(getAutoSuggestUsers(starts, limit));
});
// Temp data
var One = {
    id: createId(),
    login: "Name_a",
    password: "somepassword",
    age: 13,
    isDeleted: false,
};
var Two = {
    id: createId(),
    login: "Name_d",
    password: "pas",
    age: 14,
    isDeleted: false,
};
var Three = {
    id: createId(),
    login: "Name_b",
    password: "qwerty",
    age: 43,
    isDeleted: false,
};
var Four = {
    id: createId(),
    login: "Name_c",
    password: "somepassword",
    age: 13,
    isDeleted: false,
};
var Five = {
    id: createId(),
    login: "Natasha",
    password: "pas",
    age: 14,
    isDeleted: false,
};
var Six = {
    id: createId(),
    login: "Nanana",
    password: "qwerty",
    age: 43,
    isDeleted: false,
};
userList = [One, Two, Three, Four, Five, Six];
