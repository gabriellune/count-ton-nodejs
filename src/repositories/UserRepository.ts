import { User } from "../models/User";
import { DbUser } from "../models/db/DbUser";

export class UserRepository {

    constructor() { }

    async create(payload: User): Promise<User> {
        const { cpf, name, email } = payload

        await DbUser.create({ cpf, name, email })

        return payload
    }

    async update(payload: Partial<User>): Promise<void> {
        const { cpf, name, email } = payload

        await DbUser.update({ cpf, name, email }, { where: { cpf } })
    }

    async getByCpf(cpf: string): Promise<User> {
        const user = await DbUser.findOne({
            where: {
                cpf
            }
        })

        if (!user) {
            return null
        }

        return user.toJSON() as User
    }

    async getByEmail(email: string): Promise<User> {
        const user = await DbUser.findOne({
            where: {
                email
            }
        })

        if (!user) {
            return null
        }

        return user.toJSON() as User
    }
}