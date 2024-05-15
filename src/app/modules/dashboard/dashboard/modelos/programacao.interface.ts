export interface Programacao{
    pkProgramacao: string
    diaSemana: string;
    horaChegada: string;
    horaPartida: string;
    dataViagem: Date;
    fkRota: {
        pkRota: string;
        // preco: number;
        // fkTransporte: {
        //     pkTransporte: string;
        //     matricula: string;
        //     capacidade: number;
        //     fkMarca:{
        //         designacao: string;
        //     }
        // };

        fkProvinciaOrigem: {
            pkProvincia: string;
            designacao: string;
        };

        fkProvinciaDestino: {
            pkProvincia: string;
            designacao: string;
        }
    }
    fkTransporte: {
        pkTransporte: string;
            matricula: string;
            capacidade: number;
            fkMarca:{
                designacao: string;
            }
            fkClasseServico:{
                pkClasseServico: string;
                designacao: string
            }
    }
     
}