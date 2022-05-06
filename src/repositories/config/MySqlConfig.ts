import { Sequelize } from 'sequelize'

export const sequelize = new Sequelize('test', 'root', '160412Timao@', {
    host: "localhost",
    dialect: "mysql"
})
export class MySqlConfig {

    async initialize() {

        try {
            sequelize.authenticate()

        } catch (error) {
            throw new Error(error)
        }
    }
}

export default new MySqlConfig().initialize()