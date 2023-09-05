import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import { Router } from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt'

export const JWT_NAME = 'token';
const jwtHelper = new JwtHelperService ();

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  baseUrl: string ="http://localhost:3000/v1/api/";

  constructor(private httpClient: HttpClient,private route:Router,
 ) { }

  public signUp(userObj:any){
    return this.httpClient.post<any>(`${this.baseUrl}auth/signUp`,userObj);
  }
  public login(loginObj:any){
    return this.httpClient.post<any>(`${this.baseUrl}auth/login`,loginObj);

  }
  public getUser() {
    return this.httpClient.get<any>(`${this.baseUrl}users/`);

  }
  public updateUserPassword(infos:any) {
    return this.httpClient.post<any>(`${this.baseUrl}users/updatePassword/`,infos)
  }
  public updateInfo(infos:any) {
    return this.httpClient.post<any>(`${this.baseUrl}users/updateInfo/`,infos)
  }
    public updateUserImage(infos:any) {
    return this.httpClient.post<any>(`${this.baseUrl}users/updateOneImage/`,infos)
  }
  storeToken(tokenValue:string){
    localStorage.setItem(JWT_NAME,tokenValue);
  }
  getToken(){
    return localStorage.getItem(JWT_NAME);
  }
  isLoggedIn():boolean{
    return !!localStorage.getItem(JWT_NAME);
  }

  signOut(){
    localStorage.clear();
    this.route.navigate(['login'])
  }

  isAuthenticated():boolean{
    const token =localStorage.getItem(JWT_NAME);
    return !jwtHelper.isTokenExpired(token);
  }

}
