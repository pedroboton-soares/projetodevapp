// Guarda, le e APAGA o token (e o usuario) do login.
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function salvarSessao(token, usuario) {
  await AsyncStorage.setItem('token', token);
  await AsyncStorage.setItem('usuario', JSON.stringify(usuario));
}

export async function lerToken() {
  return AsyncStorage.getItem('token');
}

export async function lerUsuario() {
  const texto = await AsyncStorage.getItem('usuario');
  return texto ? JSON.parse(texto) : null;
}

// Usado no botao "Sair"
export async function apagarSessao() {
  await AsyncStorage.removeItem('token');
  await AsyncStorage.removeItem('usuario');
}
