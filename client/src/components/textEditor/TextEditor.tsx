'use client';
import axios from 'axios';
import dynamic from 'next/dynamic';

import { useEffect, useMemo, useState } from 'react';

import 'react-quill/dist/quill.snow.css';
import './textEditor.css';

import { io } from 'socket.io-client';

import type { Socket } from 'socket.io-client';

const TextEditor = () => {
  const [editorValue, setEditorValue] = useState('');

  const [socket, setSocket] = useState<Socket>();

  const ReactQuill = useMemo(
    () => dynamic(() => import('react-quill'), { ssr: false }),
    []
  );

  console.log(editorValue);

  useEffect(() => {
    const s = io('http://localhost:3001/');
    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, []);

  return (
    <div id="#">
      <ReactQuill
        value={editorValue}
        onChange={(value) => setEditorValue(value)}
      />
    </div>
  );
};

export default TextEditor;
