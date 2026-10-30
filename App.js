import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { lerToken, lerUsuario } from './src/storage';
import Cadastro from './src/screens/Cadastro';
import Login from './src/screens/Login';
import Principal from './src/screens/Principal';
import Usuarios from './src/screens/Usuarios';
import Editar from './src/screens/Editar';

export default function App() {
  const [tela, setTela] = useState(null);
  const [params, setParams] = useState({});
  const [usuario, setUsuario] = useState(null);

  // ao abrir: se ja tem token guardado, vai direto para a tela principal
  useEffect(() => {
    (async () => {
      const token = await lerToken();
      if (token) {
        setUsuario(await lerUsuario());
        setTela('Principal');
      } else {
        setTela('Login');
      }
    })();
  }, []);

  async function navegar(nome, novosParams = {}) {
    if (nome === 'Principal') setUsuario(await lerUsuario());
    setParams(novosParams);
    setTela(nome);
  }

  if (!tela) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (tela === 'Cadastro') return <Cadastro navegar={navegar} />;
  if (tela === 'Login') return <Login navegar={navegar} sucesso={params.sucesso} />;
  if (tela === 'Usuarios') return <Usuarios navegar={navegar} />;
  if (tela === 'Editar') return <Editar navegar={navegar} usuario={params.usuario} />;
  return <Principal navegar={navegar} usuario={usuario} />;
}
