import {SeverityLevel} from '../enum/SeverityLevel';

export interface AddictionResponse {
  name:string,
  description:string,
  severityLevel:SeverityLevel,
  yearOfAddiction:number,
  streakCount:number
}
