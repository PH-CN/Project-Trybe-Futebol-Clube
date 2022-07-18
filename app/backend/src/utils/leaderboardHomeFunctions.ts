export const getTotalPoints = (matches: any) => {
  const totalPoints = matches.reduce((acc: any, curr: any): number => {
    if (curr.homeTeamGoals > curr.awayTeamGoals) acc += 3;
    if (curr.homeTeamGoals === curr.awayTeamGoals) acc += 1;

    return acc;
  }, 0)

  return totalPoints;
}

export const getTotalGames = (matches: any) => {
  const totalGames = matches.reduce((acc: any) => {
    acc += 1
    return acc
  }, 0)
  return totalGames;
}

export const getTotalVictories = (matches: any) => {
  const totalVictories = matches.reduce((acc: any, curr: any) => {
    if (curr.homeTeamGoals > curr.awayTeamGoals) acc += 1;

    return acc;
  }, 0);
  return totalVictories;
}

export const getTotalDraws = (matches: any) => {
  const totalDraws = matches.reduce((acc: any, curr: any) => {
    if (curr.homeTeamGoals === curr.awayTeamGoals) acc += 1;

    return acc;
  }, 0);
  return totalDraws;
}

export const getTotalLosses = (matches: any) => {
  const totalLosses = matches.reduce((acc: any, curr: any) => {
    if (curr.homeTeamGoals < curr.awayTeamGoals) acc += 1;

    return acc;
  }, 0);
  return totalLosses;
}

export const getGoalsFavor = (matches: any) => {
  const goalsFavor = matches.reduce((acc: any, curr: any) => {
    acc += curr.homeTeamGoals
    
    return acc;
  }, 0)

  return goalsFavor;
}

export const getGoalsOwn = (matches: any) => {
  const goalsOwn = matches.reduce((acc: any, curr: any) => {
    acc += curr.awayTeamGoals
    
    return acc;
  }, 0)

  return goalsOwn;
}