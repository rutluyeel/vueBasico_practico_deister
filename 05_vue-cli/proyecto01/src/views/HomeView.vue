<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App" /> 
    <App-saludar/>
    <App-saludar/>
    <App-saludar/>
    <enviar inline-template>
      <h1>
        Template-lineal
        <br>
        <button>Enviar</button>
      </h1>
    </enviar>

  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import MensajeSaludar from "@/components/MensajeSaludar.vue"

export default {
  name: "HomeView",
  components: {
    HelloWorld,
    'App-saludar' :MensajeSaludar
  },
};
</script>
