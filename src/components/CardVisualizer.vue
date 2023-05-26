<script>

export default {
    name: "CardVisualizer",
    props: {
        cards: Array
    },
    methods: {
        getImgPath(posterPath){
            return posterPath ? `https://image.tmdb.org/t/p/w342${posterPath}` : "https://www.emme2servizi.it/wp-content/uploads/2020/12/no-image.jpg";
        }
    },
    mounted() {
        console.log("Caricato il componente 'CardVisualizer'.");
    }
}
</script>

<template>
    <div class="container text-center text-white">
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-4 row-cols-lg-6 justify-content-center pt-5 g-3">
            <!-- CARDS -->
            <div v-for="card in cards" class="my-card position-relative">
                <img class="img-fluid h-100 rounded" :src="getImgPath(card.poster_path)" alt="card">
                <div class="my-hoveredCard position-absolute top-50 start-50 translate-middle rounded w-100 h-100 shadow overflow-hidden">
                    <img class="img-fluid" :src="getImgPath(card.backdrop_path)" alt="">
                    <div class="p-2">
                        <h2 class="h5">{{ card.title }}</h2>
                        <p>
                            <span v-show="card.title != card.original_title"> 
                                <strong>Titolo originale:</strong> {{ card.original_title }} <br>
                            </span>  
                            <strong>Voto:</strong> {{ card.vote_average }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.my-card{
    &:hover .my-hoveredCard{
        opacity: 1;
        pointer-events: all;
    }

    img{
        object-fit: cover;
    }

    .my-hoveredCard{
        z-index: 999;
        background-color: #221f22;
        opacity: 0;
        pointer-events: none;

        transition: opacity .2s;
    }
}
</style>
