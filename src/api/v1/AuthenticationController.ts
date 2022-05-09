import { Controller, Post } from "@overnightjs/core";
import { Request, Response } from 'express';
import { error, success } from "../../interceptors/ResponseInterceptor";
import { Login } from "../../models/Login";
import { AuthenticationService } from "../../services/AuthenticationService";

@Controller('api/v1/authentication')
export class AuthenticationController {

    constructor(
        private readonly service: AuthenticationService = new AuthenticationService()
    ) { }

    @Post('login')
    async login(req: Request, res: Response): Promise<Object> {
        try {
            const payload: Login = req.body

            const result = await this.service.login(payload)

            return res.status(200).send(success('SUCCESS', { data: result }, 200))
        } catch (err) {
            return res.status(err.status).send(error(err.message, err.status))
        }
    }
}