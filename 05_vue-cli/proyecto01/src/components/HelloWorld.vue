<template>
  <div id="app">
    <h1>{{msg}}</h1>
    <hr>
    <h2>{{titulo}}</h2>

   <div class="container">
    <div class="form">
      <div class="form-group">
        <label>Nombre</label>
        <input type="text" class="form-control" v-model="registro.nombre">

      </div>
      <div class="form-group">
        <label>Colegio</label>
        <input type="text" class="form-control" v-model="registro.colegio">

      </div>
      <br>
      <button class="btn btn-primary" @click="agregarEstudiante"> Guardar </button>
    </div>
    <hr>
    <div class="row">
    <div class="col-5" v-for="registro in registros">
    <div class="card">
      <div class="form-group">
        <h2> {{registro.nombre}}</h2>
        <hr>
        <p>{{registro.colegio}}</p>
        </div>
      </div>
    </div>
   </div>
  </div>
</div>
</template>

<script>
export default {
  name: "app",
  props:{
    msg: String
  },
  data (){
    return {
      titulo: 'Welcome to your gowplay',
      registro: {
        nombre: '',
        colegio: ''

      },
      registros:[
       

      ]
    }
  },
  methods:{
    agregarEstudiante: function(){
      const{nombre, colegio} = this.registro;
      this.registros.push({
        nombre,
        colegio
      })
    }
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#app {
  font-family: 'Avenir', Hevelica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: antialiased;
  color:blue;
  margin-top: 60px;
}
 h1,h2 {
  font-weight: normal;
 }


</style>
