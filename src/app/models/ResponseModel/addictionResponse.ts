import {SeverityLevel} from '../enum/SeverityLevel';

export interface AddictionResponse {
  id:number,
  name:string,
  description:string,
  severityLevel:SeverityLevel,
  yearOfAddiction:number,
  streakCount:number
}
