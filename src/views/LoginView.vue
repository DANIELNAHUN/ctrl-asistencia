<template>
  <div>
    <v-container class="login accent" fluid>
      <v-icon color="primary">mdi-shield-account</v-icon>
      <v-card
        max-width="300px"
        elevation="12"
        class="py-5 px-5 rounded-xxl"
        style="border-top: 3px solid #c62828"
        color="accent"
        outlined
      >
        <v-card-text>
          <v-form @submit="login">
            <v-row>
              <v-text-field
                prepend-icon="mdi-account-key"
                label="Usuario"
                type="text"
                v-model="user"
                outlined
              ></v-text-field>
            </v-row>
            <v-row>
              <v-text-field
                prepend-icon="mdi-lock"
                label="Contraseña"
                type="password"
                v-model="password"
                outlined
                style="border-color: blue"
              ></v-text-field>
            </v-row>
            <v-row>
              <v-spacer></v-spacer>
              <v-btn
                text
                class="pa-7 rounded-xxl font-weight-black text-h6"
                type="submit"
                color="primary"
                >INGRESAR</v-btn
              >
              <v-spacer></v-spacer>
            </v-row>
          </v-form>
          <v-row
            v-if="errors.length"
            class="d-flex justify-center align-center pa-3"
          >
            <div v-for="(err, index) in errors" :key="index">
              <span class="text-body-1 red--text">{{ err }}</span>
            </div>
          </v-row>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>
<script>
export default {
  computed: {
    allowedUsers() {
      return this.$store.state.allowedUsers;
    },
  },
  data() {
    return {
      user: "",
      password: "",
      errors: [],
    };
  },
  methods: {
    login(e) {
      e.preventDefault();
      const userObject = this.allowedUsers.find(
        (allowedUser) => allowedUser.user === this.user
      );
      if (!userObject) {
        this.errors.push("Usuario no Existe");
        return false;
      }
      if (userObject.password !== this.password) {
        this.errors.push("La contraseña es incorrecta");
        return false;
      } else {
        localStorage.setItem("token", userObject.id_user);
        this.$router.push({ path: "/" });
        this.$store.state.fecha_ingreso = new Date().toLocaleString();
      }
    },
  },
};
</script>
<style scoped>
.v-icon {
  font-size: 5em;
  text-align: center;
}
.login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
</style>