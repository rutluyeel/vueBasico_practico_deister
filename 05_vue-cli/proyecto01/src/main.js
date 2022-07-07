import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import ButtonEnviar from './components/ButtonEnviar.vue'


Vue.component('enviar', ButtonEnviar);


Vue.component('saludar',{
templates: '<H1>Hola mundo desde main.js</H1>'

})

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
