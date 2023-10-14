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
        <v-col cols="3">{{ fecha_ingreso }}</v-col>
      </v-row>
      <v-row>
        <v-col cols="2" class="red--text">Retraso entrada: </v-col>
        <v-col cols="2" class="red--text">{{ get_tiempo_retraso() }}</v-col>
        <v-spacer></v-spacer>
        <v-col cols="2">Hora Almuerzo: </v-col>
        <v-col cols="2">{{ getHorariobyUser.hora_almuerzo }}</v-col>
      </v-row>
    </v-card-text>
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">Hora de Almuerzo!!</v-card-title>
        <v-card-text>
          Es la hora de almuerzo, marca asistencia y buen provecho! :D.
        </v-card-text>
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
    }, 1000)

    this.get_temp_hora_almuerzo()
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
      const fecha_ing_string = this.fecha.split(", ")[0] + ", " + this.getHorariobyUser.hora_ingreso
      const fecha_ing = this.format_date_string(fecha_ing_string)

      const fecha_ingreso = this.format_date_string(this.fecha_ingreso)

      const diff = fecha_ingreso - fecha_ing;

      const horas = Math.floor(diff / (1000 * 60 * 60));
      const minutos = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const segundos = Math.floor((diff % (1000 * 60)) / 1000);
      const diffFormat = `${horas.toString().padStart(2, "0")}:${minutos.toString().padStart(2, "0")}:${segundos.toString().padStart(2, "0")}`;
      return diffFormat;
    },
    format_date_string(date_string) {
      const [date, time] = date_string.split(", ");
      const [day, month, year] = date.split("/");
      const [hour, minute, second] = time.split(":");
      const fecha_ing = new Date(
        `${year}-${month}-${day}T${hour}:${minute}:${second}`);
      return fecha_ing;
    },
    get_temp_hora_almuerzo(){
      const now = new Date();
      const fecha_almu_string = this.fecha.split(", ")[0] + ", " + this.getHorariobyUser.hora_almuerzo
      const fecha_almu = this.format_date_string(fecha_almu_string)

      const diff = fecha_almu - now;

      if (diff > 0) {
        setTimeout(() => {
          this.dialog = true;
        }, diff);
      }
    }
  },
};
</script>
