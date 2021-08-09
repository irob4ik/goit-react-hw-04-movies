const API_KEY = "49b9c8d038e75713c664463b180578c3";
const BASE_URL = "https://api.themoviedb.org/3";

async function SearchApi(url = '') {
  return (
      await fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }

        return Promise.reject(
          new Error(`Search request not found`),
        );
      })
  );
}

export function fetchTrendingMovies() {
  return SearchApi(`${BASE_URL}/trending/all/week?api_key=${API_KEY}`);
}

export function fetchMovieById(movieId) {
  return SearchApi(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`);
}

export function fethMovieBySearch(search) {
  return SearchApi(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${search}`);
}

export function fetchCastById(movieId) {
  return SearchApi(`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`);
}

export function fetchReviewById(movieId) {
  return SearchApi(`${BASE_URL}/movie/${movieId}/reviews?api_key=${API_KEY}`);
}