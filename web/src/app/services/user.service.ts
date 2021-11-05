import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { User } from 'src/app/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  register(data: any): Observable<User> {
    return this.http.post<User>(`${environment.api}/register`, data);
  }

  login(data: any): Observable<any> {
    return this.http.post(`${environment.api}/login`, data);
  }

  logout(): Observable<any> {
    return this.http.post(`${environment.api}/logout`, {});
  }

  user(): Observable<{ data: User }> {
    return this.http.get<{ data: User }>(`${environment.api}/user`);
  }
}
