function dominio_back(){
    return "http://192.168.32.175:3000";
}

function carregar_usuario(componete_id){
      
      axios.get("/logtest",{
            baseURL: dominio_back(),
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            }    
        })
        .then(function (res) {return res.data})
        .then(function (data) {
          if(data.user == "normal") {
            document.getElementById(componete_id).style.visibility = "hidden";
          } else if(data.user == "admin") {
            document.getElementById(componete_id).style.visibility = "visible"
          }
        })
        .catch((res) => {
          window.location.href = `/login`
        });
}