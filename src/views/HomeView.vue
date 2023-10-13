<template>
  <v-card>
    <v-card-title>
      <h2>Control Asistencia</h2>
      <v-spacer></v-spacer>
      <h5>{{ fecha }}</h5>
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="2">Registro Hora Ingreso: </v-col>
        <v-col>{{ fecha_ingreso }}</v-col>
      </v-row>
      <v-row>
        <v-col cols="2">Retraso entrada: </v-col>
        <v-col>{{ get_tiempo_retraso() }}</v-col>
      </v-row>
      <v-row>{{ this.dialog }}</v-row>
    </v-card-text>
    <v-card-actions>
      <v-btn @click="estado_dialog">OK</v-btn>
    </v-card-actions>
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">Hora de Almuerzo!!</v-card-title>
        <v-card-text> Es la hora de almuerzo, marca asistencia y buen provecho! :D. </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
export default {
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
  mounted() {
    setInterval(() => {
      this.fecha = new Date().toLocaleString();
    }, 1000);

    const now = new Date();
    const fecha_almuerzo = new Date(now.getFullYear(), now.getMonth(), now.getDate(), this.getHorariobyUser.hora_almuerzo)
    const diff = fecha_almuerzo.getTime() - now.getTime()
    const horas = Math.floor(diff / (1000 * 60 * 60));
    const minutos = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diff % (1000 * 60)) / 1000);
    const diffFormat = `${horas.toString().padStart(2, "0")}:${minutos
      .toString()
      .padStart(2, "0")}:${segundos.toString().padStart(2, "0")}`;
    console.log(diffFormat)
    if (diff > 0) {
      setTimeout(() => {
        this.dialog = true
      }, diff)
    };
  },
  data() {
    return {
      fecha: new Date().toLocaleString(),
      fecha_ingreso: this.$store.state.fecha_ingreso,
      id_usuario_scord: Number,
      dialog: false,
    };
  },
  methods: {
    get_tiempo_retraso() {
      const fecha_ing = this.fecha.split(", ")[0] + " " + this.getHorariobyUser.hora_ingreso;
      const diff = new Date(this.fecha_ingreso) - new Date(fecha_ing);
      const horas = Math.floor(diff / (1000 * 60 * 60));
      const minutos = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const segundos = Math.floor((diff % (1000 * 60)) / 1000);
      const diffFormat = `${horas.toString().padStart(2, "0")}:${minutos
        .toString()
        .padStart(2, "0")}:${segundos.toString().padStart(2, "0")}`;
      return diffFormat;
    },
    estado_dialog(){
      this.dialog= true
    }
  },
};
</script>
