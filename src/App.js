//Importa a função useState da biblioteca do React, além do app.css
import { useState } from "react";
import "./app.css";

export default function App() {
  //States usadas
  const [pessoa, setPessoa] = useState([]);
  const [transacao, setTransacao] = useState([]);
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [descricao, setDescricao] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [tipo, setTipo] = useState("despesa");
  const [pessoaID, setPessoaID] = useState("");

  //Adicionar uma nova pessoa
  const adicionarPessoa = () => {
    //Verifica se o nome e a idade não estão vazias
    if (!nome || !idade) return;
    //Verifica se a idade é >= 0
    if(idade < 0){
      alert('Insira uma idade válida!');
      setIdade('');
      return;
    }
    //Cria um objeto armazenando um ID, nome e idade
    const novaPessoa = {
      id: pessoa.length + 1,
      nome: nome,
      idade: parseInt(idade),
    };
    //Adiciona a novaPessoa na lista de pessoas, além de limpar os campos de nome e idade
    setPessoa([...pessoa, novaPessoa]);
    setNome("");
    setIdade("");
  };

  //Excluir uma pessoa, a partir de seu ID, além de remover as transações feitas por ela anteriormente
  const excluirPessoa = (id) => {
    setPessoa(pessoa.filter((p) => p.id !== id));
    setTransacao(transacao.filter((t) => t.pessoaID !== id));
  };

  //Adicionar uma transação
  const adicionarTransacao = () => {
    //Verifica se a descrição, quantidade, e ID da pessoa não é vazia
    if (!descricao || !quantidade || !pessoaID) return;
    const pessoaEncontrada = pessoa.find((p) => p.id === parseInt(pessoaID));
    //Verifica se a pessoa foi encontrada
    if (!pessoaEncontrada) return;
    //Caso a pessoa seja menor de 18 anos, ela poderá ter apenas despesas
    if (pessoaEncontrada.idade < 18 && tipo !== "despesa"){
      alert('Menores de 18 anos podem ter apenas despesas!');
      setDescricao('');
      setQuantidade('');
      return;
    }
     //Cria um objeto para a transação armazenando um ID, descrição, quantidade, tipo e o ID da pessoa  
    const novaTransacao = {
      id: transacao.length + 1,
      descricao: descricao,
      quantidade: parseFloat(quantidade),
      tipo: tipo,
      pessoaID: parseInt(pessoaID),
    };
    //Adiciona a novaTransacao na lista de transações, além de limpar os campos de descrição e quantidade
    setTransacao([...transacao, novaTransacao]);
    setDescricao("");
    setQuantidade("");
    setTipo("despesa");
  };

  //Tabela que mostra receitas, despesas e também calcula o saldo
  const consultaSaldo = (id) => {
    const transacoes = transacao.filter((t) => t.pessoaID === id);
    const receitas = transacoes.filter((t) => t.tipo === "receita").reduce((sum, t) => sum + t.quantidade, 0);
    const despesas = transacoes.filter((t) => t.tipo === "despesa").reduce((sum, t) => sum + t.quantidade, 0);
    return { receitas, despesas, saldo: receitas - despesas };
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Cadastro de Pessoas</h2>
        {/*Inputs para receber nome e idade da pessoa, além de um botão para a para adiciona-la a partir da função adicionarPessoa*/}
        <input className="input" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
        <input className="input" placeholder="Idade" type="number" value={idade} onChange={(e) => setIdade(e.target.value)} />
        <button className="button" onClick={adicionarPessoa}>Adicionar Pessoa</button>
        {/*Tabela para exibir as pessoas cadastradas, mostrando seu ID, nome, idade e um campo com botão de deletar*/}
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Idade</th>
              <th>Ações</th>
            </tr>
          </thead>
          {/*Mapear o array pessoa e criar uma linha para cada*/}
          <tbody>
            {pessoa.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.nome}</td>
                <td>{p.idade}</td>
                <td>
                  {/*Botão para excluir alguma pessoa, a partir da função excluirPessoa*/}
                  <button className="button" onClick={() => excluirPessoa(p.id)}>Deletar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card">
        <h2>Cadastro de Transações</h2>
        {/*Inputs para receber a descrição e valor da transação, além do seu tipo(despesa ou receita) e também selecionar a pessoa que realizará a transação.*/}
        <input className="input" placeholder="Descrição" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
        <input className="input" placeholder="Valor" type="number" value={quantidade} onChange={(e) => setQuantidade(e.target.value)} />
        <select className="input" value={tipo} onChange={(e) => setTipo(e.target.value)}>
          <option value="despesa">Despesa</option>
          <option value="receita">Receita</option>
        </select>
        <select className="input" value={pessoaID} onChange={(e) => setPessoaID(e.target.value)}>
          <option value="">Selecione uma pessoa</option>
          {pessoa.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nome}
            </option>
          ))}
        </select>
        {/*Botão que adiciona a transação, a partir da função adicionarTransacao*/}
        <button className="button" onClick={adicionarTransacao}>Adicionar Transação</button>
      </div>

      <div className="card">
        <h2>Consulta de Totais</h2>
        {/*Tabela para exibir as transações, exibindo em linha o nome da pessoa que realizou, suas receitas, suas despesas, e seu saldo.*/}
        <table className="table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Receitas</th>
              <th>Despesas</th>
              <th>Saldo</th>
            </tr>
          </thead>
          <tbody>
            {/*Mapear o array pessoa e calcular seu saldo (Receitas-Despesas)*/}
            {pessoa.map((p) => {
              const totals = consultaSaldo(p.id);
              return (
                <tr key={p.id}>
                  <td>{p.nome}</td>
                  <td>{totals.receitas}</td>
                  <td>{totals.despesas}</td>
                  <td>{totals.saldo}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
