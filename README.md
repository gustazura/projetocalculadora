# Calculadora de juros simples e compostos

Aplicação web simples que compara juros simples e juros compostos a partir de um capital inicial, uma taxa mensal e um período em meses.

<!-- Adicione aqui uma captura de tela: ![Prévia da calculadora](preview.png) -->

## O que ela faz

- Calcula o montante final e os juros acumulados com juros simples e com juros compostos
- Compara os dois resultados lado a lado, com barras que separam capital e juros
- Mostra quanto os juros compostos rendem a mais no período informado
- Exibe a evolução mês a mês em uma tabela
- Valida os campos e mostra mensagens de erro claras

## Fórmulas

| Tipo | Fórmula |
| --- | --- |
| Juros simples | `M = C × (1 + i × t)` |
| Juros compostos | `M = C × (1 + i)^t` |

`C` é o capital inicial, `i` é a taxa em decimal (1% = 0,01), `t` é o tempo em meses e `M` é o montante final.

## Tecnologias

- HTML5
- CSS3 (Grid, Flexbox e design responsivo)
- JavaScript puro, sem bibliotecas

## Como rodar

1. Baixe ou clone o repositório.
2. Abra o arquivo `index.html` no navegador.

Não precisa instalar nada.

## Estrutura

```
calculadora-juros/
├── index.html   estrutura da página
├── style.css    estilos
├── script.js    cálculos, validação e atualização da tela
└── README.md
```

## Próximos passos

- Aportes mensais
- Conversão entre taxa anual e mensal
- Gráfico de linhas com a evolução do montante
- Testes automatizados para as funções de cálculo

## Autor

Gustavo Ferreira Silva ([GitHub](https://github.com/gustazura))

Projeto de estudo. Os valores são simulações e não constituem recomendação de investimento.
