<template>
    <div>
        <h1>Listar Internamentos</h1>
        <button class="btn btn-primary" @click="listar">Listar Internamentos</button>
        <table class="table table-hover" v-if="dados">
            <thead>
                <tr>
                    <th v-for="value, index in dados[0] " :key="value">{{ index }}</th>
                    <!-- <th>Editar</th> -->
                    <th>Apagar</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="internamentos, index in dados" :key="index">
                    <td v-for="internamento, index in internamentos" :key="index"> {{ internamento }}</td>
                    <!-- <td><button class="btn btn-primary" >Editar</button></td> -->
                    <td><button class="btn btn-danger" @click="deletar" :id="internamentos.internamentoId">Deletar</button></td>
                </tr>
            </tbody>
        </table>

    </div>
</template>

<script setup>
    import {ref} from 'vue'

    let dados  = ref();

    let listar = async()=>{
        const url = 'https://localhost:7203/internamentos'
        const req = await fetch(url)
        const res = await req.json()
        console.log(res)
        dados.value = res
    }

    async function deletar(data){
        let id = data.target.id
        const req = await fetch('https://localhost:7203/deletar/internamento/' + id)
        const res = await req.text();
        alert(res)
        listar()
    }
    
</script>