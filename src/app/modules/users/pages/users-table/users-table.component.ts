import { Component, OnInit } from '@angular/core';

import { DataSourceUser } from './data-source';
import { UsersService } from '@services/users.service';
import { AuthService } from '@services/auth.service'
import { User } from '@models/user.model';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html'
})
export class UsersTableComponent implements OnInit {

  dataSource = new DataSourceUser();
  columns: string[] = ['id', 'avatar', 'name', 'email'];
  user : User | null = null;


  constructor(
    private usersService: UsersService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
      this.getDataUser();
  }

  //TRAER DATA DEL USUARIO
  getDataUser(){
    this.refresh();

    this.authService.user$
    .subscribe((user:any)=>{
      this.user = user;
    })
  }

  //OBTENER EL USUARIO LOGEADO
  getProfile(){
    this.authService.getProfile()
    .subscribe((user:any)=>{
      this.user = user;
    })
  }


//USANDO EL REFRES
refresh(){
  this.usersService.getUsers()
  .subscribe(users => {
    this.dataSource.init(users);
  })
}

}



