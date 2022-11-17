<template>
    <form class="form" id="form_paciente" >	
		<p for="cpf">Dados do Paciente</p>
		
		<input class="form-control" v-model="cpf"  placeholder="CPF" @keypress="mask_cpf" type="text" required="required" autocomplete="off" maxlength="14" style="width: 40vh;"/>
		<input class="form-control" @focus="verificarCPF" id="name" v-model="nome" placeholder="Nome Completo"  type="text"  required/>

		<div style="display:flex">
			<input class="form-control" v-model="data_nascimento" placeholder="Data de Nascimento" type="date" required="required"  maxlength="8" style="margin-right:5px;"/>
			<select class="form-select select" v-model="sexo"  style="margin-left:5px;" required="required">
				<option value="" id="selectSexo" disabled selected>Sexo</option>
				<option value="Masculino" id="masc">Masculino</option>
				<option value="Feminino" id="fem">Feminino</option>
				<option value="Outro" id="outro">Outro</option>
			</select>
		</div>

		<input class="form-control" v-model="cep" @blur="consultarCEP" placeholder="CEP" type="number"  required="required"/>
		<input class="form-control" v-model="logradouro" placeholder="Logradouro" type="text"  required="required"/>

		<div style="display:flex">
			<input class="form-control" v-model="numero" placeholder="Número" type="number" required="required"  style="margin-right:5px;"/>
			<input class="form-control" v-model="complemento" placeholder="Complemento" type="text" equired="required"  style="margin-left:5px;"/>
		</div>
		<input class="form-control" v-model="telefone"  placeholder="Telefone" type="text" @keypress="mask_phone" autocomplete="off" maxlength="13"  equired="required"/>
		<button class="btn btn-primary" type="submit" id="submitPaciente" v-if="!editar" @click="cadastrarPaciente">Cadastrar</button>
		<button class="btn btn-primary" type="submit" id="submitPaciente" v-if="editar" @click="editarPaciente">Salvar</button>
		<button class="btn btn-primary" type="submit" id="Limpar" v-if="editar" @click="limpar" style="margin-top:5px;">Voltar</button>

		<button class="btn btn-primary mt-2" @click.prevent="listar">Listar Pacientes</button>
        <table class="table table-hover table-responsive lista_pacientes" v-if="dados">
            <thead>
                <tr>
                    <th v-for="value, index in dados[0] " :key="value">{{ index }}</th>
					<th>Editar</th>
                    <th>Apagar</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="pacientes, index in dados"  :key="index" >
                    <td v-for="paciente, index in pacientes" :key="index"> {{ paciente }}</td>
					<td><button class="btn btn-primary" v-if="pacientes" :value="pacientes.cpf" @click="getDados">Editar</button></td>
                    <td><button class="btn btn-danger" @click="deletar" :id="pacientes.pacienteId">Deletar</button></td>
                </tr>
            </tbody>
        </table>
	</form>
	
	
</template>

<script setup>
	import {ref} from  'vue';

	let id = ref()
	let cpf = ref()
	let nome = ref()
	let data_nascimento = ref()
	let sexo = ref()
	let cep = ref()
	let logradouro = ref()
	let numero = ref()
	let complemento = ref ()
	let telefone = ref()
	let editar = ref(false)

	function validaNome() {
		if (nome.value.trim().split(' ').length >= 2) {
			nome.style.border = 0
			return true
		}
		else {
			nome.style.border = '2px solid red'
			return false
		}
	}

	function validaData() {
		if (data_nascimento.value.length > 0) {
			data_nascimento.style.border = 0
			return true
		}
		else {
			data_nascimento.style.border = '2px solid red'
			return false
		}
	}
	function mask_cpf() {
		if (cpf.value.length == 3 || cpf.value.length == 7) {
			cpf.value += "."
		} else if (cpf.value.length == 11) {
			cpf.value += "-"
		}
		else{
			return true
		}
	}

	function mask_phone() {
		if (telefone.value.length == 2) {
			telefone.value += " "
		} else if (telefone.value.length == 8) {
			telefone.value += "-"
		}
	}

	function validaSelect() {
		if (value.length > 0) {
			sexo.value.style.border = 0
			return true
		}
		else {
			sexo.value.style.border = '2px solid red'
			return false
		}
	}
	function validaInput(id) {
		if (id.value.length > 0) {
			id.style.border = 0
			return true
		}
		else {
			id.style.border = '2px solid red'
			return false
		}
	}
	async function cadastrarPaciente(){
		const url = 'https://localhost:7203/cadastrar/paciente';

		if(cpf.value == null || nome.value == null || data_nascimento.value == null || sexo.value == null ||
		  telefone.value == null || cep.value == null || logradouro.value == null || numero.value == null || 
		  complemento.value == null) {
			alert('Campos Obrigatórios')
		}
		else {
			const dados = {
			cpf:cpf.value,
			nome:nome.value,
			dataNasc:data_nascimento.value,
			sexo:sexo.value,
			telefone:telefone.value,
			cep:String(cep.value),
			logradouro:logradouro.value,
			numero:String(numero.value),
			complemento:complemento.value,
		}

		const req = await fetch (url, {
			'method': 'POST',
			'redirect': 'follow',
			'headers':
			{
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			'body': JSON.stringify(dados)
		}) 
		const res = await req.text();
		alert(res)
		limpar()
	}
}

	async function editarPaciente()	{

		const url = 'https://localhost:7203/atualizar/paciente/' + id.value;
		
		const dados = {
			pacienteId:id.value,
			cpf:cpf.value,
			nome:nome.value,
			dataNasc:data_nascimento.value,
			sexo:sexo.value,
			telefone:telefone.value,
			cep:String(cep.value),
			logradouro:logradouro.value,
			numero:String(numero.value),
			complemento:complemento.value,
		}
		console.log(dados)
		
		const req = await fetch (url, {
			'method': 'POST',
			'redirect': 'follow',
			'headers':
			{
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			'body': JSON.stringify(dados)
		}) 
		const res = await req.text();
		limpar()
		alert(res)
	}

	async function verificarCPF(){
		if(cpf.value){
			const req = await fetch('https://localhost:7203/paciente/cpf/' + cpf.value )
			const res = await req.json()
		
			if(res.length > 0){
				id.value = res[0].pacienteId
				nome.value = res[0].nome
				data_nascimento.value = res[0].dataNasc
				sexo.value = res[0].sexo
				cep.value = res[0].cep
				logradouro.value = res[0].logradouro
				numero.value = res[0].numero
				telefone.value = res[0].telefone
				complemento.value = res[0].complemento

				editar.value = true
			}
		}
		
	}

	function limpar(){
			cpf.value = null
			nome.value = null
			data_nascimento.value = null
			sexo.value = null 
			cep.value = null
			logradouro.value = null 
			numero.value = null
			telefone.value =  null
			complemento.value = null

			editar.value = false
	}

	let consultarCEP = async (cep)=>{
		if(cep.target.value.length == 8){
			const url = `https://viacep.com.br/ws/${cep.target.value}/json/`
			const req = await fetch(url)
			const res =  await req.json()
			logradouro.value = res.logradouro

			console.log(res)

		}
	}

	let dados  = ref();

    let listar = async()=>{
        const url = 'https://localhost:7203/pacientes'
        const req = await fetch(url)
        const res = await req.json()
        dados.value = res
    }

    async function deletar(data){
        let id = data.target.id
        const req = await fetch('https://localhost:7203/deletar/paciente/' + id)
        const res = await req.text();
        alert(res)
        listar()
    }
	function getDados(data){
		cpf.value = data.target.value		
	}

</script>