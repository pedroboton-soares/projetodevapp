import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform } from 'react-native';

export const cores = {
  fundo: '#f3ede2',
  escuro: '#2b2118',
  verde: '#4a7c59',
  vermelho: '#b3261e',
  borda: '#c9bca5',
  branco: '#ffffff',
};

export function Tela({ children }) {
  return (
    <View style={estilos.tela}>
      <View style={estilos.caixa}>{children}</View>
    </View>
  );
}

export function Titulo({ children }) {
  return <Text style={estilos.titulo}>{children}</Text>;
}

export function Campo(props) {
  return <TextInput placeholderTextColor="#8a7d68" style={estilos.campo} {...props} />;
}

export function Botao({ texto, onPress, tipo = 'principal', desabilitado }) {
  const fundo =
    tipo === 'perigo' ? cores.vermelho : tipo === 'secundario' ? cores.branco : cores.verde;
  const corTexto = tipo === 'secundario' ? cores.escuro : cores.branco;
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={desabilitado}
      style={[
        estilos.botao,
        { backgroundColor: fundo, opacity: desabilitado ? 0.6 : 1 },
        tipo === 'secundario' && { borderWidth: 1, borderColor: cores.borda },
      ]}
    >
      <Text style={[estilos.botaoTexto, { color: corTexto }]}>{texto}</Text>
    </TouchableOpacity>
  );
}

export function Mensagem({ texto, tipo }) {
  if (!texto) return null;
  const cor = tipo === 'erro' ? cores.vermelho : cores.verde;
  return <Text style={[estilos.mensagem, { color: cor }]}>{texto}</Text>;
}

// Confirmacao que funciona no navegador e no celular
export function confirmar(mensagem) {
  if (Platform.OS === 'web') return Promise.resolve(window.confirm(mensagem));
  const { Alert } = require('react-native');
  return new Promise((resolver) => {
    Alert.alert('Confirmar', mensagem, [
      { text: 'Cancelar', style: 'cancel', onPress: () => resolver(false) },
      { text: 'Sim', onPress: () => resolver(true) },
    ]);
  });
}

const estilos = StyleSheet.create({
  tela: { flex: 1, backgroundColor: cores.fundo, alignItems: 'center' },
  caixa: { flex: 1, width: '100%', maxWidth: 480, padding: 20 },
  titulo: { fontSize: 26, fontWeight: 'bold', color: cores.escuro, marginBottom: 16, marginTop: 8 },
  campo: {
    borderWidth: 1,
    borderColor: cores.borda,
    backgroundColor: cores.branco,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
    color: cores.escuro,
  },
  botao: { padding: 14, borderRadius: 8, alignItems: 'center', marginBottom: 10 },
  botaoTexto: { fontSize: 16, fontWeight: '600' },
  mensagem: { fontSize: 15, marginBottom: 12 },
});
