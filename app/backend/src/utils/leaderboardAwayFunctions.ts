export const getTotalPointsAway = (matches: any) => {
  const totalPoints = matches.reduce((acc: any, curr: any): number => {
    if (curr.homeTeamGoals < curr.awayTeamGoals) acc += 3;
    if (curr.homeTeamGoals === curr.awayTeamGoals) acc += 1;

    return acc;
  }, 0)

  return totalPoints;
}

export const getTotalGamesAway = (matches: any) => {
  const totalGames = matches.reduce((acc: any) => {
    acc += 1
    return acc
  }, 0)
  return totalGames;
}

export const getTotalVictoriesAway = (matches: any) => {
  const totalVictories = matches.reduce((acc: any, curr: any) => {
    if (curr.homeTeamGoals < curr.awayTeamGoals) acc += 1;

    return acc;
  }, 0);
  return totalVictories;
}

export const getTotalDrawsAway = (matches: any) => {
  const totalDraws = matches.reduce((acc: any, curr: any) => {
    if (curr.homeTeamGoals === curr.awayTeamGoals) acc += 1;

    return acc;
  }, 0);
  return totalDraws;
}

export const getTotalLossesAway = (matches: any) => {
  const totalLosses = matches.reduce((acc: any, curr: any) => {
    if (curr.homeTeamGoals > curr.awayTeamGoals) acc += 1;

    return acc;
  }, 0);
  return totalLosses;
}

export const getGoalsFavorAway = (matches: any) => {
  const goalsFavor = matches.reduce((acc: any, curr: any) => {
    acc += curr.awayTeamGoals
    
    return acc;
  }, 0)

  return goalsFavor;
}

export const getGoalsOwnAway = (matches: any) => {
  const goalsOwn = matches.reduce((acc: any, curr: any) => {
    acc += curr.homeTeamGoals
    
    return acc;
  }, 0)

  return goalsOwn;
}