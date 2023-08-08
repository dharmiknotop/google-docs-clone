import Head from 'next/head';
import IsNotAuth from '@/features/auth/IsNotAuth';
import LoginPage from '@/components/login/login';
import Navbar from '@/components/navbar/Navbar';

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  return (
    <IsNotAuth>
      <Head>
        <title>Login</title>
      </Head>
      <Navbar />

      <LoginPage />
    </IsNotAuth>
  );
};

export default Login;
