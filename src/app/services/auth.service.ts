import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';

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

}
