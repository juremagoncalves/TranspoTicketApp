export enum EstadoPedido{
    PENDENTE,
    CANCELADO,
    REJEITADO,
    Concluido,
}

export interface Pedido{
    pkPedido: string,

    programacao:{
        pkProgramacao: string,
        fkRota: {
            fkProvinciaOrigem:{
                designacao:string
            }
            fkProvinciaDestino:{
                designacao:string
            },
            
            preco:number
            
        },
        fkTransporte: {
            pkTransporte: string,
            matricula: string,
            fkClasseServico: {
                designacao: string
            }
        }
        
        diaSemana: string;
        dataViagem: Date
        horaChegada: string;
        horaPartida: string;
    }
    user:{
        pkUser: string;
    }

    estadoPedido: EstadoPedido;
    totalPago: number;
    referencia: string;
    dataExpiracao: Date
    entidade: string;

}