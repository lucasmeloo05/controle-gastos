Gerenciador de Pessoas e Transações

Este é um projeto em ReactJS que permite o cadastro de pessoas e a realização de transações (despesas e receitas) associadas a essas pessoas. O projeto também realiza consultas para exibir o saldo total de cada pessoa.

Funcionalidades

-Cadastro de Pessoas: Permite adicionar e excluir pessoas.

-Cadastro de Transações: Permite adicionar transações de despesas ou receitas associadas a uma pessoa.

-Consulta de Totais: Exibe o total de receitas, despesas e o saldo final de cada pessoa.

Estrutura do Código

O código atual está em um único componente App.js, que inclui:

States: Gerencia o estado de pessoas, transações e inputs dos formulários.

Funções:

-adicionarPessoa: Adiciona uma nova pessoa à lista.

-excluirPessoa: Remove uma pessoa e suas transações associadas.

-adicionarTransacao: Adiciona uma nova transação.

-consultaSaldo: Calcula o total de receitas, despesas e o saldo final.

Renderização:

-Formulário para cadastro de pessoas.
-Tabela de listagem de pessoas.
-Formulário para cadastro de transações.
-Tabela de consulta de totais.
