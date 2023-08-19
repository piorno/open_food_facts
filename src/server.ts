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

// var sync = async.queue(function(n, cb) {
//     var schema = new mongoose.Schema({
//         data: mongoose.Schema.Types.Mixed
//     });
//     var collection = 'model_'+n;
//     var model = db.model(collection, schema);
//     setTimeout(function() { cb(); }, 10);
// }, 1);

const job = schedule.scheduleJob('50 53 16 * * *', async function () {
    console.log('aqui');
    
    const startDate = new Date();
    const endDate: Date = await productsController.scheduleProducts();
    var seconds = (endDate.getTime() - startDate.getTime()) / 1000;
    let log = {
        executed: startDate,
        memory: 1000,
        time: seconds
    }
    
    Logs.create(log)
});


const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Connected successfully");
});

app.listen(PORT, () => console.log(`Server is running at ${PORT}.`));