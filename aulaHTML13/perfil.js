function validarPerfil(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const nivel = document.getElementById('nivel').value;
    const biografia = document.getElementById('biografia').value.trim();
    const mensagem = document.getElementById('mensagem');

    // Validação de checkboxes
    const interesses = document.querySelectorAll('input[name="interesses"]:checked');

    if (nome === '' || email === '' || nivel === '' || biografia === '') {
        mensagem.className = 'mensagem erro';
        mensagem.textContent = 'Por favor, preencha todos os campos obrigatórios.';
        return false;
    }

    if (interesses.length === 0) {
        mensagem.className = 'mensagem erro';
        mensagem.textContent = 'Selecione pelo menos uma área de interesse.';
        return false;
    }

    if (biografia.length < 15) {
        mensagem.className = 'mensagem erro';
        mensagem.textContent = 'A biografia deve ter pelo menos 15 caracteres.';
        return false;
    }

    mensagem.className = 'mensagem sucesso';
    mensagem.textContent = 'Perfil atualizado com sucesso!';
    
    alert('Perfil salvo com sucesso!');
    return true;
}