import { sequelize } from "../../repositories/config/MySqlConfig";
import { DataTypes } from 'sequelize'

export const DbUser = sequelize.define('users', {

   cpf: DataTypes.STRING,
   name: DataTypes.STRING,
   email: DataTypes.STRING,
   password: DataTypes.STRING
})

DbUser.sync()