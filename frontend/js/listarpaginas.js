let authorization = localStorage.getItem("authorization");

if (!authorization) {
  window.location.href = "login.html";
}

let corpoTabela = document.getElementById("corpo-tabela");

async function buscarPaginas() {
  let resposta = await fetch("http://localhost:3000/paginas", {
    headers: {
      "Content-type": "application/json",
      Acccept: "appplication/json",
      Authorization: authorization,
    },
  });

  let paginas = await resposta.json();

  for (let pagina of paginas) {
    let tr = document.createElement("tr");
    let tdNome = document.createElement("td");
    let tdAcoes = document.createElement("td");

    tdNome.innerText = pagina.nome;
    tdAcoes.innerHTML = `<a href="pagina.html?id=${pagina.id}">Editar</a> <button onclick="excluir(${pagina.id})">Excluir</button>`;

    tr.appendChild(tdNome);
    tr.appendChild(tdAcoes);

    corpoTabela.appendChild(tr);
  }
}
buscarPaginas();

let botaoLogout = document.getElementById("logout");
botaoLogout.addEventListener("click", () => {
  localStorage.removeItem("authorization");
  window.location.href = "login.html";
});

async function excluir(id) {
  if (confirm("Confirma remoção de registro?")) {
    await fetch(`http://localhost:3000/paginas/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Accept: "appplication/json",
        Authorization: authorization,
      },
    });

    window.location.reload();
  }
}
