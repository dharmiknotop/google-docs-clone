'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface IsNotAuthProps {}

const IsNotAuth: React.FC<IsNotAuthProps> = () => {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status === 'authenticated') {
      router.replace('/document/');
    }
  }, [session, router]);

  return <></>;
};

export default IsNotAuth;
