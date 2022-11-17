<template>
    <form class="form">
		<p for="id">Dados do Internamento</p>
		<div style="display: flex;">
			<input class="form-control" v-model="cpf"  placeholder="CPF" type="text" required="required" @keypress="mask_cpf" @blur="buscarPacienteCPF" style="width: 30vh;"/>
			<input class="form-control" v-model="nome" type="text" style="margin-left:5px;" v-if="get" required="required"/>
		</div>

		<div style="display:flex">
			<input class="form-control" v-model="dataInt" placeholder="Data de Internamento" type="date" required="required"  style="margin-right:5px;"/>
			<input class="form-control" v-model="dataAlta" placeholder="Data de Alta" type="date" required="required"  style="margin-left:5px;"/>
		</div>

		<input class="form-control" v-model="leito"  placeholder="Leito" type="text" required="required"/>
		<input class="form-control" v-model="cid" placeholder="CID"	type="text"	required="required" />

		<select class="form-select select" v-model="carater_atendimento" required="required">
			<option value="" disabled selected>Carater de Atendimento</option>
			<option value="eletivo">Eletivo</option>
			<option value="urgencia">Urgência</option>
		</select>

		<select class="form-select select" v-model="motivo_Encerramento" required="required">
			<option value="" disabled selected>Motivo de Encerramento</option>
			<option value="alta">Alta Melhorada</option>
			<option value="permanencia">Permanência por Reoperação </option>
			<option value="adm">Encerramento Administrativo</option>
			<option value="obito">Óbito</option>
		</select>

		<button class="btn btn-primary" type="submit" id="submitPaciente" v-if="!editar" @click.prevent='cadastrarInternamento'>Cadastrar Internamento</button>
		<button class="btn btn-primary" type="submit" id="editarPaciente" v-if="editar" @click.prevent="editarInternamento">Editar</button>
		<button class="btn btn-primary" type="submit" id="Limpar" v-if="editar" @click="limpar" style="margin-top:5px;">Limpar</button>
		
		<button class="btn btn-primary mt-2" @click="listar">Listar Internamentos</button>
        <table class="table table-hover table-responsive lista_pacientes" v-if="dados">
            <thead>
                <tr>
                    <th v-for="value, index in dados[0] " :key="value">{{ index }}</th>
                    <th>Editar</th>
                    <th>Apagar</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="internamentos, index in dados" :key="index">
                    <td v-for="internamento, index in internamentos" :key="index"> {{ internamento }}</td>
                    <td><button class="btn btn-primary" >Editar</button></td>
                    <td><button class="btn btn-danger" @click="deletar" :id="internamentos.internamentoId">Deletar</button></td>
                </tr>
            </tbody>
        </table>
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
	let editar = ref(false)


	async function cadastrarInternamento() {
		const url = 'https://localhost:7203/cadastrar/internamento';

		if(dataInt.value == null || dataInt.value == null || dataInt.value == null || 
		   dataInt.value == null || dataInt.value == null || dataInt.value == null) 
		{
			alert('Campos Obrigatórios')
		}
		else
		{
			const dados = 
			{
				dataInt: String(dataInt.value),
				dataAlta:String (dataAlta.value),
				leito: String (leito.value),
				cid: String (cid.value),
				carater_atendimento: String (carater_atendimento.value),
				motivo_Encerramento: String (motivo_Encerramento.value),
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
	}

	async function editarInternamento() {
		const url = 'https://localhost:7203/atualizar/internamento';

		const dados = {
			dataInt: String(dataInt.value),
			dataAlta:String (dataAlta.value),
			leito: String (leito.value),
			cid: String (cid.value),
			carater_atendimento: String (carater_atendimento.value),
			motivo_Encerramento: String (motivo_Encerramento.value),
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

	function mask_cpf() {
		if (cpf.value.length == 3 || cpf.value.length == 7) {
			cpf.value += "."
		} else if (cpf.value.length == 11) {
			cpf.value += "-"
		}
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
		dataInt.value = null
		dataAlta.value = null
		leito.value = null
		cid.value = null
		carater_atendimento.value = null
		motivo_Encerramento.value = null
		pacienteId.value = null
	}

	let dados  = ref();

    let listar = async()=>{
        const url = 'https://localhost:7203/internamentos'
        const req = await fetch(url)
        const res = await req.json()
        console.log(res)
        dados.value = res
    }

    async function deletar(data){
        let id = data.target.id
		const url = 'https://localhost:7203/deletar/internamento/' + id;
        const req = await fetch (url, {
			'method': 'POST',
			'redirect': 'follow',
			'headers':
			{
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			'body': JSON.stringify(id)
		}) 
        const res = await req.text();
		console.log(id)
        alert(res)
        listar()
    }

</script>