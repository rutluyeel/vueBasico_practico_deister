<template>
<div>
    <h1>{{nombre}}</h1>
    <h2>{{ciudad}}</h2>
    <h2>{{nombre}}</h2>
</div>
</template>
<script>
export default{
    props: {
        nombre:String,
        ciudad:String,
        correo:String
    }
}

</script>
<style scoped>
</style>