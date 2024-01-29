// TODO implement input sanitisation
// TODO check if user exists before allowing sign up
// TODO implement hashing of password

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
    const userExists = await prisma.tenant.findUnique({
      where: {
        email: email
      }
    });

    if (!userExists) {
      await prisma.tenant.create({
        data: {
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: password
          }
        })
      ctx.status = 200;
    } else {
      ctx.body = "User already exists, please sign in."
    }
  } catch (error) {
    console.log('error signing up user:', error);
    ctx.status = 500;
    ctx.body = { error: 'Error signing up' };
  }
};



interface Login {
  username: string,
  password: string
}

const login = async (ctx) => {
  const { username, password } = <Login> ctx.request.body

  try {
    
  } catch (error) {
    console.log('Error logging in;', error)
    ctx.status = 500;
    ctx.body = { error: 'Error logging in.'}
  }
};

const myProfile = async (ctx) => {
  // simply return all user info
};

const editProfile = async (ctx) => {};

const deleteAccount = async (ctx) => {};

const userProfile = { signup, login, myProfile, editProfile, deleteAccount };

export default userProfile;
