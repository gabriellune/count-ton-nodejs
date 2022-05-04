import { Controller, Get, Post } from "@overnightjs/core";
import { CountApiService } from "../../services/CountApiService";
import { Request, Response } from 'express';
import { CountApi } from "../../models/CountApi";

@Controller('api/v1/count-api')
export class CountApiController {

    constructor(
        private readonly service: CountApiService = new CountApiService()
    ) { }

    @Get()
    async getCount(_req: Request, res: Response): Promise<CountApi> {
        try {
            const result = await this.service.getCount()
            return res.send(result)
        } catch (error) {
            res.status(error.status || 400).send({
                error: {
                    status: error.status,
                    message: error.message
                }
            })
        }
    }

    @Post('increase-visits')
    async increaseVisits(req: Request, res: Response): Promise<CountApi> {
        try {
            const { value } = req.body
            const result = await this.service.increaseVisits(value)

            return res.send(result)
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