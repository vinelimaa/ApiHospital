import { createRouter, createWebHistory } from 'vue-router'
import index from '../views/index.vue'
import CadastrarPaciente from '../views/Cadastrar/CadastrarPaciente.vue' 
import CadastrarInternamento from '../views/Cadastrar/CadastrarInternamento.vue'
import CadastrarProcedimento from '../views/Cadastrar/CadastrarProcedimento.vue'
import ListarPaciente from '../views/Listar/ListarPaciente.vue'
import ListarProcedimento from '../views/Listar/ListarProcedimento.vue'
import ListarInternamento from '../views/Listar/ListarInternamento.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/cadastar/paciente',
      name: 'paciente',
      component: CadastrarPaciente
    },
    {
      path: '/cadastar/internamento',
      name: 'internameto',
      component: CadastrarInternamento
    }, 
    {
      path: '/cadastar/procedimento',
      name: 'procedimento',
      component: CadastrarProcedimento
    }, 
    {
      path: '/listar/paciente',
      name: 'listarPaciente',
      component: ListarPaciente
    }, 
    {
      path: '/listar/procedimento',
      name: 'listarProcedimento',
      component: ListarProcedimento
    }, 
    {
      path: '/listar/internamento',
      name: 'listarInternamento',
      component: ListarInternamento
    }, 
  ]
})

export default router
