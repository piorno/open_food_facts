import express, { Request, Response, NextFunction } from 'express';

const app = express();
 
app.use(express.json());
 
// app.use((req: Request, res: Response, next: NextFunction) => {
//     res.send("Hello World");
// })
 
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).send(error.message);
})

import productsRouter from './routers/productsRouter';
 
app.use('/products/', productsRouter);
 
export default app;