<template>
    <div>
        <h1>Listar Procediemento</h1>
        <button class="btn btn-primary" @click="listar">Listar Pacientes</button>
        <table class="table table-hover" v-if="dados">
            <thead>
                <tr>
                    <th v-for="value, index in dados[0] " :key="value">{{ index }}</th>
                    <th>Editar</th>
                    <th>Apagar</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="pacientes, index in dados" :key="index">
                    <td v-for="paciente, index in pacientes" :key="index"> {{ paciente }}</td>
                    <td><button class="btn btn-primary">Editar</button></td>
                    <td><button class="btn btn-danger">Deletar</button></td>
                </tr>
            </tbody>
        </table>

    </div>
</template>

<script setup>
    import {ref} from 'vue'

    let dados  = ref();

    let listar = async()=>{
        const url = 'https://localhost:7203/procedimentos'
        const req = await fetch(url)
        const res = await req.json()
      
        dados.value = res
    }
    
</script>