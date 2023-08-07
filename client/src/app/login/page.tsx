import Head from 'next/head';
import IsNotAuth from '@/features/auth/IsNotAuth';
import LoginPage from '@/components/login/login';

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  return (
    <IsNotAuth>
      <Head>
        <title>Login</title>
      </Head>
      <LoginPage />
    </IsNotAuth>
  );
};

export default Login;
