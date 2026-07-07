const id = new URLSearchParams(location.search).get("id");
const brincos = window.BRINCOS;
const produto = brincos.find(item => item.id === id);
const pagina = document.querySelector("#productPage");

if (!produto) {
  pagina.innerHTML = `<div class="not-found"><h1>Peça não encontrada</h1><a href="index.html#produtos">Voltar ao catálogo</a></div>`;
} else {
  document.title = `${produto.nome} | LUAR acessórios`;
  const categoria = {
    brincos: { colecao: "COLEÇÃO DE BRINCOS", voltar: "← Voltar para brincos", tipo: "Modelo feminino" },
    conjuntos: { colecao: "COLEÇÃO DE CONJUNTOS", voltar: "← Voltar para conjuntos", tipo: "Conjunto feminino" },
    relogios: { colecao: "COLEÇÃO DE RELÓGIOS", voltar: "← Voltar para relógios", tipo: "Relógio feminino" },
    pulseiras: { colecao: "COLEÇÃO DE PULSEIRAS", voltar: "← Voltar para pulseiras", tipo: "Pulseira feminina" },
    colares: { colecao: "COLEÇÃO DE COLARES", voltar: "← Voltar para colares", tipo: "Colar feminino" }
  }[produto.categoria] || { colecao: "CATÁLOGO LUAR", voltar: "← Voltar ao catálogo", tipo: "Modelo feminino" };
  const voltar = document.querySelector(".back-link");
  if (voltar) voltar.textContent = categoria.voltar;
  pagina.innerHTML = `
    <section class="product-gallery">
      <figure><img src="${produto.imagem}" alt="${produto.nome} — foto do modelo"><figcaption>Foto do modelo</figcaption></figure>
      ${produto.uso ? `<figure><img src="${produto.uso}" alt="${produto.nome} em uso"><figcaption>Veja como fica em uso</figcaption></figure>` : ""}
    </section>
    <section class="product-detail">
      <p class="eyebrow dark">${categoria.colecao}</p>
      <h1>${produto.nome}</h1>
      <p class="product-description">${produto.descricao}</p>
      <ul class="product-features">
        <li>Acabamento dourado</li>
        <li>${categoria.tipo}</li>
        <li>Seleção exclusiva LUAR</li>
      </ul>
      <p class="consult-price">${produto.preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</p>
      <button class="whatsapp-button order-add" type="button" data-add-order="${produto.id}">Adicionar ao pedido <span>+</span></button>
      <p class="reservation-note">Monte seu pedido e envie todos os itens pelo WhatsApp.</p>
    </section>`;
}
