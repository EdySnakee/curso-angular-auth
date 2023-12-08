import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //USANDO LA VARIABLE DE AMBIENTE IMPORTADA DESDE ENVIROMENT
  private apiUrl = environment.API_URL


  constructor(
    private http: HttpClient
  ) { }

    //LOGIN
  login(email:string, password:string){
    return this.http.post(`${this.apiUrl}/auth/login`,{email,password})
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



}
