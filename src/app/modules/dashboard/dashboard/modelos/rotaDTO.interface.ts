export interface RotaDTO{
    rota:{
   
    fkProvinciaOrigem: {
        pkProvincia: string,
        designacao: string
    };
    fkProvinciaDestino: {
        pkProvincia: string;
        designacao: string
    };
    },

    fkTransporte: {
        pkTransporte: string;
        designacao: string;
        matricula: string;
    };
    precoViagem: {
        preco:number
    };

}