/*
 * NovaWeb | Dados de demonstracao
 * Este arquivo centraliza a leitura e a gravacao do localStorage.
 * Os registros iniciais sao ficticios e existem apenas para teste.
 */

const CHAVE_USUARIOS = "novaweb_sa02_usuarios_v1";
const CHAVE_PERFIL = "novaweb_sa02_perfil_v1";

const usuariosIniciais = [
    {
        id: "NW-001",
        nome: "Ana Ribeiro",
        email: "ana.ribeiro@exemplo.com",
        telefone: "(11) 98812-3401",
        cargo: "Administradora",
        status: "Ativo",
        criadoEm: "2026-10-14T09:20:00"
    },
    {
        id: "NW-002",
        nome: "Bruno Martins",
        email: "bruno.martins@exemplo.com",
        telefone: "(11) 97723-4502",
        cargo: "Desenvolvedor",
        status: "Ativo",
        criadoEm: "2026-10-16T11:10:00"
    },
    {
        id: "NW-003",
        nome: "Camila Costa",
        email: "camila.costa@exemplo.com",
        telefone: "(19) 96634-5603",
        cargo: "Designer",
        status: "Pendente",
        criadoEm: "2026-10-18T14:35:00"
    },
    {
        id: "NW-004",
        nome: "Diego Almeida",
        email: "diego.almeida@exemplo.com",
        telefone: "(41) 95545-6704",
        cargo: "Analista",
        status: "Ativo",
        criadoEm: "2026-10-20T08:45:00"
    },
    {
        id: "NW-005",
        nome: "Fernanda Lima",
        email: "fernanda.lima@exemplo.com",
        telefone: "(48) 94456-7805",
        cargo: "Atendimento",
        status: "Inativo",
        criadoEm: "2026-10-22T16:00:00"
    }
];

function carregarUsuarios() {
    try {
        const dadosSalvos = localStorage.getItem(CHAVE_USUARIOS);

        if (dadosSalvos === null) {
            salvarUsuarios(usuariosIniciais);
            return [...usuariosIniciais];
        }

        const usuarios = JSON.parse(dadosSalvos);
        return Array.isArray(usuarios) ? usuarios : [...usuariosIniciais];
    } catch (erro) {
        console.error("Não foi possível carregar os usuários:", erro);
        return [...usuariosIniciais];
    }
}

function salvarUsuarios(usuarios) {
    try {
        localStorage.setItem(CHAVE_USUARIOS, JSON.stringify(usuarios));
        return true;
    } catch (erro) {
        console.error("Não foi possível salvar os usuários:", erro);
        return false;
    }
}

function carregarPerfil() {
    try {
        const dadosSalvos = localStorage.getItem(CHAVE_PERFIL);
        return dadosSalvos ? JSON.parse(dadosSalvos) : null;
    } catch (erro) {
        console.error("Não foi possível carregar o perfil:", erro);
        return null;
    }
}

function salvarPerfil(perfil) {
    try {
        localStorage.setItem(CHAVE_PERFIL, JSON.stringify(perfil));
        return true;
    } catch (erro) {
        console.error("Não foi possível salvar o perfil:", erro);
        return false;
    }
}

function normalizarTexto(valor) {
    return String(valor || "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLocaleLowerCase("pt-BR")
        .trim();
}
