const url = "http://192.168.32.175:3000";

// função para pesquisar as ordens
function listarordens() {
  var pesquisa = document.getElementById("barra-ordens");
  console.log(pesquisa.value);
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
      <div class="dropdown elementostatus col">
          <button class=" botaocascata2 btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              <b>Status</b>
          </button>
          <ul class="dropdown-menu">
              <li><a class="dropdown-item text-center" href="#">Aprovados</a></li>
              <li><a class="dropdown-item text-center" href="#">Pendentes</a></li>
              <li><a class="dropdown-item text-center" href="#">Negados</a></li>
          </ul>
      </div>`;
      for (var i = 0; i < data.length; i++) {
        tabela.innerHTML += `<div class="elementoinicial col">${data[i].id}</div>
        <div class="elemento col">${data[i].justificativa}</div>`;
        if (data[i].executada == true) {
          tabela.innerHTML += `<div class="elementofinal col"><span class="aprovados"><b>Aprovado</b></span></div>`;
        } else {
          tabela.innerHTML += `<div class="elementofinal col"><span class="pendentes"><b>Pendente</b></span>
          <button class="btpendentes float-none" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myModal"><img src="./img/editar.svg" alt=""></button>
          <button class="btpendentes float-none" type="button"><img src="./img/excluir.svg" alt=""></button></div>`;
        }
      }
    })
    .catch((res) => {
      console.log("Erro");
    });
}

// função editar justificativa
function editarOrdens() {
  var update = document.getElementById("newjust")
  const json = JSON.stringify({
  })
  axios.put(`${url}/ordem/search?nome=${update.value}` ,{
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    }
})
.catch((res) => {console.log(res)})
}