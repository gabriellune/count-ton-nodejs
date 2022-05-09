import { Controller, Get, Patch } from "@overnightjs/core";
import { Request, Response } from 'express';
import { error, success } from "../../interceptors/ResponseInterceptor";
import { CountApi } from "../../models/CountApi";
import { CountApiService } from "../../services/CountApiService";

@Controller('api/v1/count-api')
export class CountApiController {

    constructor(
        private readonly service: CountApiService = new CountApiService()
    ) { }

    @Get()
    async getCount(_req: Request, res: Response): Promise<CountApi> {
        try {
            const result = await this.service.getCount()

            return res.status(200).send(success('SUCCESS', { data: result }, 200))
        } catch (err) {
            return res.status(err.status).send(error(err.message, err.status))
        }
    }

    @Patch('increase-visits')
    async increaseVisits(req: Request, res: Response): Promise<CountApi> {
        try {
            const { value } = req.body

            const result = await this.service.increaseVisits(value)

            return res.status(200).send(success('SUCCESS', { data: result }, 200))
        } catch (err) {
            return res.status(err.status).send(error(err.message, err.status))
        }
    }
}