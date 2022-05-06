import { Controller, Post, Put } from "@overnightjs/core";
import { Request, Response } from 'express';
import { User } from "../../models/User";
import { UserService } from "../../services/UserService";
import { success, error } from "../../interceptors/ResponseInterceptor"

@Controller('api/v1/user')
export class UserController {

    constructor(
        private readonly service: UserService = new UserService()
    ) { }

    @Post()
    async create(req: Request, res: Response): Promise<Object> {
        let msg: string
        let status: number

        try {
            const payload: User = req.body

            await this.service.create(payload)

            return res.status(200).json(success("OK", { data: "User created" }, res.statusCode));

        } catch (err) {
            msg = err.message
            status = err.status

        } finally {
            res.status(status).json(error(msg, res.statusCode))
        }
    }

    @Put()
    async update(req: Request, res: Response): Promise<Object> {
        let msg: string
        let status: number

        try {
            const payload: Partial<User> = req.body

            await this.service.update(payload)

            return res.status(200).json(success("OK", { data: "User updated" }, res.statusCode));

        } catch (err) {
            msg = err.message
            status = err.status

        } finally {
            res.status(status).json(error(msg, res.statusCode))
        }
    }
}