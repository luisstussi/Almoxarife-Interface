function fazlogin() {
    var email = document.getElementById("usuario").value;
    var senha = document.getElementById("pwd").value;

    var payload = {
      email: email,
      senha: senha
    };

    console.log(JSON.stringify(payload));

    //http://192.168.32.175:5500/login/

    fetch("http://192.168.32.175:3000/signin", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Headers": "Authorization",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
      },
      body: JSON.stringify(payload)
    })
      .then(function (res) { console.log(res); return res.json(); })
      .then(function (data) {
        localStorage.setItem('token', data.token);
        console.log(data);
        console.log("autenticado");
        window.location.href = "../"
        //setTimeout(() => {},5000)
      });
  }
