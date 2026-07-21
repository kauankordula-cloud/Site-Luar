const id = new URLSearchParams(location.search).get("id");
const produtos = window.BRINCOS || [];
const produto = produtos.find(item => item.id === id);
const pagina = document.querySelector("#productPage");
const precoProduto = window.precoProdutoLuar || (item => item.preco);

function categoriaProduto(categoriaId) {
  const categoria = (window.CATEGORIAS || []).find(item => item.id === categoriaId);
  if (!categoria) {
    return { colecao: "CATÁLOGO LUAR", voltar: "← Voltar ao catálogo", tipo: "Modelo feminino" };
  }

  return {
    colecao: categoria.colecao || `COLEÇÃO DE ${categoria.nome.toUpperCase()}`,
    voltar: `← Voltar para ${categoria.nome.toLowerCase()}`,
    tipo: categoria.singular || categoria.nome
  };
}

function tamanhosProduto(item) {
  return Array.isArray(item.tamanhos) ? item.tamanhos.filter(Boolean) : [];
}

function seletorTamanhos(item) {
  const tamanhos = tamanhosProduto(item);
  if (!tamanhos.length) return "";

  return `
      <fieldset class="size-selector" aria-label="Selecionar tamanho do anel">
        <legend>Tamanho disponível</legend>
        <div>
          ${tamanhos.map((tamanho, indice) => `
            <label>
              <input type="radio" name="tamanho-produto" value="${tamanho}" ${indice === 0 ? "checked" : ""}>
              <span>${tamanho}</span>
            </label>`).join("")}
        </div>
      </fieldset>`;
}

if (!produto) {
  pagina.innerHTML = `<div class="not-found"><h1>Peça não encontrada</h1><a href="index.html#produtos">Voltar ao catálogo</a></div>`;
} else {
  document.title = `${produto.nome} | LUAR acessórios`;
  const categoria = categoriaProduto(produto.categoria);
  const voltar = document.querySelector(".back-link");
  if (voltar) voltar.textContent = categoria.voltar;

  const imagensExtras = [
    produto.uso,
    ...(Array.isArray(produto.imagensAdicionais) ? produto.imagensAdicionais : [])
  ].filter(Boolean);
  const tamanhos = tamanhosProduto(produto);
  const tamanhoInicial = tamanhos[0] || "";

  pagina.innerHTML = `
    <section class="product-gallery">
      <figure><img src="${produto.imagem}" alt="${produto.nome} — foto do modelo"><figcaption>Foto do modelo</figcaption></figure>
      ${imagensExtras.map(imagem => `<figure><img src="${imagem}" alt="${produto.nome} em uso"><figcaption>Veja como fica em uso</figcaption></figure>`).join("")}
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
      <p class="consult-price">${precoProduto(produto).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</p>
      ${seletorTamanhos(produto)}
      <button class="whatsapp-button order-add" type="button" data-add-order="${produto.id}" ${tamanhoInicial ? `data-order-size="${tamanhoInicial}"` : ""}>Adicionar ao pedido <span>+</span></button>
      <p class="reservation-note">Monte seu pedido e envie todos os itens pelo WhatsApp.</p>
    </section>`;

  pagina.querySelectorAll('input[name="tamanho-produto"]').forEach(input => {
    input.addEventListener("change", () => {
      const botao = pagina.querySelector("[data-add-order]");
      if (botao) botao.dataset.orderSize = input.value;
    });
  });
}
