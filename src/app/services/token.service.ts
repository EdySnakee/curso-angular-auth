import { Injectable } from '@angular/core';
import {getCookie,setCookie,removeCookie} from 'typescript-cookie';
// import  jwt_decode, {JwtPayload}  from "jwt-decode";
import { jwtDecode, JwtPayload } from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }


  //PARA MANEJAR EL ACCESS TOKEN
  saveToken(token: string){
    //Aca seteamos el token en localStorage
    // localStorage.setItem('token', token);

    //Aca seteamos el token usando la libreria, y guardando en cookie
    setCookie('token', token, {
      expires: 365,
      path: '/'
    });
  }

  getToken(){
    const token = getCookie('token');
    return token;
  }

  removeToken(){
    removeCookie('token');
  }


//PARA MANEJAR EL REFRESH TOKEN
getRefreshToken(){
  const token = getCookie('refresh-token');
  return token;
}

saveRefreshToken(token: string){
  setCookie('refresh-token', token, {
    expires: 365,
    path: '/'
  });
}

removeRefreshToken(){
  removeCookie('refresh-token');
}



  //USANDO LA LIBRERIA PARA CODIFICAR TOKEN
  isValidToken(){
    const token = this.getToken();
    if(!token){
      return false;
    }
    const decodeToken = jwtDecode<JwtPayload>(token);
    if(decodeToken && decodeToken?.exp){
      const tokenDate = new Date(0);
      tokenDate.setUTCSeconds(decodeToken.exp);
      const today = new Date();
      return tokenDate.getTime() > today.getTime();
    }
    return false;
  }

  //USANDO LA LIBRERIA PARA CODIFICAR el refresh TOKEN
  isValidRefreshToken(){
    const token = this.getRefreshToken();
    if(!token){
      return false;
    }
    const decodeToken = jwtDecode<JwtPayload>(token);
    if(decodeToken && decodeToken?.exp){
      const tokenDate = new Date(0);
      tokenDate.setUTCSeconds(decodeToken.exp);
      const today = new Date();
      return tokenDate.getTime() > today.getTime();
    }
    return false;
  }


}
