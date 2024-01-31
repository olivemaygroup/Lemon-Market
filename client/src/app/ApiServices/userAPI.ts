import { Profile } from "next-auth";
import { LogIn, NewUser } from "../types/types";

const BASE_URL = process.env.SERVER_URL;

const signUp = async (newUser: NewUser): Promise<string> => {
  try {
    const res = await fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser),
    })
    const accessToken: string = await res.text()
    return accessToken
  } catch (err) {
    console.log(err)
    throw err;
  }
}

const login = async (loginDetails: LogIn): Promise<string> => {
  try {
    const res = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginDetails),
    })
    const accessToken: string = await res.text()

    return accessToken
  } catch (err) {
    console.log(err)
    throw err;
  }
}

const myProfile = async (accessToken: string): Promise<Profile> => {
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
    throw err;
  }
}
const userAPI = { signUp, login, myProfile }

export default userAPI
