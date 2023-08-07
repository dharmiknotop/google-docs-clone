import mongoose, { ConnectOptions } from 'mongoose';

const connect = () => {
  mongoose
    .connect(process.env.DB!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions)
    .then((db) => {
      console.log('Database Connected Successfuly.');
    })
    .catch((err) => {
      console.log('Error Connectiong to the Database');
      console.log(err);
    });
};

export default connect;
