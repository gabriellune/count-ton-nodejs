import { Controller, Post, Put } from "@overnightjs/core";
import { Request, Response } from 'express';
import { error, success } from "../../interceptors/ResponseInterceptor";
import { User } from "../../models/User";
import { verifyJwt } from "../../services/JwtService";
import { UserService } from "../../services/UserService";

@Controller('api/v1/user')
export class UserController {

    constructor(
        private readonly service: UserService = new UserService()
    ) { }

    @Post()
    async create(req: Request, res: Response): Promise<Object> {
        try {
            const payload = req.body as User
            await this.service.create(payload)

            return res.status(201).send(success('SUCCESS', { data: payload }, 201))
        } catch (err) {
            return res.status(err.status).send(error(err.message, err.status))
        }
    }

    @Put()
    async update(req: Request, res: Response): Promise<Object> {
        try {
            verifyJwt(req)
            const payload = req.body as User
            await this.service.update(payload)

            return res.status(200).send(success('SUCCESS', { data: payload }, 200))
        } catch (err) {
            return res.status(err.status).send(error(err.message, err.status))
        }
    }
}