let authorization = localStorage.getItem("authorization");

if (!authorization) {
  window.location.href = "login.html";
}

let corpoTabela = document.getElementById("corpo-tabela");

async function buscarUsuarios() {
  let resposta = await fetch("http://localhost:3000/usuarios", {
    headers: {
      "Content-type": "application/json",
      Acccept: "appplication/json",
      Authorization: authorization,
    },
  });

  let usuarios = await resposta.json();

  for (let usuario of usuarios) {
    let tr = document.createElement("tr");
    let tdNome = document.createElement("td");
    let tdEmail = document.createElement("td");
    let tdSenha = document.createElement("td");
    let tdAcoes = document.createElement("td");

    tdNome.innerText = usuario.nome;
    tdEmail.innerText = usuario.email;
    tdSenha.innerText = usuario.senha;
    tdAcoes.innerHTML = `<a href="formulario.html?id=${usuario.id}">Editar</a> <button onclick="excluir(${usuario.id})">Excluir</button>`;

    tr.appendChild(tdNome);
    tr.appendChild(tdEmail);
    tr.appendChild(tdSenha);
    tr.appendChild(tdAcoes);

    corpoTabela.appendChild(tr);
  }
}

async function excluir(id) {
  await fetch(`http://localhost:3000/usuarios/${id}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
      Acccept: "appplication/json",
      Authorization: authorization,
    },
  });

  window.location.reload();
}

buscarUsuarios();

let botaoLogout = document.getElementById("logout");
botaoLogout.addEventListener("click", () => {
  localStorage.removeItem("authorization");
  window.location.href = "login.html";
});

let botao = document.getElementById("baixar");

async function baixarCsv() {
  let csv = await fetch("http://localhost:3000/usuarioscsv", {
    headers: {
      "Content-type": "application/json",
      Acccept: "appplication/json",
      Authorization: authorization,
    },
  });
  download(await csv.text(), "text/csv", "output.csv");
}

function download(content, mimeType, filename) {
  const a = document.createElement("a");
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  a.setAttribute("href", url);
  a.setAttribute("download", filename);
  a.click();
}

//Outra forma de fazer o download
// botao.addEventListener("click", async () => {
//   window.location.href = "http://localhost:3000/usuarioscsv";
// });

async function baixarPdf() {
  let pdf = await fetch("http://localhost:3000/usuariospdf", {
    headers: {
      "Content-type": "application/json",
      Accept: "appplication/json",
      Authorization: authorization,
    },
  });
  download(await pdf.blob(), "application/x-pdf", "output.pdf");
}
