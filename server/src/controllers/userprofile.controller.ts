import prisma from "../db";
import { Context } from "koa";

interface Contact {
  firstName: string, 
  lastName: string,
  email: string,
  password: string
}

const signup = async (ctx: Context) => {
  const { firstName, lastName, email, password } = <Contact> ctx.request.body
  try {
    const newUser = await prisma.tenant.create({
      data: {
          first_name: firstName,
          last_name: lastName,
          email: email,
          password: password
        }
      })
    ctx.status = 200;
  } catch (error) {
    console.log('error signing up user', error)
  }
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
