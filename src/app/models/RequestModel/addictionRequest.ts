import {SeverityLevel} from '../enum/SeverityLevel';

export interface AddictionRequest {
  name:string,
  description:string,
  severityLevel:SeverityLevel,
  yearOfAddiction:number,
}
