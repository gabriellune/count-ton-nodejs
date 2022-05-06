import { Sequelize } from 'sequelize'
import dotenv from 'dotenv';

dotenv.config()

export const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
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