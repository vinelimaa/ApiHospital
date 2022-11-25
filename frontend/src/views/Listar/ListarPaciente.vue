<template>
    <div id="lista_pacientes">
        <button class="btn btn-primary" @click="listar">Listar Pacientes</button>
        <table class="table table-hover table-responsive lista_pacientes" v-if="dados">
            <thead>
                <tr>
                    <th v-for="value, index in dados[0] " :key="value">{{ index }}</th>
                    <th>Apagar</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="pacientes, index in dados" :key="index">
                    <td v-for="paciente, index in pacientes" :key="index"> {{ paciente }}</td>
                    <td><button class="btn btn-danger" @click="deletar" :id="pacientes.pacienteId">Deletar</button></td>
                </tr>
            </tbody>
        </table>

    </div>
</template>

<script setup>
    import {ref} from 'vue'

    let dados  = ref();

    let listar = async()=>{
        const url = 'https://localhost:7203/pacientes'
        const req = await fetch(url)
        const res = await req.json()
        dados.value = res
    }

    async function deletar(data){
        let id = data.target.id
        const req = await fetch('https://localhost:7203/deletar/paciente/' + id)
        const res = await req.text();
        alert(res)
        listar()
    }
    
</script>