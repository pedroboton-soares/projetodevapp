import React, { useState } from 'react';
import { Tela, Titulo, Campo, Botao, Mensagem } from '../ui';
import { chamar } from '../api';

export default function Cadastro({ navegar }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  async function cadastrar() {
    setErro('');
    setCarregando(true);
    try {
      const dados = await chamar('/cadastro', { metodo: 'POST', corpo: { nome, email, senha } });
      // volta para o login com a mensagem de sucesso (print 01)
      navegar('Login', { sucesso: dados.mensagem });
    } catch (e) {
      setErro(e.message);
    }
    setCarregando(false);
  }

  return (
    <Tela>
      <Titulo>Criar conta</Titulo>
      <Campo placeholder="Nome" value={nome} onChangeText={setNome} />
      <Campo
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <Campo placeholder="Senha" value={senha} onChangeText={setSenha} secureTextEntry />
      <Mensagem texto={erro} tipo="erro" />
      <Botao texto={carregando ? 'Cadastrando...' : 'Cadastrar'} onPress={cadastrar} desabilitado={carregando} />
      <Botao texto="Já tenho conta" tipo="secundario" onPress={() => navegar('Login')} />
    </Tela>
  );
}
