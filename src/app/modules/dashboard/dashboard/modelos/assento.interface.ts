export enum EstadoAssento{
    INATIVO,
    RESERVADO ,
    DISPONIVEL 

}
export interface Assento{
    pkAssento: string;
    numeroAssento: string;
    estado:EstadoAssento;
    fkTransporte: {
        pkTransporte: string;
        matricula: string;
        capacidade: number
        fkMarca: {
            pkMarca: string;
            designacao: string
        }
    }
}