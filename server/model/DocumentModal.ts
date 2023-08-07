import mongoose,{ Schema, model } from 'mongoose';

interface IDocument {
  _id: string;
  data: string;
}

const Document = new Schema<IDocument>({
  _id: String,
  data: Object,
});

export default mongoose.model('Document', Document);
