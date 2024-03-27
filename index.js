class Produto {
    constructor(nomeProduto, marca, cor, preco, imagem, descricao) {
        this.nomeProduto = nomeProduto;
        this.marca = marca;
        this.cor = cor;
        this.preco = preco;
        this.imagem = imagem;
        this.descricao = descricao;
    }
}

let produtos = [];

document.getElementById('cadastro-form').addEventListener('submit', cadastrarProduto);
document.getElementById('cadastrar-mais-produtos').addEventListener('click', mostrarTelaCadastro);

// Carregar produtos do localStorage quando a página for carregada
document.addEventListener('DOMContentLoaded', () => {
    const produtosArmazenados = JSON.parse(localStorage.getItem('produtos'));
    if (produtosArmazenados) {
        produtos = produtosArmazenados;
        mostrarTelaFinal();
    }
});

function mostrarTelaCadastro() {
    document.getElementById('caixa-bem-vindo').style.display = 'none';
    document.getElementById('tela-final').style.display = 'none';
    document.getElementById('tela-cadastro').style.display = 'block';
}

function cadastrarProduto(event) {
    event.preventDefault();
    const nomeProduto = document.getElementById('nomeProduto').value;
    const marca = document.getElementById('marca').value;
    const cor = document.getElementById('cor').value;
    const preco = parseFloat(document.getElementById('preco').value);
    const imagem = document.getElementById('imagem').value;
    const descricao = document.getElementById('descricao').value;
    const novoProduto = new Produto(nomeProduto, marca, cor, preco, imagem, descricao);
    produtos.push(novoProduto);
    salvarProdutos();
    mostrarTelaFinal();
}

function mostrarTelaFinal() {
    document.getElementById('tela-cadastro').style.display = 'none';
    document.getElementById('tela-final').style.display = 'block';
    const listaProdutos = document.getElementById('lista-produtos');
    listaProdutos.innerHTML = '';
    produtos.forEach(produto => {
        listaProdutos.innerHTML += `
            <div class="produto-item">
                <h3>${produto.nomeProduto}</h3>
                <p><strong>Marca:</strong> ${produto.marca}</p>
                <p><strong>Cor:</strong> ${produto.cor}</p>
                <p><strong>Preço:</strong> R$ ${produto.preco.toFixed(2)}</p>
                <img src="${produto.imagem}" alt="${produto.nomeProduto}">
                <p><strong>Descrição:</strong> ${produto.descricao}</p>
                <button onclick="editarProduto('${produto.nomeProduto}')">Editar</button>
                <button onclick="excluirProduto('${produto.nomeProduto}')">Excluir</button>
            </div>
        `;
    });
}

function salvarProdutos() {
    localStorage.setItem('produtos', JSON.stringify(produtos));
}

function editarProduto(nomeProduto) {
    const produtoIndex = produtos.findIndex(produto => produto.nomeProduto === nomeProduto);
    if (produtoIndex !== -1) {
        const produto = produtos[produtoIndex];
        document.getElementById('nomeProduto').value = produto.nomeProduto;
        document.getElementById('marca').value = produto.marca;
        document.getElementById('cor').value = produto.cor;
        document.getElementById('preco').value = produto.preco;
        document.getElementById('imagem').value = produto.imagem;
        document.getElementById('descricao').value = produto.descricao;
        produtos.splice(produtoIndex, 1);
        mostrarTelaCadastro();
    }
}

function excluirProduto(nomeProduto) {
    produtos = produtos.filter(produto => produto.nomeProduto !== nomeProduto);
    salvarProdutos();
    mostrarTelaFinal();
}
function pesquisarProduto() {
    const termoPesquisa = document.getElementById('pesquisa').value.toLowerCase();
    const produtosFiltrados = produtos.filter(produto => produto.nomeProduto.toLowerCase().includes(termoPesquisa));
    exibirProdutos(produtosFiltrados);
}

function exibirProdutos(produtosExibidos) {
    const listaProdutos = document.getElementById('lista-produtos');
    listaProdutos.innerHTML = '';
    produtosExibidos.forEach(produto => {
        listaProdutos.innerHTML += `
            <div class="produto-item">
                <h3>${produto.nomeProduto}</h3>
                <p><strong>Marca:</strong> ${produto.marca}</p>
                <p><strong>Cor:</strong> ${produto.cor}</p>
                <p><strong>Preço:</strong> R$ ${produto.preco.toFixed(2)}</p>
                <img src="${produto.imagem}" alt="${produto.nomeProduto}">
                <p><strong>Descrição:</strong> ${produto.descricao}</p>
                <button onclick="editarProduto('${produto.nomeProduto}')">Editar</button>
                <button onclick="excluirProduto('${produto.nomeProduto}')">Excluir</button>
            </div>
        `;
    });
}