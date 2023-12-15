import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';

import { TokenService } from '@services/token.service';

@Injectable({
  providedIn: 'root'
})
export class RedirectGuard implements CanActivate {

  constructor(
    private tokenService: TokenService,
    private router: Router
  ) {
  }


  //USANDO EL ACCESS TOKEN
  // canActivate():boolean{
  //   const isValidToken = this.tokenService.isValidToken();
  //   if(isValidToken){
  //     this.router.navigate(['/app']);
  //   }
  //   return true;
  // }

  //USANDO EL REFRESH TOKEN
  canActivate():boolean{
    const isValidToken = this.tokenService.isValidRefreshToken();
    if(isValidToken){
      this.router.navigate(['/app']);
    }
    return true;
  }

}
