import { Server } from '@overnightjs/core';
import dotenv from 'dotenv'

dotenv.config()

export class App extends Server {
    
    public start(port: number): void {
        this.app.listen(port, () => {
            console.log('Server listening on port: ' + port);
        })
    }
}

export default new App().start(Number(process.env.PORT))