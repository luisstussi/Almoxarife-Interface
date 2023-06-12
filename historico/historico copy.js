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
      tabela.innerHTML = `<div class="nome elementonpedido col"><b>Nº do Pedido</b></div>
      <div class="nome elementojust col"><b>Justificativa</b></div>
      <div class="dropdown elementostatus col">
          <button class=" botaocascata2 btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              <b>Status</b>
          </button>
          <ul class="dropdown-menu">
              <li><a onclick="listaAprovados()" class="dropdown-item text-center" href="#">Aprovados</a></li>
              <li><a onclick="listaAprovados()" class="dropdown-item text-center" href="#">Pendentes</a></li>
          </ul>
      </div>`;
      for (var i = 0; i < data.length; i++) {
        console.log("index: ", i);
        console.log(data[i].executada);
        console.log(localStorage.getItem("filtro_status"));
        if (status_filter === null) {
          tabela.innerHTML += `<div class="elementoinicial col">${data[i].ordem_id}</div>
            <div class="elemento col">${data[i].justificativa}</div>`;
          if (data[i].executada == true) {
            tabela.innerHTML += `<div class="elementofinal col"><span class="aprovados"><b>Aprovado</b></span></div>`;
          } else {
            tabela.innerHTML += `<div class="elementofinal col"><span class="pendentes"><b>Pendente</b></span>
          <button class="btpendentes float-none" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myModal"><img src="./img/editar.svg" alt=""></button>
          <button onclick="deletarPendentes(${data[i].ordem_id})" class="btpendentes float-none" type="button"><img src="./img/excluir.svg" alt=""></button></div>`;
          }
        } else {
          if (status_filter) {
            if (data[i].executada == true) {
              tabela.innerHTML += `<div class="elementoinicial col">${data[i].id}</div>
                <div class="elemento col">${data[i].justificativa}</div>`;
              tabela.innerHTML += `<div class="elementofinal col"><span class="aprovados"><b>Aprovado</b></span></div>`;
            } else {
              if (data[i].executada == false) {
                tabela.innerHTML += `<div class="elementoinicial col">${data[i].id}</div>
                <div class="elemento col">${data[i].justificativa}</div>`;
                tabela.innerHTML += `<div class="elementofinal col"><span class="pendentes"><b>Pendente</b></span>
                <button class="btpendentes float-none" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myModal"><img src="./img/editar.svg" alt=""></button>
                <button onclick="deletarPendentes(${data[i].id})" class="btpendentes float-none" type="button"><img src="./img/excluir.svg" alt=""></button></div>`;
              }
            }
          }
        }
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
