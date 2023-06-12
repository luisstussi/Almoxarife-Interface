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
      tabela.innerHTML = `<div class="nome elementoinicial col"><b>N° do Pedido</b></div>
      <div class="nome elemento col"><b>Justificativa</b></div>
      <div class="nome elemento col"><b>Itens</b></div>
      <div class="nome n1 elementofinal col"><b>.</b></div>`;
      for(var i = 0; i < data.length; i++){
<<<<<<< HEAD
        tabela.innerHTML += `<div class="elementoinicial col">${data[i].id}</div>
        <div class="elemento col">${data[i].justificativa}</div>
        <div class="elemento col"></div>
=======
        tabela.innerHTML += `<div class="elementoinicial col">${data[i].ordem_id}</div>
        <div class="elemento col">${data[i].justificativa}</div>
        <div class="elemento col">${data[i].nome}</div>
>>>>>>> a02749d1238f5dee3c842a062c6d7461229cf123
        <div class="elementofinal col">
        <button onclick="aprovarordens(${data[i].id})" class="btpendentes float-none" type="button" ><img class="aprovar" src="../historico/img/aprovar.svg" alt=""></button>
        <button onclick="rejeitarordens(${data[i].id})" class="btpendentes float-none" type="button"><img src="../historico/img/excluir.svg" alt=""></button></div>`;
      }
    })
    .catch((res) => {
      console.log("Erro");
    });
}

// função para rejeitar ordens
function rejeitarordens(idExcluir) {
    axios.delete(`${url}/ordemz/${idExcluir}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then(function (res) {
      return res.data;
    })
    .catch((res) => {
      console.log("Erro");
      console.log(res)
    });
    location.reload();
    alert("Ordem rejeitada com sucesso!!");
  }

//função para aprovar ordens
function aprovarordens(idAprovar) {
  var json = {
    "justificativa": "eu preciso de papeis",
    "itens": [1,15,16,17,18]
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
  //location.reload();
  alert("Ordem Aprovada com sucesso!!");
}