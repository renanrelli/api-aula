let corpoTabela = document.getElementById("corpo-tabela");

let authorization = localStorage.getItem("authorization");

if (!authorization) {
  window.location.href = "login.html";
}

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
let inputNome = document.getElementById("nome");
let inputEmail = document.getElementById("email");
let inputSenha = document.getElementById("senha");
let form = document.getElementById("formulario");
let botaoPermissao = document.getElementById("btnPermissao");

async function buscarDados() {
  let resposta = await fetch(`http://localhost:3000/usuarios/${id}`, {
    headers: {
      "Content-type": "application/json",
      Acccept: "appplication/json",
      Authorization: authorization,
    },
  });
  if (resposta.ok) {
    let usuario = await resposta.json();
    inputNome.value = usuario.nome;
    inputEmail.value = usuario.email;
    inputSenha.value = usuario.senha;

    buscarPermissoes(usuario.id);
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
  let email = inputEmail.value;
  let senha = inputSenha.value;

  let payload = {
    nome,
    email,
    senha,
  };

  let payloadEmail = {
    email,
    nome,
  };

  let url = "http://localhost:3000/usuarios";
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

  let emailEnviar = await fetch("http://localhost:3000/usuarioemail", {
    method: method,
    headers: {
      "Content-type": "application/json",
      Acccept: "appplication/json",
      Authorization: authorization,
    },
    body: JSON.stringify(payloadEmail),
  });

  if (resposta.ok && emailEnviar) {
    alert("Cadastro realizado!");
    window.location.href = "index.html";
  } else {
    alert("Ops! Algo deu errado!");
  }
});

async function buscarPermissoes(id) {
  let resposta = await fetch(
    "http://localhost:3000/permissoes" + "?idUsuario=" + id,
    {
      headers: {
        "Content-type": "application/json",
        Acccept: "appplication/json",
        Authorization: authorization,
      },
    }
  );

  let permissoes = await resposta.json();

  for (let p of permissoes) {
    let tr = document.createElement("tr");
    let tdPagina = document.createElement("td");
    let tdPermissao = document.createElement("td");
    let tdAcoes = document.createElement("td");

    tdPagina.innerText = p.pagina.nome;
    tdPermissao.innerText = p.tipo;
    tdAcoes.innerHTML = `<a href="permissoes.html?idUsuario=${p.usuario.id}&idPagina=${p.pagina.id}&tipo=${p.tipo}&idPermissao=${p.id}">Editar</a> <button onclick="excluir(${p.id})">Excluir</button>`;

    tr.appendChild(tdPagina);
    tr.appendChild(tdPermissao);
    tr.appendChild(tdAcoes);

    corpoTabela.appendChild(tr);
  }
}

async function addPermissao() {
  window.location.href = `permissoes.html?idUsuario=${id}`;
}
console.log(voltar);
