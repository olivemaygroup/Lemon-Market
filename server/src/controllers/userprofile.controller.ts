import prisma from "../db";
import { Context } from "koa";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { Contact, Login } from '../types/types'
import { Tenant } from "@prisma/client";

const SECRET_KEY = process.env.SECRET_KEY;

console.log('key console,', SECRET_KEY)



const signup = async (ctx: Context) => {
  const { firstName, lastName, email, password } = <Contact>ctx.request.body
  try {

    const sanitizedEmail = email.replace(/[$/(){}]/g, "").toLowerCase();
    const sanitizedPassword = password.replace(/[$/(){}]/g, "");
    const santitizedFirstName = firstName.replace(/[$/(){}]/g, "");
    const santitizedLastName = lastName.replace(/[$/(){}]/g, "");

    const userExists = await prisma.tenant.findUnique({ where: { email: sanitizedEmail } });

    if (userExists) {
      ctx.body = "User already exists, please sign in.";
      ctx.status = 409;
    } else {
      const hash = await bcrypt.hash(sanitizedPassword, 10);
      const tenant = await prisma.tenant.create({
        data: {
          first_name: santitizedFirstName,
          last_name: santitizedLastName,
          email: sanitizedEmail,
          password: hash
        }
      });
      const token = jwt.sign(tenant.tenant_id, SECRET_KEY);
      const tenantWithoutPassword = { firstName: tenant.first_name, lastName: tenant.last_name, email: tenant.email };

      const tenantWithToken = {
        ...tenantWithoutPassword, accessToken: token
      }
      ctx.body = tenantWithToken
      ctx.status = 201;
    }
  } catch (error) {
    console.log('error signing up user:', error);
    ctx.status = 500;
    ctx.body = { error: 'Error signing up' };
  }
};

const login = async (ctx: Context) => {
  try {
    const { email, password } = <Login>ctx.request.body;


    const sanitizedEmail = email.replace(/[$/(){}]/g, "").toLowerCase();
    const sanitizedPassword = password.replace(/[$/(){}]/g, "");
    const tenant = await prisma.tenant.findUnique({ where: { email: sanitizedEmail } });

    if (!tenant) {
      ctx.body = "Email or Password is incorrect."
      ctx.status = 401
      return
    }

    const validatePassword = await bcrypt.compare(sanitizedPassword, tenant.password);

    if (!validatePassword) {
      ctx.body = "Email or Password is incorrect."
      ctx.status = 401
      return
    } else {
      const token = jwt.sign(tenant.tenant_id, SECRET_KEY);
      const tenantWithoutPassword = { firstName: tenant.first_name, lastName: tenant.last_name, email: tenant.email };

      const tenantWithToken = {
        ...tenantWithoutPassword, accessToken: token
      }

      ctx.body = tenantWithToken
      ctx.status = 200;
    }

  } catch (error) {
    console.log('Error logging in;', error)
    ctx.status = 500;
    ctx.body = { error: 'Error logging in.' }
  }
};

const myProfile = async (ctx: Context) => {
  try {
    const tenant: Tenant = ctx.state.tenant;
    const tenantWithoutPassword = { firstName: tenant.first_name, lastName: tenant.last_name, email: tenant.email };
    ctx.body = tenantWithoutPassword;
    ctx.status = 200;
  } catch (error) {
    console.error(error)
    ctx.body = "Error geting profile"
    ctx.status = 500
  }
};

const checkUser = async (ctx: Context) => {
  try {
    const tenant: Tenant = ctx.state.tenant;
    if (tenant) {
      ctx.body = 'user logged in'
      ctx.status = 200;
    } else {
      ctx.body = 'user not authenticated'
      ctx.status = 401;
    }
  } catch (error) {
    console.error(error)
    ctx.body = "error checking user"
    ctx.status = 500
  }
};

const editProfile = async (ctx: Context) => {
  const { firstName, lastName, email, password } = ctx.request.body as Contact;
  try {

    const sanitizedEmail = email.replace(/[$/(){}]/g, "").toLowerCase();
    const sanitizedPassword = password.replace(/[$/(){}]/g, "");
    const santitizedFirstName = firstName.replace(/[$/(){}]/g, "");
    const santitizedLastName = lastName.replace(/[$/(){}]/g, "");

    const user: Tenant = ctx.state.tenant;

    const hash = await bcrypt.hash(sanitizedPassword, 10);
    const tenant = await prisma.tenant.update({
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

    const token = jwt.sign(tenant.tenant_id, SECRET_KEY);
    const tenantWithoutPassword = { firstName: tenant.first_name, lastName: tenant.last_name, email: tenant.email };

    const tenantWithToken = {
      ...tenantWithoutPassword, accessToken: token
    }

    ctx.body = tenantWithToken
    ctx.status = 201;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Error updating user details' };
  }
};

const deleteAccount = async (ctx: Context) => {

  const user: Tenant = ctx.state.tenant;
  try {
    await prisma.tenant.delete({
      where: {
        email: user.email
      }
    });
    ctx.body = "User deleted.";
    ctx.status = 200;
  } catch (error) {
    console.log('Error deleting account, please contact customer support', error)
    ctx.status = 500
  }


};
const userProfile = { signup, login, myProfile, editProfile, deleteAccount,checkUser };

export default userProfile;
