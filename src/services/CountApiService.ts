import countapi from 'countapi-js';
import { Request, Response } from 'express';
import { error, success } from '../interceptors/ResponseInterceptor';
import { ErrorHandle } from '../interceptors/ErrorHandle';
import { CountApi } from '../models/CountApi';

export class CountApiService {

    async getCount(res: Response): Promise<CountApi> {
        try {
            const result = await countapi.get(process.env.TON_SITE, process.env.COUNT_API_KEY)

            return res.status(200).send(success('SUCCESS', { data: result }, 200))

        } catch (err) {
            return res.status(err.status).send(error(err.message, err.status))
        }
    }

    async increaseVisits(req: Request, res: Response): Promise<CountApi> {
        try {
            const { value } = req.body

            if (!value) {
                throw new ErrorHandle(400, 'Value is mandatory!')
            }

            const result = await countapi.update(process.env.TON_SITE, process.env.COUNT_API_KEY, value).then((result) => {
                return result
            })

            return res.status(200).send(success('SUCCESS', { data: result }, 200))

        } catch (err) {
            return res.status(err.status).send(error(err.message, err.status))
        }
    }
}