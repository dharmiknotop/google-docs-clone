'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import Link from 'next/link';

import { io } from 'socket.io-client';
import type { Socket } from 'socket.io-client';

const RecentDocument = () => {
  const [requestPostData, setRequestPostData] = useState({
    loading: false,
    success: '',
    error: '',
  });

  const [socket, setSocket] = useState<Socket>();

  const [recentDocument, setRecentDocument] = useState<Array<string>>([]);

  const getRecentDocuments = async () => {
    setRequestPostData({
      loading: true,
      success: '',
      error: '',
    });

    try {
      socket && socket.emit('get-recent-document', 'dhardharmik7@gmail.com');
      socket &&
        socket.once('load-recent-document', (document) => {
          setRecentDocument(document);
        });

      setRequestPostData({
        loading: false,
        success: 'sign up done succesfully.',
        error: '',
      });
    } catch (error) {
      console.log('error: ', error);
      setRequestPostData({
        loading: false,
        success: '',
        error: 'Something went wrong',
      });
    }
  };

  useEffect(() => {
    getRecentDocuments();

    console.log(document.getElementsByClassName('ql-editor'));
  }, [socket]);

  useEffect(() => {
    const s = io('http://localhost:3001/');
    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, []);

  return (
    <div>
      <div className="flex justify-between pl-14 pr-14 pt-4">
        <div className="flex">
          <h1>Recent documents</h1>
        </div>

        {/* <div className="flex gap-3">
          <div>
            <img
              src={'./images/docs-logo.png'}
              alt=""
              className="h-5 cursor-pointer"
            />
          </div>
          <div>
            <img
              src={'./images/docs-logo.png'}
              alt=""
              className="h-5 cursor-pointer"
            />
          </div>
        </div> */}
      </div>

      <div className="flex flex-wrap pl-14">
        {recentDocument &&
          recentDocument.map((item: any) => {
            console.log('recent document', item);

            return (
              <Link
                href={`/document/${item._id}`}
                className="cursor-pointer mb-6 mt-4 mr-10"
                key={item._id}
              >
                <div className="flex">
                  <img
                    src={item?.documentScreenShot?.url}
                    alt=""
                    className="w-48"
                  />
                </div>
                <p className="mt-1">documents</p>
                <div className="flex justify-between mt-1">
                  <div className="flex align-center">
                    <div>
                      <img
                        src={'./images/docs-logo.png'}
                        alt=""
                        className="h-5"
                      />
                    </div>
                    <div>
                      <p className="text-xs font-normal">Opened 7:20 PM</p>
                    </div>
                  </div>
                  <div>
                    <img
                      src={'./images/docs-logo.png'}
                      alt=""
                      className="h-3 rotate-90 ml-7"
                    />
                  </div>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default RecentDocument;
