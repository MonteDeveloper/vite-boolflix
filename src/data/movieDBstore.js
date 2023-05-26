import { reactive } from 'vue'
import axios from 'axios'

export const movieDBstore = reactive({
    API_URL: "https://api.themoviedb.org/3",
    API_KEY: "51e832b7a11315b4e99a002c3365f2a0",
    loading: false,
    totalPages: undefined,
    mediaLoaded: [],
    apiFilters: {
        mediaType: "movie",
        mediaTitle: "",
        language: "it_IT",
        page: 1,
        adult: false
    },
    //METODI---------------------
    searchMediaByTitle(){
        const COMPLETE_URL = `${this.API_URL}/search/
        ${this.apiFilters.mediaType}
        ?api_key=${this.API_KEY}
        &include_adult=${this.apiFilters.adult}
        &language=${this.apiFilters.language}
        &query=${this.apiFilters.mediaTitle}
        &page=${this.apiFilters.page}`
        .replace(/\s+/g, ''); //rimuovo indentazione della stringa

        this.loading = true;

        axios.get(COMPLETE_URL).then(r => {
            //Aggiungo i dati per riutilizzarli in altri componenti
            this.mediaLoaded = r.data.results;
            this.loading = false;
            console.log(this.mediaLoaded);
        }).catch(error => {
            //In caso di problemi, mostro l'errore in console
            console.error("Qualcosa è andato storto", error);
            //Il caricamento è comunque finito anche in questo caso
            this.loading = false;
        });
    }
});