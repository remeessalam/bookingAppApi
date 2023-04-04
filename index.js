import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoute from './routes/auth.js'
import cookieParser from 'cookie-parser';

const app = express();
dotenv.config();

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log('database is connected');
    } catch (error) {
        throw (error);
    }
}

mongoose.connection.on('disconnect', () => {
    console.log('database is disconnected')
})

// middleware
app.use(cookieParser());
app.use(express.json());
app.use('api/auth',authRoute);

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || 'some error occurred!';
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
});

app.listen(8800, () => {
    connect()
    console.log('backend is running');
})