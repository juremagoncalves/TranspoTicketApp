
export interface ReservaTemporaria{
    pkReservaAssentoTemporaria: string;
    assento:{
        pkAssento: string;
        numeroAssento: string;
    }
    user:{
        pkUsuario:string;
    } 
}