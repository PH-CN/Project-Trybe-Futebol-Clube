// import {  ILeaderboardService, Leaderboard } from '../protocols';
import Teams from '../models/TeamModel';
import Matches from '../models/MatchModel';
import { getTotalPoints, getTotalGames, getTotalVictories, getTotalDraws, getTotalLosses, getGoalsFavor, getGoalsOwn } from '../../utils/leaderboardHomeFunctions';
import { getTotalPointsAway, getTotalGamesAway, getTotalVictoriesAway, getTotalDrawsAway, getTotalLossesAway, getGoalsFavorAway, getGoalsOwnAway } from '../../utils/leaderboardAwayFunctions';

export default class LeaderboardService {

  async leaderboardHome(): Promise<any> {
    const teams = await Teams.findAll(
    {
      include: [
        { model: Matches, as: 'teamHome', where: { inProgress: false } }
      ],
      attributes: 
      { exclude: ['home_team', 'away_team'] 
    },
    });

    const result = teams.map((team: any) => {
      const totalPoints =  getTotalPoints(team.teamHome);
      const totalGames = getTotalGames(team.teamHome);
      const totalVictories = getTotalVictories(team.teamHome);
      const totalDraws = getTotalDraws(team.teamHome);
      const totalLosses = getTotalLosses(team.teamHome);
      const goalsFavor = getGoalsFavor(team.teamHome);
      const goalsOwn = getGoalsOwn(team.teamHome);
      const goalsBalance = (goalsFavor - goalsOwn);
      const efficiency = Number((totalPoints / ( totalGames * 3 ) * 100).toFixed(2));

      return { 
        name: team.teamName,
        totalPoints,
        totalGames,
        totalVictories,
        totalDraws,
        totalLosses,
        goalsFavor,
        goalsOwn,
        goalsBalance,
        efficiency,
      }
    })

    result.sort((a, b) => a.goalsOwn - b.goalsOwn);
    result.sort((a, b) => b.goalsFavor - a.goalsFavor);
    result.sort((a, b) => b.goalsBalance - a.goalsBalance);
    result.sort((a, b) => b.totalVictories - a.totalVictories);
    result.sort((a, b) => b.totalPoints - a.totalPoints);

    return result
  }

  async leaderboardAway(): Promise<any> {
    const teams = await Teams.findAll(
      {
        include: [
          { model: Matches, as: 'teamAway', where: { inProgress: false } }
        ],
        attributes: 
        { exclude: ['home_team', 'away_team'] 
      },
      });
  
      const result = teams.map((team: any) => {
        const totalPoints =  getTotalPointsAway(team.teamAway);
        const totalGames = getTotalGamesAway(team.teamAway);
        const totalVictories = getTotalVictoriesAway(team.teamAway);
        const totalDraws = getTotalDrawsAway(team.teamAway);
        const totalLosses = getTotalLossesAway(team.teamAway);
        const goalsFavor = getGoalsFavorAway(team.teamAway);
        const goalsOwn = getGoalsOwnAway(team.teamAway);
        const goalsBalance = (goalsFavor - goalsOwn);
        const efficiency = Number((totalPoints / ( totalGames * 3 ) * 100).toFixed(2));
  
        return { 
          name: team.teamName,
          totalPoints,
          totalGames,
          totalVictories,
          totalDraws,
          totalLosses,
          goalsFavor,
          goalsOwn,
          goalsBalance,
          efficiency,
        }
      })
  
      result.sort((a, b) => a.goalsOwn - b.goalsOwn);
      result.sort((a, b) => b.goalsFavor - a.goalsFavor);
      result.sort((a, b) => b.goalsBalance - a.goalsBalance);
      result.sort((a, b) => b.totalVictories - a.totalVictories);
      result.sort((a, b) => b.totalPoints - a.totalPoints);
  
      return result    
  }
}
