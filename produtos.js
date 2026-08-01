/* Luxuosa — catálogo de produtos (Bootstrap + JS puro) */
const WHATSAPP = "258873929605";

const PRODUTOS = [
  { id:"M24728", nome:"Fascinador Safira",      preco:1250, img:"prod1.png", cor:"Verde Esmeralda", stock:1, cat:"Fascinadores", desc:"Fascinador artesanal em sinamay, com laçada esculpida à mão. Peça leve, ideal para casamentos e cerimónias." },
  { id:"M24736", nome:"Laço Imperial Azul",     preco:2800, img:"prod2.png", cor:"Laranja Âmbar",   stock:1, cat:"Chapéus",      desc:"Chapéu de aba larga com acabamento imperial. Estrutura firme e forro interior em cetim." },
  { id:"M24737", nome:"Elegância Lima",         preco:1650, img:"prod3.png", cor:"Vermelho Rubi",   stock:2, cat:"Fascinadores", desc:"Fascinador em tule rígido com sobreposições em camadas, presilha discreta e confortável." },
  { id:"M24739", nome:"Pérola do Índico",       preco:2950, img:"prod4.png", cor:"Rosa Pérola",     stock:1, cat:"Fascinadores", desc:"Inspirado no litoral moçambicano: pétalas em organza e detalhes em pérolas naturais." },
  { id:"M24729", nome:"Brisa Marinha",          preco:1100, img:"prod5.png", cor:"Azul Céu",        stock:1, cat:"Turbantes",    desc:"Peça leve em plumas tingidas à mão, perfeita para eventos ao ar livre." },
  { id:"M24738", nome:"Gala Noturna",           preco:2400, img:"prod6.png", cor:"Azul Meia-noite", stock:1, cat:"Chapéus",      desc:"Laço estruturado em veludo com aplicações de pérolas. Sofisticação para a noite." },
  { id:"M24732", nome:"Fascinador Citrino",     preco:1890, img:"prod7.png", cor:"Verde Lima",      stock:2, cat:"Fascinadores", desc:"Cor vibrante e forma orgânica, feito à mão em Matola com sinamay de alta qualidade." },
  { id:"M24735", nome:"Pureza de Cristal",      preco:2200, img:"prod8.png", cor:"Branco Cristal",  stock:1, cat:"Chapéus",      desc:"Peça nupcial em tons translúcidos, delicada e atemporal, para o dia mais especial." }
];

const money = v => v.toLocaleString("pt-PT",{minimumFractionDigits:2, maximumFractionDigits:2}) + " MT";

function cardHTML(p, i){
  return `
  <div class="col">
    <div class="product-card h-100" data-index="${i}" role="button" tabindex="0">
      <i class="fa-regular fa-star star-icon"></i>
      <div class="product-img-wrapper"><img src="${p.img}" alt="${p.nome}"></div>
      <div class="product-info">
        <h3 class="product-name">${p.nome}</h3>
        <p class="product-code">${p.id}</p>
        <div class="product-footer">
          <span class="product-price">${money(p.preco)}</span>
          <span class="product-stock"><span class="stock-dot"></span> ${p.stock} disponíve${p.stock>1?"is":"l"}</span>
        </div>
        <button class="btn-detalhe" type="button">Ver detalhes <i class="fa-solid fa-chevron-right"></i></button>
      </div>
    </div>
  </div>`;
}

let filtro = "Todos", termo = "";

function render(){
  const grid = document.getElementById("grid");
  const lista = PRODUTOS
    .map((p,i)=>({p,i}))
    .filter(({p}) => (filtro==="Todos"||p.cat===filtro) &&
                     (p.nome.toLowerCase().includes(termo) || p.id.toLowerCase().includes(termo)));
  grid.innerHTML = lista.length
    ? lista.map(({p,i})=>cardHTML(p,i)).join("")
    : `<div class="col-12 text-center py-5 text-muted">Nenhuma peça encontrada.</div>`;
  document.getElementById("contador").textContent = `${lista.length} peça${lista.length!==1?"s":""}`;
}

function linkWhatsApp(p){
  const msg =
`Olá Luxuosa! Tenho interesse em comprar esta peça:

*${p.nome}*
Código: ${p.id}
Categoria: ${p.cat}
Cor: ${p.cor}
Preço: ${money(p.preco)}
Disponibilidade: ${p.stock} unidade(s)

Poderiam confirmar disponibilidade e entrega?`;
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
}

function abrirDetalhe(i){
  const p = PRODUTOS[i];
  document.getElementById("d-img").src = p.img;
  document.getElementById("d-img").alt = p.nome;
  document.getElementById("d-nome").textContent = p.nome;
  document.getElementById("d-cat").textContent = p.cat;
  document.getElementById("d-codigo").textContent = p.id;
  document.getElementById("d-cor").textContent = p.cor;
  document.getElementById("d-stock").textContent = `${p.stock} disponíve${p.stock>1?"is":"l"}`;
  document.getElementById("d-preco").textContent = money(p.preco);
  document.getElementById("d-desc").textContent = p.desc;
  document.getElementById("d-comprar").href = linkWhatsApp(p);
  bootstrap.Offcanvas.getOrCreateInstance(document.getElementById("detalhe")).show();
}

document.addEventListener("DOMContentLoaded", () => {
  render();

  document.getElementById("grid").addEventListener("click", e => {
    const card = e.target.closest(".product-card");
    if (card) abrirDetalhe(Number(card.dataset.index));
  });
  document.getElementById("grid").addEventListener("keydown", e => {
    if (e.key === "Enter" || e.key === " ") {
      const card = e.target.closest(".product-card");
      if (card) { e.preventDefault(); abrirDetalhe(Number(card.dataset.index)); }
    }
  });

  document.querySelectorAll("[data-filtro]").forEach(btn => {
    btn.addEventListener("click", () => {
      filtro = btn.dataset.filtro;
      document.querySelectorAll("[data-filtro]").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      render();
    });
  });

  document.getElementById("busca").addEventListener("input", e => {
    termo = e.target.value.trim().toLowerCase();
    render();
  });
});
