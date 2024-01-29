import prisma from "../db";
import { Context } from "koa";

const signup = async (ctx: Context) => {
  try {
    ctx.status = 200;
  } catch (error) {}
};

// const addProfile = async (ctx) => {

// };

const login = async (ctx) => {};

const myProfile = async (ctx) => {
  // simply return all user info
};

const editProfile = async (ctx) => {};

const deleteAccount = async (ctx) => {};

const userProfile = { signup, login, myProfile, editProfile, deleteAccount };

export default userProfile;
