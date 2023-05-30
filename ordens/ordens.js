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
      tabela.innerHTML = `<div class="nome elementoinicial col"><b>N° do Pedido</b></div>
      <div class="nome elemento col"><b>Usuário</b></div>
      <div class="nome n1 elementofinal col"><b>.</b></div>`;
      for(var i = 0; i < data.length; i++){
        tabela.innerHTML += `<div class="elementoinicial col">${data[i].id}</div>
        <div class="elemento col">${data[i].usuario_id}</div>
        <div class="elementofinal col"> <button class="exibir" data-bs-toggle="modal" data-bs-target="#myModal"><b>Exibir</b></button></div>`;
      }
    })
    .catch((res) => {
      console.log("Erro");
    });
}