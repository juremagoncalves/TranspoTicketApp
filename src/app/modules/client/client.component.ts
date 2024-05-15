import { Component } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent {
  email = ''
  nome = ''
  constructor(private authService: AuthService,  private router: Router){
    this.email = this.authService.getUserEmaill() ?? '';
    this.nome = this.authService.getUserNome() ?? '';
  }

  logout(){
    this.authService.logout();
    this.router.navigate(["/login"])
  }

}
