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
					<li><a href="cadastrar.html">Completos</a></li>
					<li><a href="cadastrar.html">Pacientes</a></li>
					<li><a href="cadastrar.html">Internamentos</a></li>
					<li><a href="cadastrar.html">Procedimentos</a></li>
				</ul>
			  </div>
			<img src="../../assets/img/img.png">
			<button class="btn btn-outline-light bt3" onclick="">Sair</button>
		</div>
</template>

<script setup>

</script>