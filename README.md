# Mestre do Xadrez

## O que o app faz

O Mestre do Xadrez é um aplicativo em que a pessoa cria uma conta, entra com e-mail e senha e, na tela principal, conversa com uma IA que responde dúvidas sobre as regras do xadrez, com base no documento oficial das regras (arquivo `regras-xadrez.pdf`). O app também tem uma tela para listar e buscar usuários, alterar seus dados e excluí-los.

O projeto tem três partes, cada uma em uma pasta:

| Pasta | O que é | Onde roda |
|---|---|---|
| `api-usuarios` | API de cadastro e login de usuários, com banco MySQL | Na minha máquina |
| `app` | App em React Native (Expo) com as telas e o login | Na minha máquina, no navegador |
| `api-ia` | API que chama a IA generativa (Gemini) | Na internet, na Vercel |

## Como instalar e rodar

### Antes de começar

Instale o [Node.js](https://nodejs.org) (versão 18 ou mais nova) e o [MySQL](https://dev.mysql.com/downloads/). Depois, clone o repositório e abra a pasta dele:

```
git clone <https://github.com/pedroboton-soares/projetodevapp>
cd <projetodevapp>
```

### api-usuarios

1. Entre na pasta: `cd api-usuarios`
2. Crie o banco e a tabela. Com o MySQL instalado, rode:
   ```
   mysql -u root -p < banco.sql
   ```
   (ou abra o `banco.sql` no MySQL Workbench e execute). Isso cria o banco `app_xadrez` e a tabela `usuarios`.
3. Crie o arquivo de variáveis de ambiente a partir do exemplo:
   ```
   copy .env.exemplo .env
   ```
4. Abra o `.env` e preencha:
   - `DB_PASSWORD`: a senha do seu MySQL
   - `JWT_SECRET`: um texto longo qualquer, usado para assinar o token
   - `DB_HOST`, `DB_USER`, `DB_NAME` e `PORT` já vêm com valores de exemplo
5. Instale as dependências: `npm install`
6. Rode a API: `npm start`. Deve aparecer "api-usuarios rodando na porta 3000".
7. Para testar as rotas, abra o `testes.http` no VS Code (extensão REST Client).

### app

1. Em outro terminal, entre na pasta: `cd app`
2. Instale as dependências: `npm install`
3. Abra o arquivo `src/config.js` e confira os dois endereços:
   - `API_URL`: `http://localhost:3000` (a api-usuarios rodando)
   - `IA_URL`: o endereço on-line da api-ia (veja a seção abaixo)
4. O app não usa `.env`.
5. Rode o app no navegador: `npx expo start --web`

Mantenha a api-usuarios rodando enquanto usa o app.

### api-ia

1. Em outro terminal, entre na pasta: `cd api-ia`
2. Crie a chave da Gemini (grátis, sem cartão de crédito) no [Google AI Studio](https://aistudio.google.com/apikey).
3. Crie o arquivo de variáveis de ambiente:
   ```
   copy .env.exemplo .env
   ```
4. Abra o `.env` e preencha:
   - `GEMINI_API_KEY`: a chave criada no passo 2
   - `GEMINI_MODELO`: o modelo usado (exemplo: `gemini-2.5-flash`)
   - `PORT`: já vem com o valor de exemplo
5. Instale as dependências: `npm install`
6. Rode localmente: `npm start`. Teste em `http://localhost:3001/saude`.
7. Para publicar na Vercel, dentro da pasta `api-ia`:
   ```
   npx vercel login
   npx vercel
   npx vercel env add GEMINI_API_KEY
   npx vercel env add GEMINI_MODELO
   npx vercel --prod
   ```
   Escolha o ambiente **Production** nas duas variáveis. O último comando mostra o endereço final, terminado em `.vercel.app`.

## A api-ia on-line

**Endereço:** https://api-ia-sigma.vercel.app

Teste de saúde: https://api-ia-sigma.vercel.app/saude

**Pedido de exemplo** (copie e cole no `testes.http` ou em outro cliente HTTP):

```
POST https://api-ia-sigma.vercel.app/perguntar
Content-Type: application/json

{
  "pergunta": "Como funciona o roque?"
}
```

A resposta vem no formato `{ "resposta": "..." }`.

**IA e modelo:** Google Gemini API, modelo `gemini-2.5-flash`. Escolhi porque tem plano gratuito sem cartão de crédito, lê o PDF das regras diretamente e responde rápido, o que serve bem para um chat de perguntas e respostas.

**Limite da IA:** ela só responde perguntas sobre as regras do xadrez, usando apenas o documento `regras-xadrez.pdf`. Quando a resposta não está no documento, ela avisa que não encontrou, e perguntas de outros assuntos são recusadas.

## Onde está

| O que | Onde |
|---|---|
| Token guardado e apagado (no app) | `app/src/storage.js` (`salvarSessao` guarda, `apagarSessao` apaga; o botão Sair, em `app/src/screens/Principal.js`, chama a função) |
| Token enviado nas rotas fechadas (no app) | `app/src/api.js` |
| Token conferido (na API) | `api-usuarios/auth.js` |
| Senha criptografada | `api-usuarios/index.js` (bcrypt, nas rotas de cadastro e de alterar) |
| Chave da IA lida da variável de ambiente | `api-ia/index.js` (`process.env.GEMINI_API_KEY`) |
| Instrução de sistema da IA | `api-ia/instrucao.js` |
