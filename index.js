//Global variables to locate where template strings should be sent to
const movies = document.querySelector('.movies-grid')
const title = document.querySelector('.controls')
console.log(movies)

//helper function for cleaner code -> used by async/await fn below as an emergency fallback if the poster link is broken
function handleBrokenPoster(imgElement){
    const movieTitle = imgElement.dataset.title;
    const movieYear = imgElement.dataset.year;

    imgElement.closest('.movie-card').innerHTML = `<div class="movie-card">
                <div class="movie-card__poster-placeholder">
                 Movie Poster
                 <br>
                 Not Available
                 </div>
                <h2 class="movie-card__title">${movieTitle}</h2>
                <p class="movie-card__year">${movieYear}</p>
            </div>`
}
//fetches posters from OMDb API to render onto the page according to what the user searches or filters for
async function posterHtml(movie) {
    const url = await fetch(`https://www.omdbapi.com/?apikey=5e3afd0a&s=${movie}`)
    const data = await url.json()

    console.log(data.Search)
    movies.innerHTML = (data.Search || []).map(movie => {
        const isPosterMissing = movie.Poster === "N/A";
       return isPosterMissing ? `<div class="movie-card">
                <div class="movie-card__poster-placeholder">
                 Movie Poster
                 <br>
                 Not Available
                 </div>
                <h2 class="movie-card__title">${movie.Title}</h2>
                <p class="movie-card__year">${movie.Year}</p>
            </div>`: 
            `<div class="movie-card">
                <img class="movie-card__img"
                    src=${movie.Poster}
                    alt="movie poster image"
                    data-title="${movie.Title.replace(/"/g, '&quot;')}"
                    data-year="${movie.Year}"
                    onerror="handleBrokenPoster(this)">
                <h2 class="movie-card__title">${movie.Title}</h2>
                <p class="movie-card__year">${movie.Year}</p>
            </div>`}).join('')
    
    

}
//runs the posterHtml fn to use what the user types in the input to render once the user clicks outside of the input after <= 3 characters are typed into the input to not get undefined results. Then, the resultsInfo(event) fn runs to also display the title name at the top of the page next to "Results showing for:"
function search(event){
    posterHtml(event.target.value)
    resultsInfo(event)
}
//this will run when the search(event) fn is triggered to show the  what the user typed in the input next to "Results showing for:"
function resultsInfo(event){
  return title.innerHTML = `<p onchange="resultsInfo(event)">
                <span>Results showing for: </span> "${event.target.value}"
            </p>
            <div>
                <label for="sortSelect">Sort:</label>
                <select id="sortSelect">
                    <option value="default">Default</option>
                    <option value="a-z">A - Z</option>
                    <option value="z-a">Z - A</option>
                    <option value="newest">Newest</option>
                    <option value="oldest">Oldest</option>
                </select>
                </div>`
}

