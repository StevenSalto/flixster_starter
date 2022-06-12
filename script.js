
const API_KEY = "86aa43d0875407669a8288550d29f299";

var moviesOnDisplay = document.querySelector("#movies-grid");
var loadMoreButton = document.querySelector("#load-more-movies-btn");
var form = document.querySelector("#form");
var closeSearchButton = document.querySelector("#close-search-btn");
var searchBar = document.querySelector("#search-input")
var searchResultsText = document.querySelector("#search-results-text");
var toTopButton = document.querySelector("#to-top-button");

// VARS FOR BUILDING API CALLS
var poster_size = 'original';
var page = 1;
var query = '';
// URLS
var posterURL = `https://image.tmdb.org/t/p/${poster_size}`;
var nowPlayingMoviesURL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`;
var searchMoviesURL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}`

/**
 * The following are helpful lines of code I used for testing and learning(might prove useful in the future):
 * //var infoOnAvailablePosterSizes = "https://api.themoviedb.org/3/configuration?api_key=86aa43d0875407669a8288550d29f299";
 * //var getAMovie = "https://api.themoviedb.org/3/movie/550?api_key=86aa43d0875407669a8288550d29f299"
 */


window.addEventListener("load", getMovies)
loadMoreButton.addEventListener("click", loadMoreMovies)
form.addEventListener("submit", userSearch)
closeSearchButton.addEventListener("click", closeSearch)
toTopButton.addEventListener("click", scrollToTop)

async function getMovies() {
    let searchMovies = `${searchMoviesURL}&query=${query}&page=${page}`;
    let nowPlaying = `${nowPlayingMoviesURL}&page=${page}`;
    console.log("in getMovies function: ")
    console.log(query)
    console.log(searchMovies)
    if(query == '') {
        var response = await fetch(nowPlaying);
    } else {
        var response = await fetch(searchMovies);
        searchResultsText.removeAttribute("hidden");
        closeSearchButton.removeAttribute("hidden");
    }
    let responseObj = await response.json();
    //console.log(responseObj);
    //console.log(await (await fetch(test_path)).json());
    searchBar.value = '';
    displayMovies(responseObj);
}

function displayMovies(responseObj) {
    //console.log("displayMovies: ")
    responseObj.results.forEach((e) => {moviesOnDisplay.innerHTML += 
        `<div class="movie-card">
        <img class="movie-poster" src="${posterURL}${e.poster_path}">
        <div class="movie-title">${e.title}</div>
        <div class="movie-votes">${e.vote_average}</div>
        </div>`
    });
    loadMoreButton.removeAttribute("hidden");
    toTopButton.removeAttribute("hidden");
    //responseObj.results.forEach(function(e, index, ) {
        
    //})
}

async function loadMoreMovies() {
    page += 1;
    getMovies();
}

function userSearch(evt) {
    evt.preventDefault();
    console.log("in usersearch function: ")
    page = 1;
    query = searchBar.value;
    moviesOnDisplay.innerHTML = ``;
    console.log(query)
    loadMoreButton.setAttribute("hidden", true);
    toTopButton.setAttribute("hidden", true);
    getMovies();
}

function closeSearch(evt) {
    evt.preventDefault();
    query = '';
    page = 1;
    moviesOnDisplay.innerHTML = ``;
    console.log(query)
    searchResultsText.setAttribute("hidden", true);
    closeSearchButton.setAttribute("hidden", true);
    loadMoreButton.setAttribute("hidden", true);
    toTopButton.setAttribute("hidden", true);
    getMovies();
}

function scrollToTop(evt) {
    window.scrollTo(0, 0);
}