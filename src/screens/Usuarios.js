import React, { useEffect, useState } from 'react';
import { Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Tela, Titulo, Campo, Botao, Mensagem, cores } from '../ui';
import { chamar } from '../api';

export default function Usuarios({ navegar }) {
  const [busca, setBusca] = useState('');
  const [lista, setLista] = useState([]);
  const [erro, setErro] = useState('');

  // busca de novo toda vez que o texto muda
  useEffect(() => {
    carregar();
  }, [busca]);

  async function carregar() {
    setErro('');
    try {
      const dados = await chamar(`/usuarios?nome=${encodeURIComponent(busca)}`, { autenticado: true });
      setLista(dados);
    } catch (e) {
      setErro(e.message);
    }
  }

  return (
    <Tela>
      <Titulo>Usuários</Titulo>
      <Campo placeholder="Buscar por nome" value={busca} onChangeText={setBusca} />
      <Mensagem texto={erro} tipo="erro" />
      <ScrollView style={{ flex: 1, marginBottom: 8 }}>
        {lista.length === 0 && !erro && <Text>Nenhum usuário encontrado.</Text>}
        {lista.map((u) => (
          <TouchableOpacity key={u.id} style={estilos.item} onPress={() => navegar('Editar', { usuario: u })}>
            <Text style={estilos.nome}>{u.nome}</Text>
            <Text style={{ color: '#6b5f4d' }}>{u.email}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Botao texto="Voltar" tipo="secundario" onPress={() => navegar('Principal')} />
    </Tela>
  );
}

const estilos = StyleSheet.create({
  item: {
    backgroundColor: cores.branco,
    borderWidth: 1,
    borderColor: cores.borda,
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  nome: { fontSize: 16, fontWeight: '600', color: cores.escuro },
});
