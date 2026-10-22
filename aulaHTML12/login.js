function validarFormulario(event) {
    event.preventDefault(); // Impede o envio padrao da pagina

    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const mensagemErro = document.getElementById('mensagemErro');

    mensagemErro.textContent = '';

    if (email.trim() === '' || senha.trim() === '') {
        mensagemErro.textContent = 'Por favor, preencha todos os campos.';
        return false;
    }

    if (senha.length < 6) {
        mensagemErro.textContent = 'A senha deve ter pelo menos 6 caracteres.';
        return false;
    }

    alert('Login realizado com sucesso!');
    return true;
}