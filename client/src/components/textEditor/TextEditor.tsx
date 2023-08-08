'use client';

import { useEffect, useCallback, useState } from 'react';

import Quill from 'quill';
import 'react-quill/dist/quill.snow.css';

import './textEditor.css';

import { useSession } from 'next-auth/react';

import { io } from 'socket.io-client';
import type { Socket } from 'socket.io-client';

import * as htmlToImage from 'html-to-image';

const SAVE_INTERVAL_MS = 2000;

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

type DocumentId = {
  documentId: string;
};

const TextEditor = (props: DocumentId) => {
  const { documentId } = props;

  const { data: session } = useSession();

  let email = session?.user?.email;

  const [socket, setSocket] = useState<Socket>();
  const [quill, setQuill] = useState<any>();

  const editorsdw: HTMLElement = document.getElementsByClassName('ql-editor');

  const takeScreenShot = async (node: any) => {
    console.log(editorsdw[0]);

    const dataURI = await htmlToImage.toJpeg(editorsdw[0]);
    return dataURI;
  };

  const download = (image, fileName) => {
    // const a = document.createElement('a');
    // a.href = image;
    // a.download = fileName;
    // a.click();

    console.log('called');
  };

  useEffect(() => {
    if (socket == null || quill == null) return;

    socket.once('load-document', (document) => {
      quill.setContents(document);
      quill.enable();

      takeScreenShot(editorsdw).then(download);
    });

    socket.emit('get-document', documentId);
  }, [socket, quill, documentId]);

  useEffect(() => {
    if (socket == null || quill == null) return;

    const interval = setInterval(() => {
      socket.emit('save-document', quill.getContents(), email);
    }, SAVE_INTERVAL_MS);

    return () => {
      clearInterval(interval);
    };
  }, [socket, quill, email]);

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
    if (wrapper == null) return;

    wrapper.innerHTML = '';
    const editor = document.createElement('div');
    wrapper.append(editor);

    const q = new Quill(editor, {
      theme: 'snow',
      modules: { toolbar: TOOLBAR_OPTIONS },
    });

    q.disable();
    q.setText('Loading...');

    setQuill(q);
  }, []);

  return <div id="testingOut" ref={wrapperRef}></div>;
};

export default TextEditor;
