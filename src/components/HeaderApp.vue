<template>
  <div>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-btn icon to="/">
          <v-img
            alt="Cableclub Logo"
            class="shrink mr-2"
            contain
            src="../assets/bhc-logo.jpg"
            transition="scale-transition"
            width="45px"
          />
        </v-btn>
      </div>
      <v-spacer></v-spacer>
      <v-row>
        <v-btn text to="/horario"><v-icon left dark></v-icon>Mi Horario</v-btn>
        <v-spacer></v-spacer>
        <v-btn text to="/supervisores"
          ><v-icon left dark></v-icon>Registro Marcaciones</v-btn
        >
        <v-spacer></v-spacer>
        <v-btn text to="/aux"><v-icon left dark></v-icon>Editar mis Datos</v-btn>
        <v-spacer></v-spacer>
      </v-row>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <div v-if="getUserLogged">
        <span>{{ getUserLogged.fullname }}</span>
        <v-btn text fab @click="exit"
          ><v-icon large color="red">mdi-exit-to-app</v-icon>
        </v-btn>
      </div>
    </v-app-bar>
  </div>
</template>
<script>
export default {
  computed:{
    getUserLogged() {
      const id_usuario_scord = parseInt(localStorage.getItem("token"));
      return this.$store.getters.getUser(id_usuario_scord);
    },
  },
  methods: {
    exit() {
      let token = localStorage.getItem("token");
      if (token) {
        localStorage.removeItem("token");
        location.reload();
      } else {
        console.log("Usuario no logeado");
      }
    },
  },
};
</script>
<style>
</style>