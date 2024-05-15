import { ProgramacaoService } from './../../services/programacao.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Rota } from '../../modelos/rota.interface';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Programacao } from '../../modelos/programacao.interface';
import { ConfirmationService } from 'primeng/api';
import { RotaService } from '../../services/rota.service';
import { TransporteService } from '../../services/transporte.service';
import { Transporte } from '../../modelos/transporte.interface';

@Component({
  selector: 'app-programacao',
  templateUrl: './programacao.component.html',
  styleUrls: ['./programacao.component.css']
})
export class ProgramacaoComponent implements OnInit{

  rotaList: any[] = [];
  programacaoList: Programacao[] = [];
  formulario!: FormGroup;
  isDialogOpen = false;
  programacaoSelecionadaId!: string;
  editarModal: boolean = false;
  transporteList: Transporte[] = [];
  precos: {[key: string]: any} = {};

 

  constructor(
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private rotaService: RotaService,
    private programacaoService: ProgramacaoService,
    private transporteService: TransporteService,
  ){}

    ngOnInit(): void {
      this.formulario = this.criarForm();
      this.getProgramacao();
      this.getRota()
      this.getTransporte();
    }

    criarForm(): FormGroup{
      return this.fb.group({
        pkRota: [null, [Validators.required]],
        pkTransporte: [Validators.required],
        horaChegada: [null, [Validators.required]],
        horaPartida: [null, [Validators.required]],
        dataViagem: [null, [Validators.required]],
        
       

      })
    }

    getProgramacao(){
      this.programacaoService.getAll().subscribe({
        next: (res) => {
          this.programacaoList = res;
          this.programacaoList.forEach(programacao => {
            console.log("RoataComp " + programacao.fkRota.pkRota)
            this.findPrecoByPkRotaAndPkTransporte(programacao.fkRota.pkRota, programacao.fkTransporte.pkTransporte);
            console.log(this.findPrecoByPkRotaAndPkTransporte(programacao.fkRota.pkRota, programacao.fkTransporte.pkTransporte))
          });
        },
        error: (err) => {
          console.log("Erro ao listar as programações" + JSON.stringify(err));
        }
      })
    }

    getRota(){
      this.rotaService.getAll().subscribe({
        next: (res: Rota[]) => {
          this.rotaList = res.map( rota => ({
            value: rota.pkRota,
            label: `${rota.fkProvinciaOrigem.designacao} - ${rota.fkProvinciaDestino.designacao}` 
          }))
        },
        error: (err) => {
          console.log("Erro ao listar as rotas");
        }
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

    // findPrecoByPkRotaAndPkTransporte(pkRota: string, pkTransporte: string){
    //   this.rotaService.findPrecoByRotaAndTransporte(pkRota, pkTransporte).subscribe({
    //     next: (res) => {
    //       this.precos[`${pkRota}-${pkTransporte}`] = res;
    //       console.log(res)
    //     },
    //     error: (err) =>{
    //       console.log("Erro ao buscar o preco")
    //     }
    //   })
    // }

    findPrecoByPkRotaAndPkTransporte(pkRota: string, pkTransporte: string) {
      let preco: number = 0;
      this.rotaService.findPrecoByRotaAndTransporte(pkRota, pkTransporte).subscribe({
        next: (res) => {
          this.precos[`${pkRota}-${pkTransporte}`] = res;
        },
        error: (err) => {
          console.log("Erro ao buscar o preco");
        }
      });
     
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

    ////////////////////////////////
    
    onSubmit1(){
      alert("ola")
      console.log("entrei aqui na programacao")
      if(this.formulario.valid){
  
        const programacao = {
          horaChegada: this.formulario.value.horaChegada,
          horaPartida: this.formulario.value.horaPartida,
          dataViagem: this.formulario.value.dataViagem,
          fkRota: {
            pkRota: 
              this.formulario.value.pkRota.value
            
          },
          fkTransporte: {
            pkTransporte: this.formulario.value.pkTransporte.pkTransporte
          }
         
        }
        
        console.log("Rota: " + JSON.stringify(programacao))
         this.programacaoService.create(programacao).subscribe({
          next: (res) =>{
            this.limparFormulario();
            this.getProgramacao();
            this.closeDialog();
            console.log("Programacao cadastrada" + res)
          },
          error: (err) =>{
            console.log("Erro ao cadastrar a Programacao" + JSON.stringify(err))
          }
        })
      }
  
      else{
        console.log("formulario invalido" )
      }
    }
  
    /////////////////////////////////////////

    edit(programacao: Programacao){

      this.programacaoSelecionadaId = programacao.pkProgramacao
      this.editarModal = true;
      const rotaSelecionada = this.rotaList.find(rota => rota.value === programacao.fkRota.pkRota);
      const transporteSelecionado = this.transporteList.find(transporte => transporte.pkTransporte === programacao.fkTransporte.pkTransporte);
      console.log("A rota: " + rotaSelecionada)
     
      // const rotaSelecionada = this.rotaList.find(rota => {
      //   return rota.fkProvinciaOrigem && rota.fkProvinciaDestino &&
      //          `${rota.fkProvinciaOrigem.designacao} - ${rota.fkProvinciaDestino.designacao}` ===
      //          `${programacao.fkRota.fkProvinciaOrigem.designacao} - ${programacao.fkRota.fkProvinciaDestino.designacao}`;
      // });

      this.formulario.patchValue({
        horaChegada: programacao.horaChegada,
        horaPartida: programacao.horaPartida,
        // dataViagem:new Date( programacao.dataViagem),
        dataViagem: programacao.dataViagem,
        pkRota: rotaSelecionada,
        pkTransporte:transporteSelecionado
        
        
      });
      
      this.isDialogOpen = true;
    }

    update(){
      if (this.programacaoSelecionadaId){
        if(this.formulario.valid){
  
          const programacao = {
            horaChegada: this.formulario.value.horaChegada,
            horaPartida: this.formulario.value.horaPartida,
            dataViagem: this.formulario.value.dataViagem,
            fkRota: {
              pkRota: this.formulario.value.pkRota.value
            },
            fkTransporte: {
              pkTransporte: this.formulario.value.pkTransporte.pkTransporte
            }
           
          }
  
          this.programacaoService.update(programacao, this.programacaoSelecionadaId).subscribe({
            next: (res)=> {
              this.limparFormulario();
              this.getProgramacao();
              this.closeDialog();
              console.log("Programação ACtualizada com sucesso");
            },
            error: (err) => {
              console.log("Erro ao actualizar a Programação")
            }
          })
        }
        else{
          console.log("formulário Inválido")
        }
      }
      else{
        console.log("Id Invalido: " + this.programacaoSelecionadaId)
      }
    }

    delete(pkProgramacao: any) {
      this.confirmationService.confirm({
        message: 'Tem certeza que deseja deletar?',
        accept: () => {
          this.programacaoService.delete(pkProgramacao.pkProgramacao)
          .subscribe({
            next: () => {
              this.getProgramacao()
              console.log("Programação desactivada com sucesso")
            },
            error: (err) => {
              console.log("Erro ao desactivar a Programação: " + JSON.stringify(err))
            }
          })
        }
      })
    }

    getControl(name: string): FormControl  {
      const control = this.formulario.get(name);
      return control as FormControl;
    }
}
