import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnChanges {

  @Input() tableData: any = [];
  @Input() columnArray: any [] = [];
  @Input() showActionButtonb: boolean  = false;
  @Input() assentoClickedOptional: boolean = false;
  @Input() totalRecords: number = 0; // Número total de registros
  @Input() rowsPerPage: number = 10; // Número de registros por página

  @Output() editClicked = new EventEmitter<any>();
  @Output() deleteClicked = new EventEmitter<any>();
  @Output() assentoClicked = new EventEmitter<any>();
  @Output() pageChanged = new EventEmitter<number>(); // Evento para emitir a página atual selecionada

  
  currentPage: number = 0; 
  filteredData: any[] = [];
 
  searchBox: string = '';

  onSearchChange(searchVal: string){
    this.filteredData = this.tableData.filter((searchData: any) => {
      const values = Object.values(searchData);
      let flag = false;
      values.forEach((val: any) => {
        if (val.toString().toLowerCase().indexOf(searchVal) > -1){
          flag = true;
          return;
        }
      });
      if(flag){
        return searchData;
      }
    })
  }

  onEditClicked(item: any){
    this.editClicked.emit(item);
  }

  ondeleteClicked(item: any){
    this.deleteClicked.emit(item)
  }

  onClicked(item: any){
    this.assentoClicked.emit(item)
  }

  ngOnChanges(changes: SimpleChanges): void {
    
    this.filteredData = this.tableData;
    this.totalRecords = this.tableData.length;
    const start = this.currentPage * this.rowsPerPage;
    const end = Math.min((this.currentPage + 1) * this.rowsPerPage, this.totalRecords); // Evitar que o índice final ultrapasse o número total de registros
    this.filteredData = this.tableData.slice(start, end);
    
  }

  getFieldValue(item: any, fieldName: string): string {
    const fieldNames = fieldName.split('.'); // Dividindo o nome do campo aninhado em um array
    let fieldValue = item;

    // Percorrendo cada campo aninhado para acessar o valor correto
    for (const field of fieldNames) {
        if (fieldValue && fieldValue[field]) {
            fieldValue = fieldValue[field];
        } else {
            return ''; // Retornar uma string vazia se o campo não existir
        }
    }

    return fieldValue;
  }

  
  onPageChange(event: any): void {
    this.currentPage = event.page - 1; 
    this.pageChanged.emit(this.currentPage);
    
  }


}