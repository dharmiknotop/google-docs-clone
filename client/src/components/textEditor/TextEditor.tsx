'use client';

import { useEffect, useCallback, useState } from 'react';

import Quill from 'quill';
import 'react-quill/dist/quill.snow.css';

import './textEditor.css';

import { io } from 'socket.io-client';

import type { Socket } from 'socket.io-client';

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: 'ordered' }, { list: 'bullet' }],
  ['bold', 'italic', 'underline'],
  [{ color: [] }, { background: [] }],
  [{ script: 'sub' }, { script: 'super' }],
  [{ align: [] }],
  ['image', 'blockquote', 'code-block'],
  ['clean'],
];

const TextEditor = () => {
  const [socket, setSocket] = useState<Socket>();

  const [quill, setQuill] = useState<any>();

  useEffect(() => {
    if (socket == null || quill == null) return;

    const handler = (delta: Array<string>) => {
      quill.updateContents(delta);
    };

    socket.on('receive-changes', handler);

    return () => {
      socket.off('receive-changes', handler);
    };
  }, [socket, quill]);

  useEffect(() => {
    if (socket == null || quill == null) return;

    const handler = (
      delta: Array<string>,
      oldDelta: Array<string>,
      source: string
    ) => {
      console.log(typeof source);

      if (source !== 'user') return;
      socket.emit('send-changes', delta);
    };

    quill.on('text-change', handler);

    return () => {
      quill.off('text-change', handler);
    };
  }, [socket, quill]);

  useEffect(() => {
    const s = io('http://localhost:3001/');
    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, []);

  const wrapperRef = useCallback((wrapper: any) => {
    console.log(typeof wrapper);

    if (wrapper == null) return;

    wrapper.innerHTML = '';
    const editor = document.createElement('div');
    wrapper.append(editor);
    const q = new Quill(editor, {
      theme: 'snow',
      modules: { toolbar: TOOLBAR_OPTIONS },
    });
    // q.disable();
    // q.setText('Loading...');
    setQuill(q);
  }, []);

  return <div ref={wrapperRef}></div>;
};

export default TextEditor;
