<template>
    <div>
        <h1>Listar Procedimentos</h1>
        <table class="table table-hover procedimentos" v-if="dados" @load="listar">
            <thead>
                <tr>
                    <th v-for="value, index in dados[0] " :key="value">{{ index }}</th>
                    <!-- <th>Editar</th> -->
                    <th>Apagar</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="procedimentos, index in dados" :key="index">
                    <td v-for="procedimento, index in procedimentos" :key="index"> {{ procedimento }}</td>
                    <!-- <td><button class="btn btn-primary">Editar</button></td> -->
                    <td><button class="btn btn-danger" @click="deletar" :id="procedimentos.procedimentoId">Deletar</button></td>
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

    async function deletar(data){
        let id = data.target.id
        const req = await fetch('https://localhost:7203/deletar/procedimento/' + id)
        const res = await req.text();
        alert(res)
        listar()
    }
    
</script>