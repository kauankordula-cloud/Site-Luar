let filtro = "todos";
let termo = "";
const grade = document.querySelector("#productGrid");
const brincos = window.BRINCOS;

function intercalarCategorias(produtos) {
  const ordem = ["brincos", "relogios", "colares", "conjuntos", "pulseiras", "aneis"];
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
  const produtosFiltrados = brincos.filter(produto =>
    (filtro === "todos" || produto.categoria === filtro) &&
    produto.nome.toLowerCase().includes(termo)
  );
  const lista = filtro === "todos" ? intercalarCategorias(produtosFiltrados) : produtosFiltrados;

  grade.innerHTML = lista.map(produto => {
    const tipoProduto = {
      conjuntos: "Conjunto de semijoias",
      relogios: "Relógio feminino",
      pulseiras: "Pulseira feminina",
      colares: "Colar feminino"
    }[produto.categoria] || "Brinco dourado";
    return `
      <article class="product-card">
        <a class="product-image" href="produto.html?id=${produto.id}">
          <img src="${produto.imagem}" alt="${produto.nome}" loading="lazy">
        </a>
        <button class="favorite" aria-label="Favoritar ${produto.nome}">♡</button>
        <div class="product-info">
          <div><h3><a href="produto.html?id=${produto.id}">${produto.nome}</a></h3><span class="price">${produto.preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span></div>
          <p>${tipoProduto}</p>
          <a class="product-link" href="produto.html?id=${produto.id}">Ver detalhes →</a>
          <button class="order-add" type="button" data-add-order="${produto.id}">Adicionar ao pedido</button>
        </div>
      </article>`;
  }).join("");

  document.querySelector(".empty").hidden = lista.length > 0;
}

function selecionarFiltro(valor) {
  filtro = valor;
  document.querySelectorAll(".filter").forEach(botao =>
    botao.classList.toggle("active", botao.dataset.filter === valor)
  );
  renderizar();
}

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
document.querySelector(".search-toggle")?.addEventListener("click", () => busca.classList.add("open"));
document.querySelector(".search-close")?.addEventListener("click", () => busca.classList.remove("open"));

const menu = document.querySelector(".menu");
const navegacao = document.querySelector("#mainNav");
function fecharMenu() {
  navegacao?.classList.remove("open");
  menu?.setAttribute("aria-expanded", "false");
}
menu?.addEventListener("click", () => {
  const aberto = navegacao?.classList.toggle("open");
  menu.setAttribute("aria-expanded", String(Boolean(aberto)));
});
navegacao?.querySelectorAll("a").forEach(link => link.addEventListener("click", fecharMenu));
document.addEventListener("click", evento => {
  if (!evento.target.closest(".header")) fecharMenu();
});
window.addEventListener("resize", () => {
  if (window.innerWidth > 900) fecharMenu();
});
document.querySelector("#searchInput")?.addEventListener("input", evento => {
  termo = evento.target.value.trim().toLowerCase();
  selecionarFiltro("todos");
});

document.querySelector("#newsletterForm")?.addEventListener("submit", evento => {
  evento.preventDefault();
  const aviso = document.querySelector(".toast");
  aviso.textContent = "Cadastro realizado com sucesso!";
  aviso.classList.add("show");
  setTimeout(() => aviso.classList.remove("show"), 2200);
  evento.target.reset();
});

document.querySelectorAll(".reveal").forEach(elemento => elemento.classList.add("visible"));
renderizar();
