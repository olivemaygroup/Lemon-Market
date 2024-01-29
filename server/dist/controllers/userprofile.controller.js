var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const signup = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
});
const addProfile = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
});
const login = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
});
const myProfile = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
});
const editProfile = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
});
const deleteAccount = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
});
const userProfile = { signup, addProfile, login, myProfile, editProfile, deleteAccount };
export default userProfile;
