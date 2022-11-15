<template>
    <div class="menu">
			<div class="btn-group dropend">
				<button type="button" class="btn btn-outline-light dropdown-toggle bt1" data-bs-toggle="dropdown" aria-expanded="false">
				  Cadastrar
				</button>
				<ul class="dropdown-menu">
					<a href="cadastrar.html" id="cadastro_paciente">Paciente</a>
					<p id="cadastro_internamento" onclick="mostrarTela()" >Internamento</p>
				</ul>
			  </div>
			  <div class="btn-group dropend">
				<button type="button" class="btn btn-outline-light dropdown-toggle bt2" data-bs-toggle="dropdown" aria-expanded="false">
				  Listar Cadastros
				</button>
				<ul class="dropdown-menu">
					<a href="cadastrar.html">Completos</a>
					<a href="cadastrar.html">Pacientes</a>
					<a href="cadastrar.html">Internamentos</a>
					<a href="cadastrar.html">Procedimentos</a>
				</ul>
			  </div>
			<img src="img.png">
			<button class="btn btn-outline-light bt3" onclick="">Sair</button>
		</div>
</template>

<script setup>

</script>