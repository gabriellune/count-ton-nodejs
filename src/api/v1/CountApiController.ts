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
        try {
            const result = await this.service.getCount()

            return res.status(200).json(success("OK", { data: result }, res.statusCode));

        } catch (err) {
            return res.status(err.status >= 400).json(error(err.message, res.statusCode))
        }
    }

    @Post('increase-visits')
    async increaseVisits(req: Request, res: Response): Promise<CountApi> {
        try {
            const { value } = req.body
            const result = await this.service.increaseVisits(value)

            return res.status(200).json(success("OK", { data: result }, res.statusCode));

        } catch (err) {
            return res.status(err.status >= 400).json(error(err.message, res.statusCode))
        }
    }
}