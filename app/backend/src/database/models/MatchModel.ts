import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';
import Teams from './TeamModel';

class Matches extends Model {
  id!: number;
  home_team!: number;
  home_team_goals!: number;
  away_team!: number;
  away_team_goals!: number;
  in_progress!: number;
}

Matches.init({
  id: {
    type: INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  homeTeam: {
    type: INTEGER,
    allowNull: false,
    references: {
      model: 'teams',
      key: 'id',
    },
  },
  homeTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  awayTeam: {
    type: INTEGER,
    allowNull: false,
    references: {
      model: 'teams',
      key: 'id',
    },
  },
  awayTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  inProgress: {
    type: BOOLEAN,
    allowNull: false,
  },
}, {
  sequelize: db,
  underscored: true,
  modelName: 'matches',
  timestamps: false,
});

Teams.hasMany(Matches, { foreignKey: 'home_team', as: 'teamHome' });
Teams.hasMany(Matches, { foreignKey: 'away_team', as: 'teamAway' });
Matches.belongsTo(Teams, { foreignKey: 'home_team', as: 'teamHome' });
Matches.belongsTo(Teams, { foreignKey: 'away_team', as: 'teamAway' });

export default Matches;
