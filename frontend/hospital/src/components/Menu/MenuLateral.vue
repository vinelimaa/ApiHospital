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
				  Listar
				</button>
				<ul class="dropdown-menu">
					<li><RouterLink to="/listar/paciente">Pacientes</RouterLink><br/></li>
					<li><RouterLink to="/listar/internamento">Internamentos</RouterLink><br/></li>
					<li><RouterLink to="/listar/procedimento">Procedimentos</RouterLink><br/></li>
				</ul>
			  </div>
			<RouterLink to="/wellcome"><img src="../../assets/img/img.png"/></RouterLink><br/>
			<button class="btn btn-outline-light bt3" onclick="">Sair</button>
		</div>
</template>

<script setup>
	
</script>