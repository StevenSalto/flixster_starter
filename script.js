
const API_KEY = "86aa43d0875407669a8288550d29f299";

const moviesOnDisplay = document.querySelector("#movies");
const loadMoreButton = document.querySelector("#loadMore");
const form = document.querySelector("#form");

var searchBar = document.querySelector("#searchBar")

// VARS FOR BUILDING API CALLS
var poster_size = 'w500';
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
    searchMoviesURL += `&query=${query}`;
    console.log("in getMovies function: ")
    console.log(API_KEY)
    console.log(query)
    console.log(searchMoviesURL)
    if(query == '') {
        var response = await fetch(nowPlayingMoviesURL);
    } else {
        var response = await fetch(searchMoviesURL);
    }
    let responseObj = await response.json();
    //console.log(responseObj);
    //console.log(await (await fetch(test_path)).json());
    moviesOnDisplay.innerHTML = ``;
    displayMovies(responseObj);
}

function displayMovies(responseObj){
    //console.log("displayMovies: ")
    responseObj.results.forEach((e) => {moviesOnDisplay.innerHTML += `<div><img src="${posterURL}${e.poster_path}"> <br> ${e.vote_average} <br>${e.title}</div>`});
}

async function loadMoreMovies() {
    page += 1;
    let response = await fetch(searchMoviesURL+`&page=${page}`);
    let responseObj = await response.json();
    displayMovies(responseObj);
}

function userSearch(evt) {
    evt.preventDefault();
    console.log("in usersearch function: ")
    query = searchBar.value;
    console.log(query)
    getMovies();
}