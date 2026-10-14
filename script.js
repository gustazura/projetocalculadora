const formulario = document.getElementById("formulario");
const campoCapital = document.getElementById("capital");
const campoTaxa = document.getElementById("taxa");
const campoMeses = document.getElementById("meses");
const elementoErro = document.getElementById("erro");

const moeda = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

/* Fórmulas
   Juros simples:    M = C * (1 + i * t)
   Juros compostos:  M = C * (1 + i) ^ t
   C = capital, i = taxa em decimal (1% = 0,01), t = tempo em meses, M = montante */

function calcularJurosSimples(capital, taxa, meses) {
  const juros = capital * taxa * meses;
  return { juros: juros, montante: capital + juros };
}

function calcularJurosCompostos(capital, taxa, meses) {
  const montante = capital * Math.pow(1 + taxa, meses);
  return { juros: montante - capital, montante: montante };
}

function lerValores() {
  const capital = parseFloat(campoCapital.value);
  const taxaPercentual = parseFloat(campoTaxa.value);
  const meses = parseFloat(campoMeses.value);

  if (!Number.isFinite(capital) || capital <= 0) {
    return { erro: "Informe um capital inicial maior que zero." };
  }
  if (!Number.isFinite(taxaPercentual) || taxaPercentual < 0) {
    return { erro: "Informe uma taxa de juros igual ou maior que zero." };
  }
  if (!Number.isInteger(meses) || meses < 1 || meses > 600) {
    return { erro: "Informe um período inteiro entre 1 e 600 meses." };
  }

  return { capital: capital, taxa: taxaPercentual / 100, meses: meses };
}

function atualizarBarra(tipo, capital, montante, maiorMontante) {
  const trilho = document.getElementById("trilho-" + tipo);
  const parteCapital = document.getElementById("capital-" + tipo);
  const parteJuros = document.getElementById("juros-" + tipo);

  const larguraTotal = (montante / maiorMontante) * 100;
  const larguraCapital = (capital / montante) * 100;

  trilho.style.width = larguraTotal + "%";
  parteCapital.style.width = larguraCapital + "%";
  parteJuros.style.width = 100 - larguraCapital + "%";
}

function montarTabela(capital, taxa, meses) {
  const corpo = document.getElementById("tabela-corpo");
  const linhas = document.createDocumentFragment();

  for (let mes = 1; mes <= meses; mes++) {
    const simples = calcularJurosSimples(capital, taxa, mes);
    const composto = calcularJurosCompostos(capital, taxa, mes);
    const textos = [String(mes), moeda.format(simples.montante), moeda.format(composto.montante)];

    const linha = document.createElement("tr");
    textos.forEach(function (texto) {
      const celula = document.createElement("td");
      celula.textContent = texto;
      linha.appendChild(celula);
    });
    linhas.appendChild(linha);
  }

  corpo.replaceChildren(linhas);
}

function escreverConclusao(meses, simples, composto) {
  const diferenca = composto.montante - simples.montante;
  const conclusao = document.getElementById("conclusao");

  if (diferenca < 0.005) {
    conclusao.textContent = "Com esse prazo e essa taxa, os dois tipos de juros chegam ao mesmo valor.";
    return;
  }

  const unidade = meses === 1 ? "mês" : "meses";
  conclusao.textContent =
    "Em " + meses + " " + unidade + ", os juros compostos rendem " +
    moeda.format(diferenca) + " a mais que os juros simples.";
}

function calcular() {
  const valores = lerValores();

  if (valores.erro) {
    elementoErro.textContent = valores.erro;
    return;
  }

  const simples = calcularJurosSimples(valores.capital, valores.taxa, valores.meses);
  const composto = calcularJurosCompostos(valores.capital, valores.taxa, valores.meses);

  if (!Number.isFinite(composto.montante)) {
    elementoErro.textContent = "Esses valores geram um resultado grande demais. Tente uma taxa ou um período menor.";
    return;
  }

  elementoErro.textContent = "";

  document.getElementById("simples-montante").textContent = moeda.format(simples.montante);
  document.getElementById("simples-juros").textContent = moeda.format(simples.juros);
  document.getElementById("composto-montante").textContent = moeda.format(composto.montante);
  document.getElementById("composto-juros").textContent = moeda.format(composto.juros);

  const maiorMontante = Math.max(simples.montante, composto.montante);
  atualizarBarra("simples", valores.capital, simples.montante, maiorMontante);
  atualizarBarra("composto", valores.capital, composto.montante, maiorMontante);

  escreverConclusao(valores.meses, simples, composto);
  montarTabela(valores.capital, valores.taxa, valores.meses);
}

formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();
  calcular();
});

calcular();
