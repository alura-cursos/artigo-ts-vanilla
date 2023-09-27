"use strict";
// Selecionando elementos do DOM
const formularioItem = document.getElementById('formularioItem');
const listaItens = document.getElementById('listaItens');
const inputItem = document.getElementById('item');
// Carregando itens do localStorage
const carregarItens = () => {
    const itens = localStorage.getItem('itens');
    return itens ? JSON.parse(itens) : [];
};
// Salvando itens no localStorage
const salvarItens = (itens) => {
    localStorage.setItem('itens', JSON.stringify(itens));
};
// Adicionando um novo item
const adicionarItem = (nome) => {
    const itens = carregarItens();
    const novoItem = {
        id: new Date().toISOString(),
        nome
    };
    itens.push(novoItem);
    salvarItens(itens);
};
// Removendo um item pelo ID
const removerItem = (id) => {
    const itens = carregarItens();
    const itensAtualizados = itens.filter(item => item.id !== id);
    salvarItens(itensAtualizados);
};
// Editando um item pelo ID
const editarItem = (id, novoNome) => {
    const itens = carregarItens();
    const item = itens.find(item => item.id === id);
    if (item) {
        item.nome = novoNome;
        salvarItens(itens);
    }
};
// Renderizando a lista de itens
const renderizarItens = () => {
    const itens = carregarItens();
    listaItens.innerHTML = '';
    itens.forEach(item => {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item';
        listItem.textContent = item.nome;
        listaItens.appendChild(listItem);
        // Adicionando eventos para editar e remover o item
        listItem.addEventListener('dblclick', () => {
            const novoNome = prompt('Editar item:', item.nome);
            if (novoNome !== null)
                editarItem(item.id, novoNome);
            renderizarItens();
        });
    });
};
// Inicializando a aplicação
formularioItem.addEventListener('submit', (e) => {
    e.preventDefault();
    const nome = inputItem.value.trim();
    if (nome) {
        adicionarItem(nome);
        inputItem.value = '';
        renderizarItens();
    }
});
// Renderizando itens ao carregar a página
renderizarItens();
