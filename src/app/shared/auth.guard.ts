import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router'
import { Observable } from 'rxjs';
import {UsersService} from './users.service'
@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(private auth:UsersService, private router :Router){}
  ngOnInit():void{
  }
  canActivate() {
    if(!this.auth.isLoggedIn()){
      this.router.navigate(['login']);

      return false;}
     return this.auth.isLoggedIn();
  }
}
