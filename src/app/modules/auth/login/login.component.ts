// import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'; 
import { AuthService } from '../services/auth.service';
import { MessageService } from 'primeng/api';
import { error } from 'highcharts';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {

  formulario!: FormGroup;
  loading = false;
  returnUrl!: string;
  userEmail!: string;
  userNome!: string;

  constructor(
    private formBuilder: FormBuilder,
    private router:Router,
    private route: ActivatedRoute,
    private authService:AuthService,
    private messageService: MessageService
    
    ){}
  
  ngOnInit(): void {
    this.formulario = this.criarForm();

  }

  public criarForm(): FormGroup{
    return this.formBuilder.group({
      email:[null, [Validators.required, Validators.email]],
      password:[null, [Validators.required]]
    })
  }

  get f() {
    return this.formulario.controls;
  }

  onSubmit(){
    if (this.formulario.valid) {
      this.loading = true;
      const {email, password} = this.formulario.value;
      console.log(email)
      
      this.authService.login(email, password)
      .subscribe({
        next: (data) => {
          // this.messageService.add({severity: 'success', summary: 'Success', detail: 'Message Content' })
          this.authService.setUserName(email);
          if (this.authService.isAdmin()){
            this.router.navigate(['/dashboard/home']);
          }
          else if (this.authService.isUser()){
            this.router.navigate(['/cliente/home']);
          }
        },
        error: (err: Error) => {
          this.loading = false;
          this.messageService.add({severity: 'error', summary: 'Erro', detail: 'Email ou senha inválida'})
          console.log("erro ao fazer login" + JSON.stringify(err));
        }
      })
      
    } else {
      // this.messageService.add({severity: 'Error', summary: 'Erro', detail: 'Formulario invlido'})
      console.log("Formulário inválido, não enviar.");
    }
  }

  getControl(name: string): FormControl {
    const control = this.formulario.get(name);
    return control as FormControl;
  }
}
