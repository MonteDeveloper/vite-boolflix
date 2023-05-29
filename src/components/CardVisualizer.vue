<script>
import LangFlag from 'vue-lang-code-flags';
import PageSwitcher from './PageSwitcher.vue';
import { movieDBstore } from '../data/movieDBstore.js';

export default {
    name: "CardVisualizer",
    components: {
        LangFlag,
        PageSwitcher
    },
    props: {
        cards: Array
    },
    data() {
        return {
            movieDBstore
        }
    },
    methods: {
        getImgPath(posterPath) {
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
    <div v-if="!movieDBstore.loading" class="text-center text-white">
        <PageSwitcher />
        <div class="row row-cols-2 row-cols-md-4 row-cols-lg-5 justify-content-center g-3">
            <!-- CARDS -->
            <div v-for="card in cards">
                <div class="my-card position-relative h-100">
                    <div v-if="card.media_type != 'person'" class="h-100">
                        <div v-if="card.title" class="h-100">
                            <div class="position-relative h-100">
                                <img class="img-fluid h-100 rounded" :src="getImgPath(card.poster_path)" alt="poster_img">
                                <h2 class="position-absolute top-0 start-0 bg-danger rounded p-2 m-2 h6">FILM</h2>
                            </div>
                            <div
                                class="my-hoveredCard position-absolute top-50 start-50 translate-middle rounded w-100 h-100 shadow overflow-hidden">
                                <div class="my-topBox position-relative overflow-hidden">
                                    <img class="w-100 h-100" :src="getImgPath(card.backdrop_path)" alt="backdrop_img">
                                    <div class="my-blackScreen position-absolute top-0 start-0 h-100 w-100">

                                    </div>
                                    <lang-flag class="my-flag position-absolute top-0 start-0 m-2 shadow"
                                        :iso="card.original_language" :squared="false" />
                                    <h2
                                        class="my-title w-100 h5 position-absolute top-50 start-50 translate-middle start-0 px-2">
                                        {{
                                            card.title }}</h2>
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
                                            <i v-for="n in (5 - Math.round(card.vote_average / 2))"
                                                class="fa-regular fa-star"></i>
                                            <br>
                                        </span>
                                        <span v-show="card.release_date">
                                            <strong>Data uscita: </strong> {{ convertDate(card.release_date) }} <br>
                                        </span>
                                        <span v-show="card.overview && card.overview != ''">
                                            <hr>
                                            <strong>Trama: </strong> {{ card.overview }}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div v-else class="h-100">
                            <div class="position-relative h-100">
                                <img class="img-fluid h-100 rounded" :src="getImgPath(card.poster_path)" alt="poster_img">
                                <h2 class="position-absolute top-0 start-0 bg-danger rounded p-2 m-2 h6"> SERIE TV </h2>
                            </div>
                            <div
                                class="my-hoveredCard position-absolute top-50 start-50 translate-middle rounded w-100 h-100 shadow overflow-hidden">
                                <div class="my-topBox position-relative overflow-hidden">
                                    <img class="w-100 h-100" :src="getImgPath(card.backdrop_path)" alt="backdrop_img">
                                    <div class="my-blackScreen position-absolute top-0 start-0 h-100 w-100">

                                    </div>
                                    <lang-flag class="my-flag position-absolute top-0 start-0 m-2 shadow"
                                        :iso="card.original_language" :squared="false" />
                                    <h2
                                        class="my-title w-100 h5 position-absolute top-50 start-50 translate-middle start-0 px-2">
                                        {{
                                            card.name }}</h2>
                                </div>
                                <div class="my-botBox p-3 position-relative">
                                    <p class="text-start">
                                        <!-- <br><br><br><br><br><br><br><br><br> -->
                                        <span v-show="card.name != card.original_name">
                                            <strong>Titolo originale: </strong> {{ card.original_name }}
                                            <br>
                                        </span>
                                        <span v-show="card.vote_average">
                                            <strong>Voto: </strong>
                                            <i v-for="n in Math.round(card.vote_average / 2)" class="fa-solid fa-star"></i>
                                            <i v-for="n in (5 - Math.round(card.vote_average / 2))"
                                                class="fa-regular fa-star"></i>
                                            <br>
                                        </span>
                                        <span v-show="card.first_air_date">
                                            <strong>Data uscita: </strong> {{ convertDate(card.first_air_date) }} <br>
                                        </span>
                                        <span v-show="card.overview && card.overview != ''">
                                            <hr>
                                            <strong>Trama: </strong> {{ card.overview }}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-else-if="card.known_for[0] && card.known_for[0].media_type == 'movie'" class="h-100">
                        <div class="position-relative h-100">
                            <img class="img-fluid h-100 rounded" :src="getImgPath(card.known_for[0].poster_path)"
                                alt="poster_img">
                            <h2 class="position-absolute top-0 start-0 bg-danger rounded p-2 m-2 h6">FILM</h2>
                        </div>
                        <div
                            class="my-hoveredCard position-absolute top-50 start-50 translate-middle rounded w-100 h-100 shadow overflow-hidden">
                            <div class="my-topBox position-relative overflow-hidden">
                                <img class="w-100 h-100" :src="getImgPath(card.known_for[0].backdrop_path)"
                                    alt="backdrop_img">
                                <div class="my-blackScreen position-absolute top-0 start-0 h-100 w-100">

                                </div>
                                <lang-flag class="my-flag position-absolute top-0 start-0 m-2 shadow"
                                    :iso="card.known_for[0].original_language" :squared="false" />
                                <h2
                                    class="my-title w-100 h5 position-absolute top-50 start-50 translate-middle start-0 px-2">
                                    {{
                                        card.known_for[0].title }}</h2>
                            </div>
                            <div class="my-botBox p-3 position-relative">
                                <p class="text-start">
                                    <!-- <br><br><br><br><br><br><br><br><br> -->
                                    <span v-show="card.known_for[0].title != card.known_for[0].original_title">
                                        <strong>Titolo originale: </strong> {{ card.known_for[0].original_title }}
                                        <br>
                                    </span>
                                    <span v-show="card.known_for[0].vote_average">
                                        <strong>Voto: </strong>
                                        <i v-for="n in Math.round(card.known_for[0].vote_average / 2)"
                                            class="fa-solid fa-star"></i>
                                        <i v-for="n in (5 - Math.round(card.known_for[0].vote_average / 2))"
                                            class="fa-regular fa-star"></i>
                                        <br>
                                    </span>
                                    <span v-show="card.known_for[0].release_date">
                                        <strong>Data uscita: </strong> {{ convertDate(card.known_for[0].release_date) }}
                                        <br>
                                    </span>
                                    <span v-show="card.known_for[0].overview && card.known_for[0].overview != ''">
                                        <hr>
                                        <strong>Trama: </strong> {{ card.known_for[0].overview }}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div v-else-if="card.known_for[0]" class="h-100">
                        <div class="position-relative h-100">
                            <img class="img-fluid h-100 rounded" :src="getImgPath(card.known_for[0].poster_path)"
                                alt="poster_img">
                            <h2 class="position-absolute top-0 start-0 bg-danger rounded p-2 m-2 h6"> SERIE TV </h2>
                        </div>
                        <div
                            class="my-hoveredCard position-absolute top-50 start-50 translate-middle rounded w-100 h-100 shadow overflow-hidden">
                            <div class="my-topBox position-relative overflow-hidden">
                                <img class="w-100 h-100" :src="getImgPath(card.known_for[0].backdrop_path)"
                                    alt="backdrop_img">
                                <div class="my-blackScreen position-absolute top-0 start-0 h-100 w-100">

                                </div>
                                <lang-flag class="my-flag position-absolute top-0 start-0 m-2 shadow"
                                    :iso="card.known_for[0].original_language" :squared="false" />
                                <h2
                                    class="my-title w-100 h5 position-absolute top-50 start-50 translate-middle start-0 px-2">
                                    {{
                                        card.known_for[0].name }}</h2>
                            </div>
                            <div class="my-botBox p-3 position-relative">
                                <p class="text-start">
                                    <!-- <br><br><br><br><br><br><br><br><br> -->
                                    <span v-show="card.known_for[0].name != card.known_for[0].original_name">
                                        <strong>Titolo originale: </strong> {{ card.known_for[0].original_name }}
                                        <br>
                                    </span>
                                    <span v-show="card.known_for[0].vote_average">
                                        <strong>Voto: </strong>
                                        <i v-for="n in Math.round(card.known_for[0].vote_average / 2)"
                                            class="fa-solid fa-star"></i>
                                        <i v-for="n in (5 - Math.round(card.known_for[0].vote_average / 2))"
                                            class="fa-regular fa-star"></i>
                                        <br>
                                    </span>
                                    <span v-show="card.known_for[0].first_air_date">
                                        <strong>Data uscita: </strong> {{ convertDate(card.known_for[0].first_air_date) }}
                                        <br>
                                    </span>
                                    <span v-show="card.known_for[0].overview && card.known_for[0].overview != ''">
                                        <hr>
                                        <strong>Trama: </strong> {{ card.known_for[0].overview }}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <PageSwitcher class="mt-3" />
    </div>

    <div v-else class="text-white text-center">
        <i class="fa-solid fa-circle-notch"></i>
    </div>
</template>

<style lang="scss" scoped>
.fa-circle-notch{
    font-size: 1.5rem;
    animation: spin .5s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.my-card {
    img {
        object-fit: cover;
        object-position: center;
    }

    &:hover .my-hoveredCard {
        animation: delay-pointer-events 2000ms linear;
        cursor: context-menu;
        opacity: 1;
        transform: translate(-50%, -50%) scale(1.3) !important;
        transition-delay: 1s;
    }

    .my-hoveredCard {
        z-index: 999;
        background-color: #221f22;
        opacity: 0;
        transition: opacity, transform .2s;

        .my-botBox {
            height: 60%;
            overflow-y: auto;
        }

        .my-topBox {
            height: 40%;
        }

        .my-blackScreen {
            background-color: rgba(0, 0, 0, 0.7);
        }
    }
}

@keyframes delay-pointer-events {
    0% {
        visibility: hidden;
    }

    50% {
        visibility: hidden;
    }

    100% {
        visibility: visible;
    }
}</style>
