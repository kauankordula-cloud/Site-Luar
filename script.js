let filtro = "todos";
let termo = "";
const grade = document.querySelector("#productGrid");
const brincos = window.BRINCOS || [];
const categoriasCatalogo = (window.CATEGORIAS || []).filter(categoria => categoria.menu !== false);
const precoProduto = window.precoProdutoLuar || (produto => produto.preco);
const catalogoCarregado = Array.isArray(window.BRINCOS);
let acionadorBusca = null;

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
  if (navegacao) {
    navegacao.innerHTML = categoriasOrdenadas()
      .map(categoria => `<a href="#produtos" data-filter-link="${categoria.id}">${categoria.nome}</a>`)
      .join("");
  }

  const filtros = document.querySelector(".filters");
  if (filtros) {
    filtros.innerHTML = `<button class="filter active" data-filter="todos">Todos</button>` + categoriasOrdenadas()
      .map(categoria => `<button class="filter" data-filter="${categoria.id}">${categoria.nome}</button>`)
      .join("");
  }
}

function intercalarCategorias(produtos) {
  const ordem = categoriasOrdenadas().map(categoria => categoria.id);
  const grupos = new Map();
  produtos.forEach(produto => {
    if (!grupos.has(produto.categoria)) grupos.set(produto.categoria, []);
    grupos.get(produto.categoria).push(produto);
  });

  const categorias = [
    ...ordem.filter(categoria => grupos.has(categoria)),
    ...[...grupos.keys()].filter(categoria => !ordem.includes(categoria))
  ];
  const resultado = [];
  let adicionou = true;

  while (adicionou) {
    adicionou = false;
    categorias.forEach(categoria => {
      const item = grupos.get(categoria)?.shift();
      if (item) {
        resultado.push(item);
        adicionou = true;
      }
    });
  }

  return resultado;
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

  const produtosFiltrados = brincos.filter(produto =>
    (filtro === "todos" || produto.categoria === filtro) &&
    produto.nome.toLowerCase().includes(termo)
  );
  const lista = filtro === "todos" ? intercalarCategorias(produtosFiltrados) : produtosFiltrados;

  grade.innerHTML = lista.map(produto => `
      <article class="product-card" data-product-id="${produto.id}">
        <a class="product-image" href="produto.html?id=${produto.id}">
          <img src="${produto.imagem}" alt="${produto.nome}" loading="lazy">
        </a>
        <button class="favorite" aria-label="Favoritar ${produto.nome}">♡</button>
        <div class="product-info">
          <div><h3><a href="produto.html?id=${produto.id}">${produto.nome}</a></h3><span class="price">${precoProduto(produto).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span></div>
          <p>${textoTipoProduto(produto)}</p>
          <a class="product-link" href="produto.html?id=${produto.id}">Ver detalhes →</a>
          <button class="order-add" type="button" data-add-order="${produto.id}">Adicionar ao pedido</button>
        </div>
      </article>`).join("");

  const vazio = document.querySelector(".empty");
  if (vazio) {
    vazio.textContent = "Nenhuma joia folheada encontrada.";
    vazio.hidden = lista.length > 0;
  }
}

function selecionarFiltro(valor) {
  filtro = valor;
  document.querySelectorAll(".filter").forEach(botao =>
    botao.classList.toggle("active", botao.dataset.filter === valor)
  );
  renderizar();
}

montarNavegacaoCategorias();

document.querySelectorAll(".filter").forEach(botao =>
  botao.addEventListener("click", () => selecionarFiltro(botao.dataset.filter))
);
document.querySelectorAll("[data-filter-link]").forEach(link =>
  link.addEventListener("click", () => selecionarFiltro(link.dataset.filterLink))
);
document.querySelector("#seeAll")?.addEventListener("click", () => selecionarFiltro("todos"));

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
entradaBusca?.addEventListener("input", evento => {
  termo = evento.target.value.trim().toLowerCase();
  selecionarFiltro("todos");
});
document.addEventListener("keydown", evento => {
  if (evento.key !== "Escape") return;
  fecharMenu();
  fecharBusca();
});

const carrosselHero = document.querySelector(".hero-carousel");
if (carrosselHero) {
  const slidesHero = [...carrosselHero.querySelectorAll("[data-hero-slide]")];
  const pontosHero = [...carrosselHero.querySelectorAll("[data-hero-dot]")];
  const anteriorHero = carrosselHero.querySelector("[data-hero-prev]");
  const proximoHero = carrosselHero.querySelector("[data-hero-next]");
  let slideHeroAtual = 0;
  let intervaloHero;
  let toqueHeroX = 0;
  let toqueHeroY = 0;
  let toqueVirouSwipe = false;
  const distanciaMinimaSwipe = 50;

  function mostrarSlideHero(indice) {
    slideHeroAtual = (indice + slidesHero.length) % slidesHero.length;
    slidesHero.forEach((slide, posicao) =>
      slide.classList.toggle("active", posicao === slideHeroAtual)
    );
    pontosHero.forEach((ponto, posicao) => {
      const ativo = posicao === slideHeroAtual;
      ponto.classList.toggle("active", ativo);
      ponto.setAttribute("aria-current", String(ativo));
    });
  }

  function reiniciarHero() {
    clearInterval(intervaloHero);
    intervaloHero = setInterval(() => mostrarSlideHero(slideHeroAtual + 1), 5500);
  }

  if (slidesHero.length > 1) {
    anteriorHero?.addEventListener("click", () => {
      mostrarSlideHero(slideHeroAtual - 1);
      reiniciarHero();
    });
    proximoHero?.addEventListener("click", () => {
      mostrarSlideHero(slideHeroAtual + 1);
      reiniciarHero();
    });
    pontosHero.forEach(ponto =>
      ponto.addEventListener("click", () => {
        mostrarSlideHero(Number(ponto.dataset.heroDot));
        reiniciarHero();
      })
    );
    carrosselHero.addEventListener("pointerdown", evento => {
      if (evento.isPrimary === false) return;
      toqueHeroX = evento.clientX;
      toqueHeroY = evento.clientY;
      toqueVirouSwipe = false;
    });
    carrosselHero.addEventListener("pointerup", evento => {
      if (evento.isPrimary === false) return;
      const diferencaX = evento.clientX - toqueHeroX;
      const diferencaY = evento.clientY - toqueHeroY;
      const movimentoHorizontal = Math.abs(diferencaX) > Math.abs(diferencaY);

      if (!movimentoHorizontal || Math.abs(diferencaX) < distanciaMinimaSwipe) return;

      toqueVirouSwipe = true;
      mostrarSlideHero(slideHeroAtual + (diferencaX < 0 ? 1 : -1));
      reiniciarHero();
    });
    carrosselHero.addEventListener("pointercancel", () => {
      toqueVirouSwipe = false;
    });
    carrosselHero.addEventListener("click", evento => {
      if (!toqueVirouSwipe) return;
      evento.preventDefault();
      evento.stopPropagation();
      toqueVirouSwipe = false;
    }, true);
    carrosselHero.addEventListener("mouseenter", () => clearInterval(intervaloHero));
    carrosselHero.addEventListener("mouseleave", reiniciarHero);
    carrosselHero.addEventListener("focusin", () => clearInterval(intervaloHero));
    carrosselHero.addEventListener("focusout", reiniciarHero);
    reiniciarHero();
  }

  mostrarSlideHero(0);
}

document.querySelectorAll(".reveal").forEach(elemento => elemento.classList.add("visible"));
renderizar();
