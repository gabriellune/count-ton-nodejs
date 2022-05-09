import countapi from 'countapi-js';
import { ErrorHandle } from '../interceptors/ErrorHandle';
import { CountApi } from '../models/CountApi';

export class CountApiService {

    async getCount(): Promise<CountApi> {
        try {
            const result = await countapi.get(process.env.TON_SITE, process.env.COUNT_API_KEY)

            return result

        } catch (err) {
            throw new ErrorHandle(err.status, err.message)
        }
    }

    async increaseVisits(value: number): Promise<CountApi> {
        try {
            if (!value) {
                throw new ErrorHandle(400, 'Value is mandatory!')
            }

            const result = await countapi.update(process.env.TON_SITE, process.env.COUNT_API_KEY, value).then((result) => {
                return result
            })

            return result

        } catch (err) {
            throw new ErrorHandle(err.status, err.message)
        }
    }
}