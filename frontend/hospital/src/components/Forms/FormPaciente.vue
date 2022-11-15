<template>
    <form class="form" id="form_paciente" >	
		<p for="cpf">Dados do Paciente</p>
		
		<input class="form-control" v-model="cpf" placeholder="CPF" type="text" required autocomplete="off" maxlength="14" style="width: 40vh;"/>
		<input class="form-control" v-model="nome"   placeholder="Nome Completo"  type="text"  required/>

		<div style="display:flex">
			<input class="form-control" v-model="data_nascimento" placeholder="Data de Nascimento" type="date" required  maxlength="8" style="margin-right:5px;"/>
			<select class="form-select select" v-model="sexo"  style="margin-left:5px;" required>
				<option value="" id="selectSexo" disabled selected>Sexo</option>
				<option value="masculino" id="masc">Masculino</option>
				<option value="feminino" id="fem">Feminino</option>
				<option value="outro" id="outro">Outro</option>
			</select>
		</div>

		<input class="form-control" v-model="cep" @blur="consultarCEP" placeholder="CEP" type="number"  required/>
		<input class="form-control" v-model="logradouro" placeholder="Logradouro" type="text"  required/>

		<div style="display:flex">
			<input class="form-control" v-model="numero" placeholder="Número" type="number" required  style="margin-right:5px;"/>
			<input class="form-control" v-model="complemento" placeholder="Complemento" type="text"   style="margin-left:5px;"/>
		</div>
		<input class="form-control" v-model="telefone"  placeholder="Telefone" type="text" autocomplete="off" maxlength="13"  required/>
		<button class="btn btn-primary" type="submit" id="submitPaciente" @click.prevent="submit">Cadastrar</button>
	</form>
	
</template>

<script setup>
	import {ref} from  'vue';

	let cpf = ref()
	let nome = ref()
	let data_nascimento = ref()
	let sexo = ref()
	let cep = ref()
	let logradouro = ref()
	let numero = ref()
	let complemento = ref ()
	let telefone = ref()

	async function submit(){
		const url = 'https://localhost:7203/cadastrar/paciente';

		const data = {
			cpf:cpf.value,
			nome:nome.value,
			dataNasc:data_nascimento.value,
			sexo:sexo.value,
			telefone:telefone.value,
			cep:cep.value,
			logradouro:logradouro.value,
			numero:numero.value,
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
			'body': JSON.stringify(data)
		}) 
		//const res = req.text();

		console.log(req)
	}


	function cadastrarPaciente (){
		
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


</script>