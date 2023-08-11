import axios from 'axios';
import * as htmlToImage from 'html-to-image';

export const uploadToCloudinary = async (setImageLink: any) => {
  try {
    const cloudName = process.env.NEXT_PUBLIC_CLOUD_NAME;

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
