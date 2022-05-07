import { Controller, Get, Post } from "@overnightjs/core";
import { Request, Response } from 'express';
import { CountApi } from "../../models/CountApi";
import { CountApiService } from "../../services/CountApiService";

@Controller('api/v1/count-api')
export class CountApiController {

    constructor(
        private readonly service: CountApiService = new CountApiService()
    ) { }

    @Get()
    async getCount(_req: Request, res: Response): Promise<CountApi> {
        return this.service.getCount(res)
    }

    @Post('increase-visits')
    async increaseVisits(req: Request, res: Response): Promise<CountApi> {
        return this.service.increaseVisits(req, res)
    }
}