'use client'
import { NewUser, Login } from '../types/types'

// const BASE_URL = process.env.BASE_URL
const BASE_URL = 'http://localhost:3001'


  // REGISTERING FUNCTIONS
  export const passwordChecker = (password: string): boolean => {
    const regex = /^(?=.*[A-Z])(?=.*\d).+$/;
    if (password.length > 6 || regex.test(password)) {
      return true;
    } else {
      return false;
    }
  };

  
  // export default apiService
