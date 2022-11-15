<template>
	<form class="form" id="form_paciente" method="post">	
		<p for="cpf">Dados do Paciente</p>
		<input class="form-control" id="cpf" placeholder="CPF" 		   		 type="text"  required  autocomplete="off" maxlength="14" onkeypress="mask_cpf()" style="width: 40vh;"/>
		<input class="form-control" id="nome_completo"   	placeholder="Nome Completo"      type="text"  required/>
		<div style="display:flex">
			<input class="form-control" id="data_nascimento" placeholder="Data de Nascimento" type="date" required  maxlength="8" onblur="validaData(this.id)" style="margin-right:5px;"/>
			<select class="form-select select" id="sexo" onblur="validaSelect(this.id)" style="margin-left:5px;" required>
				<option value="" id="selectSexo" disabled selected>Sexo</option>
				<option value="masculino" id="masc">Masculino</option>
				<option value="feminino" id="fem">Feminino </option>
				<option value="outro" id="outro">	 Outro    </option>
			</select>
		</div>
		<input class="form-control" id="cep"             	placeholder="CEP"                type="number"  required/>
		<input class="form-control" id="logradouro"     	placeholder="Logradouro"         type="text"    required/>
		<div style="display:flex">
			<input class="form-control" id="numero"         placeholder="Número"             type="number"   required onblur="validaInput(this.id)" style="margin-right:5px;"/>
			<input class="form-control" id="complemento" 	placeholder="Complemento"        type="text"     required onblur="validaInput(this.id)" style="margin-left:5px;"/>
		</div>
		<input class="form-control" id="telefone"    	    placeholder="Telefone"     type="text"   autocomplete="off" maxlength="13" onkeypress="mask_phone()" required/>
		<button class="btn btn-primary" type="submit" id="submitPaciente">Cadastrar</button>
	</form>
	
</template>

<script setup>

</script>