<script>
import { movieDBstore } from '../data/movieDBstore.js'

export default {
    name: "PageSwitcher",
    props: {
        placeholder: String,
    },
    data() {
        return {
            movieDBstore
        }
    },
    computed: {
        displayedPages() {
            let start = this.movieDBstore.apiFilters.page - 2;
            let end = this.movieDBstore.apiFilters.page + 2;
            if (start < 1) {
                start = 1;
                end = Math.min(5, this.movieDBstore.totalPages);
            }
            if (end > this.movieDBstore.totalPages) {
                end = this.movieDBstore.totalPages;
                start = Math.max(1, end - 4);
            }
            return Array.from({ length: end - start + 1 }, (_, i) => start + i);
        },
    },
    mounted() {
        console.log("Caricato il componente 'PageSwitcher'.");
    }
}
</script>

<template>
    <nav v-show="movieDBstore.totalPages > 1">
        <ul class="pagination justify-content-center">
            <li class="page-item" :class="{ disabled: movieDBstore.apiFilters.page == 1 }"
                @click="movieDBstore.goToPage(movieDBstore.apiFilters.page - 1)">
                <span class="page-link"><i class="fa-solid fa-angles-left"></i></span>
            </li>
            <li @click="movieDBstore.goToPage(n)" v-for="n in displayedPages" class="page-item"
                :class="{ active: n == movieDBstore.apiFilters.page }">
                <span class="page-link">
                    {{ n }}
                </span>
            </li>
            <li class="page-item" :class="{ disabled: movieDBstore.apiFilters.page == movieDBstore.totalPages }"
                @click="movieDBstore.goToPage(movieDBstore.apiFilters.page + 1)">
                <a class="page-link"><i class="fa-solid fa-angles-right"></i></a>
            </li>
        </ul>
        <p>
            Pagine totali: {{ movieDBstore.totalPages }}
        </p>
    </nav>
</template>

<style lang="scss" scoped>
.disabled {
    pointer-events: none;
    opacity: .8;
}

.page-link {
    color: white !important;
    border: none;
    background-color: #221f22;
    transition: background .2s;

    &:hover{
        background-color: #131113;
    }
}

.page-item {
    &:not(.active):not(.disabled) {
        &:hover {
            cursor: pointer;
        }
    }
}

.active {
    .page-link {
        background-color: crimson;
        border: 1px solid crimson;
        color: white !important;
        pointer-events: none;
    }
}</style>
