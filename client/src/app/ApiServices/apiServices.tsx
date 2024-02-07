'use client'




  // REGISTERING FUNCTIONS
  export const passwordChecker = (password: string): boolean => {
    const regex = /^(?=.*[A-Z])(?=.*\d).+$/;
    if (password.length > 6 || regex.test(password)) {
      return true;
    } else {
      return false;
    }
  };


  export default passwordChecker
