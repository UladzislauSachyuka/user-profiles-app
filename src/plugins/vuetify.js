import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import ru from 'vuetify/lib/locale/ru';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#0F4C82'
      },
      dark: {
        primary: '#0F4C82'
      }
    }
  },
  lang: {
    locales: { ru },
    current: 'ru'
  }
});
