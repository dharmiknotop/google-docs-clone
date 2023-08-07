'use client';

import { signIn } from 'next-auth/react';
import Image from 'next/image';

interface LoginPageProps {}

const LoginPage: React.FC<LoginPageProps> = () => {
  return (
    <div
      className="flex flex-col items-center justify-center
    min-h-screen py-2"
    >
      <Image
        src="/images/banner.png"
        height="300"
        width="550"
        objectFit="contain"
        alt="banner"
      />
      <button
        className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
        type="button"
        onClick={() => {
          signIn();
        }}
      >
        Login
      </button>
      <div
        className="text-base bg-[#3B82F6] text-white
          py-4 px-12 absolute bottom-0 w-full"
      >
        <strong>Disclaimer:</strong> This is not the official Google Docs. It is
        a redesign, built purely for educational purpose.
      </div>
    </div>
  );
};

export default LoginPage;
