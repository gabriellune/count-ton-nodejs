import { mockUser } from "../mocks/User";
import { JwtService } from "../../src/services/JwtService";

describe('JwtService', () => {

    let service: JwtService = new JwtService()

    it('should be defined', () => {
        expect(service).toBeDefined()
    });

    describe('sign()', () => {
        it('should call JwtService sign with correct value', async () => {
            const sign = jest.spyOn(service, 'sign').mockImplementation()
            const payload = mockUser()

            await service.sign(payload)

            expect(sign).toHaveBeenCalledWith(payload)
        })
    })
})