import { Person } from './../modelos/person.interface';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-regiter',
  templateUrl: './regiter.component.html',
  styleUrls: ['./regiter.component.css']
})
export class RegiterComponent {

  formulario!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router:Router,
    private registerService: RegisterService){}

  ngOnInit(): void {
    this.formulario = this.criarForm();

  //  this.formulario = this.formBuilder.group({
  //   nome: [null, [Validators.required]],
  //   bi: [null, [Validators.required]],
  //   telefone: [null, [Validators.required]],
  //   email: [null, [Validators.required, Validators.email]],
  //   senha: [null, [Validators.required]],
  //   roleId: ['']

  //  })

 
    

  }

  criarForm(): FormGroup{
    return this.formBuilder.group({
      nome: ["", [Validators.required]],
      bi: ["", [Validators.required]],
      telefone: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
      // roleId: []
  
     })
  }

  onSubmit(){
    if (this.formulario.valid) {

      const userResgistrationData = {
        person: {
          nome: this.formulario.value.nome,
          bi: this.formulario.value.bi,
          telefone: this.formulario.value.telefone
        },
        user: {
          email: this.formulario.value.email,
          password: this.formulario.value.password
        },
        roleIds: []
      };
      this.registerService.create(userResgistrationData).subscribe({
        next : (res) => {
          console.log("Dados salvos com sucesso: " + JSON.stringify(res));
          this.router.navigate(['/'])
        },
        error : (err) => {
          console.log("Erro ao registar os dados" + JSON.stringify(err))
        }
      }
        
      )
      
      // console.log("Formulário válido, processando envio...");
      // console.log(this.formulario.value); 
     
    } else {
      console.log("Formulário inválido, não enviar.");
    }
  }

  getControl(name: string): FormControl {
    const control = this.formulario.get(name);
    return control as FormControl;
  }
  
}
