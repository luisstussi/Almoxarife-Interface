const url = "http://192.168.32.175:3000";

// função para pesquisar itens
function listaritens() {
  var pesquisa = document.getElementById("barra-pesquisa");
  console.log(localStorage.getItem("token"));
  
  axios
    .get(`${url}/itens/search?nome=${pesquisa.value}`, {
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
      const tabela = document.getElementById("tabela_pesquisa");
      tabela.innerHTML = `<div class="nome elementoinicial col"><b>Nome</b></div>
            <div class="nome elemento col">
                <b>Categoria</b>
            </div>
            <div class="nome elemento col"><b>Descrição</b></div>
            <div class="nome elementofinal col"><b>Solicitar</b></div>`;
      for (var i = 0; i < data.length; i++) {
        tabela.innerHTML += `<div class="elementoinicial col">${data[i].nome}</div>
        <div class="elemento col">${data[i].categoria}</div>
        <div class="elemento col">${data[i].descricao}</div>
        <div class="caixa form-check elementofinal col">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <input id="checkboxitem${i}" onclick="checklistado(${data[i].id},checkboxitem${i})" class="inputcaixa form-check-input float-none" type="checkbox" value="${i}" id="flexCheckChecked i">
          <label class="form-check-label" for="flexCheckChecked">
          </label>`;
      }
    })
    .catch((res) => {
      console.log("Erro");
    });
}


//função para reconhecer se o checkbox está marcado
function checklistado(valor,componente) {
  console.log("valor atual: ",valor);
    if(componente.checked){
      selecionados.push(valor);
    }else{
      var novalista = []
      for(var i = 0; i < selecionados.length; i++) {
        if(selecionados[i]!== valor) {
          novalista.push(selecionados[i]);
        }
      }
      selecionados = novalista;
    }
    console.log("valor somado: ",selecionados);
}
//função para deletar itens
async function deletarItens() {
  for(var i = 0 ; i < selecionados.length; i++){
    const idItem = selecionados[i];
    console.log(idItem);
    console.log(`${url}/itens/${idItem}`);
    axios
      .delete(`${url}/itens/${idItem}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(function (res) {
        console.log(res.data);
        return res.data;
      })
      .catch((err) => {
        console.log(err)
      });
    
  }
  alert("Item excluido com sucesso");
  location.reload();
}

function categoriaTipo(tipo){
  marcaCategoria = tipo;
}

function addItens(json){
  axios
    .post(`${url}/itens`, json, {
      headers: {

        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .catch((res) => {
      console.log(res);
    });
}

function criarItens() {
  var nome = document.getElementById("nomeItem");
  var categoria = document.getElementById("categoriaItem");
  var descricao = document.getElementById("descricaoItem");
  var quantidade = document.getElementById("quantidadeItem");
  const json = {
    nome: nome.value,
    categoria: marcaCategoria,
    descricao: descricao.value,
  };
  for(var i = 0; i < quantidade.value; i++){
    addItens(json);
  }
  location.reload();
  alert("itens criados com sucesso!!")
}
