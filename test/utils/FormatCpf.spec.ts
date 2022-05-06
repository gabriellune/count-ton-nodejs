import { formatCpf } from "../../src/utils/FormatCpf"

describe('FormatCpf unit tests', () => {

    test('Should formatCpf', () => {
        const value = "000.000.000-00"
        const expectedValue = "00000000000"
        const result = formatCpf(value)

        expect(result).toStrictEqual(expectedValue)
        expect(typeof result).toStrictEqual('string')
    })

    test('Should return error because given value is invalid', () => {
        const invalidCpf = ""
        const result = () => { formatCpf(invalidCpf) }

        expect(result).toThrowError('This cpf is invalid!')
    })
})
