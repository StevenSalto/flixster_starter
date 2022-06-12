
const API_KEY = "86aa43d0875407669a8288550d29f299";

const moviesOnDisplay = document.querySelector("#movies-grid");
const loadMoreButton = document.querySelector("#load-more-movies-btn");
const form = document.querySelector("#form");

var searchBar = document.querySelector("#search-input")

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
    }
    let responseObj = await response.json();
    //console.log(responseObj);
    //console.log(await (await fetch(test_path)).json());
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
    getMovies();
}