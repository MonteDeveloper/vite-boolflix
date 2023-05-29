<script>
import Searchbar from './SearchBar.vue';
import { movieDBstore } from '../data/movieDBstore.js'

export default {
    name: "TheHeader",
    props: {
        logoPath: String,
        navElements: Array
    },
    components: {
        Searchbar
    },
    data() {
        return {
            activeNavEl: 0,
            movieDBstore
        }
    },
    watch: {
        activeNavEl(newVar){
            if(newVar == 0){
                this.movieDBstore.apiFilters.mediaType = "multi";
            }else if(newVar == 1){
                this.movieDBstore.apiFilters.mediaType = "movie";
            }else{
                this.movieDBstore.apiFilters.mediaType = "tv";
            }
            this.movieDBstore.newSearch()
        }
    },
    mounted() {
        console.log("Caricato il componente 'TheHeader'.");
    }
}
</script>

<template>
    <header>
        <div class="container d-flex justify-content-between align-items-center">
            <div class="d-flex align-items-center">
                <img class="p-4 ps-0" :src="logoPath" alt="LOGO">
                <ul class="d-flex gap-4 p-0 m-0">
                    <li class="d-flex align-items-center" :class="index == activeNavEl ? 'activeNavEl' : ''"
                        v-for="(li, index) in navElements" @click="activeNavEl = index">
                        {{ li.trim() }}
                    </li>
                </ul>
            </div>
            <div class="d-flex align-items-center">
                <Searchbar placeholder="Search by title" />
            </div>
        </div>
    </header>
</template>

<style scoped>
img {
    height: 100px;
}

header {
    background: linear-gradient(to bottom, black, transparent);
}

li {
    list-style: none;
    height: 70px;
    font-weight: 500;
    transition: color .2s;
}

li:hover {
    color: white;
    cursor: pointer;
}

.activeNavEl {
    color: white;
}
</style>
