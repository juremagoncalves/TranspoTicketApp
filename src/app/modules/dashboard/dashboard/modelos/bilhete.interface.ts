export interface Bilhete{
    pedido:{
        pkPedido: string;
        programacao:{
            diaSemana:string,
            horaChegada:string,
            horaPartida: string,
            dataViagem: string,
            fkRota: {
                fkProvinciaOrigem:{
                    designacao: string
                }
                fkProvinciaDestino:{
                    designacao: string
                }
            },
            fkTransporte: {
                pkTransporte: string,
                matricula: string,
                fkClasseServico: {
                    designacao: string
                }
            }
        },
        user:{
            fkPessoa:{
                nome:string
            }
        },
        referencia: String,
        totalPago:number,
        estadoPedido: any
    }
    codigo: string;
}