import { ErrorHandle } from "../interceptors/ErrorHandle"

export const formatCpf = (cpf: string): string => {
    if(cpf.length > 14 || cpf.length < 11) {
        throw new ErrorHandle(400, 'This cpf is invalid!')
    }

    const cpfMatchRegex = new RegExp(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/g)
    const dotHyphenRegex = new RegExp(/[-.]/g)
    return cpf.match(cpfMatchRegex) ? cpf.replace(dotHyphenRegex, "") : cpf
}