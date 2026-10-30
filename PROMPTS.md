# PROMPTS

## api-usuarios

### Prompt
Anexei o enunciado da Atividade 4 e pedi ajuda para resolver. Escolhi como tema as regras do xadrez e informei que o banco das aulas é MySQL. Pedi a api-usuarios completa (cadastro, login, listar, buscar, alterar e excluir, com banco.sql e testes.http).
(Cole aqui o texto exato dos seus prompts.)

### O que conferi
(Preencha depois de testar. Exemplos do que olhar:)
- Rodei o banco.sql no MySQL e a tabela usuarios foi criada: ______
- No testes.http, o cadastro devolveu 201: ______
- Login com senha errada devolveu 401 e a mensagem "E-mail ou senha incorretos.": ______
- GET /usuarios sem token devolveu 401: ______
- No MySQL, a coluna senha guarda um hash (começa com $2a$ ou $2b$): ______

### O que a IA errou ou decidiu sozinha
- Decidiu usar bcryptjs, JWT com validade de 2h e a busca por nome via ?nome= na rota de listar.
- (Acrescente qualquer erro que apareceu ao rodar.)

### O que fiz
(Ex.: criei o .env a partir do .env.exemplo, rodei npm install e testei todas as rotas.)

## app

### Prompt
(Cole aqui o prompt do app.)

### O que conferi
- Print 01, 02, 03, 04 e 05 tirados no navegador: ______
- O token fica guardado após o login e vai no cabeçalho Authorization: ______
- Sair apaga o token: ______

### O que a IA errou ou decidiu sozinha
(Preencha.)

### O que fiz
(Preencha.)

## api-ia

### Prompt
(Cole aqui o prompt da api-ia, o do chat no app e o da revisão em outra IA.)

### O que conferi
- /saude abre no endereço .vercel.app: ______
- Pedido de exemplo do README devolve a resposta da IA: ______
- Pergunta fora do tema ("Qual a capital da França?") é recusada: ______
- A chave não aparece no código nem no git: ______

### O que a IA errou ou decidiu sozinha
(Preencha.)

### O que fiz
(Preencha.)
