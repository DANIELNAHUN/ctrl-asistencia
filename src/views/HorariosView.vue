<template>
  <v-card>
    <v-card-title>Mi Horario</v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="2"><strong>Entrada: </strong></v-col>
          <v-col cols="2">{{ getHorariobyUser.hora_ingreso }}</v-col>
          <v-col cols="3"><v-btn dark color="green" @click="dialog1=true">Solicitar cambio</v-btn></v-col>
        </v-row>
        <v-row>
          <v-col cols="2"><strong>Almuerzo (1 hora): </strong></v-col>
          <v-col cols="2">{{ getHorariobyUser.hora_almuerzo }}</v-col>
          <v-col cols="3"><v-btn dark color="green" @click="dialog2=true">Solicitar cambio</v-btn></v-col>
        </v-row>
        <v-row>
          <v-col cols="2"><strong>Salida: </strong></v-col>
          <v-col cols="2">{{ getHorariobyUser.hora_salida }}</v-col>
          <v-col cols="3"><v-btn dark color="green" @click="dialog3=true">Solicitar cambio</v-btn></v-col>
        </v-row>
        <v-dialog v-model="dialog1" persistent max-width="350">
          <v-time-picker use-seconds ampm-in-title color="accent" header-color="primary" v-model="time_ing">
            <v-spacer></v-spacer>
            <v-btn text color="secondary" @click="dialog1 = false">Cancel</v-btn>
            <v-btn text color="primary" @click="cambiar_ingreso()">OK</v-btn>
          </v-time-picker>
        </v-dialog>
        <v-dialog v-model="dialog2" persistent max-width="350">
          <v-time-picker use-seconds ampm-in-title color="accent" header-color="primary" v-model="time_alm">
            <v-spacer></v-spacer>
            <v-btn text color="secondary" @click="dialog2 = false">Cancel</v-btn>
            <v-btn text color="primary" @click="cambiar_almuerzo()">OK</v-btn>
          </v-time-picker>
        </v-dialog>
        <v-dialog v-model="dialog3" persistent max-width="350">
          <v-time-picker use-seconds ampm-in-title color="accent" header-color="primary" v-model="time_sal">
            <v-spacer></v-spacer>
            <v-btn text color="secondary" @click="dialog3 = false">Cancel</v-btn>
            <v-btn text color="primary" @click="cambiar_salida()">OK</v-btn>
          </v-time-picker>
        </v-dialog>
      </v-container>
    </v-card-text>
  </v-card>
</template>
<script>
export default{
  created() {
    this.id_usuario_scord = parseInt(localStorage.getItem("token"));
  },
  data(){
    return{
      id_usuario_scord: Number,
      dialog1: false,
      dialog2: false,
      dialog3: false,
      time_ing: null,
      time_alm: null,
      time_sal: null,
    }
  },
  computed: {
    getUserLogged() {
      return this.$store.getters.getUser(this.id_usuario_scord);
    },
    getHorariobyUser() {
      return this.$store.getters.getHorariobyUser(this.id_usuario_scord);
    },
  },
  methods:{
    cambiar_ingreso(){
      this.dialog1 = false
      this.$store.dispatch('updateHoraIngreso',{id: this.id_usuario_scord, hora_ingreso: this.time_ing})
    },
    cambiar_almuerzo(){
      this.dialog2 = false
      this.$store.dispatch('updateHoraAlmuerzo',{id: this.id_usuario_scord, hora_almuerzo: this.time_alm})
    },
    cambiar_salida(){
      this.dialog3 = false
      this.$store.dispatch('updateHoraSalida',{id: this.id_usuario_scord, hora_salida: this.time_sal})
    }
  }
}
</script>