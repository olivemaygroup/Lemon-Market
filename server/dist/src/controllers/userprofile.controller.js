var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import prisma from "../db";
const signup = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email, password } = ctx.request.body;
    try {
        const newUser = yield prisma.tenant.create({
            data: {
                first_name: firstName,
                last_name: lastName,
                email: email,
                password: password
            }
        });
        ctx.status = 200;
    }
    catch (error) {
        console.log('error signing up user', error);
    }
});
// const addProfile = async (ctx) => {
// };
const login = (ctx) => __awaiter(void 0, void 0, void 0, function* () { });
const myProfile = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    // simply return all user info
});
const editProfile = (ctx) => __awaiter(void 0, void 0, void 0, function* () { });
const deleteAccount = (ctx) => __awaiter(void 0, void 0, void 0, function* () { });
const userProfile = { signup, login, myProfile, editProfile, deleteAccount };
export default userProfile;
