import { NewUser, Login } from '../types/types'
'use client'

// const BASE_URL = process.env.BASE_URL
const BASE_URL = 'http://localhost:3001'

const apiService = {

  signUp: async (newUser: NewUser): Promise<string | number> => {
        const response = await fetch(`${BASE_URL}/signup`, {
          method: 'POST',
          mode: 'cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newUser),
        })
        if (response.status === 409) return 409;
        return response.json()
  },

  
  login: async (user: Login) => {
        const response = await fetch(`${BASE_URL}/login`, {
          method: 'POST',
          mode: 'cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(user),
        })
        if (response.status === 401) return 401;
        return response.text()
        
  } 
}
  export default apiService
