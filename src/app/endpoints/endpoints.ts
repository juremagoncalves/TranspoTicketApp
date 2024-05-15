
import { find } from "highcharts";
import { environment } from "src/environments/environment.development";

export const endpoints = {
    // Classe de sevico
    createClasseServico: `${environment.apiUrl}classeServico/`,
    updateClasseServico: `${environment.apiUrl}classeServico/update`,
    deleteClasseServico: `${environment.apiUrl}classeServico`,
    findAllClasseServico: `${environment.apiUrl}classeServico`,
    findByIdClasseServico: `${environment.apiUrl}classeServico/findById`,
    // Tipo de transporte
    createTipoTransporte: `${environment.apiUrl}tipoTransporte/`,
    updateTipoTransporte: `${environment.apiUrl}tipoTransporte/update`,
    deleteTipoTransporte: `${environment.apiUrl}tipoTransporte`,
    findAllTipoTransporte: `${environment.apiUrl}tipoTransporte`,
    findByIdTipoTransporte: `${environment.apiUrl}tipoTransporte/findById`,
    // Transporte
    createTransporte: `${environment.apiUrl}transporte/`,
    updateTransporte: `${environment.apiUrl}transporte/update`,
    deleteTransporte: `${environment.apiUrl}transporte`,
    findAllTransporte: `${environment.apiUrl}transporte`,
    findAllTransporteByPkClasseServico: `${environment.apiUrl}transporte/findByPkClasseServico`,
    findByIdTransporte: `${environment.apiUrl}transporte/findById`,
    
    //Provincia
    createProvincia: `${environment.apiUrl}provincia/`,
    findAllProvincia: `${environment.apiUrl}provincia`,
    //Rota
    createRota: `${environment.apiUrl}rota/`,
    updateRota: `${environment.apiUrl}rota/update`,
    deleteRota: `${environment.apiUrl}rota`,
    findAllRota: `${environment.apiUrl}rota`,
    findByIdRota: `${environment.apiUrl}rota/findById`,
    findAllRotawithPreco: `${environment.apiUrl}rota/getAllRotas`,
    findPrecoByRotaAndTransporte: `${environment.apiUrl}preco`,

    //Programação
    createProgramacao: `${environment.apiUrl}programacao/`,
    updateProgramacao: `${environment.apiUrl}programacao/update`,
    deleteProgramacao: `${environment.apiUrl}programacao`,
    findAllProgramacao: `${environment.apiUrl}programacao`,
    findByIdProgramacao: `${environment.apiUrl}programacao/findById`,
    findByPkRotaByDataViagem: `${environment.apiUrl}programacao`,
    

    //Assento
    findAssentoByPkTransporte: `${environment.apiUrl}assento/findByPkTransporte`,
    updateSeatState: `${environment.apiUrl}assento`,
    getAssentoByPkPedido: `${environment.apiUrl}pedidoAssento`,
    

    //Reserva Assento Tempor]ario
    findAllReservaAssentoTemporario: `${environment.apiUrl}reservaTemporaria`,
    deleteReservaAssentoTemporario: `${environment.apiUrl}reservaTemporaria/`,

    // RESERVA OU PEDIDO
    createPedido: `${environment.apiUrl}pedido/`,
    getPedidoById: `${environment.apiUrl}pedido/getPedidoById`,
    getDataExpiracao:`${environment.apiUrl}pedido/`,

    //pagamento
    createPagamento: `${environment.apiUrl}pagamento/`,

    //BILHETE
    getBilheteByPkPedido: `${environment.apiUrl}bilhete/`,
    getBilheteByUserId: `${environment.apiUrl}bilhete/user`,
    
    

    //Preco Viagem
    createPrecoViagem:`${environment.apiUrl}preco/`,
    updatePrecoViagem: `${environment.apiUrl}preco/update`,
    findAllPrecoViagem: `${environment.apiUrl}preco`


}