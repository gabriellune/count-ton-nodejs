import { Request, Response } from 'express';
import { ErrorHandle } from '../interceptors/ErrorHandle';
import { User } from '../models/User';
import { UserRepository } from '../repositories/UserRepository';
import { formatCpf } from '../utils/FormatCpf';

export class UserService {

    constructor(
        private readonly repository: UserRepository = new UserRepository()
    ) { }

    async create(payload: User): Promise<void> {
        try {
            const user = this.validateCreateUser(payload)

            const existentUser = await this.getExistentUser(user.cpf, user.email)

            if (existentUser.exists) {
                throw new ErrorHandle(400, existentUser.msg)
            }

            await this.repository.create(user)
        } catch (err) {
            throw new ErrorHandle(err.status, err.message)
        }
    }

    async update(payload: User): Promise<void> {
        try {
            const user = this.validateUpdateUser(payload)

            const existentUser = await this.getByCpf(user.cpf)

            if (!existentUser) {
                throw new ErrorHandle(400, 'This cpf is not registered!')
            }

            await this.repository.update(user)
        } catch (err) {
            throw new ErrorHandle(err.status, err.message)
        }
    }

    async getExistentUser(cpf: string, email?: string): Promise<{ exists: boolean, msg: string }> {
        let existentUser = {
            exists: false,
            msg: null
        }

        const userByCpf = await this.getByCpf(cpf)

        if (userByCpf) {
            existentUser.exists = true
            existentUser.msg = 'This cpf is already registered!'

        } else {
            const userByEmail = await this.getByEmail(email)

            if (userByEmail) {
                existentUser.exists = true
                existentUser.msg = 'This email is already registered!'

            }
        }

        return existentUser
    }

    async getByCpf(cpf: string): Promise<User> {
        try {
            const result = await this.repository.getByCpf(cpf)

            return result
        } catch (err) {
            throw new ErrorHandle(err.status, err.message)
        }
    }

    async getByEmail(email: string): Promise<User> {
        try {
            const result = await this.repository.getByEmail(email)

            return result
        } catch (err) {
            throw new ErrorHandle(err.status, err.message)
        }
    }


    validateCreateUser(payload: User): User {
        const { cpf, name, email, password } = payload

        if (!cpf || !name || !email || !password) {
            throw new ErrorHandle(400, 'All data is mandatory!')
        }

        const formattedCpf = formatCpf(cpf)

        return { cpf: formattedCpf, name, email, password }
    }

    validateUpdateUser(payload: Partial<User>): User {
        const { cpf, name, email } = payload

        if (!cpf) {
            throw new ErrorHandle(400, 'Cpf is mandatory!')
        }

        const formattedCpf = formatCpf(cpf)

        return { cpf: formattedCpf, name, email } as User
    }
}