import mongoose, { Schema, model } from 'mongoose';

interface IDocument {
  _id: string;
  data: string;
  email: string;
}

const Document = new Schema<IDocument>({
  _id: String,
  data: Object,
  email: String,
});

export default mongoose.model('Document', Document);
