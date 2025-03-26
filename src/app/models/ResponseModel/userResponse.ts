import {AddictionResponse} from './addictionResponse';

export interface IUserResponse {
   name:string,
   familyName:string,
   username:string,
   email:string,
   createdAt:Date,
   dateOfBirth:Date,
   addictions:AddictionResponse[]
}
