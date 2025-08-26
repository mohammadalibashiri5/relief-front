import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {SolutionRequest} from '../models/RequestModel/solutionRequest';
import {Observable} from 'rxjs';
import {SolutionResponse} from '../models/ResponseModel/solutionResponse';

@Injectable({
  providedIn: 'root'
})
export class SolutionService {

  constructor(private http:HttpClient) { }

  private readonly url:string = environment.API_BASE_URL;

  addSolution(solutionReq:SolutionRequest):Observable<any> {
    return this.http.post(this.url, solutionReq);
  }
}
