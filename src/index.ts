import { Server } from '@overnightjs/core';
import dotenv from 'dotenv'
import { CountApiController } from './api/v1/CountApiController';
import * as express from 'express'

dotenv.config()

export class App extends Server {

    constructor() {
        super()
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));
        this.setupControllers();
    }

    private setupControllers(): void {
        super.addControllers([
            new CountApiController()
        ]);
    }
    
    public start(port: number): void {
        this.app.listen(port, () => {
            console.log('Server listening on port: ' + port);
        })
    }
}

export default new App().start(Number(process.env.PORT))