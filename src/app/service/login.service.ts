import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../interface';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  url = '';
  constructor(private http: HttpClient) {}

  login(payload: Login) {
   return  this.http.post(`${this.url}/login`, payload);
  }
}
