function cadastrar(event) {
    // Impede o recarregamento padrao da pagina ao enviar
    event.preventDefault();

    // Captura o valor digitado no campo Nome
    const nome = document.getElementById("nome").value;
    const alertaSucesso = document.getElementById("alertaSucesso");

    // Exibe o alerta no topo com a mensagem personalizada usando o dado do formulário
    alertaSucesso.textContent = `Cadastrado com sucesso! Bem-vindo(a), ${nome}.`;
    alertaSucesso.style.display = "block";

    // Opcional: exibe tambem o alerta do navegador
    alert(`Cadastrado com sucesso! Nome: ${nome}`);

    // Limpa o formulário
    document.getElementById("formCadastro").reset();
}