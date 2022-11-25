<template>
    <div class="box">
        <MenuLateral />
        <RouterView />
    </div>
</template>

<script setup>
import {RouterLink, RouterView } from 'vue-router'
import MenuLateral from './components/Menu/MenuLateral.vue';

</script>
