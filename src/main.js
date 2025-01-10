import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index'; // Importar o roteador
import vuetify from './plugins/vuetify'; // Configuração do Vuetify
const app = createApp(App);

// Adicionar o roteador ao app
app.use(router);
app.use(vuetify);

app.mount('#app');
