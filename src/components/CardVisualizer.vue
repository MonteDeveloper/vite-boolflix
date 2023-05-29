<script>
import LangFlag from 'vue-lang-code-flags';
import PageSwitcher from './PageSwitcher.vue'

export default {
    name: "CardVisualizer",
    components: {
        LangFlag,
        PageSwitcher
    },
    props: {
        cards: Array
    },
    methods: {
        getImgPath(posterPath){
            return posterPath ? `https://image.tmdb.org/t/p/w342${posterPath}` : "https://www.emme2servizi.it/wp-content/uploads/2020/12/no-image.jpg";
        },
        convertDate(dateString) {
            const dateParts = dateString.split('-');
            return `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
        }
    },
    mounted() {
        console.log("Caricato il componente 'CardVisualizer'.");
    }
}
</script>

<template>
    <div class="container text-center text-white">
        <PageSwitcher class="m-auto" />
        <div class="row row-cols-2 row-cols-md-4 row-cols-lg-5 justify-content-center pt-5 g-3">
            <!-- CARDS -->
            <div v-for="card in cards" class="my-card position-relative">
                <img class="img-fluid h-100 rounded" :src="getImgPath(card.poster_path)" alt="poster_img">
                <div class="my-hoveredCard position-absolute top-50 start-50 translate-middle rounded w-100 h-100 shadow overflow-hidden">
                    <div class="my-topBox position-relative overflow-hidden">
                        <img class="w-100 h-100" :src="getImgPath(card.backdrop_path)" alt="backdrop_img">
                        <div class="my-blackScreen position-absolute top-0 start-0 h-100 w-100">

                        </div>
                        <lang-flag class="my-flag position-absolute top-0 start-0 m-2 shadow" :iso="card.original_language" :squared="false"/>
                        <h2 class="my-title w-100 h5 position-absolute top-50 start-50 translate-middle start-0 px-2">{{ card.title }}</h2>
                    </div>
                    <div class="my-botBox p-3 position-relative">
                        <p class="text-start">
                            <!-- <br><br><br><br><br><br><br><br><br> -->
                            <span v-show="card.title != card.original_title"> 
                                <strong>Titolo originale: </strong> {{ card.original_title }}
                                <br>
                            </span>  
                            <span v-show="card.vote_average">
                                <strong>Voto: </strong>
                                <i v-for="n in Math.round(card.vote_average / 2)" class="fa-solid fa-star"></i>
                                <i v-for="n in (5 - Math.round(card.vote_average / 2))" class="fa-regular fa-star"></i>
                                <br>
                            </span>
                            <span>
                                <strong>Data uscita: </strong> {{ convertDate(card.release_date) }} <br>
                            </span>
                            <hr>
                            <span v-show="card.overview && card.overview != ''">
                                <strong>Trama: </strong> {{ card.overview }}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.my-card{
    display: inline-block;

    img{
        object-fit: cover;
        object-position: center;
    }

    .my-hoveredCard{
        z-index: 999;
        background-color: #221f22;
        opacity: 0;
        transition: opacity, transform .2s;

        .my-blackScreen{
            background-color: rgba(0, 0, 0, 0.7);
        }

        &:hover{
            cursor: context-menu;
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.3) !important;
            transition-delay: 1s;
            .my-botBox{
                height: 60%;
                overflow-y: auto;
            }

            .my-topBox{
                height: 40%;
            }
        }
    }
}
</style>
