import { Component, OnInit } from '@angular/core';
import { Transporte } from '../../modelos/transporte.interface';
import { Rota } from '../../modelos/rota.interface';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ClasseServico } from '../../modelos/classe-servico.interface';
import { ConfirmationService } from 'primeng/api';
import { RotaService } from '../../services/rota.service';
import { TransporteService } from '../../services/transporte.service';
import { ClasseServicoService } from '../../services/classe-servico.service';
import { PrecoViagemService } from '../../services/preco-viagem.service';
import { PrecoViagem } from '../../modelos/precoViagem.interface';

@Component({
  selector: 'app-preco-viagem',
  templateUrl: './preco-viagem.component.html',
  styleUrls: ['./preco-viagem.component.css']
})
export class PrecoViagemComponent implements OnInit{
  precoViagemList: PrecoViagem[] = []
  transporteList: Transporte[] = [];
  rotaList: any[] = [];
  formulario!: FormGroup;
  isDialogOpen = false;
  precoViagemSelecionadaId!: string;
  editarModal: boolean = false;
  classeServicoList: ClasseServico[] = [];

  constructor(
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private rotaService: RotaService,
    private transporteService: TransporteService,
    private classeServicoService: ClasseServicoService,
    private precoViagemService: PrecoViagemService

  ){}

  columnArray: any[] = [
    // {header: 'Transporte', fieldName: 'fkTransporte.matricula | fkTransporte.fkMarca.designacao', dataType: 'string'},
    {header: 'Transporte', fieldName: 'fkTransporte.matricula', dataType: 'string'},
    {header: 'Classe Serviço', fieldName: 'fkTransporte.fkClasseServico.designacao', dataType: 'string'},

    {header: 'Rota', fieldName: 'rota', dataType: 'string'},
    // {header: 'Rota', fieldName: 'fkRota.fkProvinciaOrigem.designacao '+ ' fkRota.fkProvinciaDestino.designacao', dataType: 'string'},
    // {header: 'Origem', fieldName: 'rota.fkProvinciaOrigem.designacao', dataType: 'string'},
    // {header: 'Destino', fieldName: 'rota.fkProvinciaDestino.designacao', dataType: 'string'},
    {header: 'Preço', fieldName: 'preco', dataType: 'number'},
    {header: 'Ação', fieldName: 'Ação', dataType: 'string'}
  ];

  ngOnInit(): void {
    this.formulario = this.criarForm();
    // this.getProvinciaDestino();
    // this.getProvinciaOrigem();
    this.getRotas();
   
    this.getClasseServico();
    this.getPrecoViagens();
    // this.getTransporteByPkClasseServico(this.formulario.value.pkClasseServico);
    
  }

  criarForm(): FormGroup{
    return this.fb.group({

      pkClasseServico: [null, [Validators.required]],
      pkTransporte: [null, [Validators.required]],
      pkRota: [null, [Validators.required]],
      preco: [null, [Validators.required]],

    })
  }

  getTransporteByPkClasseServico(pkClasseServico : any){
    this.transporteService.getAllByPkClasseServico(pkClasseServico.pkClasseServico).subscribe({
      next: (res) => {
        this.transporteList = res 
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
        
      },
      error: (err) => {
        console.log("Erro ao listar as classes")
      }
    })
  }

  // getRotas(){
  //   this.rotaService.getAll().subscribe({
  //     next: (res) => {
  //       this.rotaList = res;
  //     },
  //     error: (err) => {
  //       console.log("erro ao listar os dados")
  //     }
  //   })
  // }

  getRotas(){
    this.rotaService.getAll().subscribe({
      next: (res: Rota[]) => {
        this.rotaList = res.map( rota => ({
          value: rota.pkRota,
          label: `${rota.fkProvinciaOrigem.designacao} - ${rota.fkProvinciaDestino.designacao}` ,
          pkRota:rota.pkRota
        }))
      },
      error: (err) => {
        console.log("Erro ao listar as rotas");
      }
    })
  }

  getPrecoViagens(){
    this.precoViagemService.getAll().subscribe({
      next: (res) =>{
        // this.precoViagemList = res
        this.precoViagemList = res.map(precoViagem => ({
          ...precoViagem,
          rota: precoViagem.fkRota.fkProvinciaOrigem.designacao + ' - ' + precoViagem.fkRota.fkProvinciaDestino.designacao
        }));
      },
      error: (err) =>{
        console.log("Erro ao listar os dados")
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
      console.log("cheguei....")
      const precoViagem = {
        fkRota: {
          pkRota: this.formulario.value.pkRota.value
          
        },
        fkTransporte: {
          pkTransporte: this.formulario.value.pkTransporte.pkTransporte
        },
        preco: this.formulario.value.preco
       
      }
      console.log("PrecoViagem: " + JSON.stringify(precoViagem))
       this.precoViagemService.create(precoViagem).subscribe({
        
        next: (res) =>{
          console.log("Entrei")
          this.limparFormulario();
          this.precoViagemList = res
          this.getPrecoViagens();
          this.closeDialog();
          console.log("  preço da viagem cadastrada" + res)
        },
        error: (err) =>{
          console.log("Erro ao cadastrar os preços" + JSON.stringify(err))
        }
      })
    }

    else{
      console.log("formulario invalido" )
    }
  }

  edit(preco: PrecoViagem){
    this.precoViagemSelecionadaId = preco.pkPrecoViagem
    console.log("Meu Id da rota: " + this.precoViagemSelecionadaId)
    this.editarModal = true;
    
    const rotaSelecionada = this.rotaList.find(rota => rota.pkRota === preco.fkRota.pkRota);
    const classeServicoSelecionada = this.classeServicoList.find(classeServico => classeServico.pkClasseServico === preco.fkTransporte.fkClasseServico.pkClasseServico);
    if (!this.transporteList || this.transporteList.length === 0) {
      console.log('Lista de transporte vazia ou não carregada');
      // Se a lista estiver vazia, recarregue-a
      this.getTransporteByPkClasseServico(preco.fkTransporte.fkClasseServico);
      return;
  }

  // Localize o transporte selecionado
  const transporteSelecionado = this.transporteList.find(transporte => transporte.pkTransporte === preco.fkTransporte.pkTransporte);
  if (!transporteSelecionado) {
      console.log('Transporte não encontrado na lista');
      return;
  }

    this.formulario.patchValue({
      pkClasseServico: classeServicoSelecionada,
      pkTransporte: transporteSelecionado,
      preco: preco.preco,
      pkRota: rotaSelecionada,
      

    })
    this.isDialogOpen = true;
  }

  update(){
    if (this.precoViagemSelecionadaId){
      if(this.formulario.valid){

        const precoViagem = {
          fkRota: {
            pkRota: this.formulario.value.pkRota.value
          },
          fkTransporte: {
            pkTransporte: this.formulario.value.pkTransporte.pkTransporte
          },
          preco: this.formulario.value.preco
         
        }

        this.precoViagemService.update(precoViagem, this.precoViagemSelecionadaId).subscribe({
          next: (res)=> {
            this.limparFormulario();
            //this.getRotas();
            this.getPrecoViagens();
            this.closeDialog();
            console.log("Preço ACtualizado com sucesso");
          },
          error: (err) => {
            console.log("Erro ao actualizar o preço")
          }
        })
      }
      else{
        console.log("formulário Inválido")
      }
    }
    else{
      console.log("Id Invalido: " + this.precoViagemSelecionadaId)
    }
  }

  // delete(pkPrecoViagem: any) {
  //   this.confirmationService.confirm({
  //     message: 'Tem certeza que deseja deletar?',
  //     accept: () => {
  //       this.precoViagemService.delete(pkPrecoViagem.pkPrecoViagem)
  //       .subscribe({
  //         next: () => {
  //           this.getPrecoViagens()
  //           console.log("Programação desactivada com sucesso")
  //         },
  //         error: (err) => {
  //           console.log("Erro ao desactivar a Programação: " + JSON.stringify(err))
  //         }
  //       })
  //     }
  //   })
  // }


  getControl(name: string): FormControl  {
    const control = this.formulario.get(name);
    return control as FormControl;
  }

}
