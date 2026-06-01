import mongoose from 'mongoose';

export const connectMongo = async () => {
  try {
    console.log('Mongo URI:', process.env.MONGODB_URI);

    await mongoose.connect(process.env.MONGODB_URI as string);

    console.log('MongoDB Connected');
  } catch (error) {
    console.error('Mongo Error', error);
  }
};