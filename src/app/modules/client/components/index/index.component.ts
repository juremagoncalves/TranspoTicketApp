import { ProgramacaoDataServiceService } from './../../services/programacao-data-service.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Programacao } from 'src/app/modules/dashboard/dashboard/modelos/programacao.interface';
import { Rota } from 'src/app/modules/dashboard/dashboard/modelos/rota.interface';
import { ProgramacaoService } from 'src/app/modules/dashboard/dashboard/services/programacao.service';
import { RotaService } from 'src/app/modules/dashboard/dashboard/services/rota.service';
// import { faHelp, faTicket } from '@fortawesome/free-solid-svg-icons';
import { faTicket } from '@fortawesome/free-solid-svg-icons';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit{

  faTicket = faTicket;
  faQuestionCircle = faQuestionCircle;
  rotaList: any[] = [];
  programacao: Programacao[] = [];
  formulario!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private rotaService: RotaService,
    private programacaoService: ProgramacaoService,
    private router: Router,
    private programacaoDataService: ProgramacaoDataServiceService,
  ){}

  ngOnInit(): void {
    this.formulario = this.criarForm();
    // this.getProgramacao();
    this.getRota()
  }

  criarForm(): FormGroup{
    return this.fb.group({
      dataViagem: [null, [Validators.required]],
      pkRota: [null, [Validators.required]],
     

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

  procurar(){
    console.log("..........")
    const pkRota = this.formulario.value.pkRota.value;
    console.log("A chave da Rota: " + pkRota)
    const dataViagem = this.formulario.value.dataViagem;

    if (!pkRota || !dataViagem) {
      console.log('Por favor, selecione a rota e a data de viagem.');
      return;
    }
    // const formattedDate = dataViagem.toISOString().split('T')[0];
    this.programacaoService.findByPkRotaByDataViagem(pkRota, dataViagem).subscribe({
      next:(res) =>{
        console.log("Viagem " + JSON.stringify(res))
        this.programacaoDataService.setProgramacoes(res);
        console.log(res)
        this.router.navigate(['/cliente/programacao'], {
          queryParams: { idRota: pkRota, dataViagem: dataViagem }
        });
        // this.router.navigate(['/cliente/programacao']);
        //  this.router.navigate(['/cliente/programacao'],{state: {programacoes: res}})
      },
      error: (err)=> {
        alert("Não existe programação para esta data")
        console.log("Erro ao procurar " + JSON.stringify(err))
      }
    })
  }

  getControl(name: string): FormControl {
    const control = this.formulario.get(name);
    return control as FormControl;
  }
}


