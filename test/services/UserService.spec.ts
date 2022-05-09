
import { UserService } from "../../src/services/UserService";
import { mockUser } from '../mocks/User';

describe('UserService', () => {

    let service: UserService = new UserService()

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('create()', () => {
        it('should call UserService create with correct value', async () => {
            const existentUser = jest.spyOn(service, 'getExistentUser').mockImplementation()
            const create = jest.spyOn(service, 'create').mockImplementation()
            const validate = jest.spyOn(service, 'validateCreateUser').mockImplementation()
            const payload = mockUser()

            service.validateCreateUser(payload)
            await service.getExistentUser(payload.cpf, payload.email)
            await service.create(payload);


            expect(validate).toHaveBeenCalledWith(payload)
            expect(existentUser).toHaveBeenCalledWith(payload.cpf, payload.email)
            expect(create).toHaveBeenCalledWith(payload);
        })

        it('should throw if UserService create throws', async () => {
            jest.spyOn(service, 'create').mockRejectedValueOnce(new Error());

            await expect(service.create(mockUser())).rejects.toThrow(new Error());
        })
    })

    describe('update()', () => {
        it('should call UserService update with correct value', async () => {
            const existentUser = jest.spyOn(service, 'getByCpf').mockImplementation()
            const create = jest.spyOn(service, 'update').mockImplementation()
            const validate = jest.spyOn(service, 'validateUpdateUser').mockImplementation()
            const payload = mockUser()

            service.validateUpdateUser(payload)
            await service.getByCpf(payload.cpf)
            await service.update(payload);


            expect(validate).toHaveBeenCalledWith(payload)
            expect(existentUser).toHaveBeenCalledWith(payload.cpf)
            expect(create).toHaveBeenCalledWith(payload);
        })

        it('should throw if UserService update throws', async () => {
            jest.spyOn(service, 'update').mockRejectedValueOnce(new Error());

            await expect(service.update(mockUser())).rejects.toThrow(new Error());
        })
    })

    describe('getUser()', () => {
        it('should call UserService get existent user with correct value', async () => {
            const existentUser = jest.spyOn(service, 'getExistentUser').mockImplementation()
            const getByCpf = jest.spyOn(service, 'getByCpf').mockImplementation()
            const getByEmail = jest.spyOn(service, 'getByEmail').mockImplementation()
            const payload = mockUser()

            await service.getExistentUser(payload.cpf, payload.email)
            await service.getByCpf(payload.cpf)
            await service.getByEmail(payload.email)

            expect(existentUser).toHaveBeenCalledWith(payload.cpf, payload.email)
            expect(getByCpf).toHaveBeenCalledWith(payload.cpf)
            expect(getByEmail).toHaveBeenCalledWith(payload.email)
        })


        it('should call UserService get by cpf with correct value', async () => {
            const data = jest.spyOn(service, 'getByCpf').mockImplementation()
            const payload = mockUser()

            await service.getByCpf(payload.cpf)

            expect(data).toHaveBeenCalledWith(payload.cpf)
        })

        it('should call UserService get by email with correct value', async () => {
            const data = jest.spyOn(service, 'getByEmail').mockImplementation()
            const payload = mockUser()

            await service.getByEmail(payload.email)

            expect(data).toHaveBeenCalledWith(payload.email)
        })
    })

    describe('validateUserPayload()', () => {
        it('should call UserService validate create user with correct value', async () => {
            const data = jest.spyOn(service, 'validateCreateUser').mockImplementation()
            const payload = mockUser()

            await service.validateCreateUser(payload)

            expect(data).toHaveBeenCalledWith(payload)
        })

        it('should call UserService validate update user with correct value', async () => {
            const data = jest.spyOn(service, 'validateUpdateUser').mockImplementation()
            const payload = mockUser()

            await service.validateUpdateUser(payload)

            expect(data).toHaveBeenCalledWith(payload)
        })
    })
})
