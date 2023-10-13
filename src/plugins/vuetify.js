import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import colors from 'vuetify/lib/util/colors';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: colors.grey.darken3, // #1A237E
        secondary: colors.red.darken3, // #FF9800
        accent: colors.grey.lighten2, // #3F51B5
      },
    },
  },
});
