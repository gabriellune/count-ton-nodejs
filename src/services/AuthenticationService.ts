import { ErrorHandle } from "../interceptors/ErrorHandle";
import { Login } from "../models/Login";
import { CryptoService } from "./CryptoService";
import { JwtService } from "./JwtService";
import { UserService } from "./UserService";

export class AuthenticationService {

    constructor(
        private readonly userService: UserService = new UserService(),
        private readonly jwtService: JwtService = new JwtService(),
        private readonly cryptoService: CryptoService = new CryptoService()
    ) { }

    async login(payload: Login): Promise<string> {
        try {
            const { cpf, password } = payload

            const user = await this.userService.getByCpf(cpf)

            if (user) {
                const decryptedPassword = this.cryptoService.decrypt(user.password)

                if (decryptedPassword != password) {
                    throw new ErrorHandle(400, 'Password incorrect')
                }
            }

            const token = this.jwtService.sign(user)

            return token
        } catch (err) {
            throw new ErrorHandle(err.status, err.message)
        }
    }
}