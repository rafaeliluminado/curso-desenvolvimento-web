# Guia de Git e GitHub — publicar a SA02

## Antes de começar

A pasta `SA02` deve ficar dentro do repositório que já existe:

```text
curso-desenvolvimento-web/
├── .git/
├── aulaHTML01/
├── aulaHTML02/
├── ...
├── projeto-novashop/
├── tech-blog/
└── SA02/
```

**Não execute `git init` novamente.** O repositório do curso já foi iniciado e conectado a um remoto. A SA02 é apenas mais uma pasta desse mesmo projeto.

## 1. Abrir o repositório correto

1. Extraia o arquivo da SA02.
2. Copie a pasta `SA02` para dentro de `curso-desenvolvimento-web`.
3. Se já existir uma SA02 antiga, substitua somente essa pasta. Não apague nem substitua o repositório inteiro.
4. No VS Code, use **Arquivo > Abrir Pasta** e abra `curso-desenvolvimento-web`.
5. Abra o terminal integrado em **Terminal > Novo Terminal**.

## 2. Conferir o estado do Git

Execute:

```bash
git status -sb
```

O comando mostra a branch atual e os arquivos alterados. Confira se a branch é `main` e se as alterações que você pretende enviar estão na pasta `SA02`.

Para conferir o remoto configurado:

```bash
git remote -v
```

Se aparecer `origin`, o endereço do GitHub já está configurado. Não é necessário cadastrar outro remoto.

## 3. Preparar somente a SA02

Adicione apenas a pasta da atividade, evitando incluir alterações de outras aulas:

```bash
git add SA02/
```

Confira o que será registrado:

```bash
git status
```

Opcionalmente, confira o resumo das alterações preparadas:

```bash
git diff --cached --stat
```

## 4. Criar o commit

Use esta mensagem, que descreve a alteração:

```bash
git commit -m "feat(sa02): refina sistema administrativo NovaWeb"
```

O commit salva uma versão da SA02 no histórico local do Git.

## 5. Enviar ao GitHub

```bash
git push origin main
```

Depois, abra o repositório no GitHub, entre em `SA02` e confira se os arquivos aparecem e se a mensagem do commit está no histórico.

## Se o Git informar que o remoto tem alterações mais recentes

Primeiro confira se não há alterações locais pendentes. Depois atualize a branch e tente o envio novamente:

```bash
git pull --rebase origin main
git push origin main
```

Se aparecer um conflito, não apague arquivos aleatoriamente. O Git indicará quais arquivos precisam ser revisados. Resolva as marcações do conflito, salve os arquivos e execute `git add` nos arquivos resolvidos e `git rebase --continue`.

## Comandos que você não precisa executar nesta atividade

```bash
git init
git remote add origin ...
```

Eles são usados na criação/configuração inicial de outro repositório. Neste projeto, o caminho correto é continuar usando o repositório do curso.

## Fluxo resumido para os próximos commits

```bash
git status
git add SA02/
git commit -m "mensagem clara sobre a alteração"
git push origin main
```

Crie commits pequenos e com mensagens que expliquem o que mudou. Não use `git add .` quando houver alterações de outras aulas que ainda não devam ser enviadas.
