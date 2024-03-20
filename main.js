class Produto {
    constructor(nomeProduto, marca, cor, preco, descricao) {
        this.nomeProduto = nomeProduto;
        this.marca = marca;
        this.cor = cor;
        this.preco = preco;
        this.descricao = descricao;
    }
}

let novoProduto = null; // Variável para armazenar o novo produto cadastrado

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
    const descricao = document.getElementById('descricao').value;
    novoProduto = new Produto(nomeProduto, marca, cor, preco, descricao);
    mostrarTelaFinal();
}

function mostrarTelaFinal() {
    document.getElementById('tela-cadastro').style.display = 'none';
    document.getElementById('tela-final').style.display = 'block';
    const cardCadastro = document.getElementById('card-cadastro');
    cardCadastro.innerHTML = `
        <div class="card" style="background-color: ${novoProduto.cor};">
            <h3>${novoProduto.nomeProduto}</h3>
            <p><strong>Marca:</strong> ${novoProduto.marca}</p>
            <p><strong>Cor:</strong> ${novoProduto.cor}</p>
            <p><strong>Preço:</strong> R$ ${novoProduto.preco.toFixed(2)}</p>
            <p><strong>Descrição:</strong> ${novoProduto.descricao}</p>
        </div>
    `;
}

// Event Listener para o formulário de cadastro
document.getElementById('cadastro-form').addEventListener('submit', cadastrarProduto);
