import { ErrorHandle } from "../interceptors/ErrorHandle";
import { Login } from "../models/Login";
import { JwtService } from "./JwtService";
import { UserService } from "./UserService";

export class AuthenticationService {

    constructor(
        private readonly userService: UserService = new UserService(),
        private readonly jwtService: JwtService = new JwtService()
    ) { }

    async login(payload: Login): Promise<string> {
        try {
            const { cpf, password } = payload

            const user = await this.userService.getByCpf(cpf)

            if (user.password !== password) {
                throw new ErrorHandle(400, 'Password incorrect')
            }

            const token = this.jwtService.sign(user)

            return token
        } catch (err) {
            throw new ErrorHandle(err.status, err.message)
        }
    }
}