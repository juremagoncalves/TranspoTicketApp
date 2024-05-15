import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { UploadEvent } from 'primeng/fileupload';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { endpoints } from 'src/app/endpoints/endpoints';
import { Provincia } from '../modelos/provincia.interface';


@Injectable({
  providedIn: 'root'
})
export class ProvinciaService {
  
  constructor(private http: HttpClient) { }

  // upload(files: Set<File>): Observable<any>{
  //   console.log("kkkkkkPPP: " )

  //   const formData = new FormData();
  //   files.forEach(file => formData.append('file', file))
  //   console.log("kkkkkkPPP: " + formData)
  //   return this.http.post<any>(endpoints.createProvincia, formData)

  // }

  // onUpload(event:UploadEvent) {
  //   for(let file of event.files) {
  //       this.uploadedFiles.push(file);
  //   }
  getAll(): Observable<Provincia[]> {
    return this.http.get<Provincia[]>(endpoints.findAllProvincia);
  }

  // }


  
}

