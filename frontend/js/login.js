let inputEmail = document.getElementById("email");
let inputSenha = document.getElementById("senha");
let form = document.getElementById("formulario");

form.addEventListener("submit", async (e) => {
  e.stopPropagation();
  e.preventDefault();

  let payload = {
    email: inputEmail.value,
    senha: inputSenha.value,
  };

  let resposta = await fetch("http://localhost:3000/login", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Accept: "appplication/json",
    },
    body: JSON.stringify(payload),
  });

  if (resposta.ok) {
    let dados = await resposta.json();
    let authorization = `${dados.type} ${dados.token}`;

    localStorage.setItem("authorization", authorization);

    location.href = "menu.html";
  } else if (resposta.status == 401) {
    let dados = await resposta.json();
    alert(dados.mensagem);
  } else {
    alert("Ops! Algo deu errado");
  }
});
