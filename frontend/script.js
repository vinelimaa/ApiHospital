var url = 'http://localhost:3000/'

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
//Valida a data
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
function mask_cpf() {
    var cpf = document.getElementById('cpf')
    if (cpf.value.length == 3 || cpf.value.length == 7) {
        cpf.value += "."
    } else if (cpf.value.length == 11) {
        cpf.value += "-"
    }
}

function mask_phone() {
    var telefone = document.getElementById('telefone')
    if (telefone.value.length == 2) {
        telefone.value += " "
    } else if (telefone.value.length == 8) {
        telefone.value += "-"
    }
}

//Valida se os selects receberam algum dado
function validaSelect(id) {
	var select = document.getElementById(id);
	var value = select.options[select.selectedIndex].value;
	if (value.length > 0) {
		select.style.border = 0
		return true
	}
	else {
		select.style.border = '2px solid red'
		return false
	}
}
//Valida se os inputs receberam algum dado
function validaInput(id) {
	var input = document.getElementById(id)
	if (input.value.length > 0) {
		input.style.border = 0
		return true
	}
	else {
		input.style.border = '2px solid red'
		return false
	}
}
//valida o CEP
let cepInput = document.getElementById('cep')
let logInput = document.getElementById('logradouro');

cepInput.addEventListener('blur', async (e) => {
	if (e.target.value.length == 8) {
		const req = await fetch('https://viacep.com.br/ws/' + e.target.value + '/json')
		const res = await req.json()
		if (!res.erro) {
			document.getElementById('logradouro').value = res.logradouro
			cepInput.style.border = '0'
			logInput.style.border = '0'
		} else {
			alert('CEP inexistente!')
			cepInput.style.border = '2px solid red'
		}
	} else {
		cepInput.value = ''
		logInput.value = ''
		cepInput.style.border = '2px solid red'
	}
})

//Associa a descrição do procedimento ao código digitado
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
			descricao.value = ''
			return false
	}
}
//Gambiarra para mostrar formulários de cadastro em SPA
function mostrarTela() {
	let pacienteInvisivel = document.getElementById('form_paciente')
	pacienteInvisivel.style.display = 'none'
	let internamentoVisivel = document.getElementById('form_internamento')
	internamentoVisivel.style.display = 'flex'
	internamentoVisivel.style.flexDirection = 'column'
	let procedimentoVisivel = document.getElementById('form_procedimento')
	procedimentoVisivel.style.display = 'flex'
	procedimentoVisivel.style.flexDirection = 'column'
	let botaoVisivel = document.getElementById('botao_cadastrar')
	botaoVisivel.style.display = 'flex'
	botaoVisivel.style.flexDirection = 'column'
}

//Variáveis que irão guardar valores do banco de dados do paciente
let getLastID; let getCpfDB; let getNomeDB; let getIdDB;  let getNascDB; let getOptionDB;
let getTelDB;  let getCepDB; let getLogDB;  let getNumDB; let getCompDB;  

//Associando variáveis aos elementos de input do cadastro do paciente
let inputCpf		  = document.getElementById('cpf')
let inputNome 		  = document.getElementById('nome_completo')
let inputNasc 		  = document.getElementById('data_nascimento')
let inputTel 		  = document.getElementById('telefone')
let inputCep 		  = document.getElementById('cep')
let inputLog 		  = document.getElementById('logradouro')
let inputNum 		  = document.getElementById('numero')
let inputComp 		  = document.getElementById('complemento')
let buttonCadPaciente = document.getElementById('submitPaciente')

//Validação e envio de formulário de cadastro de pacientes
inputCpf.addEventListener('blur', async (e) => {
	e.preventDefault()
	let select = document.getElementById('sexo')
	if(inputCpf.value.length == 14) {
		const url = 'https://localhost:7203/'
		//Busca o paciente pelo cpf digitado
		const req = await fetch(url + 'paciente/cpf/'+ inputCpf.value)
		console.log(inputCpf.value)
		const res = await req.json();
		//Para cada registro encontrado, atribui o valor de cada elemento a uma variável
		for (key in res) {
			getCpfDB  = res[key].cpf
			getIdDB   = res[key].pacienteId
			getNomeDB = res[key].nome
			getNascDB = res[key].dataNasc
			getSexDB  = res[key].sexo
			getTelDB  = res[key].telefone
			getCepDB  = res[key].cep
			getLogDB  = res[key].logradouro
			getNumDB  = res[key].numero
			getCompDB = res[key].complemento
		}
		//valida se o nome digitado já existe no banco de dados
		if (getCpfDB == inputCpf.value) {
			//Se sim, insere os valores do banco de dados nos inputs
			inputNome.value = getNomeDB
			document.getElementById('data_nascimento').value = getNascDB
			let select = document.getElementById('sexo')
			select.removeAttribute("selected");
			switch(getSexDB) {
				case 'masculino': let masculino = document.getElementById('masc')
								  masculino.setAttribute("selected", true);
								  break;
				case 'feminino':  let feminino = document.getElementById('fem')
								  feminino.setAttribute("selected", true);
								  break;
				case 'outro':	  let outro = document.getElementById('outro')
								  outro.setAttribute("selected", true)
								  break;
			}
			document.getElementById('cep').value 			  = getCepDB
			document.getElementById('logradouro').value 	  = getLogDB
			inputNum.value = getNumDB
			document.getElementById('complemento').value 	  = getCompDB
			document.getElementById('telefone').value 		  = getTelDB

			buttonCadPaciente.innerHTML = 'Paciente já Cadastrado'
			//Desabilita o botão de cadastro do paciente
			buttonCadPaciente.setAttribute("disabled", "true")
			buttonCadPaciente.style.backgroundColor = 'green'
		}
		else {
			//Se o paciente não existe no banco de dados
			//Limpa os inputs
			inputNasc.value = ''
			inputTel.value = ''
			inputCep.value = ''
			inputLog.value = ''
			inputNum.value = ''
			inputComp.value = ''

			buttonCadPaciente.innerHTML = 'Cadastrar'
			//Habilita o botão de cadastro do paciente
			buttonCadPaciente.removeAttribute("disabled");
			buttonCadPaciente.style.backgroundColor = '#3c6382'

			//Busca o último ID do paciente cadastrado
			const url = 'https://localhost:7203/'
			const req = await fetch(url + 'ultimoId')
			let res = await req.json();
			//Atribui 1 ao valor do último ID
			getLastID = res + 1;
			console.log(getLastID)

			//Envio de formulário do paciente
			let formPaciente = document.getElementById('form_paciente')
			formPaciente.addEventListener('submit', async (e) => {
				e.preventDefault()
				const dados = {
					pacienteId:  getLastID,
					cpf: 		 inputCpf.value,
					nome: 		 inputNome.value,
					dataNasc: 	 inputNasc.value,
					sexo: 		 select.options[select.selectedIndex].value,
					telefone: 	 inputTel.value,
					cep: 		 inputCep.value,
					logradouro:  inputLog.value,
					numero: 	 inputNum.value,
					complemento: inputComp.value
				}
				console.log(JSON.stringify(dados))
				const url = 'https://localhost:7203/cadastrar/paciente'
				fetch(url,
					{
						'method': 'POST',
						'redirect': 'follow',
						'headers':
						{
							'Content-Type': 'application/json',
							'Accept': 'application/json'
						},
						'body': JSON.stringify(dados)
					})
				console.log(dados)
				alert('Cadastro efetuado com sucesso!')
			})
		}
	}
	else {
		console.log(inputCpf.value)
		inputCpf.style.border = '2px solid red'
		return false
	}
});

//Variáveis que irão guardar valores do banco de dados do internamento
let getLastIntID; let getDtIntDB; let getDtAltaDB; let getLeitoDB;  
let getCidDB; let getCarAtDB; let getMotEncDB; let getPacienteId;

//Associando variáveis aos elementos de input do cadastro do internamento
let inputIdPac		  = document.getElementById('id_pac_internamento')
let inputDtInt 		  = document.getElementById('data_int')
let inputDtAlta 	  = document.getElementById('data_alta')
let inputleito 		  = document.getElementById('leito')
let inputCid 		  = document.getElementById('cid')
let inputCarAt 		  = document.getElementById('carater_atendimento')
let inputMotEnc		  = document.getElementById('motivo_encerramento')
let buttonCadInter    = document.getElementById('submitInternamento')

//Formulário de cadastro de internamentos
inputIdPac.addEventListener('blur', async (e) => {
	e.preventDefault()
	
});
let formInternamento = document.getElementById('form_internamento')
formInternamento.addEventListener('button', async (e) => {
	e.preventDefault()

	let selectCarater = document.getElementById('carater_atendimento')
	let caraterOption = selectCarater.options[select.selectedIndex].value
	let selectMotivo = document.getElementById('motivo_encerramento')
	let motivoOption = selectMotivo.options[select.selectedIndex].value

	const dados = {
		dataInt: document.getElementById('data_int').value,
		dataAlta: document.getElementById('data_alta').value,
		leito: document.getElementById('leito').value,
		cid: document.getElementById('cid').value,
		carater_Atendimento: caraterOption,
		motivo_Encerramento: motivoOption,
		pacienteId: 1
	}
	console.log(JSON.stringify(dados))
	const url = 'https://localhost:7203/cadastrar/paciente'
	fetch(url,
		{
			'method': 'POST',
			'redirect': 'follow',
			'headers':
			{
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			'body': JSON.stringify(dados)
		})
	console.log(dados)
})
//Formulário de cadastro de procedimentos
// let formProcedimento = document.getElementById('form_procedimento')
// formProcedimento.addEventListener('submit', async (e) => {
// 	e.preventDefault()
// 	const dados = {
// 		medico: document.getElementById('medico').value,
// 		medicoCBO: document.getElementById('cbo').value,
// 		codigo_Procedimento: document.getElementById('codigo').value,
// 		descProcedimento: document.getElementById('descricao').value,
// 		qtdProcedimento: document.getElementById('qtd').value,
// 		internamentoId: 1,
// 		pacienteId: 1
// 	}
// 	console.log(JSON.stringify(dados))
// 	const url = 'https://localhost:7203/cadastrar/paciente'
// 	fetch(url,
// 		{
// 			'method': 'POST',
// 			'redirect': 'follow',
// 			'headers':
// 			{
// 				'Content-Type': 'application/json',
// 				'Accept': 'application/json'
// 			},
// 			'body': JSON.stringify(dados)
// 		})
// 	console.log(dados)
// })

//Cria tabela com procedimentos adicionados
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

	if (procedimentos[0].codigo && procedimentos[0].qtd && procedimentos[0].descricao 
		&& procedimentos[0].medico && procedimentos[0].cbo) {
		
		let table = document.getElementById("tableProcedimento");
		let data = Object.keys(procedimentos[0]);
		// generateTableHead(table, data);
		generateTable(table, procedimentos);

		let tableOn = document.getElementById("tableProcedimento");
		tableOn.style.display = 'table'

		document.getElementById('codigo').value = ''
		document.getElementById('qtd').value = ''
		document.getElementById('descricao').value = ''
		document.getElementById('medico').value = ''
		document.getElementById('cbo').value = ''
	}
}

async function buscarPacientes() {
	const url = 'https://localhost:7203/'
	const req = await fetch(url + 'pacientes')
	const res = req.json();

	let tablePaciente = document.getElementById('tablePaciente')
	tablePaciente.generateTable(res)
}



function generateTable(table, data) {
	for (let element of data) {
		let row = table.insertRow();
		let buttonEditar = document.createElement("button")
		buttonEditar.setAttribute('class', 'btn btn-warning editar')
		buttonEditar.setAttribute('style', 'margin-right: 5px;')
		buttonEditar.innerHTML = 'E'
		let buttonRemover = document.createElement("button")
		buttonRemover.setAttribute('class', 'btn btn-danger apagar')
		buttonRemover.setAttribute('style', 'margin-left: 5px;')
		buttonRemover.innerHTML = 'R'
		for (key in element) {
			let cell = row.insertCell();
			let text = document.createTextNode(element[key]);
			cell.appendChild(text);
			row.appendChild(buttonEditar)
			row.appendChild(buttonRemover)
		}
	}
}
let table = document.getElementById("tableProcedimento");
generateTableHead(table);

function generateTableHead(table) {
	let thead = table.createTHead();
	let row = thead.insertRow();
	// let id = document.createElement("th")
	let codigo = document.createElement("th")
	let qtd = document.createElement("th")
	let descricao = document.createElement("th")
	let medico = document.createElement("th")
	let cbo = document.createElement("th")
	let comandos = document.createElement("th")
	let text0 = document.createTextNode('id')
	let text = document.createTextNode('Código')
	let text2 = document.createTextNode('Qtd')
	let text3 = document.createTextNode('Descrição')
	let text4 = document.createTextNode('Médico')
	let text5 = document.createTextNode('CBO')
	let text6 = document.createTextNode('Comandos')
	// id.appendChild(text0)
	codigo.appendChild(text)
	qtd.appendChild(text2)
	descricao.appendChild(text3)
	medico.appendChild(text4)
	cbo.appendChild(text5)
	comandos.appendChild(text6)
	// row.appendChild(id)
	row.appendChild(codigo)
	row.appendChild(qtd)
	row.appendChild(descricao)
	row.appendChild(medico)
	row.appendChild(cbo)
	row.appendChild(comandos)
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
