import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    fecha_ingreso:'',
    allowedUsers: [
      {
        user: "dcalcina",
        password: "dcalcina",
        fullname: "Daniel Calcina",
        shortname: "DCALCINA",
        id_user: 1,
      },
      {
        user: "invitado",
        password: "invitado",
        fullname: "Usuario Invitado",
        shortname: "INVITADO",
        id_user: 2,
      },
    ],
    horarios:[
      {
        usuario_id: 1,
        hora_ingreso: "07:30:00",
        // hora_almuerzo: "13:00:00",
        hora_almuerzo: "22:49:00",
        hora_salida: "17:00:00",
      }
    ],
    registros_asistencias:[
      // id_usuario: number
      // fecha_registro: dd/mm/yy
      // marca_hora_ingreso: hh:mm:ss
      // marca_hora_refrigerio: hh:mm:ss
      // marca_hora_refrigerio_fin: hh:mm:ss
      // marca_hora_salida: hh:mm:ss
    ]
  },
  getters: {
    getUser: (state) => (id_user) =>{
      return state.allowedUsers.find(item => item.id_user === id_user)
    },
    getHorariobyUser: (state) =>(id_user)=>{
      return state.horarios.find(item => item.usuario_id === id_user)
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
