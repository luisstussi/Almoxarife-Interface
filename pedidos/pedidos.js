const url = "http://192.168.32.175:3000";

// função para pesquisar itens
function listaritens() {
  var pesquisa = document.getElementById("barra-pesquisa");
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
      todosItens = data;
      console.log(data.length);
      const tabela = document.getElementById("tabela_pesquisa");
      tabela.innerHTML = `<div class="nome elementoinicial col"><b>Nome</b></div>
            <div class="dropdown elemento col">
            <button class=" botaocascata2 btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <b>Categoria</b>
            </button>
            <ul class="dropdown-menu">
                <li class="text-center dropdown-item">Banheiro</li>
                <li class="text-center dropdown-item">Copa</li>
                <li class="text-center dropdown-item">Escritório</li>
                <li class="text-center dropdown-item">Laboratório</li>
                <li class="text-center dropdown-item">Manutenção</li>
            </ul>
            </div>
            <div class="nome elemento col"><b>Descrição</b></div>
            <div class="nome elementofinal col"><b>Solicitar</b></div>`;
      for (var i = 0; i < data.length; i++) {
        tabela.innerHTML += `<div class="elementoinicial col">${data[i].nome}</div>
        <div class="elemento col">${data[i].categoria}</div>
        <div class="elemento col">${data[i].descricao}</div>
        <div class="caixa form-check elementofinal col">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <input id="checkboxitem${i}" onclick="checklistado(${data[i].id},checkboxitem${i})" class="inputcaixa form-check-input float-none" type="checkbox" value="${i}" id="flexCheckChecked">
          <label class="form-check-label" for="flexCheckChecked">
          </label>`;
      }
    })
    .catch((res) => {
      console.log("Erro");
    });
}
//função para reconhecer se o checkbox está marcado
function checklistado(valor, componente) {
  console.log("valor atual: ", valor);
  if (componente.checked) {
    selecionados.push(valor);
  } else {
    var novalista = [];
    for (var i = 0; i < selecionados.length; i++) {
      if (selecionados[i] !== valor) {
        novalista.push(selecionados[i]);
      }
    }
    selecionados = novalista;
  }
  console.log("valor somado: ", selecionados);
}
// Após verificar quais itens estao selecionados ele vem para esta funcao
// para solicitar os itens
function solicitar() {
  var json = document.getElementById("justificativaOrdem")
  console.log(json)
  axios.post(`${url}/itens`, json, {
      headers: {

        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .catch((res) => {
      console.log(res);
    });
}
//função para carregar o modal
function carregarModal() {
  for (var i = 0; i < selecionados.length; i++) {
    for (var j = 0; j < todosItens.length; j++) {
      if (todosItens[j].id === selecionados[i]) {
        document.getElementById("modalPedidos").innerHTML += `
                      <tr>
                       <td style="padding-top: 0%;">
                              ${todosItens[j].nome}<br>
                          </td>
                          <td style="padding-top: 0%">
                              ${todosItens[j].categoria}
                          </td>
                      </tr>
        `;
      }
    }
  }
}
