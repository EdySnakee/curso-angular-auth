import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { switchMap,tap } from 'rxjs/operators';
import { TokenService } from './token.service';
import { ResponseToken } from '@models/auth.model';
import { User } from '@models/user.model'
import { BehaviorSubject } from 'rxjs';
import { checkToken } from '@interceptors/token.interceptor'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //USANDO LA VARIABLE DE AMBIENTE IMPORTADA DESDE ENVIROMENT
  private apiUrl = environment.API_URL
  user$ = new BehaviorSubject<User | null>(null)

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

    //LOGIN
  login(email:string, password:string){
    return this.http.post<ResponseToken>(`${this.apiUrl}/auth/login`,{email,password})
    .pipe(
      tap(resp =>{
        this.tokenService.saveToken(resp.access_token)
        this.tokenService.saveRefreshToken(resp.refresh_token)
      })
    )
  }

  //Actualizando REFRESH token
  refreshToken( refreshToken:string) {
    return this.http.post<ResponseToken>(`${this.apiUrl}/auth/refresh-token`, {refreshToken})
    .pipe(
      tap(resp =>{
        this.tokenService.saveToken(resp.access_token)
        this.tokenService.saveRefreshToken(resp.refresh_token)
      })
    );
  }


  // REGISTRO
  register(name:string, email:string, password:string){
    return this.http.post(`${this.apiUrl}/auth/register`,{name,email,password})
  }

  // CONECTANDO LOGIN CON REGISTRO
  loginAndRegis(name:string, email:string, password:string){
    return this.register(name, email, password)
    .pipe(
      switchMap(()=> this.login(email,password))
    )
  }


  //DISPONIBLE
  isAvailable(email:string){
    return this.http.post<{isAvailable:boolean}>(`${this.apiUrl}/auth/is-available`,{email})
  }


  //RECUPERAR CONTRASEÑA
  recovery(email:string){
    return this.http.post(`${this.apiUrl}/auth/recovery`,{email})
  }


  //CAMBIAR EL PASSWORD
  changePassword(token:string,newPassword:string){
    return this.http.post(`${this.apiUrl}/auth/change-password`,{token,newPassword})
  }


   //OBTENER PERFIL AUTENTIFICADO
   getProfile(){
    return this.http.get(`${this.apiUrl}/auth/profile`,{ context: checkToken() })
    .pipe(
      tap((user:any) => {
        this.user$.next(user);
      })
    )
  }

  //OBTENER LA DATA DEL USER LOGEADO
  getDataUser(){
    return this.user$.getValue();
  }

  //PARA CERRAR SECION
  logout(){
    this.tokenService.removeToken();
  }


}
