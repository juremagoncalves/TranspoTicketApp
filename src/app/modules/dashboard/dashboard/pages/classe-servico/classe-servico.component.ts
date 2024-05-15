
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { ClasseServico } from '../../modelos/classe-servico.interface';
import { ClasseServicoService } from '../../services/classe-servico.service';

@Component({
  selector: 'app-classe-servico',
  templateUrl: './classe-servico.component.html',
  styleUrls: ['./classe-servico.component.css']
  
})
export class ClasseServicoComponent implements OnInit{

  formulario!: FormGroup;
  classeServicoList: ClasseServico[] = [];
  isDialogOpen = false;
  classeServicoSelecionadaId!: string;
  editarModal: boolean = false;
  

  constructor(
    private fb: FormBuilder,
    private classeServicoService: ClasseServicoService,
    private confirmationService: ConfirmationService
  ){}

  columnArray: any[] = [
    {header: 'Descrição', fieldName: 'designacao', dataType: 'string'},
    {header: 'Ação', fieldName: 'Ação', dataType: 'string'}
  ];

  ngOnInit(){
    this.formulario = this.criarForm();
    this.getList();
  }

  criarForm(): FormGroup{
    return this.fb.group({
      designacao:[null, [Validators.required]],
    })
  }

  getList(){
    this.classeServicoService.getAll().subscribe({
      next: (res) =>{
        this.classeServicoList = res;
        console.log("Lista" + res)
      },
      error: (e) => console.log("Erro ao listar" + JSON.stringify(e))
    })
  }

  openDialog(){
    console.log("jurema")
    this.isDialogOpen = true;
  }
  
  closeDialog() {
    console.log("Sou a jurema")
    this.isDialogOpen = false;
    this.editarModal = false;
  }
  
  onCancel(){
    this.editarModal = false;
    this.limparFormulario();
  }
  
  limparFormulario(): void {
    this.formulario.reset();
  } 

  onSubmit(){
    if(this.formulario.valid){
      const classeServico = {
        designacao: this.formulario.value.designacao
      }
      this.classeServicoService.create(classeServico).subscribe({
        next: (res) =>{
          this.limparFormulario();
          this.getList();
          this.closeDialog();
          console.log("Classe serviço cadastrado" + res)
        },
        error: (err) =>{
          console.log("Erro ao cadastrar a classe de serviço" + JSON.stringify(err))
        }
      })
    }
    else{
      console.log("Formulário inválido, não enviar")
    }
  }

  edit(classeServico: ClasseServico){
    this.classeServicoSelecionadaId = classeServico.pkClasseServico;
    this.editarModal = true;
    this.formulario.setValue({designacao:classeServico.designacao});
    this.isDialogOpen = true;
  
  }

  update(){
    if(this.classeServicoSelecionadaId){
      if(this.formulario.valid){
        const classeServico = {
          designacao: this.formulario.value.designacao
        };

        this.classeServicoService.update(classeServico, this.classeServicoSelecionadaId)
        .subscribe({
          next: (res) => {
            this.limparFormulario();
            this.getList();
            this.closeDialog();
            console.log('Classe de serviço actualizada com sucesso')
          },
          error: (err) =>{
            console.log('Erro ao actualizar a Classe de serviço' + err)
          }
        })
        
      }
      else{
        console.log("Formulario Inválido")
      }
    }
    else{
      console.log("Id Inválido" + this.classeServicoSelecionadaId)
    }

  }

  delete(pkClasseServico: any){
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja deletar?',
      accept: () =>{
        this.classeServicoService.delete(pkClasseServico.pkClasseServico).subscribe({
          next: (res) => {
            this.getList();
            console.log("classeServico Deletada com sucesso")
          },
          error: (err) => {
            console.log("Erro ao eliminar" + JSON.stringify(err))
          }
        });
      }
    });
    
  }

  getControl(name: string): FormControl {
    const control = this.formulario.get(name);
    return control as FormControl;
  }


}
