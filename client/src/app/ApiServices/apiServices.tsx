'use client'

const BASE_URL = process.env.BASE_URL

const apiService = {
  signUp: (newUser:any) => {
    return fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser),
      })
      .then((res) => res.json())
      .catch((err) => console.log(err));
    }
  } 
