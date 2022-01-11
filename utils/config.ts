import dotev from 'dotenv';
dotev.config();

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

export default {
    PORT,
    MONGODB_URI,
};
