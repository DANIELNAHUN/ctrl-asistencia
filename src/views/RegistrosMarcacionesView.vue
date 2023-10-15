<template>
  <v-card>
    <v-card-title>Registro Marcaciones</v-card-title>
    <v-card-text>
      <v-container>
        <v-row>{{getHorariobyUser}}</v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>
<script>
export default{
  created() {
    this.id_usuario_scord = parseInt(localStorage.getItem("token"));
  },
  computed: {
    getUserLogged() {
      return this.$store.getters.getUser(this.id_usuario_scord);
    },
    getHorariobyUser() {
      return this.$store.getters.getHorariobyUser(this.id_usuario_scord);
    },
  },
  data(){
    return{
      id_usuario_scord: Number,
    }
  },
}

</script>