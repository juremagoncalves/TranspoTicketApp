
export interface Transporte {
    pkTransporte: string,
    matricula: string;
    fkTipoTransporte: {
        pkTipoTransporte: string;
        designacao: string
    };
    fkMarca: {
        pkMarca: string,
        designacao: string
    };
    fkClasseServico: {
        pkClasseServico: string;
        designacao: string
    };
    capacidade: number;
}
