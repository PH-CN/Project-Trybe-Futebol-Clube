import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class Teams extends Model {
  id!: number;
  team_name!: string 
}

Teams.init({
  id: {
    type: INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  team_name: {
    type: STRING,
    allowNull: false
  }
}, {
  sequelize: db,
  underscored: true,
  modelName: 'teams',
  timestamps: false
});

export default Teams;