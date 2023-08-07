'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface IsAuthProps {}

const IsAuth: React.FC<IsAuthProps> = () => {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status === 'unauthenticated') {
      router.replace('/login');
    }
  }, [session, router]);

  return <></>;
};

export default IsAuth;
