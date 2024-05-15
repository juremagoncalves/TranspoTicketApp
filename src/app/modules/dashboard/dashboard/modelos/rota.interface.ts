export interface Rota {
    pkRota: string,
    preco: number;
    
    fkTransporte: {
        pkTransporte: string;
        designacao: string;
        matricula: string;
    };
    fkProvinciaOrigem: {
        pkProvincia: string,
        designacao: string
    };
    fkProvinciaDestino: {
        pkProvincia: string;
        designacao: string
    };
    
}
