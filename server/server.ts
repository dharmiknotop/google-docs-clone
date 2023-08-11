import { Socket } from 'socket.io';
import DocumentModel from './model/DocumentModal';
import connect from './lib/connect';

import * as dotenv from 'dotenv';

dotenv.config({ path: 'lib/.env' });

connect();

const io = require('socket.io')(3001, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

const defaultValue = '';

io.on('connection', (socket: Socket) => {
  console.log('connected');

  socket.on('get-document', async (documentId) => {
    const document = await findOrCreateDocument(documentId);

    socket.join(documentId);

    socket.emit('load-document', document);

    socket.on('send-changes', (delta) => {
      socket.broadcast.to(documentId).emit('receive-changes', delta);
    });

    socket.on('save-document', async (data) => {
      let insertData = {
        data: data.quillData,
        email: data.quill,
        documentScreenShot: data.documentScreenShot,
      };

      console.log(data);

      await DocumentModel.findByIdAndUpdate(documentId, insertData);
    });
  });

  socket.on('get-recent-document', async (email) => {
    const data = await DocumentModel.find({
      email: { $all: [email] },
    });

    socket.emit('load-recent-document', data);
  });
});

async function findOrCreateDocument(id: string) {
  if (id == null) return;

  const document = await DocumentModel.findById(id);
  if (document) return document;
  return await DocumentModel.create({ _id: id, data: defaultValue });
}
