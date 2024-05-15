import { Assento } from "./assento.interface";


export interface PedidoDTO{
    pkUser: string,
    pkProgramacao: string;
    entidade: string;
    totalPago: number,
    assentosSelecionados:Assento[]
}