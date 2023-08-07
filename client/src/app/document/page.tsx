'use client';
import Link from 'next/link';
import React from 'react';

import { v4 as uuidV4 } from 'uuid';

const page = () => {
  return (
    <div className="h-80 bg-gray-50">
      <div className="flex pl-20 pr-20 pt-10 justify-between card">
        <div className="flex">
          <p>Start a new document</p>
        </div>
        <div className="flex">sd</div>
      </div>
      <div className="flex pl-20 pr-20 pt-2 justify-between card-body">
        <Link href={`/document/${uuidV4()}`}>
          <div className="flex img-div">
            <img
              src="/images/docs-blank.png"
              alt="banner"
              className="h-48 padding-img hover:border hover:border-blue-400 cursor-pointer"
            />
            <div className="relative top-48 right-36 card-text">
              <p>Blank</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default page;
