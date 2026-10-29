const movies = document.querySelector('.movies-grid')
console.log(movies)

async function posterHtml(){
const url = await fetch("https://www.omdbapi.com/?apikey=5e3afd0a&s=abcd")
const data = await url.json()

console.log(data.Search)
movies.innerHTML = data.Search.map(movie => {
   return `<div class="movie-card">
                <img class="movie-card__img"
                    src=${movie.Poster}
                    alt="movie poster image">
                <h2 class="movie-card__title">${movie.Title}</h2>
                <p class="movie-card__year">${movie.Year}</p>
            </div>`}).join('')

}
posterHtml()


/* <div class="movie-card__poster-placeholder">
    Movie Poster
    <br>
    Not Available
</div> */

