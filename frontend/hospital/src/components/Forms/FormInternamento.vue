<template>
    <form class="form" :id="form_internaento">
		<p for="id">Dados do Internamento</p>
		<div style="display: flex;">
			<input class="form-control" v-model="cpf"  placeholder="CPF" type="text" @blur="buscarPacienteCPF" style="width: 30vh;"/>
			<input class="form-control" v-model="nome" type="text" style="margin-left:5px;" v-if="get"/>
		</div>

		<div style="display:flex">
			<input class="form-control" v-model="dataInt" placeholder="Data de Internamento" type="date"   style="margin-right:5px;"/>
			<input class="form-control" v-model="dataAlta" placeholder="Data de Alta" type="date"  style="margin-left:5px;"/>
		</div>

		<input class="form-control" v-model="leito"  placeholder="Leito" type="text" />
		<input class="form-control" v-model="cid" placeholder="CID"	type="text"	 />

		<select class="form-select select" v-model="carater_atendimento" required>
			<option value="" disabled selected>Carater de Atendimento</option>
			<option value="eletivo">Eletivo</option>
			<option value="urgencia">Urgência</option>
		</select>

		<select class="form-select select" v-model="motivo_Encerramento" >
			<option value="" disabled selected>Motivo de Encerramento</option>
			<option value="alta">Alta Melhorada</option>
			<option value="permanencia">Permanência por Reoperação </option>
			<option value="adm">Encerramento Administrativo</option>
			<option value="obito">Óbito</option>
		</select>

		<button class="btn btn-primary" @click.prevent='cadastrarInternamento'>Cadastrar Internamento</button>
	</form>
</template>

<script setup>
	import { ref } from 'vue'

	let cpf = ref()
	let pacienteId = ref()
	let dataInt = ref()
	let dataAlta = ref()
	let leito = ref()
	let cid = ref()
	let carater_atendimento = ref()
	let motivo_Encerramento = ref()

	async function cadastrarInternamento() {
		const url = 'https://localhost:7203/cadastrar/internamento';

		const dados = {
			dataInt: dataInt.value,
			dataAlta: dataAlta.value,
			leito: leito.value,
			cid: cid.value,
			carater_atendimento: carater_atendimento.value,
			motivo_Encerramento: motivo_Encerramento.value,
			pacienteId: pacienteId.value
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

	async function buscarPacienteCPF(){
		if(cpf.value){
			const req = await fetch('https://localhost:7203/paciente/cpf/' + cpf.value )
			const res = await req.json()
		
			if(res.length > 0){
				pacienteId.value = res[0].pacienteId
				
			}
			else{
				alert('Paciente não existe')
			}
		}
		
	}
	function limpar(){
		dataInt.value = ''
		dataAlta.value = ''
		leito.value = ''
		cid.value = ''
		carater_atendimento.value = ''
		motivo_Encerramento.value = ''
		pacienteId.value = ''
	}


</script>