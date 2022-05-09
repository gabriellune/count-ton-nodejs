import { mockLogin } from "../mocks/Login";
import { AuthenticationService } from "../../src/services/AuthenticationService";
import { UserService } from "../../src/services/UserService";

describe('AuthenticationService', () => {

    let service: AuthenticationService = new AuthenticationService()
    let userService: UserService = new UserService()

    it('should be defined', () => {
        expect(service).toBeDefined();
        expect(userService).toBeDefined();
    });

    describe('login()', () => {
        it('should call AuthenticationService login with correct value', async () => {
            const login = jest.spyOn(service, 'login').mockImplementation()
            const getByCpf = jest.spyOn(userService, 'getByCpf').mockImplementation()
            const payload = mockLogin()

            await service.login(payload)
            await userService.getByCpf(payload.cpf);


            expect(login).toHaveBeenCalledWith(payload)
            expect(getByCpf).toHaveBeenCalledWith(payload.cpf)
        })

        it('should throw if AuthenticationService login throws', async () => {
            jest.spyOn(service, 'login').mockRejectedValueOnce(new Error());

            await expect(service.login(mockLogin())).rejects.toThrow(new Error());
        })
    })
})