import countapi from 'countapi-js';
import { CountApi } from '../models/CountApi';

export class CountApiService {

    async getCount(): Promise<CountApi> {
        try {
            const result = await countapi.get(process.env.TON_SITE, process.env.COUNT_API_KEY)

            return result

        } catch (err) {
            throw new Error(err)
        }
    }

    async increaseVisits(value: number): Promise<CountApi> {
        try {
            const result = await countapi.update(process.env.TON_SITE, process.env.COUNT_API_KEY, value).then((result) => {
                return result
            })
            return result

        } catch (err) {
            throw new Error(err)
        }
    }
}