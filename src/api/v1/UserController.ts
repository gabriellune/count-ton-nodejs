import { Controller, Post, Put } from "@overnightjs/core";
import { Request, Response } from 'express';
import { UserService } from "../../services/UserService";

@Controller('api/v1/user')
export class UserController {

    constructor(
        private readonly service: UserService = new UserService()
    ) { }

    @Post()
    async create(req: Request, res: Response): Promise<Object> {
        return this.service.create(req, res)
    }

    @Put()
    async update(req: Request, res: Response): Promise<Object> {
        return this.service.update(req, res)
    }
}