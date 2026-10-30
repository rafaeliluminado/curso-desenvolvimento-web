/*
 * NovaWeb | SA02
 * Interações das páginas: login, painel, perfil e consulta de usuários.
 * Desenvolvido com JavaScript puro, DOM e localStorage.
 */

document.addEventListener("DOMContentLoaded", function () {
    atualizarUsuarioSuperior();

    const pagina = document.body.dataset.page;

    if (pagina === "login") {
        iniciarLogin();
    }

    if (pagina === "painel") {
        iniciarPainel();
    }

    if (pagina === "perfil") {
        iniciarPerfil();
    }

    if (pagina === "consulta") {
        iniciarConsulta();
    }

    const linkSair = document.getElementById("link-sair");
    if (linkSair) {
        linkSair.addEventListener("click", function () {
            sessionStorage.removeItem("novaweb_sessao");
        });
    }
});

/* FUNCOES COMPARTILHADAS */

function obterSessao() {
    try {
        return JSON.parse(sessionStorage.getItem("novaweb_sessao")) || null;
    } catch (erro) {
        return null;
    }
}

function atualizarUsuarioSuperior() {
    const nomeElemento = document.getElementById("nome-superior");
    const emailElemento = document.getElementById("email-superior");

    if (!nomeElemento || !emailElemento) {
        return;
    }

    const sessao = obterSessao();
    const perfil = carregarPerfil();
    const nome = (perfil && perfil.nome) || (sessao && sessao.nome) || "Administrador";
    const email = (perfil && perfil.email) || (sessao && sessao.email) || "Conta demonstrativa";

    nomeElemento.textContent = nome;
    emailElemento.textContent = email;
}

function mostrarMensagem(elemento, texto, tipo) {
    if (!elemento) {
        return;
    }

    elemento.textContent = texto || "";
    elemento.classList.remove("sucesso", "erro");

    if (tipo) {
        elemento.classList.add(tipo);
    }
}

function formatarStatus(status) {
    if (status === "Ativo") {
        return "status-ativo";
    }

    if (status === "Pendente") {
        return "status-pendente";
    }

    return "status-inativo";
}

function gerarNovoId(usuarios) {
    const maiorNumero = usuarios.reduce(function (maior, usuario) {
        const numero = Number(String(usuario.id).replace(/\D/g, "")) || 0;
        return Math.max(maior, numero);
    }, 0);

    return "NW-" + String(maiorNumero + 1).padStart(3, "0");
}

function aplicarMascaraTelefone(campo) {
    if (!campo) {
        return;
    }

    campo.addEventListener("input", function () {
        let numeros = campo.value.replace(/\D/g, "").slice(0, 11);

        if (numeros.length > 10) {
            numeros = numeros.replace(/^(\d{2})(\d{5})(\d{0,4}).*/, "($1) $2-$3");
        } else if (numeros.length > 6) {
            numeros = numeros.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, "($1) $2-$3");
        } else if (numeros.length > 2) {
            numeros = numeros.replace(/^(\d{2})(\d{0,5})/, "($1) $2");
        } else if (numeros.length > 0) {
            numeros = "(" + numeros;
        }

        campo.value = numeros;
    });
}

function aplicarMascaraCpf(campo) {
    if (!campo) {
        return;
    }

    campo.addEventListener("input", function () {
        let numeros = campo.value.replace(/\D/g, "").slice(0, 11);
        numeros = numeros.replace(/(\d{3})(\d)/, "$1.$2");
        numeros = numeros.replace(/(\d{3})(\d)/, "$1.$2");
        numeros = numeros.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
        campo.value = numeros;
    });
}

/* 1. LOGIN */

function iniciarLogin() {
    const formulario = document.getElementById("form-login");
    const email = document.getElementById("email");
    const senha = document.getElementById("senha");
    const lembrar = document.getElementById("lembrar-email");
    const mensagem = document.getElementById("mensagem-login");
    const alternarSenha = document.getElementById("alternar-senha");
    const recuperarSenha = document.getElementById("recuperar-senha");

    const emailSalvo = localStorage.getItem("novaweb_email_salvo");
    if (emailSalvo) {
        email.value = emailSalvo;
        lembrar.checked = true;
    }

    alternarSenha.addEventListener("click", function () {
        const senhaVisivel = senha.type === "text";
        senha.type = senhaVisivel ? "password" : "text";
        alternarSenha.textContent = senhaVisivel ? "Mostrar" : "Ocultar";
        alternarSenha.setAttribute("aria-label", senhaVisivel ? "Mostrar senha" : "Ocultar senha");
        alternarSenha.setAttribute("aria-pressed", String(!senhaVisivel));
    });

    recuperarSenha.addEventListener("click", function () {
        mostrarMensagem(
            mensagem,
            "A recuperação de senha não está disponível no protótipo. Esta versão não possui servidor de autenticação.",
            "erro"
        );
    });

    formulario.addEventListener("submit", function (event) {
        event.preventDefault();
        mostrarMensagem(mensagem, "", "");

        if (!formulario.checkValidity()) {
            formulario.reportValidity();
            return;
        }

        if (senha.value.length < 6) {
            mostrarMensagem(mensagem, "A senha precisa ter pelo menos 6 caracteres.", "erro");
            senha.focus();
            return;
        }

        if (lembrar.checked) {
            localStorage.setItem("novaweb_email_salvo", email.value.trim());
        } else {
            localStorage.removeItem("novaweb_email_salvo");
        }

        const nomeDigitado = email.value.trim().split("@")[0].replace(/[._-]+/g, " ");
        const nomeFormatado = nomeDigitado.replace(/\b\w/g, function (letra) {
            return letra.toLocaleUpperCase("pt-BR");
        });

        sessionStorage.setItem("novaweb_sessao", JSON.stringify({
            email: email.value.trim(),
            nome: nomeFormatado || "Administrador"
        }));

        mostrarMensagem(mensagem, "Acesso demonstrativo validado. Abrindo o painel...", "sucesso");
        window.location.href = "painel.html";
    });
}

/* 2. PAINEL */

function iniciarPainel() {
    const usuarios = carregarUsuarios();
    const ativos = usuarios.filter(function (usuario) {
        return usuario.status === "Ativo";
    }).length;
    const pendentes = usuarios.filter(function (usuario) {
        return usuario.status !== "Ativo";
    }).length;
    const cargos = new Set(usuarios.map(function (usuario) {
        return usuario.cargo;
    })).size;

    document.getElementById("total-usuarios").textContent = usuarios.length;
    document.getElementById("total-ativos").textContent = ativos;
    document.getElementById("total-pendentes").textContent = pendentes;
    document.getElementById("total-cargos").textContent = cargos;

    const sessao = obterSessao();
    const perfil = carregarPerfil();
    const nome = (perfil && perfil.nome) || (sessao && sessao.nome) || "Administrador";
    document.getElementById("mensagem-boas-vindas").textContent =
        "Olá, " + nome + ". Acompanhe os cadastros e a situação dos usuários.";

    const corpoTabela = document.getElementById("usuarios-recentes");
    corpoTabela.textContent = "";

    const recentes = [...usuarios].slice(-5).reverse();

    if (recentes.length === 0) {
        const linha = document.createElement("tr");
        const celula = document.createElement("td");
        celula.colSpan = 3;
        celula.textContent = "Nenhum usuário cadastrado.";
        linha.appendChild(celula);
        corpoTabela.appendChild(linha);
        return;
    }

    recentes.forEach(function (usuario) {
        const linha = document.createElement("tr");

        const celulaUsuario = document.createElement("td");
        const nomeUsuario = document.createElement("span");
        nomeUsuario.className = "nome-celula";
        nomeUsuario.textContent = usuario.nome;
        celulaUsuario.appendChild(nomeUsuario);

        const celulaCargo = document.createElement("td");
        celulaCargo.textContent = usuario.cargo;

        const celulaStatus = document.createElement("td");
        const etiqueta = document.createElement("span");
        etiqueta.className = "etiqueta-status " + formatarStatus(usuario.status);
        etiqueta.textContent = usuario.status;
        celulaStatus.appendChild(etiqueta);

        linha.append(celulaUsuario, celulaCargo, celulaStatus);
        corpoTabela.appendChild(linha);
    });
}

/* 3. PERFIL */

function iniciarPerfil() {
    const formulario = document.getElementById("form-perfil");
    const mensagem = document.getElementById("mensagem-perfil");
    const campoTelefone = document.getElementById("perfil-telefone");
    const campoCpf = document.getElementById("perfil-cpf");
    const campoNascimento = document.getElementById("perfil-nascimento");
    const perfilSalvo = carregarPerfil();
    const sessao = obterSessao();

    aplicarMascaraTelefone(campoTelefone);
    aplicarMascaraCpf(campoCpf);
    const hoje = new Date();
    campoNascimento.max = [
        hoje.getFullYear(),
        String(hoje.getMonth() + 1).padStart(2, "0"),
        String(hoje.getDate()).padStart(2, "0")
    ].join("-");

    if (perfilSalvo) {
        document.getElementById("perfil-nome").value = perfilSalvo.nome || "";
        document.getElementById("perfil-email").value = perfilSalvo.email || "";
        document.getElementById("perfil-cpf").value = perfilSalvo.cpf || "";
        document.getElementById("perfil-nascimento").value = perfilSalvo.nascimento || "";
        document.getElementById("perfil-tipo").value = perfilSalvo.tipo || "";
        document.getElementById("perfil-estado").value = perfilSalvo.estado || "";
        document.getElementById("perfil-telefone").value = perfilSalvo.telefone || "";
        document.getElementById("perfil-area").value = perfilSalvo.area || "";
        document.getElementById("perfil-bio").value = perfilSalvo.bio || "";

        const radioModelo = document.querySelector('input[name="modelo"][value="' + perfilSalvo.modelo + '"]');
        if (radioModelo) {
            radioModelo.checked = true;
        }

        document.querySelectorAll('input[name="interesses"]').forEach(function (checkbox) {
            checkbox.checked = (perfilSalvo.interesses || []).includes(checkbox.value);
        });
    } else if (sessao) {
        document.getElementById("perfil-email").value = sessao.email || "";
        document.getElementById("perfil-nome").value = sessao.nome || "";
    }

    atualizarResumoPerfil();

    formulario.addEventListener("reset", function () {
        mostrarMensagem(mensagem, "", "");
        window.setTimeout(atualizarResumoPerfil, 0);
    });

    formulario.addEventListener("submit", function (event) {
        event.preventDefault();
        mostrarMensagem(mensagem, "", "");

        if (!formulario.checkValidity()) {
            formulario.reportValidity();
            return;
        }

        const cpf = document.getElementById("perfil-cpf").value.trim();
        const cpfNumeros = cpf.replace(/\D/g, "");
        if (cpfNumeros.length !== 11) {
            mostrarMensagem(mensagem, "Informe um CPF com 11 números.", "erro");
            document.getElementById("perfil-cpf").focus();
            return;
        }

        const interesses = Array.from(document.querySelectorAll('input[name="interesses"]:checked'))
            .map(function (checkbox) { return checkbox.value; });

        if (interesses.length === 0) {
            mostrarMensagem(mensagem, "Selecione pelo menos uma área de interesse.", "erro");
            return;
        }

        const bio = document.getElementById("perfil-bio").value.trim();
        if (bio.length < 15) {
            mostrarMensagem(mensagem, "A apresentação precisa ter pelo menos 15 caracteres.", "erro");
            document.getElementById("perfil-bio").focus();
            return;
        }

        const perfil = {
            nome: document.getElementById("perfil-nome").value.trim(),
            email: document.getElementById("perfil-email").value.trim(),
            cpf: cpf,
            nascimento: document.getElementById("perfil-nascimento").value,
            tipo: document.getElementById("perfil-tipo").value,
            estado: document.getElementById("perfil-estado").value,
            telefone: document.getElementById("perfil-telefone").value.trim(),
            area: document.getElementById("perfil-area").value,
            modelo: document.querySelector('input[name="modelo"]:checked').value,
            interesses: interesses,
            bio: bio
        };

        if (!salvarPerfil(perfil)) {
            mostrarMensagem(mensagem, "Não foi possível salvar. Verifique as permissões de armazenamento do navegador.", "erro");
            return;
        }

        if (sessao) {
            sessao.nome = perfil.nome;
            sessao.email = perfil.email;
            sessionStorage.setItem("novaweb_sessao", JSON.stringify(sessao));
        }

        atualizarResumoPerfil();
        atualizarUsuarioSuperior();
        mostrarMensagem(mensagem, "Perfil atualizado com sucesso neste navegador.", "sucesso");
    });

    function atualizarResumoPerfil() {
        const nome = document.getElementById("perfil-nome").value.trim() || "Administrador";
        const email = document.getElementById("perfil-email").value.trim() || "Conta demonstrativa";
        document.getElementById("resumo-nome").textContent = nome;
        document.getElementById("resumo-email").textContent = email;
    }

    document.getElementById("perfil-nome").addEventListener("input", atualizarResumoPerfil);
    document.getElementById("perfil-email").addEventListener("input", atualizarResumoPerfil);
}

/* 4. CONSULTA E MANUTENCAO DE USUARIOS */

function iniciarConsulta() {
    const formulario = document.getElementById("form-usuario");
    const campoPesquisa = document.getElementById("pesquisa-usuario");
    const filtroStatus = document.getElementById("filtro-status");
    const linhasUsuarios = document.getElementById("linhas-usuarios");
    const contador = document.getElementById("contador-usuarios");
    const estadoVazio = document.getElementById("estado-vazio");
    const mensagem = document.getElementById("mensagem-usuario");
    const botaoExcluir = document.getElementById("excluir-usuario");
    const campoTelefone = document.getElementById("usuario-telefone");
    let usuarioSelecionado = null;

    aplicarMascaraTelefone(campoTelefone);
    renderizarUsuarios();

    document.getElementById("novo-usuario").addEventListener("click", novoUsuario);
    document.getElementById("limpar-formulario").addEventListener("click", novoUsuario);
    campoPesquisa.addEventListener("input", renderizarUsuarios);
    filtroStatus.addEventListener("change", renderizarUsuarios);
    botaoExcluir.addEventListener("click", excluirUsuario);
    document.getElementById("exportar-csv").addEventListener("click", exportarUsuarios);

    formulario.addEventListener("submit", function (event) {
        event.preventDefault();
        mostrarMensagem(mensagem, "", "");

        if (!formulario.checkValidity()) {
            formulario.reportValidity();
            return;
        }

        const usuarios = carregarUsuarios();
        const dados = {
            nome: document.getElementById("usuario-nome").value.trim(),
            email: document.getElementById("usuario-email").value.trim(),
            telefone: document.getElementById("usuario-telefone").value.trim(),
            cargo: document.getElementById("usuario-cargo").value,
            status: document.getElementById("usuario-status").value
        };

        const emailDuplicado = usuarios.some(function (usuario) {
            return normalizarTexto(usuario.email) === normalizarTexto(dados.email) && usuario.id !== usuarioSelecionado;
        });

        if (emailDuplicado) {
            mostrarMensagem(mensagem, "Já existe um usuário cadastrado com esse e-mail.", "erro");
            document.getElementById("usuario-email").focus();
            return;
        }

        if (usuarioSelecionado) {
            const indice = usuarios.findIndex(function (usuario) {
                return usuario.id === usuarioSelecionado;
            });

            if (indice === -1) {
                mostrarMensagem(mensagem, "O registro selecionado não foi encontrado. Atualize a lista.", "erro");
                return;
            }

            usuarios[indice] = { ...usuarios[indice], ...dados };
        } else {
            dados.id = gerarNovoId(usuarios);
            dados.criadoEm = new Date().toISOString();
            usuarios.push(dados);
        }

        if (!salvarUsuarios(usuarios)) {
            mostrarMensagem(mensagem, "Não foi possível salvar os dados neste navegador.", "erro");
            return;
        }

        const mensagemSucesso = usuarioSelecionado ? "Usuário atualizado com sucesso." : "Usuário cadastrado com sucesso.";
        usuarioSelecionado = dados.id || usuarioSelecionado;
        renderizarUsuarios();
        carregarFormulario(usuarioSelecionado);
        mostrarMensagem(mensagem, mensagemSucesso, "sucesso");
    });

    linhasUsuarios.addEventListener("click", function (event) {
        const botao = event.target.closest("[data-editar]");
        if (!botao) {
            return;
        }
        carregarFormulario(botao.dataset.editar);
    });

    const parametros = new URLSearchParams(window.location.search);
    if (parametros.get("novo") === "1") {
        novoUsuario();
        document.getElementById("usuario-nome").focus();
    }

    function renderizarUsuarios() {
        const usuarios = carregarUsuarios();
        const termo = normalizarTexto(campoPesquisa.value);
        const statusEscolhido = filtroStatus.value;

        const filtrados = usuarios.filter(function (usuario) {
            const textoRegistro = normalizarTexto([
                usuario.id,
                usuario.nome,
                usuario.email,
                usuario.cargo,
                usuario.status
            ].join(" "));

            const correspondeTexto = textoRegistro.includes(termo);
            const correspondeStatus = statusEscolhido === "todos" || usuario.status === statusEscolhido;
            return correspondeTexto && correspondeStatus;
        });

        linhasUsuarios.textContent = "";
        estadoVazio.hidden = filtrados.length > 0;
        contador.textContent = filtrados.length + (filtrados.length === 1 ? " registro encontrado" : " registros encontrados");

        filtrados.forEach(function (usuario) {
            const linha = document.createElement("tr");

            adicionarCelula(linha, usuario.id);

            const celulaNome = adicionarCelula(linha, usuario.nome);
            celulaNome.classList.add("nome-celula");

            const celulaEmail = adicionarCelula(linha, usuario.email);
            celulaEmail.classList.add("email-celula");

            adicionarCelula(linha, usuario.cargo);

            const celulaStatus = document.createElement("td");
            const etiqueta = document.createElement("span");
            etiqueta.className = "etiqueta-status " + formatarStatus(usuario.status);
            etiqueta.textContent = usuario.status;
            celulaStatus.appendChild(etiqueta);
            linha.appendChild(celulaStatus);

            const celulaAcao = document.createElement("td");
            const botaoEditar = document.createElement("button");
            botaoEditar.type = "button";
            botaoEditar.className = "acao-tabela";
            botaoEditar.textContent = "Editar";
            botaoEditar.dataset.editar = usuario.id;
            botaoEditar.setAttribute("aria-label", "Editar " + usuario.nome);
            celulaAcao.appendChild(botaoEditar);
            linha.appendChild(celulaAcao);

            linhasUsuarios.appendChild(linha);
        });
    }

    function adicionarCelula(linha, texto) {
        const celula = document.createElement("td");
        celula.textContent = texto || "-";
        linha.appendChild(celula);
        return celula;
    }

    function novoUsuario() {
        usuarioSelecionado = null;
        formulario.reset();
        document.getElementById("usuario-id").value = "Gerado ao salvar";
        document.getElementById("titulo-form-usuario").textContent = "Novo usuário";
        document.getElementById("descricao-form-usuario").textContent = "Preencha os dados para adicionar um registro.";
        document.getElementById("salvar-usuario").textContent = "Salvar usuário";
        botaoExcluir.disabled = true;
        mostrarMensagem(mensagem, "", "");
    }

    function carregarFormulario(id) {
        const usuario = carregarUsuarios().find(function (item) {
            return item.id === id;
        });

        if (!usuario) {
            mostrarMensagem(mensagem, "Não foi possível localizar esse usuário.", "erro");
            return;
        }

        usuarioSelecionado = usuario.id;
        document.getElementById("usuario-id").value = usuario.id;
        document.getElementById("usuario-nome").value = usuario.nome;
        document.getElementById("usuario-email").value = usuario.email;
        document.getElementById("usuario-telefone").value = usuario.telefone || "";
        document.getElementById("usuario-cargo").value = usuario.cargo;
        document.getElementById("usuario-status").value = usuario.status;
        document.getElementById("titulo-form-usuario").textContent = "Editar usuário";
        document.getElementById("descricao-form-usuario").textContent = "Altere os campos e salve as atualizações.";
        document.getElementById("salvar-usuario").textContent = "Salvar alterações";
        botaoExcluir.disabled = false;
        mostrarMensagem(mensagem, "Registro " + usuario.id + " selecionado para edição.", "");
    }

    function excluirUsuario() {
        if (!usuarioSelecionado) {
            return;
        }

        const usuarios = carregarUsuarios();
        const usuario = usuarios.find(function (item) {
            return item.id === usuarioSelecionado;
        });

        if (!usuario) {
            mostrarMensagem(mensagem, "O registro não foi encontrado.", "erro");
            return;
        }

        const confirmar = window.confirm("Deseja excluir o cadastro de " + usuario.nome + "?");
        if (!confirmar) {
            return;
        }

        const atualizados = usuarios.filter(function (item) {
            return item.id !== usuarioSelecionado;
        });

        if (!salvarUsuarios(atualizados)) {
            mostrarMensagem(mensagem, "Não foi possível excluir o registro.", "erro");
            return;
        }

        novoUsuario();
        renderizarUsuarios();
        mostrarMensagem(mensagem, "Usuário excluído.", "sucesso");
    }

    function exportarUsuarios() {
        const usuarios = carregarUsuarios();
        const cabecalho = ["ID", "Nome", "E-mail", "Telefone", "Cargo", "Status"];
        const linhas = usuarios.map(function (usuario) {
            return [usuario.id, usuario.nome, usuario.email, usuario.telefone, usuario.cargo, usuario.status];
        });

        const conteudo = [cabecalho, ...linhas].map(function (linha) {
            return linha.map(function (valor) {
                return '"' + String(valor || "").replace(/"/g, '""') + '"';
            }).join(";");
        }).join("\r\n");

        const arquivo = new Blob(["\uFEFF" + conteudo], { type: "text/csv;charset=utf-8;" });
        const endereco = URL.createObjectURL(arquivo);
        const link = document.createElement("a");
        link.href = endereco;
        link.download = "usuarios-novaweb.csv";
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(endereco);
    }
}
