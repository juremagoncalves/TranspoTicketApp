import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Marca } from '../../modelos/marca.interface';
import { MarcaService } from '../../services/marca.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { error } from 'highcharts';

@Component({
  selector: 'app-marca',
  templateUrl: './marca.component.html',
  styleUrls: ['./marca.component.css']
})
export class MarcaComponent implements OnInit {

  formulario!: FormGroup;
  marcalist: Marca[] = [];
  isDialogOpen = false;
  marcaSelecionadaId!: string;
  editarModal: boolean = false;

  constructor(
    private marcaService : MarcaService,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService
    ){}
    

columnArray: any[] = [
  {header: 'Descrição', fieldName: 'designacao', dataType: 'string'},
  {header: 'Ação', fieldName: 'Ação', dataType: 'string'}
];

ngOnInit(): void {

  this.getList();

  this.formulario = this.criarForm();
}

public criarForm(): FormGroup{
  return this.formBuilder.group({

    designacao:[null, [Validators.required]],
    
  })
}

 getList(){
  this.marcaService.getAll().subscribe({
    next: (data) =>{
      this.marcalist = data;
      console.log("A lista de marca " + data);
     
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

 onSubmit(){
  
  if (this.formulario.valid){
    const marca ={
      designacao: this.formulario.value.designacao
    };

    this.marcaService.create(marca)
    .subscribe({
      next: (res) =>{
        this.limparFormulario();
        // this.formulario.reset()
        // this.marcalist.push(res);
        this.getList();
        // this.limparFormulario();
        // Feche o diálogo
        this.closeDialog();
        console.log("Marca cadastrada" + res)
      },
      error: (e) => console.error(JSON.stringify(e))
    })

  }
  else{
    console.log("Formulário inválido, não enviar.");
  }
 }

 editU(marca: Marca){
   this.marcaSelecionadaId = marca.pkMarca;
   this.editarModal = true;
   console.log("Id" + this.marcaSelecionadaId)
   this.formulario.setValue({designacao: marca.designacao})

  // console.log("Marca id: " + data.pkMarca)
  // this.marcaService.findById(data.pkMarca).subscribe({
  //   next: (res) => {
  //     console.log('O id da marca: ' + res.pkMarca)
  //   },
  //   error: (err) =>{
  //     console.log("Erro ao ir buscar a marca por id")
  //   }
  // })

  this.isDialogOpen = true;
  
 }

 update(){

  if (this.marcaSelecionadaId){

    const marca = {
      designacao: this.formulario.value.designacao
    };
    this.marcaService.update(this.marcaSelecionadaId, marca)
    .subscribe({
      next: (res) =>{
        this.limparFormulario();
        // this.formulario.reset()
        this.getList();
        this.closeDialog();
        // this.limparFormulario();
        console.log('Marca actualizada com sucesso')
      },
      error: (err) =>{
        console.log('Erro ao actualizar a marca' + err)
      }
    })

  }

  else console.log("Id inválido")
    
 }

 limparFormulario(): void {
  this.formulario.reset();
}

 deleteU(pkMarca: any){
  this.confirmationService.confirm({
    message: 'Tem certeza que deseja deletar?',
    accept: () => {
      this.marcaService.delete(pkMarca.pkMarca)
      .subscribe({
        next: () =>{
          this.getList();
          console.log("Marca Deletada com sucesso")
        },
        error: (error) => {
          console.error('Erro ao deletar a marca:', JSON.stringify(error));
          
        }
      });
    }
  });
  // console.log("chave da marca: " + JSON.stringify(pkMarca.pkMarca)  )
  
   
 }

 getControl(name: string): FormControl {
  const control = this.formulario.get(name);
  return control as FormControl;
}
  
}
