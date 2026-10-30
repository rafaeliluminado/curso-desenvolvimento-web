# NovaWeb — Sistema Administrativo | SA02

Projeto acadêmico de desenvolvimento web que reúne as telas de acesso, visão geral, perfil e consulta de usuários. A proposta é aplicar os conteúdos de Linguagem de Marcação e Projetos de Software em uma interface coerente, simples de usar e adaptável a diferentes telas.

## 1. Tecnologias

- HTML5 semântico;
- CSS3, seletores, Box Model, Flexbox, Grid e media queries;
- JavaScript puro para eventos, validações, manipulação do DOM e atualização de tabelas;
- `localStorage` para manter os registros no navegador;
- Git e GitHub para versionamento.

Não há bibliotecas externas, compilação ou instalação de dependências.

## 2. Estrutura de arquivos

```text
SA02/
├── assets/
│   └── images/
│       └── marca-novaweb.svg
├── css/
│   └── estilo.css
├── js/
│   ├── dados.js
│   └── script.js
├── docs/
│   ├── guia-git-github.md
│   ├── planejamento-e-requisitos.md
│   └── roteiro-apresentacao.md
├── index.html
├── login.html
├── painel.html
├── perfil.html
├── consulta.html
└── README.md
```

## 3. Como executar

1. Abra no Visual Studio Code a pasta principal `curso-desenvolvimento-web`.
2. Entre na pasta `SA02`.
3. Abra `login.html` com a extensão Live Server ou abra `index.html` no navegador.
4. Na tela de acesso, use qualquer e-mail válido e uma senha com pelo menos seis caracteres.
5. Navegue pelo menu lateral para testar Visão geral, Usuários e Meu perfil.

O `index.html` redireciona para `login.html`, permitindo que o projeto tenha uma página de entrada ao ser publicado em hospedagem estática.

## 4. Funcionalidades

### Acesso

- Validação nativa de e-mail e campos obrigatórios;
- verificação de senha com pelo menos seis caracteres;
- opção para mostrar ou ocultar a senha;
- opção para lembrar o e-mail no navegador;
- mensagem de orientação para recuperação de senha não implementada.

### Visão geral

- total de usuários cadastrados;
- quantidade de contas ativas e pendentes/inativas;
- quantidade de cargos diferentes;
- tabela com os últimos registros;
- atalhos para cadastro, consulta e perfil.

### Meu perfil

- campos de texto, e-mail, CPF, nascimento, telefone, estado, tipo de usuário e área de atuação;
- identificador somente leitura e nível de acesso desabilitado;
- opções de seleção única (radio) e múltipla (checkbox);
- apresentação profissional em textarea;
- validação dos campos e gravação local.

### Usuários

- listagem dinâmica em tabela HTML;
- pesquisa por ID, nome, e-mail, cargo ou status, sem diferenciar acentos;
- filtro por status;
- cadastro, edição e exclusão de registros;
- verificação de e-mail duplicado;
- exportação de todos os registros em CSV.

## 5. Armazenamento e limites do protótipo

Os usuários e os dados do perfil são salvos em `localStorage`. Isso permite atualizar a página sem perder os dados naquele navegador, mas não cria um banco de dados compartilhado. Como o perfil demonstrativo contém campos como CPF e nascimento, use somente valores fictícios durante os testes; não cadastre dados pessoais reais.

O login é apenas demonstrativo: não consulta credenciais em servidor, não protege páginas e não implementa autenticação real. Não utilize senhas ou dados pessoais verdadeiros. Os registros iniciais são fictícios.

O exercício introdutório de Flask existente no repositório foi considerado como possibilidade de evolução de back-end, mas não foi conectado a esta versão. Uma integração real exigiria rotas Python, templates, validação no servidor e banco de dados; o GitHub Pages, por si só, publica arquivos estáticos e não executa o Flask.

## 6. Conteúdos do curso aplicados

| Conteúdo do material | Aplicação no NovaWeb |
|---|---|
| HTML básico e semântica (aulas 02 e 03) | `header`, `nav`, `main`, `section`, `article`, `aside`, `form`, `table` e `footer` |
| CSS e seletores (aula 04) | Folha externa compartilhada, classes, estados de foco e seletores por componente |
| Wireframe e hierarquia visual (aula 05) | Separação entre navegação, conteúdo principal e áreas auxiliares |
| Posicionamento e layout (aulas 08 e 09) | Flexbox, Grid, espaçamentos, bordas, margens e Box Model |
| Tabelas (aula 11) | Listagem de usuários com cabeçalho, corpo, legenda e células |
| Formulário de login (aula 12) | Campos obrigatórios, e-mail, senha e evento de envio |
| Formulário avançado (aula 13) | Select, radio, checkbox e textarea |
| Estados de campos (aula 14) | Campos `readonly` e `disabled` no perfil e nos formulários |
| JavaScript em formulários (aula 15) | Eventos, validação, mensagens e máscara de telefone |
| Manipulação de tabela (aula 16) | Seleção, edição e atualização de linhas |
| Projetos de Software — análise do NovaWeb Gestão | Consistência, usabilidade, arquitetura por responsabilidades e adaptação a desktop, tablet e celular |
| Projeto NovaShop e Tech Blog | Dados em arrays/objetos, renderização dinâmica, pesquisa e `localStorage` |

## 7. Documentação complementar

- [Planejamento e requisitos](docs/planejamento-e-requisitos.md)
- [Guia Git e GitHub](docs/guia-git-github.md)
- [Roteiro de apresentação e testes](docs/roteiro-apresentacao.md)

## 8. Próximas evoluções possíveis

- autenticação real com validação no servidor;
- API para consulta e manutenção dos usuários;
- banco de dados;
- controle de permissões por perfil;
- paginação de resultados para conjuntos grandes de registros.
