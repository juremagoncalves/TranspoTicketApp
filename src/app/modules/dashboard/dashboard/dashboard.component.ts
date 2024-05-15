import { Component, Input } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  @Input() text = 'Dashboard';
  email = ''
  nome = ''
  constructor(private authService: AuthService){
    this.email = this.authService.getUserEmaill() ?? '';
    this.nome = this.authService.getUserNome() ?? '';
  }
}
