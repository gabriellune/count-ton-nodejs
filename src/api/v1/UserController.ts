import { Controller, Post, Put } from "@overnightjs/core";
import { Request, Response } from 'express';
import { User } from "../../models/User";
import { UserService } from "../../services/UserService";

@Controller('api/v1/user')
export class UserController {

    constructor(
        private readonly service: UserService = new UserService()
    ) { }

    @Post()
    async create(req: Request, res: Response): Promise<User> {
        try {
            const payload: User = req.body

            await this.service.create(payload)

            return payload

        } catch (error) {
            res.status(error.status || 400).send({
                error: {
                    status: error.status,
                    message: error.message
                }
            })
        }
    }

    @Put()
    async update(req: Request, res: Response): Promise<void> {
        try {
            const payload: Partial<User> = req.body
            await this.service.update(payload)

        } catch (error) {
            res.status(error.status || 400).send({
                error: {
                    status: error.status,
                    message: error.message
                }
            })
        }
    }
}