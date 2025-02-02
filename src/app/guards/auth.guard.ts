import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';

import { TokenService } from '@services/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private tokenService: TokenService,
    private router: Router
  ) {
  }

  //Ejemplo usando el access token
  // canActivate():boolean{
  //   const isValidToken = this.tokenService.isValidToken();
  //   if(!isValidToken){
  //     this.router.navigate(['/login']);
  //     return false;
  //   }
  //   return true;
  // }


  //Ejemplo usando el refresh token ->
  canActivate():boolean{
    const isValidToken = this.tokenService.isValidRefreshToken();
    if(!isValidToken){
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

}
