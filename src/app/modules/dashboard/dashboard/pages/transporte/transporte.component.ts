// @ts-ignore
// import { Math } from 'core-js';
import { Transporte } from './../../modelos/transporte.interface';
import { Component, OnInit } from '@angular/core';
import { TipoTransporteService } from '../../services/tipo-transporte.service';
import { TipoTransporte } from '../../modelos/tipo-transporte.interface';
import { ClasseServicoService } from '../../services/classe-servico.service';
import { MarcaService } from '../../services/marca.service';
import { Marca } from '../../modelos/marca.interface';
import { ClasseServico } from '../../modelos/classe-servico.interface';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { TransporteService } from '../../services/transporte.service';
import { AssentoService } from '../../services/assento.service';
import { Assento } from '../../modelos/assento.interface';
// import { Transporte } from '../../modelos/transporte.interface';

@Component({
  selector: 'app-transporte',
  templateUrl: './transporte.component.html',
  styleUrls: ['./transporte.component.css']
})
export class TransporteComponent implements OnInit {
  tipoTransporteList: TipoTransporte[] = [];
  marcaList: Marca[]= [];
  classeServicoList: ClasseServico[] = [];
  transporteList: Transporte[] = [];
  assentoList: Assento[]= [];
  formulario!: FormGroup;
  isDialogOpen = false;
  isDialogOpenAssento = false;
  transporteSelecionadaId!: string;
  editarModal: boolean = false;
  seats: HTMLElement[][] = [];
  middleIndex: number = 0;

  constructor(
    private tipoTransporteService: TipoTransporteService,
    private classeServicoService: ClasseServicoService,
    private marcaService: MarcaService,
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private transporteService: TransporteService,
    private assentoService: AssentoService
  ){}

  columnArray: any[] = [
    {header: 'Matrícula', fieldName: 'matricula', dataType: 'string'},
    {header: 'Capacidade', fieldName: 'capacidade', dataType: 'number'},
    {header: 'Marca', fieldName: 'fkMarca.designacao', dataType: 'string'},
    {header: 'Tipo de transporte', fieldName: 'fkTipoTransporte.designacao', dataType: 'string'},
    {header: 'Classe de Serviço', fieldName: 'fkClasseServico.designacao', dataType: 'string'},
    {header: 'Ação', fieldName: 'Ação', dataType: 'string'}
  ];

  ngOnInit(): void {
    this.formulario = this.criarForm();
    this.getTipoTransporte();
    this.getClasseServico();
    this.getMarca();
    this.getTransporte();
   
  }

  criarForm(): FormGroup{
    return this.fb.group({
      matricula: [null, [Validators.required]],
      pkMarca: [null, [Validators.required]],
      pkClasseServico: [null, [Validators.required]],
      pkTipoTransporte: [null, [Validators.required]],
      capacidade: [null, [Validators.required]]
    })
  }

  getTipoTransporte(){
    this.tipoTransporteService.getAll().subscribe({
      next: (res) => {
        this.tipoTransporteList = res;
        console.log("lista de tipo: " + res)
      },
      error: (err) => {
        console.log("erro ao listar os tipos")
      }
    })
  }

  getClasseServico(){
    this.classeServicoService.getAll().subscribe({
      next: (res) => {
        this.classeServicoList = res;
      },
      error: (err) => {
        console.log("Erro ao listar as classes")
      }
    })
  }

  getMarca(){
    this.marcaService.getAll().subscribe({
      next: (res) =>{
        this.marcaList = res;
      },
      error:(err) => {
        console.log("Erro ao listar as marcas")
      }
    })
  }

  getTransporte(){
    this.transporteService.getAll().subscribe({
      next: (res) => {
        this.transporteList = res;
      },
      error: (err) =>{
        console.log("Erro ao listar os transportes")
      }
    })
  }
/////////////////////////////////////////////

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
  ////////////////////////////////////////////////////////////////////////////////


  onSubmit(){
    console.log("entrei aqui")
    if(this.formulario.valid){

      const transporte = {
        matricula: this.formulario.value.matricula,
        fkTipoTransporte: {
          pkTipoTransporte: this.formulario.value.pkTipoTransporte.pkTipoTransporte
        },
        fkMarca: {
          pkMarca: this.formulario.value.pkMarca.pkMarca
        },
        fkClasseServico:{
          pkClasseServico: this.formulario.value.pkClasseServico.pkClasseServico
        },
        capacidade: this.formulario.value.capacidade
      }
      console.log("Transporte: " + JSON.stringify(transporte))
       this.transporteService.create(transporte).subscribe({
        next: (res) =>{
          console.log("HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH")
          this.limparFormulario();
          this.getTransporte();
          this.closeDialog();
          console.log("Tipo de transporte cadastrado" + res)
        },
        error: (err) =>{
          console.log("Erro Transporte" + err)
          console.log("Erro ao cadastrar o transporte" + JSON.stringify(err))
        }
      })
    }

    else{
      console.log("formulario invalido" )
    }
  }

  edit(transporte: Transporte){
    this.transporteSelecionadaId = transporte.pkTransporte;
    this.editarModal = true;

    
    const marcaSelecionada = this.marcaList.find(marca => marca.pkMarca === transporte.fkMarca.pkMarca);
  
    const classeServicoSelecionada = this.classeServicoList.find(classeServico => classeServico.pkClasseServico === transporte.fkClasseServico.pkClasseServico);
 
    const tipoTransporteSelecionado = this.tipoTransporteList.find(tipoTransporte => tipoTransporte.pkTipoTransporte === transporte.fkTipoTransporte.pkTipoTransporte);


    this.formulario.patchValue({
      matricula: transporte.matricula,
      pkTipoTransporte: tipoTransporteSelecionado,
      pkMarca: marcaSelecionada,
      pkClasseServico: classeServicoSelecionada,
      capacidade: transporte.capacidade
    });
    this.isDialogOpen = true;
  }

  update(){
    if(this.transporteSelecionadaId){
      if(this.formulario.valid){
      
        const transporte = {
          matricula: this.formulario.value.matricula,
          fkTipoTransporte: {
            pkTipoTransporte: this.formulario.value.pkTipoTransporte.pkTipoTransporte
          },
          fkMarca: {
            pkMarca: this.formulario.value.pkMarca.pkMarca
          },
          fkClasseServico:{
            pkClasseServico: this.formulario.value.pkClasseServico.pkClasseServico
          },
          capacidade: this.formulario.value.capacidade
        }
        console.log("11111111 -:" + transporte.fkClasseServico.pkClasseServico)
       
        this.transporteService.update(transporte, this.transporteSelecionadaId)
        .subscribe({
          next: (res) =>{
            this.limparFormulario();
            this.getTransporte();
            this.closeDialog();
            //
            
            //
            console.log("Transporte actualizado" + res)
          },
          error: (err) => {
            console.log("Erro ao actualizar: " + err)
          }
        })
      }
      else{
        console.log("formulario invalido")
      }
    }
    else{
      console.log("ID invalido" + this.transporteSelecionadaId)
    }
  }

  delete(pkTransporte: any) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja deletar?',
      accept: () => {
        this.transporteService.delete(pkTransporte.pkTransporte)
        .subscribe({
          next: () => {
            this.getTransporte()
            console.log("transporte actualizado com sucesso")
          },
          error: (err) => {
            console.log("Erro ao actualizar o transporte: " + JSON.stringify(err))
          }
        })
      }
    })
  }
  

  getControl(name: string): FormControl {
    const control = this.formulario.get(name);
    return control as FormControl;
  }

  generateSeats(quantity: number): void {
    console.log("aaaaaaaaaaaaaaaaaaaaaaa")
    this.seats = [];
    let remainingSeats = quantity;
    let seatNumber = 1;

    while (remainingSeats > 0) {
      // alert(remainingSeats)
      const seatRow: HTMLElement[] = [];
      const rowSize = Math.min(remainingSeats, 4);
      this.middleIndex = Math.floor(rowSize / 2);
      // const middleIndex = Math.floor(rowSize / 2);

      for (let j = 0; j < rowSize; j++) {
        const seat = document.createElement('div');
        seat.classList.add('seat');
        seatRow.push(seat);
      } 

      this.seats.push(seatRow);
      remainingSeats -= rowSize;
      console.log("tttttt " + this.seats)
      console.log("hhhhhhhhh " + seatRow)
    }
  }


  shouldRenderCorridor(rowSize: number, index: number): boolean {
    return rowSize === 4 && index === 1;
  }
  // findAllAssentoByPkTransporte(transporte:Transporte){
  //   const pkTransporte = transporte.pkTransporte;
  //   console.log("Id do Transporte: " + pkTransporte)
  //   const capacidade = transporte.capacidade;
  //   this.generateSeats(capacidade);
  //   console.log("Capacidade: " + capacidade)
  //   this.assentoService.findAssentoBypkTransporte(pkTransporte).subscribe({
  //     next: (res) =>{
  //       this.assentoList = res;
  //       console.log("lista: " + JSON.stringify(res))
  //     },
  //     error: (err) => {
  //       console.log("Erro")
  //     }
  //   })
  //   this.isDialogOpenAssento = true;
    
  // }

  findAllAssentoByPkTransporte(transporte: Transporte) {
    const pkTransporte = transporte.pkTransporte;
    console.log("Id do Transporte: " + pkTransporte);
    const capacidade = transporte.capacidade;
  
    // Gerar os assentos
    this.generateSeats(capacidade);
    console.log("Capacidade: " + capacidade);
  
    // Buscar a lista de assentos do transporte
    this.assentoService.findAssentoBypkTransporte(pkTransporte).subscribe({
      next: (res: Assento[]) => {
        this.assentoList = res;
        console.log("Lista de assentos: " + JSON.stringify(res));
  
        // Associar os números de assentos da base de dados aos assentos gerados
        for (let i = 0; i < this.assentoList.length; i++) {
          const assento = this.assentoList[i];
          const row = Math.floor(i / 4);
          const col = i % 4;
          this.seats[row][col].innerText = assento.numeroAssento;
          this.seats[row][col].setAttribute('id-assento', assento.pkAssento);
        }
      },
      error: (err) => {
        console.log("Erro ao buscar assentos: " + err);
      }
    });
  
    this.isDialogOpenAssento = true;
  }
  

  // openDialogAssento(){
  //   this.isDialogOpenAssento = true;

  // }
  

}
