import prisma from "../db";
import { Context } from "koa";
import bcrypt from "bcrypt";

interface Contact {
  firstName: string, 
  lastName: string,
  email: string,
  password: string
}

const signup = async (ctx: Context) => {
  const { firstName, lastName, email, password } = <Contact> ctx.request.body
  try {

    const sanitizedEmail = email.replace(/[$/(){}]/g, "");
    const sanitizedPassword = password.replace(/[$/(){}]/g, "");

    const userExists = await prisma.tenant.findUnique({ where: { email: email } });

    if (userExists) {
      ctx.body = "User already exists, please sign in."
      ctx.status = 409
      
    } else {
      const hash = await bcrypt.hash(sanitizedPassword, 10);
      await prisma.tenant.create({
        data: {
            first_name: firstName,
            last_name: lastName,
            email: sanitizedEmail,
            password: hash
          }
        })
      ctx.status = 200;
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
