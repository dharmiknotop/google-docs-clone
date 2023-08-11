import mongoose, { Schema, model } from 'mongoose';

interface IDocument {
  _id: string;
  data: string;
  email: string;
  documentScreenShot: string;
}

const Document = new Schema<IDocument>({
  _id: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    // required: true,
  },

  documentScreenShot: {
    public_id: {
      type: String,
      //   required: true,
    },
    url: {
      type: String,
      //   required: true,
    },
  },

  data: Object,
});

export default mongoose.model('Document', Document);
