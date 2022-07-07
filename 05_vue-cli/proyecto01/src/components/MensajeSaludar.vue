<template>
    <div id="msj">
        <h1>{{nombre}}</h1>
        <hr>
        <input type = "text" v-model="nombre">
        <MensajeSaludar></MensajeSaludar>
    </div>
</template>
<script> 

export default {
    name:"msj",
    components: {

    },
    data(){
        return {
            diasSemana: [
                { id:1, text:'lunes'},
                { id:2, text:'martes'},
                { id:3, text:'miercoles'},
                { id:4, text:'jueves'},
                { id:5, text:'viernes'},

            ]
        }
    }

}
</script>