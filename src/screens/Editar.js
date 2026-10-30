import React, { useState } from 'react';
import { Tela, Titulo, Campo, Botao, Mensagem, confirmar } from '../ui';
import { chamar } from '../api';

export default function Editar({ navegar, usuario }) {
  const [nome, setNome] = useState(usuario.nome);
  const [email, setEmail] = useState(usuario.email);
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');

  async function salvar() {
    setErro('');
    setSucesso('');
    try {
      const corpo = { nome, email };
      if (senha) corpo.senha = senha;
      const dados = await chamar(`/usuarios/${usuario.id}`, { metodo: 'PUT', corpo, autenticado: true });
      setSucesso(dados.mensagem);
      setSenha('');
    } catch (e) {
      setErro(e.message);
    }
  }

  async function excluir() {
    const ok = await confirmar(`Excluir o usuário ${usuario.nome}?`);
    if (!ok) return;
    setErro('');
    try {
      await chamar(`/usuarios/${usuario.id}`, { metodo: 'DELETE', autenticado: true });
      navegar('Usuarios');
    } catch (e) {
      setErro(e.message);
    }
  }

  return (
    <Tela>
      <Titulo>Editar usuário</Titulo>
      <Campo placeholder="Nome" value={nome} onChangeText={setNome} />
      <Campo placeholder="E-mail" value={email} onChangeText={setEmail} autoCapitalize="none" />
      <Campo placeholder="Nova senha (opcional)" value={senha} onChangeText={setSenha} secureTextEntry />
      <Mensagem texto={erro} tipo="erro" />
      <Mensagem texto={sucesso} tipo="sucesso" />
      <Botao texto="Salvar alterações" onPress={salvar} />
      <Botao texto="Excluir usuário" tipo="perigo" onPress={excluir} />
      <Botao texto="Voltar" tipo="secundario" onPress={() => navegar('Usuarios')} />
    </Tela>
  );
}
