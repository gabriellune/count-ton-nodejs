import { ErrorHandle } from '../interceptors/ErrorHandle';
import { User } from '../models/User';
import { UserRepository } from '../repositories/UserRepository';

export class UserService {

    constructor(
        private readonly repository: UserRepository = new UserRepository()
    ) { }

    async create(payload: User): Promise<User> {
        try {
            this.validateCreateUser(payload)

            await this.repository.create(payload)

            return payload
        } catch (err) {
            throw new ErrorHandle(err.status, err.message)
        }
    }

    async update(payload: Partial<User>): Promise<void> {
        try {
            this.validateUpdateUser(payload)

            await this.repository.update(payload)

        } catch (err) {
            throw new ErrorHandle(err.status, err.message)
        }
    }


    private validateCreateUser(payload: User): void {
        const { cpf, name, email } = payload

        if (!cpf || !name || !email) {
            throw new ErrorHandle(400, 'All data is mandatory!')
        }
    }

    private validateUpdateUser(payload: Partial<User>): void {
        const { cpf } = payload

        if (!cpf) {
            throw new ErrorHandle(400, 'Cpf is mandatory!')
        }
    }
}