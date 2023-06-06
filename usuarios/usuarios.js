const url = "http://192.168.32.175:3000";

//função para criar usuario
function criarUsuario() {
  var nome = document.getElementById("nomeUsuario");
  var email = document.getElementById("emailUsuario");
  var senha = document.getElementById("senhaUsuario");
  var cpf = document.getElementById("cpfUsuario");
  var telefone = document.getElementById("telefoneUsuario");
  const json = {
    nome: nome.value,
    email: email.value,
    senha: senha.value,
    cpf: cpf.value,
    telefone: telefone.value,
  };
  console.log(json);
  axios
    .post(`${url}/signup`, json, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .catch((res) => {
      console.log(res);
    });
}
function pesquisaUsuario() {
  var pesquisa = document.getElementById("barra-pesquisa");
  console.log(pesquisa.value);
  console.log(localStorage.getItem("token"));
  axios
    .get(`${url}/user/search?nome=${pesquisa.value}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    })
    .then(function (res) {
      console.log(res.data);
      return res.data;
    })
    .then(function (data) {
      console.log(data);
      console.log(data.length);
      const tabela = document.getElementById("tabela_pesquisa");
      tabela.innerHTML = `<div class="nome elementoinicial col"><b>Nome</b></div>
          <div class="dropdown elemento col">
            <b>Email</b>
            </button>
          </div>
          <div class="nome elementofinal col"><b>Solicitar</b></div>
          <div class="nome elementofinal col"><b>Deletar</b></div>`;
      for (var i = 0; i < data.length; i++) {
        tabela.innerHTML += `<div class="elementoinicial col">${data[i].nome}</div>
            <div class="elemento col email">${data[i].email}</div>
            <div class="caixa form-check elementofinal col">
              <button class="engrenagem" data-bs-toggle="modal" data-bs-target="#myModal"><img src="./img/engrenagem.png" alt="" style="width: 25px;"></button>
            </div>
            <div class="caixa form-check elementofinal col">
              <button onclick="deletarUsuario(${data[i].id})" class="lixeira"><img src="./img/excluir.svg" alt=""></button>
            </div>`;
      }
    })
    .catch((res) => {
      console.log("Erro");
      console.log(res);
    });
}
//função para deletar o usuario
function deletarUsuario(identidade) {
  console.log(identidade);
  axios.delete(`${url}/usuario/${identidade}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }).catch((res) => {
    console.log("Erro");
    console.log(res)
  });
  location.reload();
  alert("Usuario excluido com sucesso!!");
}
