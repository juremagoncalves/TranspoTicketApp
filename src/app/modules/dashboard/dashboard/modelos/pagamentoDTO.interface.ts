
export enum TipoPagamento {
    REFERENCIA = 'REFERENCIA',
    TRANSFERENCIABANCARIA = 'TRANSFERENCIABANCARIA'
  }

export interface PagamentoDTO{
    referencia: string,
    totalPago:number,
    tipoPagamento: string
}