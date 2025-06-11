
export class CheckInRequest {
  user: string;
  addictionName: string;
  isClean: boolean;

  constructor(user: string, addictionName: string, isClean: boolean) {
    this.user = user;
    this.addictionName = addictionName;
    this.isClean = isClean;
  }

}
