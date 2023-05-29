<script>
import { movieDBstore } from '../data/movieDBstore.js'

export default {
    name: "Searchbar",
    props: {
        placeholder: String,
    },
    data() {
        return {
            movieDBstore
        }
    },
    mounted() {
        console.log("Caricato il componente 'Searchbar'.");
    }
}
</script>

<template>
    <div class="input-group mb-3">
        <input type="text" class="form-control" :placeholder="placeholder" v-model="movieDBstore.inputTitle" @keyup.enter="movieDBstore.newSearch()">
        <button class="btn btn-danger" type="button" @click="movieDBstore.newSearch()">
            <i class="fas fa-search"></i>
        </button>
    </div>
</template>

<style lang="scss" scoped>
</style>
