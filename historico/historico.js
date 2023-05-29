const url = "http://192.168.32.175:3000"

function getUser() {
    axios.get(url)
    .then(response => {
        const data = response.data
        barra-pesquisa.textContent = data
    })
    .catch(error => console.log(error))
}

getUser()