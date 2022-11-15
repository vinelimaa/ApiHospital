<template>
    <div class="menu">
			<div class="btn-group dropend">
				<button type="button" class="btn btn-outline-light dropdown-toggle bt1" data-bs-toggle="dropdown" aria-expanded="false">
				  Cadastrar
				</button>
				<ul class="dropdown-menu">
					<RouterLink to="/cadastar/paciente">Paciente</RouterLink><br/>
                    <RouterLink to="/cadastar/internamento">Internamento</RouterLink><br/>
                    <RouterLink to="/cadastar/procedimento">Procedimento</RouterLink><br/>
				</ul>
			  </div>
			  <div class="btn-group dropend">
				<button type="button" class="btn btn-outline-light dropdown-toggle bt2" data-bs-toggle="dropdown" aria-expanded="false">
				  Listar Cadastros
				</button>
				<ul class="dropdown-menu">
					<RouterLink to="/pacientes">Pacientes</RouterLink><br/>
                    <RouterLink to="/internamentos">Internamentos</RouterLink><br/>
                    <RouterLink to="/procedimentos">Procedimentos</RouterLink><br/>
				</ul>
			  </div>
			<img src="../../assets/img/img.png"/>
			<button class="btn btn-outline-light bt3" onclick="">Sair</button>
		</div>
</template>

<script setup>
	import { RouterLink } from 'vue-router';
</script>