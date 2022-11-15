import { createRouter, createWebHistory } from 'vue-router'
import index from '../views/index.vue'
import CadastrarPaciente from '../views/CadastrarPaciente.vue' 
import CadastrarInternamento from '../views/CadastrarInternamento.vue'
import CadastrarProcedimento from '../views/CadastrarProcedimento.vue'

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
  ]
})

export default router
