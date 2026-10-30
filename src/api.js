// Chamadas para a api-usuarios. Nas rotas fechadas, manda o token no cabecalho.
import { API_URL } from './config';
import { lerToken } from './storage';

export async function chamar(rota, { metodo = 'GET', corpo, autenticado = false } = {}) {
  const headers = { 'Content-Type': 'application/json' };

  if (autenticado) {
    const token = await lerToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  let resposta;
  try {
    resposta = await fetch(`${API_URL}${rota}`, {
      method: metodo,
      headers,
      body: corpo ? JSON.stringify(corpo) : undefined,
    });
  } catch (e) {
    throw new Error('Não foi possível conectar à API.');
  }

  const dados = await resposta.json().catch(() => ({}));
  if (!resposta.ok) {
    // mostra exatamente a mensagem que a API devolveu
    throw new Error(dados.erro || 'Erro na requisição.');
  }
  return dados;
}
