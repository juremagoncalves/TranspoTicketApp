import { Component, OnInit } from '@angular/core';
import { Transporte } from '../../modelos/transporte.interface';
import { Provincia } from '../../modelos/provincia.interface';
import { Rota } from '../../modelos/rota.interface';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { TransporteService } from '../../services/transporte.service';
import { RotaService } from '../../services/rota.service';
import { ProvinciaService } from '../../services/provincia.service';
import { RotaDTO } from '../../modelos/rotaDTO.interface';
import { Console } from 'console';
import { ClasseServicoService } from '../../services/classe-servico.service';
import { ClasseServico } from '../../modelos/classe-servico.interface';

@Component({
  selector: 'app-rota',
  templateUrl: './rota.component.html',
  styleUrls: ['./rota.component.css']
})
export class RotaComponent implements OnInit {

  transporteList: Transporte[] = [];
  provinciaOrigemList: Provincia[] = [];
  provinciaDestinoList: Provincia[] = [];
  rotaList: Rota[] = [];
  rotaDTOLista: RotaDTO[] = []
  formulario!: FormGroup;
  isDialogOpen = false;
  rotaSelecionadaId!: string;
  editarModal: boolean = false;
  classeServicoList: ClasseServico[] = [];
  idDaClasseDeServicoPadrao:any;

  constructor(
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private rotaService: RotaService,
    private transporteService: TransporteService,
    private provinciaService: ProvinciaService,
    private classeServicoService: ClasseServicoService,

  ){}

  columnArray: any[] = [
    // {header: 'Transporte', fieldName: 'fkTransporte.matricula | fkTransporte.fkMarca.designacao', dataType: 'string'},
    // {header: 'Transporte', fieldName: 'transporte.matricula', dataType: 'string'},
    {header: 'Origem', fieldName: 'fkProvinciaOrigem.designacao', dataType: 'string'},
    {header: 'Destino', fieldName: 'fkProvinciaDestino.designacao', dataType: 'string'},
    // {header: 'Preço', fieldName: 'precoViagem.preco', dataType: 'number'},
    {header: 'Ação', fieldName: 'Ação', dataType: 'string'}
  ];

  ngOnInit(): void {
    this.formulario = this.criarForm();
    this.getProvinciaDestino();
    this.getProvinciaOrigem();
    this.getRotas();
    this.getTransporte();
    this.getClasseServico();
    
  }

  criarForm(): FormGroup{
    return this.fb.group({
      // pkClasseServico: [null, [Validators.required]],
      // pkTransporte: [null, [Validators.required]],
      pkProvinciaOrigem: [null, [Validators.required]],
      pkProvinciaDestino: [null, [Validators.required]],
      // preco: [null, [Validators.required]],
    })
  }

  getTransporte(){
    this.transporteService.getAll().subscribe({
      next: (res) => {
        this.transporteList = res;
      },
      error: (err) => {
        console.log("Erro ao listar os transportes");
      }
    })
  }

  getTransporteByPkClasseServico(pkClasseServico : any){
    this.transporteService.getAllByPkClasseServico(pkClasseServico.pkClasseServico).subscribe({
      next: (res) => {
        this.transporteList = res;
      },
      error: (err) => {
        console.log("Erro ao listar os transportes");
      }
    })
  }

  getClasseServico(){
    this.classeServicoService.getAll().subscribe({
      next: (res) => {
        this.classeServicoList = res;
        // if (this.classeServicoList.length > 0) {
        //   this.idDaClasseDeServicoPadrao = this.classeServicoList[2].pkClasseServico; // Define a primeira classe de serviço como padrão
        //   this.formulario.patchValue({
        //     pkClasseServico: this.idDaClasseDeServicoPadrao // Define o valor padrão no formulário
        //   });
        //   this.getTransporteByPkClasseServico(this.idDaClasseDeServicoPadrao);
        // }
        
      },
      error: (err) => {
        console.log("Erro ao listar as classes")
      }
    })
  }

  getProvinciaDestino(){
    this.provinciaService.getAll().subscribe({
      next: (res) => {
        this.provinciaDestinoList = res;
      }
    })
  }

  getProvinciaOrigem(){
    this.provinciaService.getAll().subscribe({
      next: (res) => {
        this.provinciaOrigemList = res;
      }
    })
  }

  getRotas(){
    this.rotaService.getAll().subscribe({
      next: (res) => {
        this.rotaList = res;
        this.getAllRotasWithTransporteAndPreco()
      },
      error: (err) => {
        console.log("erro ao listar os dados")
      }
    })
  }

  getAllRotasWithTransporteAndPreco(){
    this.rotaService.getAllRotasWithTransporteAndPreco().subscribe({
      next: (res) => {
        console.log("entrei")
        this.rotaDTOLista = res;
        console.log(res[0].precoViagem.preco)
      },
      error: (err) => {
        console.log("erro ao listar os dados")
      }
    })
  }


  openDialog(){
    
    this.isDialogOpen = true;
  }

  closeDialog() {
    
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
    console.log("entrei aqui")
    if(this.formulario.valid){

      const rota = {
        
        fkProvinciaOrigem: {
          pkProvincia: this.formulario.value.pkProvinciaOrigem.pkProvincia
        },
        fkProvinciaDestino:{
          pkProvincia: this.formulario.value.pkProvinciaDestino.pkProvincia
        },
       
        
      }
      // const rotaDTO = {
      //   fkProvinciaOrigemId: this.formulario.value.pkProvinciaOrigem.pkProvincia,
      //   fkProvinciaDestinoId: this.formulario.value.pkProvinciaDestino.pkProvincia,
      //   fkTransporteId: this.formulario.value.pkTransporte.pkTransporte,
      //   preco: this.formulario.value.preco
      // };
      console.log("Rota: " + JSON.stringify(rota))
       this.rotaService.create(rota).subscribe({
        next: (res) =>{
          this.limparFormulario();
          this.getRotas();
          this.closeDialog();
          console.log("Rota cadastrada" + res)
        },
        error: (err) =>{
          console.log("Erro ao cadastrar a rota" + JSON.stringify(err))
        }
      })
    }

    else{
      console.log("formulario invalido" )
    }
  }

  edit(rota: Rota){
    this.rotaSelecionadaId = rota.pkRota;
    console.log("Meu Id da rota: " + this.rotaSelecionadaId)
    this.editarModal = true;
    // const transporteSelecionado = this.transporteList.find(transporte => transporte.pkTransporte === rota.fkTransporte.pkTransporte);
    const provinciaDestinoSelecionada = this.provinciaDestinoList.find(provincia => provincia.pkProvincia === rota.fkProvinciaDestino.pkProvincia);
    const provinciaOrigemSelecionada = this.provinciaOrigemList.find(provincia => provincia.pkProvincia === rota.fkProvinciaOrigem.pkProvincia );

    this.formulario.patchValue({
      // pkTransporte: transporteSelecionado,
      pkProvinciaOrigem: provinciaOrigemSelecionada,
      pkProvinciaDestino: provinciaDestinoSelecionada,
      // preco: rota.preco

    })
    this.isDialogOpen = true;
  }

  update(){
    if (this.rotaSelecionadaId){
      if(this.formulario.valid){

        const rota = {
          // fkTransporte: {
          //   pkTransporte: this.formulario.value.pkTransporte.pkTransporte
          // },
          fkProvinciaOrigem: {
            pkProvincia: this.formulario.value.pkProvinciaOrigem.pkProvincia
          },
          fkProvinciaDestino:{
            pkProvincia: this.formulario.value.pkProvinciaDestino.pkProvincia
          },
          // preco: this.formulario.value.preco
          
        }

        this.rotaService.update(rota, this.rotaSelecionadaId).subscribe({
          next: (res)=> {
            this.limparFormulario();
            this.getRotas();
            this.closeDialog();
            console.log("Rota ACtualizada com sucesso");
          },
          error: (err) => {
            console.log("Erro ao actualizar a rota")
          }
        })
      }
      else{
        console.log("formulário Inválido")
      }
    }
    else{
      console.log("Id Invalido: " + this.rotaSelecionadaId)
    }
  }

  delete(pkRota: any) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja deletar?',
      accept: () => {
        this.rotaService.delete(pkRota.pkRota)
        .subscribe({
          next: () => {
            this.getRotas()
            console.log("Rota desactivada com sucesso")
          },
          error: (err) => {
            console.log("Erro ao desactivar a rota: " + JSON.stringify(err))
          }
        })
      }
    })
  }

  filtrarProvinciaDestino(){
    console.log("Lista " )
    const provinciaOrigemSelect = this.formulario.value.pkProvinciaOrigem
    // const provinciaOrigemSelect = this.formulario.value.pkProvinciaOrigem
    console.log("Lista " + provinciaOrigemSelect)
    this.provinciaDestinoList = this.provinciaDestinoList.filter(provincia => 
      provincia.pkProvincia !== provinciaOrigemSelect.pkProvincia)
  }

  getControl(name: string): FormControl{
    const control = this.formulario.get(name);
    return control as FormControl;
  }


}
