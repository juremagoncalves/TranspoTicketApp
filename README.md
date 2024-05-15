# TranspoTicketApp
 
## Descrição

TranspoTicketApp é um Sistema de reserva de Bilhete para Empresa de transporte Terrestre. Este Sistema foi desenvolvido usando o angular 16.0.0 e fornece uma plataforma para os usários reservarem seus bilhetes para as suas viagens. Ele inclui  recursos de login de usuários, pesquisa de rotas com base numa data de viagem, seleção de assentos em tempo real, pagamento e geração de bilhetes.

## Instalação e Execução

1 Clone este repositório para o seu computador.
2 Certifique-se de ter o Node 20  e o Angular 16 instalados em seu sistema.
3 No diretório do projeto, execute `npm install` para instalar as dependências.
4 Em seguida, execute `ng serve` para iniciar o servidor de desenvolvimento. Acesse `http://localhost:4200/` em seu navegador para visualizar o projeto.

## Como Usar o Sistema

O projecto possui dois módulos, cliente e admin

Acessando o sistema como usuário admin:
1 - Fazer login com as seguintes credenciais: email: juremagonacalves@gmail.com, senha: juremagoncalves007
2 - Após o login se a credincial for válida, vai ser redirecionado para o painel administrativo para fazer gestão de rotas, transportes, e programações de viagens.

Acessando como usuário cliente:

1 - Fazer Login caso ja tenha uma conta

2 - Vai ser apresentado  página home do cliente, seleciona a rota e uma data de viagem e clica no botão Procurar. Rota Luanda-Benguela tem a programação para o dia 25-05-24

3 - Selecionar a programação desejada e clicar em Continuar.

4 - Na página de seleção de assentos, no item Reserva de lugares, clica no botão "Selecione o teu lugar", vai abrir uma modal com os assentos do transporte da programação selecionada no passo 3, escolha o lugar de sua preferência e clique em continuar.

5 - Selecione o tipo de pagamento e clica em Pagar para poder fazer o seu pedido do assento selecionado. 

6 -  Visualizar os dados do pedido para confirmar os dados, clique em Pagar Agora para prosseguir com a reserva. Vai abrir uma modal com os dados do bilhete em seguida pode fazer Download do bilhete no formato pdf.

OBS: O passo 4, 5 e 5, deve se estar atento ao timer, é colocado um tempo desde para realizar a rserva de bilhete, caso não consigas reservar o bilhete a tempo, o assento selecionado , passa a estar novamente disponível para outros usuários.

7 - Pode se usar dois clientes para visualizar a programação em tempo real que acontece sempre que um assento muda de estado.


