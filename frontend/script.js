var url = 'http://localhost:3000/'

function cadastrar() {
	//validacao de alguns dos inputs

	if (!validaNome('nome-completo')) {
		return
	}

	if (!validaData('data-nascimento')) {
		return
	}

	if (!validaSenha('senha')) {
		return
	}

	if (!confirmaSenha('confirma-senha')) {
		return
	}

	//construcao do json que vai no body da criacao de usuario	

	let body =
	{
		'Cep': document.getElementById('cep').value,
		'Cpf': document.getElementById('cpf').value,
		'Complemento': document.getElementById('complemento').value,
		'Email': document.getElementById('email').value,
		'Logradouro': document.getElementById('logradouro').value,
		'Nascimento': document.getElementById('data-nascimento').value,
		'Nome': document.getElementById('nome-completo').value,
		'Numero': document.getElementById('numero').value,
		'Password': document.getElementById('senha').value
	};

	//envio da requisicao usando a FETCH API

	//configuracao e realizacao do POST no endpoint "usuarios"
	fetch(url + "usuarios",
		{
			'method': 'POST',
			'redirect': 'follow',
			'headers':
			{
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			'body': JSON.stringify(body)
		})
		//checa se requisicao deu certo
		.then((response) => {
			if (response.ok) {
				return response.text()
			}
			else {
				return response.text().then((text) => {
					throw new Error(text)
				})
			}
		})
		//trata resposta
		.then((output) => {
			console.log(output)
			alert('Cadastro efetuado! :D')
		})
		//trata erro
		.catch((error) => {
			console.log(error)
			alert('Não foi possível efetuar o cadastro! :(')
		})
}

function validaNome(id) {
	let divNome = document.getElementById(id)
	if (divNome.value.trim().split(' ').length >= 2) {
		divNome.style.border = 0
		return true
	}
	else {
		divNome.style.border = '2px solid red'
		return false
	}
}

function validaData(id) {
	let divData = document.getElementById(id)
	if (divData.value.length > 0) {
		divData.style.border = 0
		return true
	}
	else {
		divData.style.border = '2px solid red'
		return false
	}
}
function validaSelect(id) {
	var select = document.getElementById(id);
	var value = select.options[select.selectedIndex].value;
	if(value.length > 0) {
		select.style.border = 0
		return true
	}
	else {
		select.style.border = '2px solid red'
		return false
	}
}

function validaInput(id) {
	var input = document.getElementById(id)
	if(input.value.length > 0) {
		input.style.border = 0
		return true
	}
	else {
		input.style.border = '2px solid red'
		return false
	}
}

function getLogradouro() {
	var getCep = document.getElementById('cep');
	var getLog = document.getElementById('logradouro');
	if(getCep.value.length > 0) {
		fetch('https://viacep.com.br/ws/' + document.getElementById('cep').value + '/json')
		.then(response => response.json())
		.then((output) => {
			document.getElementById('logradouro').value = output.logradouro
		})
		getCep.style.border = '0'
		getLog.style.border = '0'
		return true
	}
	else {
		getCep.style.border = '2px solid red'
		getLog.style.border = '2px solid red'
		return false
	}
}

function getCodigo() {
	let pneumonia = "Tratamento de Pneumonias ou Influenza(Gripe)"
	let sepse = "Tratamento de Outras Doenças Bacterianas"

	let divCode = document.getElementById('codigo').value
	let descricao = document.getElementById('descricao')
	switch (divCode) {
		case '0303140151': descricao.value = pneumonia
			descricao.style.border = 0
			codigo.style.border = 0
			break

		case '0303010037': descricao.value = sepse
			descricao.style.border = 0
			codigo.style.border = 0
			break

		default: descricao
			codigo.style.border = '2px solid red'
			descricao.style.border = '2px solid red'
			descricao.value = ''
			return false
	}
}

function adicionarProcedimento() {
	
	let procedimentos = [
		{
			'codigo': document.getElementById('codigo').value,
			'qtd': document.getElementById('qtd').value,
			'descricao': document.getElementById('descricao').value,
			'medico': document.getElementById('medico').value,
			'cbo': document.getElementById('cbo').value
		}
	]
	
	if(procedimentos[0].codigo && procedimentos[0].qtd && procedimentos[0].descricao && procedimentos[0].medico && procedimentos[0].cbo) {
		let table = document.querySelector("table");
		let data = Object.keys(procedimentos[0]);
		// generateTableHead(table, data);
		generateTable(table, procedimentos);

		let tableOn = document.querySelector("table")
		tableOn.style.display = 'table'


		document.getElementById('codigo').value = ''
		document.getElementById('qtd').value = ''
		document.getElementById('descricao').value = ''
		document.getElementById('medico').value = ''
		document.getElementById('cbo').value = ''
	}
	else {
		alert('Campos obrigatórios em branco!')
	}
}

// function generateTableHead(table, data) {
// 	let thead = table.createTHead();
// 	let row = thead.insertRow();
// 	for (let key of data) {
// 		let th = document.createElement("th");
// 		let text = document.createTextNode(key);
// 		th.appendChild(text);
// 		row.appendChild(th);
// 	}
// }

function generateTable(table, data) {
	for (let element of data) {
		let row = table.insertRow();
		let buttonEditar = document.createElement("button")
		buttonEditar.setAttribute('class', 'btn btn-warning')
		buttonEditar.setAttribute('style', 'margin-right: 5px;')
		buttonEditar.innerHTML = 'Editar'
		let buttonRemover = document.createElement("button")
		buttonRemover.setAttribute('class', 'btn btn-danger')
		buttonRemover.setAttribute('style', 'margin-left: 5px;')
		buttonRemover.innerHTML = 'Remover'
		for (key in element) {
			let cell = row.insertCell();
			let text = document.createTextNode(element[key]);
			cell.appendChild(text);
			row.appendChild(buttonEditar)
			row.appendChild(buttonRemover)
		}
	}
}
let table = document.querySelector("table");
generateTableHead(table);

function generateTableHead(table) {
	let thead = table.createTHead();
	let row = thead.insertRow();
	let codigo = document.createElement("th")
	let qtd = document.createElement("th")
	let descricao = document.createElement("th")
	let medico = document.createElement("th")
	let cbo = document.createElement("th")
	let id = document.createElement("th")
	let comandos = document.createElement("th")
	let text0 = document.createTextNode('id')
	let text = document.createTextNode('Código')
	let text2 = document.createTextNode('Qtd')
	let text3 = document.createTextNode('Descrição')
	let text4 = document.createTextNode('Médico')
	let text5 = document.createTextNode('CBO')
	let text6 = document.createTextNode('Comandos')
	id.appendChild(text0)
	codigo.appendChild(text)
	qtd.appendChild(text2)
	descricao.appendChild(text3)
	medico.appendChild(text4)
	cbo.appendChild(text5)
	comandos.appendChild(text6)
	row.appendChild(id)
	row.appendChild(codigo)
	row.appendChild(qtd)
	row.appendChild(descricao)
	row.appendChild(medico)
	row.appendChild(cbo)
	row.appendChild(comandos)
	
}
function ativarMenu() {

}











function proximo() {
	let ativar = document.getElementById('form-int')
	ativar.style.display = 'flex'

	//pega div que vai conter a lista de usuarios
	let cadastrarInternamento = document.getElementById('cadastro-internamento')

	//limpa div
	while (cadastrarInternamento.firstChild) {
		cadastrarInternamento.removeChild(cadastrarInternamento.firstChild)
	}

	//cria div para cadastrar informacoes de um internamento
	let divInternamento = document.createElement('div')

	//cria o titulo do formulário internamento
	let title = document.createElement('p')
	title.innerHTML = 'Dados do Internamento'
	divInternamento.appendChild(title)


	//cria o campo data de internamento 
	let divDataInt = document.createElement('input')
	divDataInt.setAttribute('id', 'data-internamento')
	divDataInt.setAttribute('type', 'date')
	divDataInt.onblur = u => validaData(this.id)
	divInternamento.appendChild(divDataInt)

	//cria o campo data de alta
	let divDataAlta = document.createElement('input')
	divDataAlta.setAttribute('id', 'data-alta')
	divDataAlta.setAttribute('type', 'date')
	divDataAlta.onblur = u => validaData(this.id)
	divInternamento.appendChild(divDataAlta)

	// cria o campo Leito
	let divLeito = document.createElement('input')
	divLeito.setAttribute('class', 'col-6')
	divLeito.setAttribute('id', 'leito')
	divLeito.setAttribute('type', 'text')
	divLeito.placeholder = 'Leito'
	divInternamento.appendChild(divLeito)

	// cria o campo CID
	let divCID = document.createElement('input')
	divCID.setAttribute('class', 'col-6')
	divCID.setAttribute('id', 'cid')
	divCID.setAttribute('type', 'text')
	divCID.placeholder = 'CID'
	divInternamento.appendChild(divCID)

	// cria o campo carater de atendimento
	let divCarAten = document.createElement('input')
	divCarAten.setAttribute('id', 'carater-atendimento')
	divCarAten.setAttribute('type', 'text')
	divCarAten.placeholder = 'Carater de Atendimento'
	divInternamento.appendChild(divCarAten)

	// cria o campo carater motivo de encerramento
	let divMotAtend = document.createElement('input')
	divMotAtend.setAttribute('id', 'motivo-encerramento')
	divMotAtend.setAttribute('type', 'text')
	divMotAtend.placeholder = 'Motivo de Encerramento'
	divInternamento.appendChild(divMotAtend)


	// //cria o botao para remover o usuario
	// let btnRemover = document.createElement('button')
	// btnRemover.innerHTML = 'Remover'
	// btnRemover.onclick = u => remover(usuario.id)
	// btnRemover.style.marginRight = '5px'

	// //cria o botao para atualizar o usuario
	// let btnAtualizar = document.createElement('button')
	// btnAtualizar.innerHTML = 'Atualizar'
	// btnAtualizar.onclick = u => atualizar(usuario.id, divNome, divEmail, divCpf)
	// btnAtualizar.style.marginLeft = '5px'

	// //cria a div com os dois botoes
	// let divBotoes = document.createElement('div')
	// divBotoes.style.display = 'flex'
	// divBotoes.appendChild(btnRemover)
	// divBotoes.appendChild(btnAtualizar)
	// divUsuario.appendChild(divBotoes)

	//insere a div do usuario na div com a lista de usuarios
	cadastrarInternamento.appendChild(divInternamento)
}

function atualizar(id, divNome, divEmail, divCpf) {
	let body =
	{
		'Nome': divNome.value,
		'Email': divEmail.value,
		'Cpf': divCpf.value
	}

	fetch(url + "usuarios/" + id,
		{
			'method': 'PUT',
			'redirect': 'follow',
			'headers':
			{
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			'body': JSON.stringify(body)
		})
		.then((response) => {
			if (response.ok) {
				return response.text()
			}
			else {
				return response.text().then((text) => {
					throw new Error(text)
				})
			}
		})
		.then((output) => {
			listar()
			console.log(output)
			alert('Usuário atualizado! \\o/')
		})
		.catch((error) => {
			console.log(error)
			alert('Não foi possível atualizar o usuário :/')
		})
}

function remover(id) {
	fetch(url + 'usuarios/' + id,
		{
			'method': 'DELETE',
			'redirect': 'follow'
		})
		.then((response) => {
			if (response.ok) {
				return response.text()
			}
			else {
				return response.text().then((text) => {
					throw new Error(text)
				})
			}
		})
		.then((output) => {
			listar()
			console.log(output)
			alert('Usuário removido! >=]')
		})
		.catch((error) => {
			console.log(error)
			alert('Não foi possível remover o usuário :/')
		})
}
