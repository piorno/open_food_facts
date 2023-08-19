import dotenv from 'dotenv';
import ProductsController from './controllers/productsController';
import { Logs } from './models/logs';
const productsController = new ProductsController();
dotenv.config();

const PORT = parseInt(`${process.env.PORT || 3000}`);

import app from './app';
import mongoose from 'mongoose';
// const mongoose = require('mongoose');



console.log(`${process.env.MONGO_HOST}${process.env.MONGO_DATABASE}`);


mongoose.connect(`${process.env.MONGO_HOST}${process.env.MONGO_DATABASE}`, {
    // useNewUrlParser: true, useUnifiedTopology: true
})

const schedule = require('node-schedule');

const job = schedule.scheduleJob('0 0 3 * * *', async function () {
    console.log('aqui');
    
    const startDate = new Date();
    const {endDate, totalMemory} = await productsController.scheduleProducts();
    var seconds = (endDate.getTime() - startDate.getTime()) / 1000;
    let log = {
        executed: startDate,
        memory: totalMemory,
        time: Math.ceil(seconds)
    }
    
    Logs.create(log)
});


const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Connected successfully");
});

app.listen(PORT, () => console.log(`Server is running at ${PORT}.`));