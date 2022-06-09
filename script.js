const API_KEY = "86aa43d0875407669a8288550d29f299";
const moviesOnDisplay = document.querySelector("#movies");
const loadMoreButton = document.querySelector("#loadMore");
const POSTER_URL = "https://image.tmdb.org/t/p/w500/";
//var test_path = "https://api.themoviedb.org/3/configuration?api_key=86aa43d0875407669a8288550d29f299";
//var testURL = "https://api.themoviedb.org/3/movie/550?api_key=86aa43d0875407669a8288550d29f299"
var getMoviesURL = "https://api.themoviedb.org/3/movie/now_playing?api_key=86aa43d0875407669a8288550d29f299";
var query = '';
var page = 1;

window.addEventListener("load", getMovies)
loadMoreButton.addEventListener("click", loadMoreMovies)
//getMovies();

async function getMovies() {
    console.log("in getMovies function: ")
    let response = await fetch(getMoviesURL);
    let responseObj = await response.json();
    console.log(responseObj);
    //console.log(await (await fetch(test_path)).json());
    displayMovies(responseObj);
}

function displayMovies(responseObj){
    console.log("displayMovies: ")
    responseObj.results.forEach((e) => {moviesOnDisplay.innerHTML += `<img src="${POSTER_URL}${e.poster_path}">`});
}

async function loadMoreMovies() {
    page += 1;
    let response = await fetch(getMoviesURL+`&page=${page}`);
    let responseObj = await response.json();
    displayMovies(responseObj);
}