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
}