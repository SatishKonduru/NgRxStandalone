import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterRequestInterface } from '../types/registerRequest.interface';
import { Observable, map } from 'rxjs';
import { CurrentUserInterface } from '../../shared/types/current-user-interface';
import { AuthResponseInterface } from '../types/authResponseInterface.interface';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient) { }


  register(data: RegisterRequestInterface):Observable<CurrentUserInterface>{
    // const url = 'https://api.realworld.io/api/users'; //If we use public API
    // const url = 'localhost:3000/api/users'; //if we use docker
    const url = environment.apiURL
    return this._http.post<AuthResponseInterface>(url+'/users', data).pipe(map(res => res.user))
  }
}
