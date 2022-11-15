<template>
    <div class="menu">
			<div class="btn-group dropend">
				<button type="button" class="btn btn-outline-light dropdown-toggle bt1" data-bs-toggle="dropdown" aria-expanded="false">
				  Cadastrar
				</button>
				<ul class="dropdown-menu">
					<RouterLink to="/cadastar/paciente">cadastar paciente</RouterLink><br/>
                    <RouterLink to="/cadastar/internamento">cadastar internamento</RouterLink><br/>
                    <RouterLink to="/cadastar/procedimento">cadastar procedimento</RouterLink><br/>
				</ul>
			  </div>
			  <div class="btn-group dropend">
				<button type="button" class="btn btn-outline-light dropdown-toggle bt2" data-bs-toggle="dropdown" aria-expanded="false">
				  Listar Cadastros
				</button>
				<ul class="dropdown-menu">
					<RouterLink to="">Completos</RouterLink>
					<RouterLink to="/cadastar/paciente">cadastar paciente</RouterLink><br/>
                    <RouterLink to="/cadastar/internamento">cadastar internamento</RouterLink><br/>
                    <RouterLink to="/cadastar/procedimento">cadastar procedimento</RouterLink><br/>
				</ul>
			  </div>
			<img src="../../assets/img/img.png"/>
			<button class="btn btn-outline-light bt3" onclick="">Sair</button>
		</div>
</template>

<script setup>
	import { RouterLink } from 'vue-router';
</script>