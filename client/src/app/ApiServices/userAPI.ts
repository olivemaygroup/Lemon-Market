import { Profile } from "next-auth";
import { LogIn, NewUser } from "../types/tenant-types";
import { Login } from "../types/types";
import handleAuthenticationError from "../utils/auth-router";
import { Diplomata } from "next/font/google";

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

const signUp = async (newUser: NewUser): Promise<string | number> => {
  const response = await fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newUser),
  })
  if (response.status === 409) return 409;
  return response.json()
}


const login = async (user: Login) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  })
  if (response.status === 401) return 401;
  return response.json()

}

const editProfile = async (newUser: NewUser, accessToken: string): Promise<any> => {
  try {
    const res = await fetch(`${BASE_URL}/editprofile`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'authorization': accessToken
      },
      body: JSON.stringify(newUser),
    })

    if (res.status === 409) {
      return 409;
    }
    const tenantWithAccessToken = await res.json()
    return tenantWithAccessToken
  } catch (err) {
    console.log(err)
    return undefined
  }
}

const checkUser = async (dispatch: any): Promise<boolean | undefined> => {
  const accessToken = localStorage.getItem('accessToken')

  if (!accessToken) {
    handleAuthenticationError(dispatch);
    return false
  }
  try {
    const res = await fetch(`${BASE_URL}/checkUser`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'authorization': accessToken
      },
    })

    if (res.status === 401) {
      handleAuthenticationError();
      return false
    } else {
      return true;
    }

  } catch (error) {
    console.log(error)
    handleAuthenticationError();

  }
}


const logOut = () => {
  const accessToken = localStorage.getItem('accessToken')

  if (accessToken) {
    localStorage.removeItem('accessToken')
    return 'User logged out'
  } else {
    return 'User no logged in'
  }
}


const userAPI = { signUp, login, logOut, editProfile, checkUser }

export default userAPI
