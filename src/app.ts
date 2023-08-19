import express, { Request, Response, NextFunction } from 'express';

const app = express();
 
app.use(express.json());
 
// app.use((req: Request, res: Response, next: NextFunction) => {
//     res.send("Hello World");
// })

app.get('/', async (req: Request, res: Response, next: NextFunction) => {
    var log = await Logs.findOne({}, [], { sort: {excuted: -1}});
    const formatedLog = {
        executed: log?.executed,
        memory: log?.memory,
        time: log?.time + "s"
    }
    console.log(formatedLog);
    res.json(formatedLog)
})
 
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).send(error.message);
})

import productsRouter from './routers/productsRouter';
import { Logs } from './models/logs';
 
app.use('/products/', productsRouter);
 
export default app;