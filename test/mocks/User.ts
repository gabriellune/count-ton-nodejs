import { User } from "../../src/models/User";

export const mockUser = (): User => ({
    name: "any name",
    cpf: "00000000000",
    email: "anyemail@email.com",
    password: "anypassword"
})