<script>
import CardVisualizer from './components/CardVisualizer.vue'
import Searchbar from './components/SearchBar.vue'
import { movieDBstore } from './data/movieDBstore.js'

export default {
  name: "App",
  components: {
    CardVisualizer,
    Searchbar
  },
  data() {
    return {
      actualCardsVisualized: 0,
      movieDBstore
    }
  },
  methods: {
  },
  mounted() {
  }
}
</script>

<template>
  <div class="container">
    <Searchbar placeholder="Search by title" />
    <CardVisualizer :cards="movieDBstore.mediaLoaded"/>
  </div>
</template>

<style lang="scss" scoped></style>

<style>
body{
  background-color: #141414;
}
</style>
