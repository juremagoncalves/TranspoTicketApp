import { AuthService } from './../../../../auth/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faDashboard } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  faDashboard = faDashboard;

  constructor(
    private authService: AuthService, 
    private router: Router
    ){}

  ngOnInit(): void {
  }

  logout(){
    this.authService.logout()
    this.router.navigate(["/login"])
  }
  
}
