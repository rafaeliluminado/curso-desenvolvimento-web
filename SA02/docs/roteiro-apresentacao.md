# Roteiro de apresentação e testes — NovaWeb SA02

## 1. Apresentação

"O NovaWeb é um protótipo de sistema administrativo desenvolvido para a Situação de Aprendizagem 02. A proposta é reunir acesso, visão geral, perfil e consulta de usuários em uma interface consistente. O projeto foi construído com HTML5, CSS3 e JavaScript, sem bibliotecas externas."

## 2. Demonstração das telas

### Login

- Mostrar os campos de e-mail e senha.
- Testar o envio com campos vazios.
- Testar uma senha com menos de seis caracteres.
- Utilizar um e-mail válido e uma senha de seis ou mais caracteres para abrir o painel.
- Mostrar a opção de lembrar e ocultar a senha.

### Visão geral

- Mostrar os indicadores calculados a partir dos registros.
- Clicar em "Novo usuário".
- Retornar e observar que os indicadores refletem os cadastros salvos.

### Usuários

- Pesquisar por nome, e-mail e cargo.
- Pesquisar sem acento para demonstrar a normalização do texto.
- Filtrar por Ativo, Pendente e Inativo.
- Cadastrar um usuário de teste.
- Selecionar "Editar", alterar um campo e salvar.
- Tentar cadastrar um e-mail já utilizado.
- Excluir um registro de teste.
- Exportar o CSV e abrir o arquivo em uma planilha.

### Meu perfil

- Mostrar os campos de texto, e-mail, telefone e seleção.
- Apresentar o identificador somente leitura e o nível de acesso desabilitado.
- Selecionar um modelo de trabalho e pelo menos uma área de interesse.
- Testar a validação da apresentação e salvar.
- Atualizar a página para mostrar que os dados permanecem no navegador.

## 3. Testes rápidos

| Teste | Resultado esperado |
|---|---|
| E-mail inválido no login | O navegador impede o envio |
| Senha curta | Mensagem de validação |
| Pesquisa por "ana" | Exibe registros correspondentes |
| Filtro "Ativos" | Exibe somente usuários ativos |
| E-mail já cadastrado | Impede duplicidade |
| Edição de registro | Atualiza a linha e mantém o identificador |
| Exclusão confirmada | Remove o registro da tabela |
| Atualização da página | Mantém os dados salvos no mesmo navegador |
| Exportação | Faz download de `usuarios-novaweb.csv` |

## 4. Encerramento

"O projeto consolida estrutura semântica, formulários, tabelas, estilização externa, layout responsivo e manipulação do DOM. O armazenamento é local e demonstrativo. Para uso real, o próximo passo seria conectar o front-end a uma API e a um banco de dados, com autenticação e permissões validadas no servidor."
