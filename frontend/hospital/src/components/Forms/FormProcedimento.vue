<template>
    <form class="form" id="form_procedimento">
		<p for="codigo">Procedimentos</p>
		<div style="display:flex">
			<input class="form-control" v-model="id"  placeholder="ID Internamento" type="text" required style="width: 30vh;"/>
		<div class="btn-group dropend">
			<button type="button" class="btn btn-outline-light dropdown-toggle btPesquisar" @click="listarInternamentos" data-bs-toggle="dropdown" aria-expanded="false">
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
				<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/></svg>
			</button>
				<ul class="dropdown-menu" id="list">
					<li v-for="value, index in dados" :key="index"><button class="btn" type="button" :id="value.id" @click="pegarIdInternamento">{{value.nome }}-{{value.dataInt}}</button></li>
				</ul>
			</div>
		</div>
		<div style="display:flex">
			<input class="form-control" id="codigo" v-model="codigo"	placeholder="Código" 	 type="text" required  style="margin-right: 5px;"/>
			<input class="form-control" id="qtd" 	v-model="qtd"		placeholder="Qtd"		 type="number" required  style="margin-left: 5px" />
		</div>
		<input class="form-control" id="descricao"	v-model="descricao"	placeholder="Descrição"	 type="text"/>
		<div style="display:flex">
			<input class="form-control" id="medico"	v-model="medico"	placeholder="Médico"	 type="text"   required  style="margin-right: 5px"/>
			<input class="form-control" id="cbo"	v-model="cbo"		placeholder="CBO"		 type="text"   required  style="margin-left: 5px"/>
		</div>
		<button class="btn btn-primary" type="button" id="addProcedimento" @click="cadastrarProcedimento">Adicionar Procedimento</button>
		<button class="btn btn-primary" type="submit" id="Limpar" v-if="editar" @click="limpar" style="margin-top:5px;">Limpar</button>
	</form >
</template>

<script setup>

	import {ref} from  'vue';
	let idProc = ref()
	let id = ref()
	let pacienteid = ref()
	let codigo = ref()
	let qtd = ref()
	let descricao = ref()
	let data_nascimento = ref()
	let medico = ref()
	let cbo = ref()
	let editar = ref(true)

	let dados = ref()

	function limpar() {
		id.value = ''
		codigo.value = ''
		qtd.value = ''
		descricao.value = ''
		data_nascimento.value = ''
		medico.value = ''
		cbo.value = ''
	}
	
	async function listarInternamentos() {
		const req = await fetch ('https://localhost:7203/internamento/paciente')
		const res = await req.json()
		dados.value = res
		for(let key in res) {
			pacienteid = res[1].pacienteid
		}
	}

	function pegarIdInternamento(data) {
		let internamentoId = data.target.id
		id.value = internamentoId
		console.log(id.value)
	}

	async function cadastrarProcedimento() {
		const url = ('https://localhost:7203/cadastrar/procedimento')
		const dados = {
			medico: String (medico.value),
			medicoCBO: cbo.value,
			codigo_Procedimento: String (codigo.value),
			descProcedimento: String (descricao.value),
			qtdProcedimento: qtd.value,
			internamentoId: id.value,
			pacienteId: pacienteid
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
		alert(res)
		limpar()
	}

	async function editarProcedimento(){
		const url = 'https://localhost:7203/atualizar/procedimento/' + idProc.value;
		
		const dados = {
			medico: String (medico.value),
			medicoCBO: cbo.value,
			codigo_Procedimento: String (codigo.value),
			descProcedimento: String (descricao.value),
			qtdProcedimento: qtd.value,
			internamentoId: id.value,
			pacienteId: pacienteid
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
		limpar()
		alert(res)
	}
</script>