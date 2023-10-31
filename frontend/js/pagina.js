let authorization = localStorage.getItem("authorization");
let form = document.getElementById("formulario");

if (!authorization) {
  window.location.href = "login.html";
}

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
let inputNome = document.getElementById("nome");

async function buscarDados() {
  let resposta = await fetch(`http://localhost:3000/paginas/${id}`, {
    headers: {
      "Content-type": "application/json",
      Acccept: "appplication/json",
      Authorization: authorization,
    },
  });
  if (resposta.ok) {
    let pagina = await resposta.json();
    inputNome.value = pagina.nome;
  } else if (resposta.status === 422) {
    let e = await resposta.json();
    alert(e.error);
  } else {
    alert("Ops! Algo deu errado!");
  }
}
if (id) {
  buscarDados();
}

form.addEventListener("submit", async (e) => {
  e.stopPropagation();
  e.preventDefault();

  let nome = inputNome.value;

  let payload = {
    nome,
  };

  let url = "http://localhost:3000/paginas";
  let method = "POST";

  if (id) {
    url += "/" + id;
    method = "PUT";
  }

  let resposta = await fetch(url, {
    method: method,
    headers: {
      "Content-type": "application/json",
      Accept: "appplication/json",
      Authorization: authorization,
    },
    body: JSON.stringify(payload),
  });
  let pagina = await resposta.json();

  if (resposta.ok) {
    window.location.href = "./listarpaginas.html";
  } else alert("algo deu errado");
});
