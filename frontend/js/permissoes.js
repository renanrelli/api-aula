let authorization = localStorage.getItem("authorization");

if (!authorization) {
  window.location.href = "login.html";
}

let tipoSelect = document.getElementById("tipo");
let usuarioSelect = document.getElementById("usuario");
let paginaSelect = document.getElementById("pagina");
let form = document.getElementById("formulario");
const urlParams = new URLSearchParams(window.location.search);
const idPermissao = urlParams.get("idPermissao");
const idUsuario = urlParams.get("idUsuario");
const idPagina = urlParams.get("idPagina");
const tipo = urlParams.get("tipo");

async function buscarUsuarios() {
  let response = await fetch("http://localhost:3000/usuarios", {
    headers: {
      "Content-type": "application/json",
      Acccept: "appplication/json",
      Authorization: authorization,
    },
  });
  let usuarios = await response.json();
  return usuarios;
}

async function definirUsuarios() {
  let usuarios = await buscarUsuarios();

  if (idUsuario) {
    for (let usuario of usuarios) {
      if (usuario.id == idUsuario) {
        let option = document.createElement("option");
        option.value = usuario.id;
        option.innerText = usuario.nome;
        option.selected = true;

        usuarioSelect.appendChild(option);
      }
    }
  } else {
    let selectOption = document.createElement("option");
    selectOption.selected = true;
    selectOption.disabled = true;
    selectOption.innerText = "Selecione";
    usuarioSelect.appendChild(selectOption);

    for (let usuario of usuarios) {
      let option = document.createElement("option");
      option.value = usuario.id;
      option.innerText = usuario.nome;

      usuarioSelect.appendChild(option);
    }
  }
}

definirUsuarios();

async function buscarPaginas() {
  let response = await fetch("http://localhost:3000/paginas", {
    headers: {
      "Content-type": "application/json",
      Acccept: "appplication/json",
      Authorization: authorization,
    },
  });
  let paginas = await response.json();
  return paginas;
}

async function definirPaginas() {
  let paginas = await buscarPaginas();
  let selectOption = document.createElement("option");
  selectOption.selected = true;
  selectOption.disabled = true;
  selectOption.innerText = "Selecione";
  paginaSelect.appendChild(selectOption);

  for (let pagina of paginas) {
    let option = document.createElement("option");
    option.value = pagina.id;
    option.innerText = pagina.nome;

    paginaSelect.appendChild(option);
  }
}
definirPaginas();
form.addEventListener("submit", async (e) => {
  e.stopPropagation();
  e.preventDefault();

  let tipo = tipoSelect.value;
  let idUsuario = usuarioSelect.value;
  let idPagina = paginaSelect.value;

  let payload = {
    tipo,
    idUsuario,
    idPagina,
  };

  let url = "http://localhost:3000/permissoes";
  let method = "POST";

  if (idPermissao) {
    url += "/" + idPermissao;
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

  if (resposta.ok) {
    window.location.href = `formulario.html?id=${idUsuario}`;
  }
});

let voltar = document.getElementById("voltar");
voltar.addEventListener("click", () => {
  window.location = `formulario.html?id=${idUsuario}`;
});

if (idPermissao) {
  tipoSelect.value = tipo;
  paginaSelect.value = idPagina;
}
