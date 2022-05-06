import { formatCpf } from '../utils/FormatCpf';
import { ErrorHandle } from '../interceptors/ErrorHandle';
import { User } from '../models/User';
import { UserRepository } from '../repositories/UserRepository';

export class UserService {

    constructor(
        private readonly repository: UserRepository = new UserRepository()
    ) { }

    async create(payload: User): Promise<User> {
        try {
            const user = this.validateCreateUser(payload)

            const existUser = await this.getByCpf(user.cpf)

            if (existUser) {
                throw new ErrorHandle(400, 'This cpf already registered!')
            }

            await this.repository.create(user)

            return payload
        } catch (err) {
            throw new ErrorHandle(err.status, err.message)
        }
    }

    async update(payload: Partial<User>): Promise<void> {
        try {
            const user = this.validateUpdateUser(payload)

            const existUser = await this.repository.getByCpf(user.cpf)

            if (!existUser) {
                throw new ErrorHandle(400, "Doesn't exists user with this cpf!")
            }

            await this.repository.update(user)

        } catch (err) {
            throw new ErrorHandle(err.status, err.message)
        }
    }

    async getByCpf(cpf: string): Promise<User> {
        try {
            const result = await this.repository.getByCpf(cpf)

            return result
        } catch (err) {
            throw new ErrorHandle(err.status, err.message)
        }
    }


    private validateCreateUser(payload: User): User {
        const { cpf, name, email } = payload

        if (!cpf || !name || !email) {
            throw new ErrorHandle(400, 'All data is mandatory!')
        }

        const formattedCpf = formatCpf(cpf)

        return { cpf: formattedCpf, name, email }
    }

    private validateUpdateUser(payload: Partial<User>): User {
        const { cpf, name, email } = payload

        if (!cpf) {
            throw new ErrorHandle(400, 'Cpf is mandatory!')
        }

        const formattedCpf = formatCpf(cpf)

        return { cpf: formattedCpf, name, email }
    }
}