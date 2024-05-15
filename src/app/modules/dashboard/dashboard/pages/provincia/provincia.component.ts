import { ProvinciaService } from './../../services/provincia.service';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Provincia } from '../../modelos/provincia.interface';

// interface UploadEvent {
//   originalEvent: Event;
//   files: File[];
// }
@Component({
  selector: 'app-provincia',
  templateUrl: './provincia.component.html',
  styleUrls: ['./provincia.component.css'],
  providers: [MessageService]
})
export class ProvinciaComponent implements OnInit{


  uploadedFiles: any[] = [];
  provinciaList: Provincia[] = [];

  // uploadedFileUrl: string | undefined;

  constructor(
    private provinciaService: ProvinciaService, 
    private messageService: MessageService)
    {}

  columnArray: any[] = [
    {header: 'Descrição', fieldName: 'designacao', dataType: 'string'},
    // {header: 'Ação', fieldName: 'Ação', dataType: 'string'}
  ];

  ngOnInit(){
    this.getList();
  }

  getList(){
    this.provinciaService.getAll().subscribe({
      next: (res) =>{
        this.provinciaList = res
        console.log("provincias " + JSON.stringify(res))
      },
      error: (err)=> {
        console.log("Erro ao listar os dados" + err)
      }
    })
  }

  onUpload(event: any) {

    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
    this.getList();
    this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: 'Sucesso'}); 
    
  }

  onError(event: any) {
    this.getList();
    console.log('Erro durante o upload:', event);
    this.messageService.add({severity: 'error', summary: 'File Upload Error', detail: 'Erro ao enviar o arquivo'});
  }
  
}
