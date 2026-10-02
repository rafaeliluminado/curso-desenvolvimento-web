# Dia 7 — Análise de Projeto: NovaWeb Gestão

**Disciplina:** Projetos de Software  
**Aluno identificado:** Rafael Henrique  
**Projeto:** Sistema Corporativo Interno — NovaWeb Gestão

Um site institucional apresenta informações públicas sobre uma empresa. Já um sistema interno organiza tarefas e dados usados pelos funcionários. Por isso, o NovaWeb Gestão prioriza acesso ao sistema, identificação do usuário e consulta de informações. O protótipo contém Login, Dashboard e Consulta de Usuários.

## 1. Mapeamento de plataformas

**Navegadores desktop:** o projeto utiliza frames de 1440 × 900, menu lateral e conteúdo principal amplo. Essa organização permite consultar as cinco colunas da tabela — Nome, E-mail, Cargo, Status e Ações — e comparar registros. Teclado e mouse favorecem digitação, busca e seleção de ações. Uma implementação deverá se adaptar à largura disponível, inclusive quando a janela estiver reduzida.

**Tablets operacionais:** a navegação deve considerar toque e mudança de orientação. Propõe-se recolher o menu lateral, reorganizar os quatro cards em duas colunas e preservar espaço entre controles. A tabela pode usar rolagem horizontal delimitada à sua área, mantendo os títulos das colunas.

**Coletores e dispositivos móveis:** a tela menor exige priorizar tarefas. Propõe-se exibir usuários em uma lista com nome e status, abrindo os demais dados em uma tela de detalhes. Os cards ficariam empilhados e a busca permaneceria acessível. Em coletores, o projeto também deve considerar teclado físico, toque, uso em campo e possíveis limitações de conexão.

Essas adaptações são propostas de evolução: o protótipo produzido representa a versão desktop. Em uma aplicação web, layouts flexíveis e media queries podem ajustar a interface à largura da tela. [1]

## 2. Capacidade da plataforma computacional

A densidade de informações influencia a leitura. No desktop, cinco colunas facilitam a comparação; em telas pequenas, comprimir tudo dificultaria identificar nomes, e-mails e ações. Reorganizar o conteúdo é mais adequado do que reduzir excessivamente a fonte.

Os botões do projeto têm 46 pixels de altura. Para toque, a área acionável completa e o espaçamento devem ser considerados, inclusive no link “Editar”. A WCAG 2.2 estabelece, no critério 2.5.8, alvos de pelo menos 24 × 24 pixels CSS, com exceções previstas no próprio critério. A dimensão desenhada no Figma precisa ser conferida na implementação real. [2]

Capacidade computacional também envolve processamento, memória e rede. Com muitos registros, uma futura implementação pode consultar dados por páginas e aplicar busca no servidor, reduzindo a quantidade transferida. O protótipo usa dados fictícios e não mede desempenho nem executa consultas reais.

## 3. Princípios do projeto de software

**Usabilidade:** campos identificados, botão “Entrar” em destaque e recuperação de acesso orientam a autenticação. O Dashboard resume Clientes, Usuários, Pedidos e Pendências. Na consulta, busca, cabeçalho diferenciado e linhas alinhadas facilitam localizar informações. Uma implementação deverá oferecer mensagens de erro e confirmação de ações.

**Consistência:** fundo cinza claro, cards brancos, azul principal e fonte Inter mantêm um padrão. Menu e perfil aparecem nas telas internas. Os componentes reutilizáveis de botão e linha de tabela permitem manter aparência e espaçamento uniformes.

**Arquitetura:** Login, Dashboard e Consulta representam responsabilidades distintas. Para desenvolver o sistema, propõe-se separar apresentação, regras de negócio e acesso aos dados. A interface enviaria solicitações a uma API, que validaria credenciais e permissões antes de consultar o banco. Mostrar “Administrador” no perfil não implementa autorização; essa verificação deverá ocorrer no servidor. Componentes visuais favorecem reutilização, mas não comprovam uma arquitetura já implementada.

## Referências

[1] MDN Web Docs. Responsive web design. https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Responsive_Design

[2] W3C. Understanding SC 2.5.8: Target Size (Minimum). https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum

Consulta às fontes: 2 de outubro de 2026.
