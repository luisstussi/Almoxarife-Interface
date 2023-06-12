const url = "http://192.168.32.175:3000";

// função para pesquisar as ordens
function listaAprovados() {
  var pesquisa = document.getElementById("barra-ordens");
  console.log(localStorage.getItem("token"));
  
  axios
    .get(`${url}/ordem/search?id=${pesquisa.value}`, {
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
      tabela.innerHTML = `<div class="nome elementonpedido col"><b>Nº do Pedido</b></div>
      <div class="nome elementojust col"><b>Justificativa</b></div>
      <div class="elementostatus col"> <b>Status</b>
      </div>`;
      for (var i = 0; i < data.length; i++) {
        tabela.innerHTML += `<div class="elementoinicial col">${data[i].ordem_id}</div>
        <div class="elemento col">${data[i].justificativa}</div>`
        tabela.innerHTML += `<div class="elementofinal col"><span class="pendentes"><b>Pendente</b></span>
                <button class="btpendentes float-none" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myModal"><img src="./img/editar.svg" alt=""></button>
                <button onclick="deletarPendentes(${data[i].id})" class="btpendentes float-none" type="button"><img src="./img/excluir.svg" alt=""></button></div>`;
      }
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

