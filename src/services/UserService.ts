import { Request, Response } from 'express';
import { ErrorHandle } from '../interceptors/ErrorHandle';
import { error, success } from '../interceptors/ResponseInterceptor';
import { User } from '../models/User';
import { UserRepository } from '../repositories/UserRepository';
import { formatCpf } from '../utils/FormatCpf';

export class UserService {

    constructor(
        private readonly repository: UserRepository = new UserRepository()
    ) { }

    async create(req: Request, res: Response): Promise<User> {
        try {
            const payload = req.body as User

            const user = this.validateCreateUser(payload)

            const existentUser = await this.getExistentUser(user.cpf, user.email)

            if (existentUser.exists) {
                throw new ErrorHandle(400, existentUser.msg)
            }

            await this.repository.create(user)

            return res.status(201).send(success('User created successfully', { data: payload }, 201))
        } catch (err) {
            return res.status(err.status).send(error(err.message, err.status))
        }
    }

    async update(req: Request, res: Response): Promise<Object> {
        try {
            const payload = req.body as User

            const user = this.validateUpdateUser(payload)

            const existentUser = await this.getByCpf(user.cpf)

            if (!existentUser) {
                throw new ErrorHandle(400, 'This cpf is not registered!')
            }

            await this.repository.update(user)

            return res.status(200).send(success('User updated successfully', { data: user }, 200))
        } catch (err) {
            return res.status(err.status).send(error(err.message, err.status))
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

    private async getByCpf(cpf: string): Promise<User> {
        try {
            const result = await this.repository.getByCpf(cpf)

            return result
        } catch (err) {
            throw new ErrorHandle(err.status, err.message)
        }
    }

    private async getByEmail(email: string): Promise<User> {
        try {
            const result = await this.repository.getByEmail(email)

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