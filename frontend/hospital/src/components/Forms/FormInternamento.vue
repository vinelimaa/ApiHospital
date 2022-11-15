<template>
    <form class="form" id="form_internamento" >
				<p for="id">Dados do Internamento</p>
				<div style="display: flex;">
					<input class="form-control" id="id_pac_internamento" 				placeholder="ID Paciente" 		   type="number" required onblur="validaInput(this.id)" style="width: 30vh;"/>
					<button class="btn btn-outline-warning btPesquisar" type="button"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
						<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/></svg>
					</button>
				</div>
				<div style="display:flex">
					<input class="form-control" id="data_int"  		placeholder="Data de Internamento" type="text"   required onfocus="(this.type='date')" onblur="validaData(this.id)" style="margin-right:5px;"/>
					<input class="form-control" id="data_alta" 		placeholder="Data de Alta"		   type="text" 	 required onfocus="(this.type='date')" onblur="validaData(this.id)" style="margin-left:5px;"/>
				</div>
				<input class="form-control" id="leito" 				placeholder="Leito" 			   type="text"	 required onblur="validaInput(this.id)"/>
				<input class="form-control" id="cid"					placeholder="CID"			   type="text"	 required onblur="validaInput(this.id)"/>
				<select class="form-select select" id="carater_atendimento" onblur="validaSelect(this.id)">
					<option value="" disabled selected>Carater de Atendimento</option>
					<option value="eletivo"> Eletivo </option>
					<option value="urgencia">Urgência</option>
				</select>
				<select class="form-select select" id="motivo_encerramento" onblur="validaSelect(this.id)">
					<option value="" disabled selected>Motivo de Encerramento	  </option>
					<option value="alta">			   Alta Melhorada	 	 	  </option>
					<option value="permanencia">	   Permanência por Reoperação </option>
					<option value="adm">			   Encerramento Administrativo</option>
					<option value="obito">			   Óbito					  </option>
				</select>
				<button class="btn btn-primary" type="submit" id="submitInternamento">Cadastrar Internamento</button>
			</form>

</template>

<script setup>


</script>