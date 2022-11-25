<template>
	<div>
		<form class="form" id="form_procedimento">
			<p for="codigo">Procedimentos</p>
			<div style="display:flex">
				<input class="form-control" v-model="id" placeholder="ID Internamento" type="text" required
					style="width: 30vh;" />
				<div class="btn-group dropend">
					<button type="button" class="btn btn-outline-light dropdown-toggle btPesquisar"
						@click="listarInternamentos" data-bs-toggle="dropdown" aria-expanded="false">
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
							class="bi bi-search" viewBox="0 0 16 16">
							<path
								d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
						</svg>
					</button>
					<ul class="dropdown-menu" id="list">
						<li v-for="value, index in dadosdrop" :key="index"><button class="btn" type="button"
								:id="value.id" @click="pegarIdInternamento">{{ value.nome }}-{{ value.dataInt }}</button>
						</li>
					</ul>
				</div>
			</div>
			<div style="display:flex">
				<input class="form-control" id="codigo" v-model="codigo" placeholder="Código" type="text" required
					style="margin-right: 5px;" />
				<input class="form-control" id="qtd" v-model="qtd" placeholder="Qtd" type="number" required
					style="margin-left: 5px" />
			</div>
			<input class="form-control" id="descricao" v-model="descricao" placeholder="Descrição" type="text" />
			<div style="display:flex">
				<input class="form-control" id="medico" v-model="medico" placeholder="Médico" type="text" required
					style="margin-right: 5px" />
				<input class="form-control" id="cbo" v-model="cbo" placeholder="CBO" type="text" required
					style="margin-left: 5px" />
			</div>
			<button class="btn btn-primary" type="button" id="addProcedimento" v-if="!editar"
				@click="cadastrarProcedimento">Adicionar Procedimento</button>
			<button class="btn btn-primary mt-2" type="submit" id="editarProcedimento" v-if="editar"
				@click.prevent="editarProcedimento">Editar</button>
			<button class="btn btn-primary" type="submit" id="Limpar" v-if="editar" @click="limpar"
				style="margin-top:5px;">Limpar</button>

			<button class="btn btn-primary mt-2" @click="listar">Listar Procedimentos</button>
		</form>
		<table class="bg-light table_pacientes text-center m-auto " v-if="dados" @load="listar">
			<thead>
				<tr>
					<th width="50px" style="font-size: 13px;" class="text-center border border-dark p-1" v-for="value, index in dados[0] " :key="value">{{ index }}</th>
					<th width="50px" style="font-size: 13px;" class="text-center border border-dark p-1">Editar</th>
					<th width="50px" style="font-size: 13px;" class="text-center border border-dark p-1">Apagar</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="procedimentos, index in dados" :key="index">
					<td width="50px" style="font-size: 13px;" class="text-center border border-dark p-1" v-for="procedimento, index in procedimentos" :key="index"> {{ procedimento }}</td>
					<td width="50px" style="font-size: 13px;" class="text-center border border-dark p-1"><button class="btn btn-primary" :id="procedimentos.procedimentoId" @click="getProcedimentoid">Editar</button></td>
					<td width="50px" style="font-size: 13px;" class="text-center border border-dark p-1"><button class="btn btn-danger" @click="deletar" :id="procedimentos.procedimentoId">Deletar</button></td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script setup>

import { ref } from 'vue';

let id = ref()
let pacienteid = ref()
let codigo = ref()
let qtd = ref()
let descricao = ref()
let data_nascimento = ref()
let medico = ref()
let cbo = ref()
let procedimentoId = ref()

let editar = ref(false)

let dadosdrop = ref()
let dados = ref()

function limpar() {
	id.value = null
	codigo.value = null
	qtd.value = null
	descricao.value = null
	data_nascimento.value = null
	medico.value = null
	cbo.value = null
}

async function listarInternamentos() {
	const req = await fetch('https://localhost:7203/internamento/paciente')
	const res = await req.json()
	dadosdrop.value = res;
	for (let key in res) {
		let id = res[key].pacienteid
		pacienteid = id
	}
}

function pegarIdInternamento(data) {
	let internamentoId = data.target.id
	id.value = internamentoId
}

async function cadastrarProcedimento() {

	if (codigo.value == null || qtd.value == null || descricao.value == null || medico.value == null || cbo.value == null) {
		alert('Campos Obrigatórios')
	} else {
		const url = ('https://localhost:7203/cadastrar/procedimento')
		const dados = {
			medico: String(medico.value),
			medicoCBO: cbo.value,
			codigo_Procedimento: String(codigo.value),
			descProcedimento: String(descricao.value),
			qtdProcedimento: qtd.value,
			internamentoId: id.value,
			pacienteId: pacienteid.value
		}
		const req = await fetch(url, {
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

async function editarProcedimento() {
	const url = 'https://localhost:7203/atualizar/procedimento/' + procedimentoId.value;

	const dados = {
		medico: String(medico.value),
		medicoCBO: cbo.value,
		codigo_Procedimento: String(codigo.value),
		descProcedimento: String(descricao.value),
		qtdProcedimento: qtd.value,
		internamentoId: id.value,
		pacienteId: pacienteid.value,
		procedimentoId: procedimentoId.value
	}

	const req = await fetch(url, {
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
	editar.value = false
	limpar()
	alert(res)
	listar()
}

let listar = async () => {
	const url = 'https://localhost:7203/procedimentos'
	const req = await fetch(url)
	const res = await req.json()
	dados.value = res
}

async function deletar(data) {
	let id = data.target.id
	const url = 'https://localhost:7203/deletar/procedimento/' + id;
	const req = await fetch(url, {
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
	alert(res)
	listar()
}

async function getProcedimentoid(data) {
	const req = await fetch('https://localhost:7203/buscar/procedimento/' + data.target.id)
	const res = await req.json()
	codigo.value = res[0].codigo_Procedimento
	qtd.value = res[0].qtdProcedimento
	descricao.value = res[0].descProcedimento
	medico.value = res[0].medico
	cbo.value = res[0].medicoCBO
	procedimentoId.value = res[0].procedimentoId
	editar.value = true
}

</script>