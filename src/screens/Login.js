import React, { useState } from 'react';
import { Tela, Titulo, Campo, Botao, Mensagem } from '../ui';
import { chamar } from '../api';
import { salvarSessao } from '../storage';

export default function Login({ navegar, sucesso }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  async function entrar() {
    setErro('');
    setCarregando(true);
    try {
      const dados = await chamar('/login', { metodo: 'POST', corpo: { email, senha } });
      await salvarSessao(dados.token, dados.usuario); // guarda o token
      navegar('Principal');
    } catch (e) {
      setErro(e.message); // mensagem que a API devolveu (print 02)
    }
    setCarregando(false);
  }

  return (
    <Tela>
      <Titulo>Mestre do Xadrez</Titulo>
      <Mensagem texto={sucesso} tipo="sucesso" />
      <Campo
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <Campo placeholder="Senha" value={senha} onChangeText={setSenha} secureTextEntry />
      <Mensagem texto={erro} tipo="erro" />
      <Botao texto={carregando ? 'Entrando...' : 'Entrar'} onPress={entrar} desabilitado={carregando} />
      <Botao texto="Criar conta" tipo="secundario" onPress={() => navegar('Cadastro')} />
    </Tela>
  );
}
