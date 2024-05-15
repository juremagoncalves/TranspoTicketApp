import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
//import html2pdf from 'html2pdf.js';
// import  'html2pdf.js';
// import html2pdf from 'html2pdf.js'; 
import {jsPDF} from 'jspdf' 
import { ActivatedRoute } from '@angular/router';
import { ProgramacaoDataServiceService } from '../../services/programacao-data-service.service';
import { Subscription } from 'rxjs';
import { BilheteService } from '../../services/bilhete.service';
import { Bilhete } from 'src/app/modules/dashboard/dashboard/modelos/bilhete.interface';
import { Assento } from 'src/app/modules/dashboard/dashboard/modelos/assento.interface';
import { AssentoService } from 'src/app/modules/dashboard/dashboard/services/assento.service';

@Component({
  selector: 'app-bilhete',
  templateUrl: './bilhete.component.html',
  styleUrls: ['./bilhete.component.css']
})
export class BilheteComponent implements OnInit {

  isDialogOpen = false
  dialogSubscription!: Subscription;
  bilheteLista: Bilhete[] = []
  bilheteListaUser: Bilhete[] = []
  loading = false
  usuarioId: string | null = null;
  assentos: Assento[] = []
  //@ViewChild('dialog') dialog: Dialog;
  @ViewChild('dialogContent', {static:false}) dialogContent!: ElementRef;

  constructor(private route: ActivatedRoute,
     public programacaoDataService: ProgramacaoDataServiceService,
     private bilheteService: BilheteService,
     private assentoService: AssentoService
     ){
      this.usuarioId = localStorage.getItem('pkUsuario');
     }

     columnArray: any[] = [
      // {header: 'Transporte', fieldName: 'fkTransporte.matricula | fkTransporte.fkMarca.designacao', dataType: 'string'},
      {header: 'Nome', fieldName: 'pedido.user.fkPessoa.nome', dataType: 'string'},
      {header: 'Referência', fieldName: 'codigo', dataType: 'string'},
      {header: 'Origem', fieldName: 'pedido.programacao.fkRota.fkProvinciaOrigem.designacao', dataType: 'string'},
      {header: 'Destino', fieldName: 'pedido.programacao.fkRota.fkProvinciaDestino.designacao', dataType: 'string'},
      {header: 'Data', fieldName: 'pedido.programacao.dataViagem', dataType: 'string'}
    ];

  ngOnInit(): void {
    // this.getBilheteByPkPedido()
    this.dialogSubscription = this.programacaoDataService.isDialogOpen$.subscribe(open => {
      this.isDialogOpen = open;
      this.getBilhetesByPkUser();
      
    });

    this.route.params.subscribe(params => {
      const pkPedido = params['idPedido'];
      console.log("id do pedido" + pkPedido)
      this.getBilheteByPkPedido(pkPedido);
      this.assentoService.findAssentoByPkPedido(pkPedido).subscribe({
        next: (res) => {
          this.assentos = res;
          console.log("Meus assentos")
          console.log(this.assentos[0].numeroAssento)

        }
      })
    })
  }

  generatePDF(){
    const dialogContent = this.dialogContent.nativeElement;
    dialogContent.style.padding = '10px';
    // dialogContent.style.margin = '10px';
    let pdf = new jsPDF('p', 'pt', 'a4')
    
    pdf.html(dialogContent, {
      callback: (pdf) =>{
        pdf.save("bilhete.pdf")
      }
    })
  }
  // generatePDF() {
  //   // const dialogContent = this.dialogContent.nativeElement;
  // //   console.log("entrei aqui")
  // //   html2pdf()
  // //     .from(dialogContent)
  // //     .outputPdf('dataurlnewwindow')
  // //     .save();
  //  }

  getBilhetesByPkUser(){
    this.bilheteService.getBileteByUserId(this.usuarioId|| '').subscribe({
      next:(res) => {
        this.bilheteListaUser = res;
        console.log("11111111")
        console.log(res[0].pedido.programacao.fkTransporte.fkClasseServico.designacao)
      },
      error:(err) =>{
        console.log(err)
      }
    })
  }


  ngOnDestroy(): void {
    // Não se esqueça de cancelar a inscrição para evitar vazamentos de memória
    this.dialogSubscription.unsubscribe();
  }
  closeDialog(): void {
    // Fecha o diálogo
    this.programacaoDataService.closeDialog()
    // this.programacaoDataService.isDialogOpen$
  }

  getBilheteByPkPedido(pkPedido:string){
    this.bilheteService.getBilheteByPkPedido(pkPedido).subscribe({
      next:(res) =>{
        // res[0].pedido.totalPago
        this.loading = true
        this.bilheteLista = res
        console.log(res)
      },

      error:(err) =>{
        console.log(JSON.stringify(err))
      }
    })
  }

}
