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

function descricaoProduto(item, categoria) {
  const descricao = String(item.descricao || "").trim();
  if (descricao && descricao.toLowerCase() !== "undefined") return descricao;
  return `${categoria.tipo} com acabamento delicado e brilho elegante para compor diferentes momentos.`;
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
  const imagensGaleria = [
    { src: produto.imagem, legenda: "Foto do modelo", alt: `${produto.nome} — foto do modelo` },
    ...imagensExtras.map((imagem, indice) => ({
      src: imagem,
      legenda: indice === 0 ? "Veja como fica em uso" : `Veja como fica em uso ${indice + 1}`,
      alt: `${produto.nome} em uso`
    }))
  ].filter(item => item.src);
  const tamanhos = tamanhosProduto(produto);
  const tamanhoInicial = tamanhos[0] || "";
  const descricao = descricaoProduto(produto, categoria);

  pagina.innerHTML = `
    <section class="product-gallery ${imagensGaleria.length === 1 ? "product-gallery-single" : ""}">
      ${imagensGaleria.map(item => `
        <figure>
          <button class="product-zoom-trigger" type="button" data-product-zoom="${item.src}" data-product-zoom-alt="${item.alt}" aria-label="Ampliar ${item.legenda.toLowerCase()}">
            <img src="${item.src}" alt="${item.alt}">
          </button>
          <figcaption>${item.legenda}</figcaption>
        </figure>`).join("")}
    </section>
    <section class="product-detail">
      <p class="eyebrow dark">${categoria.colecao}</p>
      <h1>${produto.nome}</h1>
      <p class="product-description">${descricao}</p>
      <p class="consult-price">${precoProduto(produto).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</p>
      ${seletorTamanhos(produto)}
      <button class="whatsapp-button order-add" type="button" data-add-order="${produto.id}" ${tamanhoInicial ? `data-order-size="${tamanhoInicial}"` : ""}>Adicionar ao pedido <span>+</span></button>
      <p class="reservation-note">Monte seu pedido e envie todos os itens pelo WhatsApp.</p>
      <ul class="product-features">
        <li>Acabamento dourado</li>
        <li>${categoria.tipo}</li>
        <li>Seleção exclusiva LUAR</li>
      </ul>
    </section>
    <div class="product-lightbox" aria-hidden="true" role="dialog" aria-modal="true" aria-label="Imagem ampliada do produto">
      <button class="product-lightbox-close" type="button" aria-label="Fechar imagem ampliada">×</button>
      <img src="" alt="">
    </div>`;

  pagina.querySelectorAll('input[name="tamanho-produto"]').forEach(input => {
    input.addEventListener("change", () => {
      const botao = pagina.querySelector("[data-add-order]");
      if (botao) botao.dataset.orderSize = input.value;
    });
  });

  const lightbox = pagina.querySelector(".product-lightbox");
  const lightboxImagem = lightbox?.querySelector("img");
  const lightboxFechar = lightbox?.querySelector(".product-lightbox-close");
  let acionadorZoom = null;

  function fecharZoom() {
    if (!lightbox || !lightboxImagem) return;
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImagem.removeAttribute("src");
    lightboxImagem.alt = "";
    document.body.classList.remove("product-lightbox-open");
    if (acionadorZoom && document.contains(acionadorZoom)) acionadorZoom.focus();
  }

  pagina.querySelectorAll("[data-product-zoom]").forEach(botao => {
    botao.addEventListener("click", () => {
      if (!lightbox || !lightboxImagem) return;
      acionadorZoom = botao;
      lightboxImagem.src = botao.dataset.productZoom;
      lightboxImagem.alt = botao.dataset.productZoomAlt || "";
      lightbox.classList.add("open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.classList.add("product-lightbox-open");
      lightboxFechar?.focus();
    });
  });

  lightboxFechar?.addEventListener("click", fecharZoom);
  lightbox?.addEventListener("click", evento => {
    if (!evento.target.closest(".product-lightbox img, .product-lightbox-close")) fecharZoom();
  });
  document.addEventListener("keydown", evento => {
    if (evento.key === "Escape" && lightbox?.classList.contains("open")) fecharZoom();
  });
}
