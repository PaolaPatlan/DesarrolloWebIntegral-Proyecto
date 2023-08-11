import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(
    private loginService: LoginService) {}


  logout(){
    this.loginService.logout();
  }

 public isLogin(){
  return this.loginService.isAuthenticated();
  }
}
