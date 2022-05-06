import { Sequelize } from 'sequelize'

export const sequelize = new Sequelize(process.env.TON_SITE, process.env.TON_SITE, process.env.TON_SITE, {
    host: process.env.TON_SITE,
    dialect: 'mysql'
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