import { ConfirmationService } from 'primeng/api';
import { TipoTransporteService } from './../../services/tipo-transporte.service';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TipoTransporte } from '../../modelos/tipo-transporte.interface';

@Component({
  selector: 'app-tipo-transporte',
  templateUrl: './tipo-transporte.component.html',
  styleUrls: ['./tipo-transporte.component.css']
})
export class TipoTransporteComponent {

  formulario!: FormGroup;
  tipoTransporteList: TipoTransporte[] = [];
  isDialogOpen = false;
  tipoTransporteSelecionadaId!: string;
  editarModal: boolean = false;

  constructor(
    private fb: FormBuilder,
    private tipoTransporteService: TipoTransporteService,
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
    this.tipoTransporteService.getAll().subscribe({
      next: (res) =>{
        this.tipoTransporteList = res;
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
      const tipoTransporte = {
        designacao: this.formulario.value.designacao
      }
      this.tipoTransporteService.create(tipoTransporte).subscribe({
        next: (res) =>{
          this.limparFormulario();
          this.getList();
          this.closeDialog();
          console.log("Tipo de transporte cadastrado" + res)
        },
        error: (err) =>{
          console.log("Erro ao cadastrar o Tipo de transporte" + JSON.stringify(err))
        }
      })
    }
    else{
      console.log("Formulário inválido, não enviar")
    }
  }

  edit(tipoTransporte: TipoTransporte){
    this.tipoTransporteSelecionadaId = tipoTransporte.pkTipoTransporte;
    this.editarModal = true;
    this.formulario.setValue({designacao:tipoTransporte.designacao});
    this.isDialogOpen = true;
  
  }

  update(){
    if(this.tipoTransporteSelecionadaId){
      if(this.formulario.valid){
        const tipoTransporte = {
          designacao: this.formulario.value.designacao
        };

        this.tipoTransporteService.update(tipoTransporte, this.tipoTransporteSelecionadaId)
        .subscribe({
          next: (res) => {
            this.limparFormulario();
            this.getList();
            this.closeDialog();
            console.log('Tipo de transporte actualizado com sucesso')
          },
          error: (err) =>{
            console.log('Erro ao actualizar o Tipo de transporte ' + err)
          }
        })
        
      }
      else{
        console.log("Formulario Inválido")
      }
    }
    else{
      console.log("Id Inválido" + this.tipoTransporteSelecionadaId)
    }

  }

  delete(pkTipoTransporte: any){
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja deletar?',
      accept: () =>{
        this.tipoTransporteService.delete(pkTipoTransporte.pkTipoTransporte).subscribe({
          next: (res) => {
            this.getList();
            console.log("Tipo transporte Deletado com sucesso")
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
