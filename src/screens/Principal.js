import React from 'react';
import { Text } from 'react-native';
import { Tela, Titulo, Botao } from '../ui';
import { apagarSessao } from '../storage';
import ChatIA from './ChatIA';

export default function Principal({ navegar, usuario }) {
  async function sair() {
    await apagarSessao(); // sair apaga o token
    navegar('Login');
  }

  return (
    <Tela>
      <Titulo>Olá, {usuario ? usuario.nome : ''}!</Titulo>
      <Text style={{ marginBottom: 12 }}>Tire dúvidas sobre as regras do xadrez:</Text>
      <ChatIA />
      <Botao texto="Usuários" tipo="secundario" onPress={() => navegar('Usuarios')} />
      <Botao texto="Sair" tipo="perigo" onPress={sair} />
    </Tela>
  );
}
