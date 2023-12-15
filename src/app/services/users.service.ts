import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import {User} from '@models/user.model'
import {checkToken} from '@interceptors/token.interceptor'


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl = environment.API_URL

  constructor(
    private http: HttpClient,
  ) { }

  //TRAER TODOS LOS USUARIOS -> USAMOS jwt ENVIADO EN EL HEADER
  getUsers(){
    return this.http.get<User[]>(`${this.apiUrl}/users`,{ context: checkToken() })
  }

}
