import { Profile } from "next-auth";
import { LogIn, NewUser } from "../types/tenant-types";

const BASE_URL = process.env.SERVER_URL;

const signUp = async (newUser: NewUser): Promise<any> => {
  try {
    const res = await fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
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

const login = async (loginDetails: LogIn): Promise<any> => {
  try {
    const res = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginDetails),
    })

    if (res.status === 409) {
      return 409;
    }

    const tenantWithAccessToken = await res.json()

    return tenantWithAccessToken
  } catch (err) {
    console.log(err)
    throw err;
  }
}

const myProfile = async (accessToken: string): Promise<Profile | undefined> => {
  try {
    const res = await fetch(`${BASE_URL}/myprofile`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        authorisation: accessToken
      },
    })

    const tenant = await res.json()

    return tenant
  } catch (err) {
    console.log(err)
    return undefined
  }
}
const userAPI = { signUp, login, myProfile }

export default userAPI
