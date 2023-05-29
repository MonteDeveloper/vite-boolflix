<script>
import CardVisualizer from './components/CardVisualizer.vue'
import TheHeader from './components/TheHeader.vue'
import { movieDBstore } from './data/movieDBstore.js'

export default {
  name: "App",
  components: {
    CardVisualizer,
    TheHeader
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
  <TheHeader logoPath="./src/assets/logo.png" :navElements="['Tutti', 'Film', 'Serie TV']"/>
  <div class="container">
    <CardVisualizer :cards="movieDBstore.mediaLoaded"/>
  </div>
</template>

<style lang="scss" scoped></style>

<style>
body{
  background-color: #141414;
}
</style>
