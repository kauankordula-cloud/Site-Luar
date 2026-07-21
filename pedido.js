(() => {
  const CHAVE = "luar-carrinho-pedido";
  const produtos = window.BRINCOS || [];
  const precoProduto = window.precoProdutoLuar || (produto => produto.preco);
  const porId = new Map(produtos.map(produto => [produto.id, produto]));
  const painel = document.querySelector("#orderCart");
  const fundo = document.querySelector(".order-backdrop");
  const lista = document.querySelector(".order-items");
  const rodape = document.querySelector(".order-foot");
  const totalElemento = document.querySelector(".order-total");
  const contadorTexto = document.querySelector(".order-title-count");
  const botaoWhatsApp = document.querySelector(".order-whatsapp");

  let carrinho = carregar();

  function carregar() {
    try {
      const salvo = JSON.parse(localStorage.getItem(CHAVE) || "[]");
      if (!Array.isArray(salvo)) return [];
      return salvo
        .filter(item => porId.has(item.id) && Number.isInteger(item.quantidade) && item.quantidade > 0)
        .map(item => {
          const produto = porId.get(item.id);
          const tamanho = tamanhoValido(produto, item.tamanho) ? String(item.tamanho) : "";
          return { id: item.id, quantidade: item.quantidade, tamanho };
        })
        .filter(item => {
          const produto = porId.get(item.id);
          return !temTamanhos(produto) || item.tamanho;
        });
    } catch {
      return [];
    }
  }

  function salvar() {
    localStorage.setItem(CHAVE, JSON.stringify(carrinho));
  }

  function moeda(valor) {
    return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  }

  function temTamanhos(produto) {
    return Array.isArray(produto?.tamanhos) && produto.tamanhos.length > 0;
  }

  function tamanhoValido(produto, tamanho) {
    return temTamanhos(produto) && produto.tamanhos.map(String).includes(String(tamanho));
  }

  function chaveItem(item) {
    return `${item.id}::${item.tamanho || ""}`;
  }

  function textoTamanho(item) {
    return item.tamanho ? `Tamanho ${item.tamanho}` : "";
  }

  function quantidadeTotal() {
    return carrinho.reduce((total, item) => total + item.quantidade, 0);
  }

  function totalPedido() {
    return carrinho.reduce((total, item) => {
      const produto = porId.get(item.id);
      return total + precoProduto(produto) * item.quantidade;
    }, 0);
  }

  function mensagemWhatsApp() {
    const linhas = carrinho.map(item => {
      const produto = porId.get(item.id);
      const preco = precoProduto(produto);
      const subtotal = preco * item.quantidade;
      const tamanho = textoTamanho(item);
      return `${item.quantidade}x ${produto.nome}${tamanho ? ` (${tamanho})` : ""} - ${moeda(preco)} cada - Subtotal: ${moeda(subtotal)}`;
    });
    return `Olá! Tenho interesse nos seguintes produtos:\n\n${linhas.join("\n")}\n\nTotal do pedido: ${moeda(totalPedido())}`;
  }

  function renderizar() {
    const quantidade = quantidadeTotal();
    document.querySelectorAll(".cart-count").forEach(elemento => {
      elemento.textContent = quantidade;
    });
    if (contadorTexto) contadorTexto.textContent = `(${quantidade})`;

    if (!lista || !rodape) return;
    if (!carrinho.length) {
      lista.innerHTML = `<div class="cart-empty"><i>◇</i><h3>Seu pedido está vazio</h3><p>Adicione os brincos que deseja consultar.</p></div>`;
      rodape.hidden = true;
      return;
    }

    lista.innerHTML = carrinho.map(item => {
      const produto = porId.get(item.id);
      const preco = precoProduto(produto);
      const subtotal = preco * item.quantidade;
      return `
        <article class="order-line" data-order-key="${chaveItem(item)}">
          <img class="order-thumb" src="${produto.imagem}" alt="${produto.nome}">
          <div class="order-line-info">
            <h3>${produto.nome}</h3>
            ${item.tamanho ? `<p class="order-size">${textoTamanho(item)}</p>` : ""}
            <p>${moeda(preco)} cada</p>
            <div class="order-quantity" aria-label="Quantidade de ${produto.nome}">
              <button type="button" data-order-action="decrease" aria-label="Diminuir quantidade">−</button>
              <strong>${item.quantidade}</strong>
              <button type="button" data-order-action="increase" aria-label="Aumentar quantidade">+</button>
            </div>
          </div>
          <div class="order-line-end">
            <strong>${moeda(subtotal)}</strong>
            <button class="order-remove" type="button" data-order-action="remove">Remover</button>
          </div>
        </article>`;
    }).join("");

    rodape.hidden = false;
    totalElemento.textContent = moeda(totalPedido());
    botaoWhatsApp.href = `https://wa.me/5511979716743?text=${encodeURIComponent(mensagemWhatsApp())}`;
  }

  function abrir() {
    painel?.classList.add("open");
    fundo?.classList.add("open");
    painel?.setAttribute("aria-hidden", "false");
    document.body.classList.add("order-open");
  }

  function fechar() {
    painel?.classList.remove("open");
    fundo?.classList.remove("open");
    painel?.setAttribute("aria-hidden", "true");
    document.body.classList.remove("order-open");
  }

  function adicionar(id, tamanho = "") {
    const produto = porId.get(id);
    if (!produto) return;

    if (temTamanhos(produto) && !tamanhoValido(produto, tamanho)) {
      location.href = `produto.html?id=${encodeURIComponent(id)}`;
      return;
    }

    const novoItem = { id, tamanho: tamanho ? String(tamanho) : "" };
    const item = carrinho.find(linha => chaveItem(linha) === chaveItem(novoItem));
    if (item) item.quantidade += 1;
    else carrinho.push({ ...novoItem, quantidade: 1 });
    salvar();
    renderizar();
    abrir();
  }

  document.addEventListener("click", evento => {
    const adicionarBotao = evento.target.closest("[data-add-order]");
    if (adicionarBotao) {
      adicionar(adicionarBotao.dataset.addOrder, adicionarBotao.dataset.orderSize || "");
      return;
    }

    if (evento.target.closest(".order-toggle")) {
      abrir();
      return;
    }
    if (evento.target.closest(".order-close") || evento.target.closest(".order-backdrop")) {
      fechar();
      return;
    }

    const acaoBotao = evento.target.closest("[data-order-action]");
    if (!acaoBotao) return;
    const linha = acaoBotao.closest("[data-order-key]");
    const item = carrinho.find(produto => chaveItem(produto) === linha?.dataset.orderKey);
    if (!item) return;

    if (acaoBotao.dataset.orderAction === "increase") item.quantidade += 1;
    if (acaoBotao.dataset.orderAction === "decrease") item.quantidade -= 1;
    if (acaoBotao.dataset.orderAction === "remove" || item.quantidade <= 0) {
      carrinho = carrinho.filter(produto => chaveItem(produto) !== chaveItem(item));
    }
    salvar();
    renderizar();
  });

  document.addEventListener("keydown", evento => {
    if (evento.key === "Escape") fechar();
  });

  renderizar();
})();
