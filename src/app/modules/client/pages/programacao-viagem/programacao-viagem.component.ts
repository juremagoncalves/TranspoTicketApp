import { AppModule } from './../../../../app.module';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Programacao } from 'src/app/modules/dashboard/dashboard/modelos/programacao.interface';
import { ProgramacaoDataServiceService } from '../../services/programacao-data-service.service';
import { ProgramacaoService } from 'src/app/modules/dashboard/dashboard/services/programacao.service';
import { RotaService } from 'src/app/modules/dashboard/dashboard/services/rota.service';

@Component({
  selector: 'app-programacao-viagem',
  templateUrl: './programacao-viagem.component.html',
  styleUrls: ['./programacao-viagem.component.css']
})
export class ProgramacaoViagemComponent  implements OnInit{
  programacoesFiltradas: Programacao[] = [];
  idRota!: string;
  dataViagem!: Date;
  precos: {[key: string]: any} = {};

  constructor(private route: ActivatedRoute, 
              private programacaoDataService: ProgramacaoDataServiceService,
              private router: Router,
              private programacaoService: ProgramacaoService,
              private rotaService: RotaService,
              private location: Location
              ) { }

  ngOnInit(){
    this.route.queryParams.subscribe(params => {
      this.idRota = params['idRota'];
      this.dataViagem = params['dataViagem'];
      console.log('ID da Rota:', this.idRota);
      console.log('Data da Viagem:', this.dataViagem);
    });

    this.findAllByPkRotaByDataViagem();
    // console.log(";;;;;;;;;;")
    // this.route.paramMap.subscribe({
    //   next: (params) =>{
    //     const programacoesString = params.get('programacoes');
    //     console.log("Programacao 1: " + programacoesString)
    //     if(programacoesString){
    //       this.programacoesFiltradas = JSON.parse(programacoesString)
    //       console.log("Programacao 2: " + this.programacoesFiltradas)

    //     }
    //   }
    // })

    // this.programacaoDataService.programacoes.subscribe(programacoes => {
    //   if(this.programacoesFiltradas !== programacoes){
    //     this.programacoesFiltradas = programacoes;
    //    // this.programacaoDataService.setProgramacoes(this.programacoesFiltradas) 
    //   }
      
    //   console.log("Programacao 2, Erro está aquiv: " + JSON.stringify(this.programacoesFiltradas));
    // });
  }

  findAllByPkRotaByDataViagem(){
    this.programacaoService.findByPkRotaByDataViagem(this.idRota, this.dataViagem).subscribe({
      next: (res)=>{
        this.programacoesFiltradas = res
        this.programacoesFiltradas.forEach(programacao => {
          this.findPrecoByPkRotaAndPkTransporte(programacao.fkRota.pkRota, programacao.fkTransporte.pkTransporte);

        })
        // this.programacaoList.forEach(programacao => {
        //   console.log("RoataComp " + programacao.fkRota.pkRota)
        //   this.findPrecoByPkRotaAndPkTransporte(programacao.fkRota.pkRota, programacao.fkTransporte.pkTransporte);
        //   console.log(this.findPrecoByPkRotaAndPkTransporte(programacao.fkRota.pkRota, programacao.fkTransporte.pkTransporte))
        // });
      },
      error: (err) => {
        console.log("Erro ao buscar os dados: " + JSON.stringify(err))
      }
    })
  }

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

  continuar(item : Programacao){
    const pkTransporte = item.fkTransporte.pkTransporte
    const capacidade = item.fkTransporte.capacidade
    const preco = this.precos[item.fkRota.pkRota + '-' + item.fkTransporte.pkTransporte]; // Obtenha o preço correspondente
    // const dataViagem = this.dataViagem.toISOString().split('T')[0]; // Converta a data para um formato adequado, se necessário

    this.programacaoDataService.setPkTransporte(pkTransporte);
    this.programacaoDataService.setCapacidade(capacidade);

    console.log("Id: " + pkTransporte)
    console.log("Id: " + capacidade)
    this.router.navigate(['/cliente/selecionar-assento'], {
      queryParams: {
        idProgramacao: item.pkProgramacao, // ID da programação selecionada
        // idRota: this.idRota, // ID da rota
        preco: preco, // Preço correspondente
        
      }
    });
  }

  voltar(): void {
    this.location.back();
  }
}
