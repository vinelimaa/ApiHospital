<template>
    <div>
        <header>
        <div class="wrapper">
            <nav>
                <RouterLink to="/">Home</RouterLink><br/>
                <RouterLink to="/cadastar/paciente">cadastar paciente</RouterLink><br/>
                <RouterLink to="/cadastar/internamento">cadastar internamento</RouterLink><br/>
                <RouterLink to="/cadastar/procedimento">cadastar procedimento</RouterLink><br/>
            </nav>
        </div>
        </header>
        <RouterView />
    </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import MenuLateral from './components/Menu/MenuLateral.vue';



</script>
