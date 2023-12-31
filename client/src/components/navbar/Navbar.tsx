'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';

function Navbar() {
  const { data: session } = useSession();

  return (
    <div className="flex mt-3 mx-8 h-14 justify-between">
      <div className="flex">
        <Link href="/document">
          <img src="./images/docs-logo.png" alt="logo" className="flex h-10" />
        </Link>
        <h1 className="text-3xl font-signature ml-2 flex">Docs</h1>
      </div>
      <div className="flex">
        <div className="relative w-full search">
          <div className="absolute inset-y-0 left-0 bottom-2 flex items-center pl-3 pointer-events-none mb-2">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500 dark:text-black-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            type="text"
            id="simple-search"
            className="bg-gray-200 border border-gray-200 text-gray-900 outline-none text-sm rounded-lg block w-[500px] pl-10 p-2.5"
            placeholder="Search"
          />
        </div>
      </div>
      <div className="flex">
        {session?.user?.image && (
          <img
            src={session.user.image}
            alt=""
            className="h-10 rounded-full cursor-pointer"
          />
        )}
      </div>
    </div>
  );
}

export default Navbar;
