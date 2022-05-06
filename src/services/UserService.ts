import { UserRepository } from '../repositories/UserRepository';
import { User } from '../models/User';

export class UserService {

    constructor(
        private readonly repository: UserRepository = new UserRepository()
    ) { }

    async create(payload: User): Promise<User> {
        try {
            await this.repository.create(payload)

            return payload

        } catch (err) {
            throw new Error(err)
        }
    }

    async update(payload: Partial<User>): Promise<void> {
        try {
            await this.repository.update(payload)

        } catch (err) {
            throw new Error(err)
        }
    }
}