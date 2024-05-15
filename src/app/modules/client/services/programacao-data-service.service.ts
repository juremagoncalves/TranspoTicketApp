import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Programacao } from '../../dashboard/dashboard/modelos/programacao.interface';
import { Assento } from '../../dashboard/dashboard/modelos/assento.interface';

@Injectable({
  providedIn: 'root'
})
export class ProgramacaoDataServiceService {

  
  private programacoesSource = new BehaviorSubject<Programacao[]>([]);
  programacoes = this.programacoesSource.asObservable();

  private pkTransporteSource = new BehaviorSubject<string>('');
  pkTransporte = this.pkTransporteSource.asObservable();

  private capacidadeSource = new BehaviorSubject<number>(0);
  capacidade = this.capacidadeSource.asObservable();

  private timerSource = new BehaviorSubject<number>(0);
  timer = this.timerSource.asObservable();

  private pkPedidoSource = new BehaviorSubject<string>("");
  pkPedido = this.pkPedidoSource.asObservable();

  private assentosSelecionadosSource = new BehaviorSubject<Assento[]>([]);
  ssentosSelecionados = this.assentosSelecionadosSource.asObservable();

  private tipoPagamentoSelecionadoSource = new BehaviorSubject<string>("");
  tipoPagamento = this.tipoPagamentoSelecionadoSource.asObservable();

  private localStorageKey = 'programacaoData';
  constructor() { 
    this.loadFromLocalStorage();
  }

  setProgramacoes(programacoes: Programacao[]) {
    this.programacoesSource.next(programacoes);
    this.saveToLocalStorage();
  }

  setPkTransporte(pkTransporte: string) {
    this.pkTransporteSource.next(pkTransporte);
    this.saveToLocalStorage();
  }

  setCapacidade(capacidade: number) {
    this.capacidadeSource.next(capacidade);
    this.saveToLocalStorage();
  }

  setTimer(timer: number) {
    this.timerSource.next(timer);
    this.saveToLocalStorage();
  }

  setPkPedido(pkPedido: string) {
    this.pkPedidoSource.next(pkPedido)
    this.saveToLocalStorage();
  }

  setAssentosSelecionados(assento: Assento[]){
    this.assentosSelecionadosSource.next(assento)
    this.saveToLocalStorage();
  }

  setTipoPagamento(tipoPagamentoSelecionado: string) {
    this.tipoPagamentoSelecionadoSource.next(tipoPagamentoSelecionado);
    this.saveToLocalStorage();
  }

  getProgramacoes(): Programacao[] {
    return this.programacoesSource.value;
  }
  getPkTransporte(): string {
    return this.pkTransporteSource.value;
  }

  getCapacidade(): number {
    return this.capacidadeSource.value;
  }

  getTimer(): number {
    return this.timerSource.value;
  }

  getPkPedido(): string {
    return this.pkPedidoSource.value;
  }

  getAssentosSelecionados():Assento[]{
    return this.assentosSelecionadosSource.value
  }

  getTipoPagamento(): string {
    return this.tipoPagamentoSelecionadoSource.value
  }

  private saveToLocalStorage() {
    const data = {
      programacoes: this.programacoesSource.value,
      pkTransporte: this.pkTransporteSource.value,
      capacidade: this.capacidadeSource.value,
      pkPedido: this.pkPedidoSource.value,
      assentos: this.assentosSelecionadosSource.value,
      timer: this.timerSource.value,
      tipoPagamentoSelecionado: this.tipoPagamentoSelecionadoSource.value
    };
    localStorage.setItem(this.localStorageKey, JSON.stringify(data));
  }

  private loadFromLocalStorage() {
    const dataString = localStorage.getItem(this.localStorageKey);
    if (dataString) {
      const data = JSON.parse(dataString);
      this.programacoesSource.next(data.programacoes || []);
      this.pkTransporteSource.next(data.pkTransporte || '');
      this.capacidadeSource.next(data.capacidade || 0);
      this.pkPedidoSource.next(data.pkPedido || '')
      this.assentosSelecionadosSource.next(data.assentos || []);
      this.timerSource.next(data.timer || 0);
      this.tipoPagamentoSelecionadoSource.next(data.tipoPagamentoSelecionado || "")
    }
  }


  private isDialogOpenSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isDialogOpen$: Observable<boolean> = this.isDialogOpenSubject.asObservable();

  public openDialog(): void {
    this.isDialogOpenSubject.next(true);
  }

  public closeDialog(): void {
    this.isDialogOpenSubject.next(false);
  }

}
