import axios from 'axios';
import * as htmlToImage from 'html-to-image';
import {
  generateSHA1,
  generateSignature,
} from '../signature/generateSignature';

export const uploadToCloudinary = async (setImageLink: any) => {
  const cloudName = process.env.NEXT_PUBLIC_CLOUD_NAME;

  try {
    //taking the screen shot of the content in the document

    const currentDocument = document.getElementsByClassName('ql-editor');

    const dataURI = await htmlToImage.toJpeg(currentDocument[0] as HTMLElement);

    const formData: any = new FormData();

    formData.append('file', dataURI);
    formData.append('upload_preset', 'google-docs');
    formData.append('cloud_name', cloudName);

    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

    const { data } = await axios.post(url, formData);

    setImageLink({
      public_id: data.public_id,
      url: data.secure_url,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateCloudinaryImage = async (
  publicId: any,
  setImageLink: any
) => {
  const cloudName = process.env.NEXT_PUBLIC_CLOUD_NAME;
  const api_key = process.env.NEXT_PUBLIC_CLOUD_KEY;
  const apiSecret = process.env.NEXT_PUBLIC_CLOUD_KEY_SECRET!;

  try {
    const timestamp = new Date().getTime();

    const signature = generateSHA1(generateSignature(publicId, apiSecret));

    let data = {
      public_id: publicId,
      api_key,
      signature,
      timestamp,
    };

    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`;

    const res: any = await axios.post(url, data);

    if (res.data.result === 'not found') return;

    uploadToCloudinary(setImageLink);
  } catch (error) {
    console.log(error);
  }
};
