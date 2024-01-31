'use client'

// const BASE_URL = process.env.BASE_URL
const BASE_URL = 'http://localhost:3001'
console.log('URL--', BASE_URL)
interface AS {
  signUp: (newUser: any) => object,
  login: (user: any) => object
}

const apiService = {
  // signUp: (newUser:any) => {
  //   return fetch(`${BASE_URL}/signup`, {
  //     method: 'POST',
  //     mode: 'cors',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(newUser),
  //     })
  //     .then((res) => res.text())
  //     .catch((err) => console.log(err,'---err'));
  //   },

  signUp: async (newUser:any): Promise<string | number> => {
        const response = await fetch(`${BASE_URL}/signup`, {
          method: 'POST',
          mode: 'cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newUser),
        })
        return response.text();
  },

    login: async (user:any) => {
      console.log('URL--', BASE_URL)
      const final = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        mode: 'cors',
        // credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
        })
        try {
        console.log('final--',final.text)
       const finalfinal=  await final.text()
        console.log(finalfinal,'final.text')
        return finalfinal
        } catch (err) {console.log(err)}
      }
  } 

  export default apiService
