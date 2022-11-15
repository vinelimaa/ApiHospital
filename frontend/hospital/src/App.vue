<template>
    <div class="box">
        <MenuLateral/>
        <div>
            <RouterView />
        </div>
    </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import MenuLateral from './components/Menu/MenuLateral.vue';



</script>
