import { Controller, Get, Post } from "@overnightjs/core";
import { CountApiService } from "../../services/CountApiService";
import { Request, Response } from 'express';
import { CountApi } from "../../models/CountApi";
import { success, error } from "../../interceptors/ResponseInterceptor"

@Controller('api/v1/count-api')
export class CountApiController {

    constructor(
        private readonly service: CountApiService = new CountApiService()
    ) { }

    @Get()
    async getCount(_req: Request, res: Response): Promise<CountApi> {
        let msg: string
        let status: number

        try {
            const result = await this.service.getCount()

            return res.status(200).json(success("OK", { data: result }, res.statusCode));

        } catch (err) {
            msg = err.message
            status = err.status

        } finally {
            res.status(status).json(error(msg, res.statusCode))
        }
    }

    @Post('increase-visits')
    async increaseVisits(req: Request, res: Response): Promise<CountApi> {
        let msg: string
        let status: number

        try {
            const { value } = req.body
            const result = await this.service.increaseVisits(value)

            return res.status(200).json(success("OK", { data: result }, res.statusCode));

        } catch (err) {
            msg = err.message
            status = err.status

        } finally {
            res.status(status).json(error(msg, res.statusCode))
        }
    }
}