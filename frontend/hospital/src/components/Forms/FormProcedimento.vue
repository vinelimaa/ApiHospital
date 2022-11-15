<template>
    <form class="form" id="form_procedimento">
		<p for="codigo">Procedimentos</p>
		<div style="display:flex">
			<input class="form-control" id="codigo" 	placeholder="Código" 				type="number" required  style="margin-right: 5px;"/>
			<input class="form-control" id="qtd" 		placeholder="Qtd"					type="number" required  style="margin-left: 5px" />
		</div>
		<input class="form-control" id="descricao"		placeholder="Descrição"				type="text"/>
		<div style="display:flex">
			<input class="form-control" id="medico"		placeholder="Médico"				type="text"   required  style="margin-right: 5px"/>
			<input class="form-control" id="cbo"		placeholder="CBO"					type="text"   required  style="margin-left: 5px"/>
		</div>
		<button class="btn btn-primary" id="submitProcedimento">Adicionar Procedimento</button>
	</form >
    
</template>

<script setup>



</script>