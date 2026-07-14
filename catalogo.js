(() => {
  const CAMINHO_CATALOGO = "data/catalogo.json";

  function carregarCatalogo() {
    const requisicao = new XMLHttpRequest();
    requisicao.open("GET", CAMINHO_CATALOGO, false);
    requisicao.send(null);

    if ((requisicao.status >= 200 && requisicao.status < 300) || (requisicao.status === 0 && requisicao.responseText)) {
      return JSON.parse(requisicao.responseText);
    }

    throw new Error(`Não foi possível carregar ${CAMINHO_CATALOGO}`);
  }

  function numero(valor, padrao = 0) {
    const convertido = Number(valor);
    return Number.isFinite(convertido) ? convertido : padrao;
  }

  function produtoDisponivel(produto) {
    return produto.disponivel !== false && produto.disponibilidade !== false;
  }

  function normalizarProduto(produto, indice) {
    const precoPromocional = produto.precoPromocional ?? produto.preco_promocional ?? null;
    const imagensAdicionaisOriginais = Array.isArray(produto.imagensAdicionais)
      ? produto.imagensAdicionais
      : Array.isArray(produto.imagens_adicionais)
        ? produto.imagens_adicionais
        : [];
    const imagensAdicionais = imagensAdicionaisOriginais
      .map(item => typeof item === "string" ? item : item?.imagem)
      .filter(Boolean);

    return {
      ...produto,
      preco: numero(produto.preco),
      precoPromocional: precoPromocional === null || precoPromocional === "" ? null : numero(precoPromocional, null),
      uso: produto.uso || produto.imagemSecundaria || "",
      imagensAdicionais,
      disponivel: produtoDisponivel(produto),
      destaque: Boolean(produto.destaque),
      ordem: numero(produto.ordem, indice + 1)
    };
  }

  function normalizarCategoria(categoria, indice) {
    return {
      ...categoria,
      id: categoria.id,
      nome: categoria.nome || categoria.id,
      singular: categoria.singular || categoria.nome || categoria.id,
      colecao: categoria.colecao || `COLEÇÃO DE ${String(categoria.nome || categoria.id).toUpperCase()}`,
      ordem: numero(categoria.ordem, indice + 1),
      menu: categoria.menu !== false
    };
  }

  const catalogo = carregarCatalogo();
  const categorias = (catalogo.categorias || []).map(normalizarCategoria).sort((a, b) => a.ordem - b.ordem);
  const produtos = (catalogo.produtos || []).map(normalizarProduto).sort((a, b) => a.ordem - b.ordem);

  window.CATALOGO_LUAR = catalogo;
  window.CATEGORIAS = categorias;
  window.TODOS_PRODUTOS = produtos;
  window.BRINCOS = produtos.filter(produtoDisponivel);
  window.precoProdutoLuar = produto => {
    const promocional = produto?.precoPromocional ?? produto?.preco_promocional;
    if (promocional !== null && promocional !== undefined && promocional !== "") return numero(promocional, produto.preco);
    return numero(produto?.preco);
  };
})();
