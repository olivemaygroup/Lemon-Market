"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../db"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET_KEY = process.env.SECRET_KEY;
const signup = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email, password } = ctx.request.body;
    try {
        if (!firstName || !lastName || !email || !password) {
            ctx.status = 500;
            ctx.body = { error: 'Missing a signup property' };
            return;
        }
        const sanitizedEmail = email.replace(/[$/(){}]/g, "").toLowerCase();
        const sanitizedPassword = password.replace(/[$/(){}]/g, "");
        const santitizedFirstName = firstName.replace(/[$/(){}]/g, "");
        const santitizedLastName = lastName.replace(/[$/(){}]/g, "");
        const userExists = yield db_1.default.tenant.findUnique({ where: { email: sanitizedEmail } });
        if (userExists) {
            ctx.body = "User already exists, please sign in.";
            ctx.status = 409;
        }
        else {
            const hash = yield bcrypt_1.default.hash(sanitizedPassword, 10);
            const tenant = yield db_1.default.tenant.create({
                data: {
                    first_name: santitizedFirstName,
                    last_name: santitizedLastName,
                    email: sanitizedEmail,
                    password: hash
                }
            });
            const token = jsonwebtoken_1.default.sign(tenant.tenant_id, SECRET_KEY);
            const tenantWithoutPassword = { tenant_id: tenant.tenant_id, firstName: tenant.first_name, lastName: tenant.last_name, email: tenant.email };
            const tenantWithToken = Object.assign(Object.assign({}, tenantWithoutPassword), { accessToken: token });
            ctx.body = tenantWithToken;
            ctx.status = 201;
        }
    }
    catch (error) {
        console.log('error signing up user:', error);
        ctx.status = 500;
        ctx.body = { error: 'Error signing up' };
    }
});
const login = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = ctx.request.body;
        const sanitizedEmail = email.replace(/[$/(){}]/g, "").toLowerCase();
        const sanitizedPassword = password.replace(/[$/(){}]/g, "");
        const tenant = yield db_1.default.tenant.findUnique({ where: { email: sanitizedEmail } });
        if (!tenant) {
            ctx.body = "Email or Password is incorrect.";
            ctx.status = 401;
            return;
        }
        const validatePassword = yield bcrypt_1.default.compare(sanitizedPassword, tenant.password);
        if (!validatePassword) {
            ctx.body = "Email or Password is incorrect.";
            ctx.status = 401;
            return;
        }
        else {
            const token = jsonwebtoken_1.default.sign(tenant.tenant_id, SECRET_KEY);
            const tenantWithoutPassword = { tenant_id: tenant.tenant_id, firstName: tenant.first_name, lastName: tenant.last_name, email: tenant.email };
            const tenantWithToken = Object.assign(Object.assign({}, tenantWithoutPassword), { accessToken: token });
            ctx.body = tenantWithToken;
            ctx.status = 200;
        }
    }
    catch (error) {
        console.log('Error logging in;', error);
        ctx.status = 500;
        ctx.body = { error: 'Error logging in.' };
    }
});
const myProfile = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tenant = ctx.state.tenant;
        const tenantWithoutPassword = { firstName: tenant.first_name, lastName: tenant.last_name, email: tenant.email };
        ctx.body = tenantWithoutPassword;
        ctx.status = 200;
    }
    catch (error) {
        console.error(error);
        ctx.body = "Error geting profile";
        ctx.status = 500;
    }
});
const checkUser = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tenant = ctx.state.tenant;
        if (tenant) {
            ctx.body = 'user logged in';
            ctx.status = 200;
        }
        else {
            ctx.body = 'user not authenticated';
            ctx.status = 401;
        }
    }
    catch (error) {
        console.error(error);
        ctx.body = "error checking user";
        ctx.status = 500;
    }
});
const editProfile = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email, password } = ctx.request.body;
    try {
        const sanitizedEmail = email.replace(/[$/(){}]/g, "").toLowerCase();
        const sanitizedPassword = password.replace(/[$/(){}]/g, "");
        const santitizedFirstName = firstName.replace(/[$/(){}]/g, "");
        const santitizedLastName = lastName.replace(/[$/(){}]/g, "");
        const user = ctx.state.tenant;
        const hash = yield bcrypt_1.default.hash(sanitizedPassword, 10);
        const tenant = yield db_1.default.tenant.update({
            where: {
                tenant_id: user.tenant_id
            },
            data: {
                first_name: santitizedFirstName,
                last_name: santitizedLastName,
                email: sanitizedEmail,
                password: hash
            }
        });
        const token = jsonwebtoken_1.default.sign(tenant.tenant_id, SECRET_KEY);
        const tenantWithoutPassword = { firstName: tenant.first_name, lastName: tenant.last_name, email: tenant.email };
        const tenantWithToken = Object.assign(Object.assign({}, tenantWithoutPassword), { accessToken: token });
        ctx.body = tenantWithToken;
        ctx.status = 201;
    }
    catch (error) {
        ctx.status = 500;
        ctx.body = { error: 'Error updating user details' };
    }
});
const deleteAccount = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const user = ctx.state.tenant;
    try {
        yield db_1.default.tenant.delete({
            where: {
                email: user.email
            }
        });
        ctx.body = "User deleted.";
        ctx.status = 200;
    }
    catch (error) {
        console.log('Error deleting account, please contact customer support', error);
        ctx.status = 500;
    }
});
const userProfile = { signup, login, myProfile, editProfile, deleteAccount, checkUser };
exports.default = userProfile;
