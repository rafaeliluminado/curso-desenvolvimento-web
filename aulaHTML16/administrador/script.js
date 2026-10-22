// Função para carregar os dados da linha clicada no formulário
function carregarNoFormulario(id, nome, email, cargo) {
    document.getElementById("id").value = id;
    document.getElementById("nome").value = nome;
    document.getElementById("email").value = email;
    document.getElementById("cargo").value = cargo;
}

// Função simulada de salvamento
function salvarAlteracao() {
    const id = document.getElementById("id").value;
    
    if (!id) {
        alert("Selecione um usuário na tabela primeiro!");
        return;
    }

    alert(`Dados do usuário ID ${id} atualizados com sucesso!`);
}