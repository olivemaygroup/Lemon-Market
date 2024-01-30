var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
import prisma from "../db";
import bcrypt from "bcrypt";
const signup = (ctx) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email, password } = ctx.request.body;
    try {
      const sanitizedEmail = email.replace(/[$/(){}]/g, "");
      const sanitizedPassword = password.replace(/[$/(){}]/g, "");
      const santitizedFirstName = firstName.replace(/[$/(){}]/g, "");
      const santitizedLastName = lastName.replace(/[$/(){}]/g, "");
      const userExists = yield prisma.tenant.findUnique({
        where: { email: sanitizedEmail },
      });
      if (userExists) {
        ctx.body = "User already exists, please sign in.";
        ctx.status = 409;
      } else {
        const hash = yield bcrypt.hash(sanitizedPassword, 10);
        const tenant = yield prisma.tenant.create({
          data: {
            first_name: santitizedFirstName,
            last_name: santitizedLastName,
            email: sanitizedEmail,
            password: hash,
          },
        });
        jwt.sign;
        ctx.status = 200;
      }
    } catch (error) {
      console.log("error signing up user:", error);
      ctx.status = 500;
      ctx.body = { error: "Error signing up" };
    }
  });
const login = (ctx) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = ctx.request.body;
    const sanitizedEmail = email.replace(/[$/(){}]/g, "");
    const sanitizedPassword = password.replace(/[$/(){}]/g, "");
    const user = yield prisma.tenant.findUnique({
      where: { email: sanitizedEmail },
    });
    const validatePassword = yield bcrypt.compare(
      sanitizedPassword,
      user.password,
    );
    if (!validatePassword) {
      ctx.body = "Email or Password is incorrect.";
      ctx.status = 401;
    }
    try {
    } catch (error) {
      console.log("Error logging in;", error);
      ctx.status = 500;
      ctx.body = { error: "Error logging in." };
    }
  });
const myProfile = (ctx) => __awaiter(void 0, void 0, void 0, function* () {});
const editProfile = (ctx) => __awaiter(void 0, void 0, void 0, function* () {});
const deleteAccount = (ctx) =>
  __awaiter(void 0, void 0, void 0, function* () {
    // const { email }
  });
const userProfile = { signup, login, myProfile, editProfile, deleteAccount };
export default userProfile;
