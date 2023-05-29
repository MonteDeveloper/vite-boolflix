import { reactive } from 'vue'
import axios from 'axios'

export const movieDBstore = reactive({
    API_URL: "https://api.themoviedb.org/3",
    API_KEY: "51e832b7a11315b4e99a002c3365f2a0",
    loading: false,
    totalPages: undefined,
    mediaLoaded: [],
    inputTitle: "",
    apiFilters: {
        mediaType: "multi",
        mediaTitle: "",
        language: "it-IT",
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
        &query=${this.apiFilters.mediaTitle.trim().replace(/ /g, '%20')}
        &page=${this.apiFilters.page}`
        .replace(/\s+/g, ''); //rimuovo indentazione della stringa

        console.log(COMPLETE_URL);
        this.loading = true;

        axios.get(COMPLETE_URL).then(r => {
            //Aggiungo i dati per riutilizzarli in altri componenti
            this.mediaLoaded = r.data.results;
            this.loading = false;
            console.log(this.mediaLoaded);
            this.totalPages = r.data.total_pages;
        }).catch(error => {
            //In caso di problemi, mostro l'errore in console
            console.error("Qualcosa è andato storto", error);
            //Il caricamento è comunque finito anche in questo caso
            this.loading = false;
        });
    },
    getStarsNumber(vote){
        return Math.round(vote / 2);
    },
    newSearch(){
        this.apiFilters.page = 1;
        this.apiFilters.mediaTitle = this.inputTitle;
        this.totalPages = undefined;
        this.searchMediaByTitle();
    },
    goToPage(nPage){
        this.apiFilters.page = nPage;
        this.searchMediaByTitle();
    }
});