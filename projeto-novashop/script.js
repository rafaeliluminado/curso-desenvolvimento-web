// 1. Dados dos Produtos (Simulando um Banco de Dados)
const produtos = [
    { id: 1, nome: "Smartphone Nova Pro", preco: 1899.90 },
    { id: 2, nome: "Notebook TechFast", preco: 3499.00 },
    { id: 3, nome: "Fone Bluetooth Bass", preco: 199.90 },
    { id: 4, nome: "Smartwatch Fit", preco: 299.00 }
];

// Variável para controlar o carrinho
let totalItensCarrinho = 0;

// 2. Função para exibir os produtos na tela
function renderizarProdutos() {
    const container = document.getElementById('grid-produtos');
    container.innerHTML = ''; // Limpa o container

    produtos.forEach(produto => {
        // Cria o elemento HTML de cada produto
        const card = document.createElement('div');
        card.classList.add('card-produto');

        card.innerHTML = `
            <h3>${produto.nome}</h3>
            <p class="preco">R$ ${produto.preco.toFixed(2).replace('.', ',')}</p>
            <button onclick="adicionarAoCarrinho()">Adicionar ao Carrinho</button>
        `;

        container.appendChild(card);
    });
}

// 3. Função para incrementar o carrinho
function adicionarAoCarrinho() {
    totalItensCarrinho++;
    document.getElementById('contador-carrinho').innerText = totalItensCarrinho;
    alert("Produto adicionado ao carrinho!");
}

// Executa a renderização assim que a página carrega
renderizarProdutos();