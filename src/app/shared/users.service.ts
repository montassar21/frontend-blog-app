import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

export const JWT_NAME = 'token';
const jwtHelper = new JwtHelperService();

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  baseUrl: string = 'http://localhost:5000/api/';

  constructor(private httpClient: HttpClient, private route: Router) {}

  public signUp(userObj: any) {
    return this.httpClient.post<any>(`${this.baseUrl}auth/signup`, userObj);
  }
  public login(loginObj: any) {
    return this.httpClient.post<any>(`${this.baseUrl}auth/login`, loginObj);
  }
  public getUser() {
    return this.httpClient.get<any>(`${this.baseUrl}users/`);
  }
  addPost(postData: any): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}posts/compose`, postData);
  }
  getAllPostsByUser(userId: any): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}posts/${userId}`);
  }

  deletePost(userId: any): Observable<any> {
    return this.httpClient.get<any>(
      `${this.baseUrl}posts/post-details/${userId}`
    );
  }
  getAllPublicPosts(): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}posts/`);
  }

  public updateUserPassword(infos: any) {
    return this.httpClient.post<any>(
      `${this.baseUrl}users/updatePassword/`,
      infos
    );
  }
  public updateInfo(infos: any) {
    return this.httpClient.post<any>(`${this.baseUrl}users/updateInfo/`, infos);
  }
  public updateUserImage(infos: any) {
    return this.httpClient.post<any>(
      `${this.baseUrl}users/updateOneImage/`,
      infos
    );
  }
  storeToken(tokenValue: string) {
    localStorage.setItem(JWT_NAME, tokenValue);
  }
  getToken() {
    return localStorage.getItem(JWT_NAME);
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem(JWT_NAME);
  }

  signOut() {
    localStorage.clear();
    this.route.navigate(['login']);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem(JWT_NAME);
    return !jwtHelper.isTokenExpired(token);
  }
}
