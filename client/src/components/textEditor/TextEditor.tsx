'use client';

import { useEffect, useCallback, useState } from 'react';
import { useSession } from 'next-auth/react';

import Quill from 'quill';
import 'react-quill/dist/quill.snow.css';

import './textEditor.css';

import { configKeys } from '@/config/keys';

import { io } from 'socket.io-client';
import type { Socket } from 'socket.io-client';

import {
  uploadToCloudinary,
  updateCloudinaryImage,
} from '@/features/cloudinary/cloudinary';

import { Doc, DocumentId, TOOLBAR_OPTIONS } from './types';

const SAVE_INTERVAL_MS = 2000;

const TextEditor = (props: DocumentId) => {
  const { documentId } = props;

  const { data: session } = useSession();

  let email = session?.user?.email;

  const [socket, setSocket] = useState<Socket>();
  const [quill, setQuill] = useState<any>();

  const [imageLink, setImageLink] = useState<object>({});

  const [doc, setDoc] = useState<Doc>({
    _id: 0,
    email: '',
    data: {},
    documentScreenShot: {
      public_id: '',
    },
  });

  let getDocument = () => {
    if (socket == null || quill == null) return;

    socket.once('load-document', (document) => {
      quill.setContents(document?.data);
      quill.enable();

      setDoc(document);
    });

    socket.emit('get-document', documentId);
  };

  useEffect(() => {
    getDocument();
  }, [socket, quill, documentId]);

  useEffect(() => {
    if (socket == null || quill == null) return;

    const interval = setInterval(() => {
      let data = {
        quillData: quill.getContents(),
        email,
        documentScreenShot: imageLink,
      };

      socket.emit('save-document', data);
    }, SAVE_INTERVAL_MS);

    return () => {
      clearInterval(interval);
    };
  }, [socket, quill, email, imageLink]);

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
      if (source !== 'user') return;
      socket.emit('send-changes', delta);
    };

    quill.on('text-change', handler);

    return () => {
      quill.off('text-change', handler);
    };
  }, [socket, quill]);

  useEffect(() => {
    const s = io(`${configKeys.SERVER_URL}`);

    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, []);

  useEffect(() => {
    if (doc._id === 0) return;

    console.log(quill.root);

    if (Object.keys(doc.documentScreenShot).length === 0) {
      uploadToCloudinary(setImageLink);
    } else {
      updateCloudinaryImage(doc.documentScreenShot?.public_id, setImageLink);
    }
  }, [doc]);

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
