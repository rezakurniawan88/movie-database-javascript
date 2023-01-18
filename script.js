// Search
const searchButton = document.querySelector('.search-button');
searchButton.addEventListener('click', async function() {
    try {
        const inputKeyword = document.querySelector('.input-keyword');
        const movies = await getMovies(inputKeyword.value);
        updateUI(movies);
    } catch(error) {
        alert(error);
    }
});



// Detail Movie
document.addEventListener('click', async function(e) {
    if(e.target.classList.contains('modal-detail-button')) {
        const imdbid = e.target.dataset.imdbid;
        const detailMovie = await getDetailMovie(imdbid);
        seeDetail(detailMovie);
    }
});





// Function

// ---------------------------- getMovie -------------------------------
function getMovies(keyword) {
    return fetch('https://www.omdbapi.com/?apikey=1df74443&s=' + keyword)
            .then(response => {
                if( !response.ok ) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(response => {
                if( response.Response === "False" ) {
                    const movieNotFound = document.querySelector('.movie-container');
                    movieNotFound.innerHTML = `
                        <h1>${response.Error}</h1>
                        `;
                    throw new Error(response.Error);
                } else {
                    return response.Search;
                }
            });
}


function updateUI(movies) {
    let cards = '';
    movies.forEach(m => cards += showMovies(m));
    const movieContainer = document.querySelector('.movie-container');
    movieContainer.innerHTML = cards;
}
// ----------------------------------------------------------------------



// --------------------------- getDetail --------------------------------
function getDetailMovie(imdbid) {
    return fetch('https://www.omdbapi.com/?apikey=1df74443&i=' + imdbid)
            .then(response => response.json())
            .then(m => m);
}



function seeDetail(m) {
    const movieDetails = showMovieDetail(m);
    const modalBody = document.querySelector('.modal-body');
    modalBody.innerHTML = movieDetails;
}
// ----------------------------------------------------------------------



// ------------------------------------------- SHOW MOVIES ---------------------------------------------------------
function showMovies(m) {
    return `<div class="col-md-3 mt-4">
                <div class="card">
                    <img src="${m.Poster}" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title">${m.Title}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
                        <a href="#" class="modal-detail-button" data-bs-toggle="modal" data-bs-target="#movieDetailModal" data-imdbid="${m.imdbID}" >See details</a>
                    </div>
                </div>
            </div>`;
};
// ------------------------------------------------------------------------------------------------------------------


// ----------------------------------------- SHOW DETAIL ------------------------------------------------------------
function showMovieDetail(m) {
    return `<div class="container-fluid">
                <div class="row">
                    <div class="col-md-3">
                        <img src="${m.Poster}" class="img-fluid" alt="">
                    </div>
                    <div class="col-md">
                    <ul class="list-group">
                        <li class="list-group-item">${m.Title} (${m.Year})</li>
                        <li class="list-group-item"><strong>Director : </strong>${m.Director}</li>
                        <li class="list-group-item"><strong>Actors : </strong>${m.Actors}</li>
                        <li class="list-group-item"><strong>Writer : </strong>${m.Writer}</li>
                        <li class="list-group-item"><strong>Plot :</strong> <br>${m.Plot}</li>
                        </ul>
                    </div>
                </div>
            </div>`;
};
// --------------------------------------------------------------------------------------------------------------------
