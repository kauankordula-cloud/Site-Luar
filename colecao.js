const produtos = window.BRINCOS || [];
const categoriasCatalogo = (window.CATEGORIAS || []).filter(categoria => categoria.menu !== false);
const precoProduto = window.precoProdutoLuar || (produto => produto.preco);
const grade = document.querySelector("#collectionGrid");
let termo = "";
const catalogoCarregado = Array.isArray(window.BRINCOS);
let acionadorBusca = null;

const nomesColecao = [
  "Pulseira Esferas Elegance Dourada",
  "Pulseira Folhas de Luz Dourada",
  "Pulseira Coração Riviera Dourada",
  "Conjunto Coração de Luz",
  "Conjunto Margarida",
  "Conjunto Infinito Radiante Dourado",
  "Conjunto Árvore da Vida Dourado",
  "Bracelete Malha Laço Dourado",
  "Bracelete Folhagem de Cristais Dourado",
  "Bracelete Aro Urbano Dourado",
  "Conjunto Leque Cristal Dourado",
  "Conjunto Espiral Solar Dourado"
];

function categoriasOrdenadas() {
  return [...categoriasCatalogo].sort((a, b) => a.ordem - b.ordem);
}

function categoriaPorId(id) {
  return categoriasCatalogo.find(categoria => categoria.id === id);
}

function textoTipoProduto(produto) {
  const categoria = categoriaPorId(produto.categoria);
  return categoria?.singular || "Modelo feminino";
}

function montarNavegacaoCategorias() {
  const navegacao = document.querySelector("#mainNav");
  if (!navegacao) return;

  navegacao.innerHTML = categoriasOrdenadas()
    .map(categoria => `<a href="index.html#produtos">${categoria.nome}</a>`)
    .join("");
}

function produtosColecao() {
  return nomesColecao
    .map(nome => produtos.find(produto => produto.nome === nome))
    .filter(Boolean);
}

function urlProduto(produto) {
  return `produto.html?id=${encodeURIComponent(produto.id)}`;
}

function renderizar() {
  if (!grade) return;
  if (!catalogoCarregado) {
    grade.innerHTML = "";
    const vazio = document.querySelector(".empty");
    if (vazio) {
      vazio.textContent = "Não foi possível carregar o catálogo. Atualize a página e tente novamente.";
      vazio.hidden = false;
    }
    return;
  }

  const lista = produtosColecao().filter(produto =>
    produto.nome.toLowerCase().includes(termo)
  );

  grade.innerHTML = lista.map(produto => `
      <article class="product-card" data-product-id="${produto.id}">
        <a class="product-image" href="${urlProduto(produto)}">
          <img src="${produto.imagem}" alt="${produto.nome}" loading="lazy">
        </a>
        <button class="favorite" aria-label="Favoritar ${produto.nome}">♡</button>
        <div class="product-info">
          <div><h3><a href="${urlProduto(produto)}">${produto.nome}</a></h3><span class="price">${precoProduto(produto).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span></div>
          <p>${textoTipoProduto(produto)}</p>
          <a class="product-link" href="${urlProduto(produto)}">Ver detalhes →</a>
          <button class="order-add" type="button" data-add-order="${produto.id}">Adicionar ao pedido</button>
        </div>
      </article>`).join("");

  const vazio = document.querySelector(".empty");
  if (vazio) {
    vazio.textContent = "Nenhuma joia folheada encontrada.";
    vazio.hidden = lista.length > 0;
  }
}

montarNavegacaoCategorias();

grade.addEventListener("click", evento => {
  const favorito = evento.target.closest(".favorite");
  if (!favorito) return;
  favorito.classList.toggle("active");
  favorito.textContent = favorito.classList.contains("active") ? "♥" : "♡";
});

const busca = document.querySelector(".search-panel");
const botaoBusca = document.querySelector(".search-toggle");
const fecharBuscaBotao = document.querySelector(".search-close");
const entradaBusca = document.querySelector("#searchInput");
function abrirBusca(botao) {
  if (!busca) return;
  window.dispatchEvent(new CustomEvent("luar:close-order"));
  fecharMenu();
  acionadorBusca = botao || document.activeElement;
  busca.classList.add("open");
  busca.setAttribute("aria-hidden", "false");
  botaoBusca?.setAttribute("aria-expanded", "true");
  document.body.classList.add("search-open");
  window.setTimeout(() => entradaBusca?.focus(), 80);
}
function fecharBusca() {
  if (!busca) return;
  busca.classList.remove("open");
  busca.setAttribute("aria-hidden", "true");
  botaoBusca?.setAttribute("aria-expanded", "false");
  document.body.classList.remove("search-open");
  if (acionadorBusca && document.contains(acionadorBusca)) acionadorBusca.focus();
}
botaoBusca?.setAttribute("aria-expanded", "false");
botaoBusca?.setAttribute("aria-controls", "searchInput");
botaoBusca?.addEventListener("click", () => abrirBusca(botaoBusca));
fecharBuscaBotao?.addEventListener("click", fecharBusca);
window.addEventListener("luar:close-search", fecharBusca);
entradaBusca?.addEventListener("input", evento => {
  termo = evento.target.value.trim().toLowerCase();
  renderizar();
});

const menu = document.querySelector(".menu");
const navegacao = document.querySelector("#mainNav");
function atualizarBotaoMenu(aberto) {
  if (!menu) return;
  menu.setAttribute("aria-expanded", String(Boolean(aberto)));
  menu.setAttribute("aria-label", aberto ? "Fechar menu" : "Menu");
  menu.textContent = aberto ? "×" : "☰";
}
atualizarBotaoMenu(false);
function fecharMenu() {
  navegacao?.classList.remove("open");
  document.body.classList.remove("menu-open");
  atualizarBotaoMenu(false);
}

menu?.addEventListener("click", () => {
  const aberto = navegacao?.classList.toggle("open");
  document.body.classList.toggle("menu-open", Boolean(aberto));
  atualizarBotaoMenu(Boolean(aberto));
});
navegacao?.querySelectorAll("a").forEach(link => link.addEventListener("click", fecharMenu));
document.addEventListener("click", evento => {
  if (!evento.target.closest(".header")) {
    fecharMenu();
    if (busca?.classList.contains("open") && !evento.target.closest(".search-panel")) fecharBusca();
  }
});
window.addEventListener("resize", () => {
  if (window.innerWidth > 900) fecharMenu();
});
document.addEventListener("keydown", evento => {
  if (evento.key !== "Escape") return;
  fecharMenu();
  fecharBusca();
});

document.querySelectorAll(".reveal").forEach(elemento => elemento.classList.add("visible"));
renderizar();
