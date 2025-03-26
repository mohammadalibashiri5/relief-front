import {StreakLevel} from '../enum/StreakLevel';

export interface CheckInResponse{
  userName: string,
  addictionName: string,
  startDate: Date,
  currentStreak:number,
  longestStreak:number,
  lastCheckinDat:Date,
  level:StreakLevel
}
