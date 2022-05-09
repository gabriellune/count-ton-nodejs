import * as jwt from 'jsonwebtoken'
import { User } from '../models/User'
import { Request } from 'express';
import { ErrorHandle } from '../interceptors/ErrorHandle';
import dotenv from 'dotenv';

dotenv.config()

const jwtSecret: string = process.env.JWT_SECRET

export const verifyJwt = (req: Request) => {
    const token = req.headers['authorization']

    jwt.verify(token, jwtSecret, (err, decoded) => {
        if (err) {
            throw new ErrorHandle(401, 'Unauthorized')
        }

        req.userId = decoded.userId
    })
}

export class JwtService {

    sign(payload: User): string {
        const { cpf, name } = payload

        const token = jwt.sign({ cpf, name }, jwtSecret, { expiresIn: 600 })

        return token
    }

}