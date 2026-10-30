# Planejamento e requisitos — NovaWeb SA02

## 1. Contexto e objetivo

O NovaWeb é um protótipo de sistema administrativo para organizar os dados de uma equipe. Diferente de um site institucional, a interface prioriza tarefas internas: entrar no sistema, acompanhar um resumo, consultar usuários e atualizar informações de perfil.

O escopo parte da atividade de referência da SA02 (Login, Meu Perfil e Consulta) e acrescenta uma tela de visão geral para organizar as informações. O projeto permanece no front-end, seguindo o nível das atividades de HTML, CSS e JavaScript do curso.

## 2. Usuários e tarefas principais

| Perfil de uso | Tarefa |
|---|---|
| Administrador | Consultar, cadastrar, editar e excluir usuários |
| Usuário do sistema | Atualizar as próprias informações de perfil |
| Avaliador / professor | Navegar pelas telas e verificar a aplicação dos conteúdos estudados |

## 3. Requisitos funcionais

- RF01 — O sistema deve apresentar uma tela de acesso com e-mail e senha.
- RF02 — O formulário de acesso deve validar os campos obrigatórios e o comprimento mínimo da senha demonstrativa.
- RF03 — O usuário deve conseguir navegar entre Visão geral, Usuários e Meu perfil.
- RF04 — A visão geral deve exibir quantidades calculadas a partir dos registros existentes.
- RF05 — A consulta deve apresentar os usuários em uma tabela.
- RF06 — A consulta deve permitir pesquisar por identificador, nome, e-mail, cargo e status.
- RF07 — A consulta deve permitir filtrar registros pelo status.
- RF08 — O administrador deve conseguir cadastrar, editar e excluir usuários.
- RF09 — O sistema deve impedir o cadastro de dois registros com o mesmo e-mail.
- RF10 — O perfil deve permitir atualizar nome, e-mail, CPF, nascimento, tipo de usuário, estado, telefone, área de atuação, preferências e áreas de interesse.
- RF11 — Os dados de demonstração devem permanecer disponíveis após atualizar a página, usando o armazenamento local do navegador.
- RF12 — A consulta deve permitir exportar a lista de usuários para CSV.

## 4. Requisitos não funcionais

- RNF01 — As páginas devem usar HTML5 semântico e CSS externo.
- RNF02 — A navegação e os formulários devem ser utilizáveis por teclado.
- RNF03 — Os campos devem possuir rótulos associados e mensagens com área de anúncio para leitores de tela.
- RNF04 — A interface deve se adaptar a desktop, tablet e celular.
- RNF05 — A tabela deve preservar a leitura em telas estreitas, com rolagem horizontal limitada à própria tabela.
- RNF06 — O projeto não deve depender de bibliotecas externas para funcionar.
- RNF07 — Os registros de exemplo devem ser fictícios e a limitação do armazenamento local deve estar documentada.

## 5. Decisões de interface

A interface usa navegação lateral, barra superior e área de conteúdo. O menu mantém os mesmos nomes e a mesma ordem nas páginas internas. O fundo claro e os painéis brancos deixam os dados em primeiro plano; o grafite identifica a navegação e o verde-petróleo destaca ações importantes.

A tela de consulta usa duas áreas: a tabela de registros e o formulário de edição. Essa distribuição aproveita a lógica da atividade de integração de componentes da aula 16, em que a seleção de uma linha carrega seus valores no formulário.

A organização também considera o wireframe da aula 05: cabeçalho e navegação em primeiro plano, conteúdo principal com maior destaque e áreas auxiliares para ações complementares.

## 6. Adaptação por plataforma

- **Desktop:** menu lateral fixo, indicadores em quatro colunas e tabela com todas as colunas visíveis.
- **Tablet:** menu passa para uma faixa superior, indicadores ficam em duas colunas e o formulário de edição se reorganiza.
- **Celular:** conteúdo em uma coluna, campos empilhados e tabela com rolagem horizontal própria. Os controles mantêm área de toque confortável.

Essas adaptações seguem a análise de plataforma feita na atividade de Projetos de Software. A interface é uma implementação de demonstração; não representa um teste formal de desempenho em coletores ou dispositivos industriais.

## 7. Organização do código

- `dados.js`: concentra as chaves e as funções de leitura e gravação do `localStorage`.
- `script.js`: controla os eventos e a lógica das páginas.
- `estilo.css`: reúne os estilos compartilhados e as regras responsivas.
- Arquivos HTML: mantêm a estrutura e o conteúdo semântico de cada tela.

Essa separação evita repetir regras e deixa mais fácil localizar cada responsabilidade.

## 8. Limites e riscos conhecidos

O `localStorage` pertence ao navegador e ao dispositivo em que o projeto está sendo executado. Não existe sincronização entre computadores, controle real de acesso ou proteção de dados. O login aceita credenciais demonstrativas e não deve ser considerado mecanismo de segurança. Como o perfil reproduz campos de CPF e nascimento presentes na atividade de referência, os testes devem usar apenas dados fictícios.

Para transformar o protótipo em sistema real, seria necessário criar uma API ou aplicação Flask, validar as permissões no servidor, armazenar senhas com segurança e utilizar um banco de dados. A interface estática publicada no GitHub Pages não executa código Python no servidor.

## 9. Critérios de conferência

- As três telas principais abrem pelo menu sem caminhos quebrados.
- O painel atualiza os indicadores conforme os registros.
- A pesquisa e o filtro atualizam a tabela.
- O formulário permite cadastrar, selecionar, editar e excluir registros.
- A validação impede e-mail repetido.
- O perfil salva e recupera os dados no mesmo navegador.
- O CSV pode ser aberto em uma planilha.
- O layout permanece utilizável em larguras próximas a 360 px, 768 px e 1366 px.
