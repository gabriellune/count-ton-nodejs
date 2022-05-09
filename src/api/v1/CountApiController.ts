import { Controller, Get, Patch, Post } from "@overnightjs/core";
import { Request, Response } from 'express';
import { error, success } from "../../interceptors/ResponseInterceptor";
import { CountApi } from "../../models/CountApi";
import { CountApiKey } from "../../models/CountApiKey";
import { CountApiService } from "../../services/CountApiService";
import { verifyJwt } from "../../services/JwtService";

@Controller('api/v1/count-api')
export class CountApiController {

    constructor(
        private readonly service: CountApiService = new CountApiService()
    ) { }

    @Get()
    async getCount(req: Request, res: Response): Promise<CountApi> {
        try {
            verifyJwt(req)
            const result = await this.service.getCount()

            return res.status(200).send(success('SUCCESS', { data: result }, 200))
        } catch (err) {
            return res.status(err.status).send(error(err.message, err.status))
        }
    }

    @Patch('increase-visits')
    async increaseVisits(req: Request, res: Response): Promise<CountApi> {
        try {
            verifyJwt(req)
            const { value } = req.body
            console.log(value)

            const result = await this.service.increaseVisits(value)

            return res.status(200).send(success('SUCCESS', { data: result }, 200))
        } catch (err) {
            return res.status(err.status).send(error(err.message, err.status))
        }
    }

    @Post('key')
    async createKey(req: Request, res: Response): Promise<CountApiKey> {
        try {
            verifyJwt(req)
            const { value } = req.body

            const result = await this.service.createKey(value)

            return res.status(201).send(success('SUCCESS', { data: result }, 201))
        } catch (err) {
            return res.status(err.status).send(error(err.message, err.status))
        }
    }
}