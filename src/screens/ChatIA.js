// Chat com a IA. Chama a SUA api-ia, nunca a IA direto.
import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Campo, Botao, Mensagem, cores } from '../ui';
import { IA_URL } from '../config';

export default function ChatIA() {
  const [pergunta, setPergunta] = useState('');
  const [mensagens, setMensagens] = useState([]);
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  async function perguntar() {
    const texto = pergunta.trim();
    if (!texto) return;
    setErro('');
    setCarregando(true);
    setMensagens((atual) => [...atual, { de: 'eu', texto }]);
    setPergunta('');
    try {
      const resposta = await fetch(`${IA_URL}/perguntar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pergunta: texto }),
      });
      const dados = await resposta.json().catch(() => ({}));
      if (!resposta.ok) throw new Error(dados.erro || 'A IA não respondeu.');
      setMensagens((atual) => [...atual, { de: 'ia', texto: dados.resposta }]);
    } catch (e) {
      setErro(e.message === 'Failed to fetch' ? 'Não foi possível conectar à IA.' : e.message);
    }
    setCarregando(false);
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={estilos.lista}>
        {mensagens.length === 0 && (
          <Text style={estilos.dica}>Pergunte algo sobre as regras do xadrez.</Text>
        )}
        {mensagens.map((m, i) => (
          <View key={i} style={[estilos.balao, m.de === 'eu' ? estilos.meu : estilos.dela]}>
            <Text style={{ color: m.de === 'eu' ? cores.branco : cores.escuro }}>{m.texto}</Text>
          </View>
        ))}
      </ScrollView>
      <Mensagem texto={erro} tipo="erro" />
      <Campo
        placeholder="Ex.: Como funciona o roque?"
        value={pergunta}
        onChangeText={setPergunta}
        onSubmitEditing={perguntar}
      />
      <Botao texto={carregando ? 'Pensando...' : 'Perguntar'} onPress={perguntar} desabilitado={carregando} />
    </View>
  );
}

const estilos = StyleSheet.create({
  lista: { flex: 1, marginBottom: 8 },
  dica: { color: '#8a7d68', marginBottom: 8 },
  balao: { padding: 10, borderRadius: 10, marginBottom: 8, maxWidth: '85%' },
  meu: { backgroundColor: cores.verde, alignSelf: 'flex-end' },
  dela: { backgroundColor: cores.branco, alignSelf: 'flex-start', borderWidth: 1, borderColor: cores.borda },
});
