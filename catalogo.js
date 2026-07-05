window.BRINCOS = [
  ["brinco-01", "Argola Trançada", "Círculos torcidos com acabamento dourado e presença elegante."],
  ["brinco-02", "Folha Serena", "Folhas alongadas de inspiração orgânica para um visual marcante."],
  ["brinco-03", "Nó Dourado", "Tramas arredondadas que formam um nó clássico e sofisticado."],
  ["brinco-04", "Coração Entrelaçado", "Linhas delicadas desenham um coração leve e romântico."],
  ["brinco-05", "Triângulo Textura", "Geometria triangular com camadas texturizadas em alto-relevo."],
  ["brinco-06", "Coração Pontilhado", "Coração vazado com contorno de pequenas esferas douradas."],
  ["brinco-07", "Quadrado Aura", "Forma quadrada orgânica com textura minuciosa e centro vazado."],
  ["brinco-08", "Gota Clássica", "Gota vazada de linhas limpas, feita para acompanhar qualquer ocasião."],
  ["brinco-09", "Orgânico Livre", "Contorno fluido e contemporâneo inspirado nas formas da natureza."],
  ["brinco-10", "Nó Quadrado", "Encontro de linhas douradas em um pequeno nó geométrico."],
  ["brinco-11", "Coração Trama", "Coração estruturado por uma trama delicada e cheia de personalidade."],
  ["brinco-12", "Folha Dupla", "Duas folhas sobrepostas com linhas finas e acabamento acetinado."],
  ["brinco-13", "Horizonte", "Desenho escultural aberto que alonga e ilumina o rosto."],
  ["brinco-14", "Concha Serena", "Concha vazada de textura artesanal e inspiração praiana."],
  ["brinco-15", "Gota Cristal", "Gota tridimensional com uma faixa luminosa de cristais."],
  ["brinco-16", "Leque Solar", "Leques plissados em camadas para uma presença inesquecível."],
  ["brinco-17", "Pétala Escultural", "Pétalas metálicas de superfície orgânica e brilho intenso."],
  ["brinco-18", "Elo Orgânico", "Elos irregulares sobrepostos em uma composição moderna."],
  ["brinco-19", "Laço Dourado", "Laço escultural delicado, feminino e cheio de movimento."],
  ["brinco-20", "Estrela do Mar", "Estrela do mar texturizada para looks solares e descontraídos."],
  ["brinco-21", "Costela-de-Adão", "Folha tropical detalhada com volume e brilho marcante."],
  ["brinco-22", "Gota Solar", "Gota alongada com textura pontilhada e contorno polido."]
].map(([id, nome, descricao], index) => ({
  id,
  nome,
  descricao,
  categoria: "brincos",
  preco: 9.99,
  estoque: 1,
  imagem: `assets/brincos/brinco-${String(index + 1).padStart(2, "0")}.jpg`,
  uso: `assets/brincos/uso-${String(index + 1).padStart(2, "0")}.png`
}));

window.BRINCOS = window.BRINCOS.concat([
  {
    id: "conjunto-01",
    nome: "Conjunto Bambu",
    descricao: "Argolas e colar dourados com formas inspiradas no bambu.",
    categoria: "conjuntos",
    preco: 25,
    imagem: "assets/conjuntos/conjunto-01.png",
    uso: "assets/conjuntos/uso-01.jpeg"
  },
  {
    id: "conjunto-02",
    nome: "Conjunto Pérola Orgânica",
    descricao: "Colar e brincos com pérolas orgânicas e contorno dourado.",
    categoria: "conjuntos",
    preco: 25,
    imagem: "assets/conjuntos/conjunto-02.png",
    uso: "assets/conjuntos/uso-02.png"
  },
  {
    id: "conjunto-03",
    nome: "Conjunto Gota de Luz",
    descricao: "Colar, brincos e pulseira com gotas de cristal delicadas.",
    categoria: "conjuntos",
    preco: 25,
    imagem: "assets/conjuntos/conjunto-03.png",
    uso: "assets/conjuntos/uso-03.jpeg"
  },
  {
    id: "conjunto-04",
    nome: "Conjunto Concha Dourada",
    descricao: "Colar e brincos de concha com textura marcante e acabamento dourado.",
    categoria: "conjuntos",
    preco: 25,
    imagem: "assets/conjuntos/conjunto-04.png",
    uso: "assets/conjuntos/uso-04.jpeg"
  },
  {
    id: "conjunto-05",
    nome: "Conjunto Esmeralda",
    descricao: "Colar e brincos com pedras verdes em formato de gota e cristais.",
    categoria: "conjuntos",
    preco: 25,
    imagem: "assets/conjuntos/conjunto-05.png",
    uso: "assets/conjuntos/uso-05.jpeg"
  },
  {
    id: "conjunto-06",
    nome: "Conjunto Coração de Luz",
    descricao: "Colar e brincos de coração contornados por cristais delicados.",
    categoria: "conjuntos",
    preco: 25,
    imagem: "assets/conjuntos/conjunto-06.png",
    uso: "assets/conjuntos/uso-06.jpeg"
  },
  {
    id: "conjunto-07",
    nome: "Conjunto Margarida",
    descricao: "Colar e brincos florais de margarida branca com centro amarelo.",
    categoria: "conjuntos",
    preco: 25,
    imagem: "assets/conjuntos/conjunto-07.png",
    uso: "assets/conjuntos/uso-07.jpeg"
  },
  {
    id: "conjunto-08",
    nome: "Conjunto Trevo Ônix",
    descricao: "Colares e brincos de trevo preto com delicado contorno dourado.",
    categoria: "conjuntos",
    preco: 25,
    imagem: "assets/conjuntos/conjunto-08.png",
    uso: "assets/conjuntos/uso-08.jpeg"
  },
  {
    id: "conjunto-09",
    nome: "Conjunto Árvore da Vida",
    descricao: "Colar com medalha Árvore da Vida acompanhado por argolas douradas.",
    categoria: "conjuntos",
    preco: 25,
    imagem: "assets/conjuntos/conjunto-09.png",
    uso: "assets/conjuntos/uso-09.jpeg"
  },
  {
    id: "conjunto-10",
    nome: "Conjunto Flor Azul",
    descricao: "Colar e brincos florais em branco e azul com acabamento dourado.",
    categoria: "conjuntos",
    preco: 25,
    imagem: "assets/conjuntos/conjunto-10.png",
    uso: "assets/conjuntos/uso-10.jpeg"
  }
]);

window.BRINCOS = window.BRINCOS.concat([
  {
    id: "conjunto-11",
    nome: "Conjunto Rosa Geométrica",
    descricao: "Colar e brincos quadrados com rosa central e contorno de cristais.",
    categoria: "conjuntos",
    preco: 25,
    imagem: "assets/conjuntos/conjunto-11.png",
    uso: "assets/conjuntos/uso-11.jpeg"
  },
  {
    id: "conjunto-12",
    nome: "Conjunto Trevo de Cristais",
    descricao: "Colar e brincos de trevo totalmente iluminados por cristais.",
    categoria: "conjuntos",
    preco: 25,
    imagem: "assets/conjuntos/conjunto-12.png",
    uso: "assets/conjuntos/uso-12.jpeg"
  },
  {
    id: "conjunto-13",
    nome: "Conjunto Trevo Pérola",
    descricao: "Colar e brincos de trevo com efeito perolado e contorno dourado.",
    categoria: "conjuntos",
    preco: 25,
    imagem: "assets/conjuntos/conjunto-13.png",
    uso: "assets/conjuntos/uso-13.png"
  },
  {
    id: "conjunto-14",
    nome: "Conjunto Ônix Orgânico",
    descricao: "Colar e brincos com pedras pretas orgânicas em moldura dourada.",
    categoria: "conjuntos",
    preco: 25,
    imagem: "assets/conjuntos/conjunto-14.png",
    uso: "assets/conjuntos/uso-14.png"
  },
  {
    id: "conjunto-15",
    nome: "Conjunto Riviera Ônix",
    descricao: "Colar Riviera e brincos com pedras pretas e pontos de cristal.",
    categoria: "conjuntos",
    preco: 25,
    imagem: "assets/conjuntos/conjunto-15.png",
    uso: "assets/conjuntos/uso-15.jpeg"
  },
  {
    id: "conjunto-16",
    nome: "Conjunto Horizonte Dourado",
    descricao: "Colar delicado com detalhe orgânico e argolas quadradas douradas.",
    categoria: "conjuntos",
    preco: 25,
    imagem: "assets/conjuntos/conjunto-16.png",
    uso: "assets/conjuntos/uso-16.jpeg"
  }
]);

window.BRINCOS = window.BRINCOS.concat([
  {
    id: "relogio-amarelo",
    nome: "Relógio Feminino - Amarelo",
    descricao: "Relógio feminino dourado com mostrador interno amarelo.",
    categoria: "relogios",
    preco: 59.90,
    imagem: "assets/relogios/relogio-amarelo.jpeg"
  },
  {
    id: "relogio-azul",
    nome: "Relógio Feminino - Azul",
    descricao: "Relógio feminino dourado com mostrador interno azul.",
    categoria: "relogios",
    preco: 59.90,
    imagem: "assets/relogios/relogio-azul.png"
  },
  {
    id: "relogio-preto",
    nome: "Relógio Feminino - Preto",
    descricao: "Relógio feminino dourado com mostrador interno preto.",
    categoria: "relogios",
    preco: 59.90,
    imagem: "assets/relogios/relogio-preto.png"
  },
  {
    id: "relogio-rosa",
    nome: "Relógio Feminino - Rosa",
    descricao: "Relógio feminino dourado com mostrador interno rosa.",
    categoria: "relogios",
    preco: 59.90,
    imagem: "assets/relogios/relogio-rosa.png"
  },
  {
    id: "relogio-branco",
    nome: "Relógio Feminino - Branco",
    descricao: "Relógio feminino dourado com mostrador interno branco.",
    categoria: "relogios",
    preco: 59.90,
    imagem: "assets/relogios/relogio-branco.png"
  }
]);

window.BRINCOS = window.BRINCOS.concat([
  {
    id: "pulseira-01",
    nome: "Pulseira Feminina 01",
    descricao: "Pulseira feminina dourada, delicada e versátil.",
    categoria: "pulseiras",
    preco: 19.90,
    imagem: "assets/pulseiras/pulseira-01.png",
    uso: "assets/pulseiras/uso-01.png"
  },
  {
    id: "pulseira-02",
    nome: "Pulseira Feminina 02",
    descricao: "Pulseira feminina dourada com acabamento elegante.",
    categoria: "pulseiras",
    preco: 19.90,
    imagem: "assets/pulseiras/pulseira-02.png",
    uso: "assets/pulseiras/uso-02.png"
  },
  {
    id: "pulseira-03",
    nome: "Pulseira Feminina 03",
    descricao: "Pulseira feminina dourada para compor looks delicados.",
    categoria: "pulseiras",
    preco: 19.90,
    imagem: "assets/pulseiras/pulseira-03.png",
    uso: "assets/pulseiras/uso-03.png"
  },
  {
    id: "pulseira-04",
    nome: "Pulseira Feminina 04",
    descricao: "Pulseira feminina dourada com design contemporâneo.",
    categoria: "pulseiras",
    preco: 19.90,
    imagem: "assets/pulseiras/pulseira-04.png",
    uso: "assets/pulseiras/uso-04.jpg"
  },
  {
    id: "pulseira-05",
    nome: "Pulseira Feminina 05",
    descricao: "Pulseira feminina dourada com detalhes sofisticados.",
    categoria: "pulseiras",
    preco: 19.90,
    imagem: "assets/pulseiras/pulseira-05.png",
    uso: "assets/pulseiras/uso-05.png"
  },
  {
    id: "pulseira-06",
    nome: "Pulseira Feminina 06",
    descricao: "Pulseira feminina dourada com brilho delicado.",
    categoria: "pulseiras",
    preco: 19.90,
    imagem: "assets/pulseiras/pulseira-06.png",
    uso: "assets/pulseiras/uso-06.png"
  },
  {
    id: "pulseira-07",
    nome: "Pulseira Feminina 07",
    descricao: "Pulseira feminina dourada de estilo moderno.",
    categoria: "pulseiras",
    preco: 19.90,
    imagem: "assets/pulseiras/pulseira-07.png",
    uso: "assets/pulseiras/uso-07.png"
  },
  {
    id: "pulseira-08",
    nome: "Pulseira Feminina 08",
    descricao: "Pulseira feminina dourada para todas as ocasiões.",
    categoria: "pulseiras",
    preco: 19.90,
    imagem: "assets/pulseiras/pulseira-08.png",
    uso: "assets/pulseiras/uso-08.png"
  },
  {
    id: "pulseira-09",
    nome: "Pulseira Feminina 09",
    descricao: "Pulseira feminina dourada com acabamento refinado.",
    categoria: "pulseiras",
    preco: 19.90,
    imagem: "assets/pulseiras/pulseira-09.png",
    uso: "assets/pulseiras/uso-09.png"
  },
  {
    id: "pulseira-10",
    nome: "Pulseira Feminina 10",
    descricao: "Pulseira feminina dourada com presença elegante.",
    categoria: "pulseiras",
    preco: 19.90,
    imagem: "assets/pulseiras/pulseira-10.png",
    uso: "assets/pulseiras/uso-10.jpeg"
  },
  {
    id: "pulseira-11",
    nome: "Pulseira Feminina 11",
    descricao: "Pulseira feminina dourada de design exclusivo.",
    categoria: "pulseiras",
    preco: 19.90,
    imagem: "assets/pulseiras/pulseira-11.png",
    uso: "assets/pulseiras/uso-11.png"
  }
]);
