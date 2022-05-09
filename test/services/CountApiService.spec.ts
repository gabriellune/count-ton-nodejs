
import { CountApiService } from "../../src/services/CountApiService";

describe('CountApiService', () => {

    let service: CountApiService = new CountApiService()

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('getCount()', () => {
        it('should call CountApiService get count have been called', async () => {
            const data = jest.spyOn(service, 'getCount').mockImplementation()

            await service.getCount()

            expect(data).toHaveBeenCalled()
        })

        it('should throw if CountApiService getCount throws', async () => {
            jest.spyOn(service, 'getCount').mockRejectedValueOnce(new Error());

            await expect(service.getCount()).rejects.toThrow(new Error());
        })
    })

    describe('increaseVisits()', () => {
        it('should call CountApiService increase visits with correct value', async () => {
            const data = jest.spyOn(service, 'increaseVisits').mockImplementation()

            await service.increaseVisits(0)

            expect(data).toHaveBeenCalledWith(0)
        })

        it('should throw if CountApiService increase visits throws', async () => {
            jest.spyOn(service, 'increaseVisits').mockRejectedValueOnce(new Error());

            await expect(service.increaseVisits(0)).rejects.toThrow(new Error());
        })
    })

    describe('createKey()', () => {
        it('should call CountApiService create key with correct value', async () => {
            const data = jest.spyOn(service, 'createKey').mockImplementation()

            await service.createKey(0)

            expect(data).toHaveBeenCalledWith(0)
        })

        it('should throw if CountApiService create key throws', async () => {
            jest.spyOn(service, 'createKey').mockRejectedValueOnce(new Error());

            await expect(service.createKey(0)).rejects.toThrow(new Error());
        })
    })
})