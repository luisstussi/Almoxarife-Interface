const url = "http://192.168.32.175:3000"


// função para pesquisar as ordens
function listarordens() {
  var get = document.getElementById("barra-ordens");
  console.log(localStorage.getItem("token"));
  axios
    .get(`${url}/ordem/search?id=${get.value}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then(function (res) {
      console.log(res.data);
      return res.data;
    })
    .then(function (data) {
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

        if (!ordem.executada) { // Verifica se a propriedade "executada" é falsa
          var card = document.createElement("div");
          card.className = "card";

          var idElement = document.createElement("div");
          idElement.innerHTML = "<b>Nº do Pedido:</b> " + ordemId;
          card.appendChild(idElement);

          var justificativaElement = document.createElement("div");
          justificativaElement.innerHTML = "<b>Justificativa:</b> " + ordem.justificativa;
          card.appendChild(justificativaElement);

          var itensElement = document.createElement("div");
          itensElement.innerHTML = "<b>Itens:</b> " + ordem.itens.join(", ");
          card.appendChild(itensElement);

          var buttonContainer = document.createElement("div");
          buttonContainer.className = "button-container";

          var aprovarButton = document.createElement("button");
          aprovarButton.className = "btpendentes float-none";
          aprovarButton.setAttribute("type", "button");
          aprovarButton.innerHTML = "<img class='aprovar' src='../historico/img/aprovar.svg' alt=''>";
          aprovarButton.addEventListener("click", function() {
            aprovarordens(ordemId);
          });
          buttonContainer.appendChild(aprovarButton);

          var rejeitarButton = document.createElement("button");
          rejeitarButton.className = "btpendentes float-none";
          rejeitarButton.setAttribute("type", "button");
          rejeitarButton.innerHTML = "<img src='../historico/img/excluir.svg' alt=''>";
          rejeitarButton.addEventListener("click", function() {
            rejeitarordens(ordemId);
          });
          buttonContainer.appendChild(rejeitarButton);

          card.appendChild(buttonContainer);

          tabela.appendChild(card);
        }
      }
    })
    .catch((res) => {
      console.log("Erro");
    });
}


// função para rejeitar ordens
function rejeitarordens(idExcluir) {
  console.log(idExcluir)
  axios.delete(`${url}/ordemz/${idExcluir}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
  .then(function (res) {
    console.log(res.data); // opcional: exibir dados da resposta
    location.reload();
    alert("Ordem rejeitada com sucesso!!");
  })
  .catch((error) => {
    console.log("Erro:", error);
  });
}


//função para aprovar ordens
function aprovarordens(idAprovar) {
  var json = {
    "justificativa": "eu preciso de papeis",
    "itens": []
  }
  axios.post(`${url}/validaordem/${idAprovar}`, json, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
  .then((res) => {
    return res.data;
  })
  .catch((res) => {
    console.log("Erro");
    console.log(res)
  });
  location.reload();
  alert("Ordem Aprovada com sucesso!!");
}