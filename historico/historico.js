const url = "http://192.168.32.175:3000"


// função para pesquisar as ordens
function listarordens() {
  var get = document.getElementById("barra-ordens");
  console.log(localStorage.getItem("token"));
  axios.get(`${url}/ordens/${get.value}`, {
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
      for(var i = 0; i < data.length; i++){
        tabela.innerHTML += `<div class="elementoinicial col">001</div>
        <div class="elemento col">Necessario para a blablabla de bla por bla e na laba...</div>
        <div class="elementofinal col"> <span class="aprovados"><b>Aprovado</b></span> </div>`;
      }
    })
    .catch((res) => {
      console.log("Erro");
    });
}