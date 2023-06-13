const url = "http://192.168.32.175:3000";

function listaraprovados() {
  localStorage.setItem("filtro_status", true);
  console.log("entrou aprovados");
  listaAprovados();
}

function listarpendentes() {
  localStorage.setItem("filtro_status", false);
  console.log("entrou pendentes");
  listaAprovados();
}

// função para pesquisar as ordens aprovadas
function listaAprovados() {
  const status_filter = localStorage.getItem("filtro_status");
  var pesquisa = document.getElementById("barra-ordens");
  console.log(localStorage.getItem("token"));

  console.log("listaAprovados");
  console.log(pesquisa.value);
  axios
    .get(`${url}/ordem/search?id=${pesquisa.value}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then(function (res) {
      console.log("primeiro then");
      console.log(res.data);
      return res.data;
    })
    .then(function (data) {
      console.log("segundo then");
      console.log(data);
      console.log(data.length);
      const tabela = document.getElementById("tabela_ordem");
      tabela.innerHTML = "";

      var ordens = {};

      for (var i = 0; i < data.length; i++) {
        if (!ordens[data[i].ordem_id]) {
          ordens[data[i].ordem_id] = {
            justificativa: data[i].justificativa,
            itens: [],
            executada: data[i].executada,
          };
        }
        ordens[data[i].ordem_id].itens.push(data[i].nome);
      }

      for (var ordemId in ordens) {
        var ordem = ordens[ordemId];

        var card = document.createElement("div");
        card.className = "card";
        if (ordem.executada) {
          card.classList.add("executada");
        }

        var idElement = document.createElement("div");
        idElement.innerHTML = "<b>Nº do Pedido:</b> " + ordemId;
        card.appendChild(idElement);

        var justificativaElement = document.createElement("div");
        justificativaElement.innerHTML = "<b>Justificativa:</b> " + ordem.justificativa;
        card.appendChild(justificativaElement);

        var itensElement = document.createElement("div");
        itensElement.innerHTML = "<b>Itens:</b> " + ordem.itens.join(", ");
        card.appendChild(itensElement);

        tabela.appendChild(card);
      }

      // Definir o estilo grid para as colunas
      tabela.style.display = "grid";
      tabela.style.gridTemplateColumns = "repeat(auto-fit, minmax(300px, 1fr))";
      tabela.style.gridGap = "20px";
    })
    .catch((res) => {
      console.log("Erro");
    });
}

// função excluir solicitacao
function deletarPendentes(identidade) {
  console.log(identidade);
  axios.delete(`${url}/ordemz/${identidade}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  location.reload();
  alert("Solicitação excluida com sucesso!!");
}