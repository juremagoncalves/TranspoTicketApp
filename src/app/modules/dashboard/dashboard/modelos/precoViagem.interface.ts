export interface PrecoViagem{
    pkPrecoViagem: string;
    preco: number;
    fkTransporte: {
        pkTransporte: string;
        matricula: string;
        fkClasseServico: {
            designacao: string
            pkClasseServico:string
        }
    }
    fkRota: {
        pkRota: string;
        fkProvinciaOrigem:{
            designacao: string
        }
        fkProvinciaDestino: {
            designacao: string;
        }
    }
}