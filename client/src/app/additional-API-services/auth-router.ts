import { useRouter } from 'next/router';


const authRouter = () => {
  const router = useRouter();
  router.push('http://localhost:3000/login')
}

const handleAuthenticationError = () => {
  authRouter();
  console.error('User not authenticated');
  throw new Error('User not authenticated');
};

export default handleAuthenticationError