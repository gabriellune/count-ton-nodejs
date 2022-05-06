import { Server } from '@overnightjs/core';
import dotenv from 'dotenv';
import * as express from 'express';
import { CountApiController } from './api/v1/CountApiController';
import { UserController } from './api/v1/UserController';
import logger from 'jet-logger';

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
            new CountApiController(),
            new UserController()
        ]);
    }
    
    public start(port: number): void {
        this.app.listen(port, () => {
            logger.info('Server listening on port: ' + port);
        })
    }
}

export default new App().start(Number(process.env.PORT))