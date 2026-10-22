const campo02 = document.getElementById("campo02");

// Função acionada ao clicar no botão "Habilitar"
function habilitarCampo() {
    campo02.disabled = false;
    campo02.focus(); // Coloca o foco diretamente no input
}

// Quando o campo02 perder o foco (blur), ele é desabilitado novamente
campo02.addEventListener("blur", function() {
    campo02.disabled = true;
});