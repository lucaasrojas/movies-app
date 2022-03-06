import { GENRE_STRING, GENRE_ID } from '../constants/studio_constants.mjs'


export const getMovie = (movieId, studios) => {
  let movie;
  let studio = studios.find(t => {
    movie = t.movies.find(p => p.id === movieId)
    return movie
  })
  if (movie && studio) {
    return { movie, studioId: studio.id }
  }

  return false
};

export const getAllMoviesFromStudios = (studios, { genreId, minPrice, maxPrice, title }) => {
  let allMovies = [];
  studios.forEach(singleStudio => {
    singleStudio.movies.map(movie => {
      
      allMovies.push(movieConstructor(movie, singleStudio))
    })
  });
  
  if (genreId) allMovies = allMovies.filter(movie => movie.genre == genreId)
  if (minPrice) allMovies = allMovies.filter(movie => movie.price >= Number(minPrice))
  if (maxPrice) allMovies = allMovies.filter(movie => movie.price <= Number(maxPrice))
  if (title) allMovies = allMovies.filter(movie => movie.name.includes(title))
  
  return allMovies;
};

export const movieConstructor = (movie, studio) => {
  //Set url property to img
  if (movie.url) {
    Object.defineProperty(movie, 'img',
      Object.getOwnPropertyDescriptor(movie, 'url'));
    delete movie['url'];
  }
  //Map position id to string
  else if (typeof movie.position === "number") {
    movie['position'] = GENRE_STRING[movie.price];
  }
  //Add studioId from parent object
  Object.defineProperty(movie, 'studioId',
    Object.getOwnPropertyDescriptor(studio, 'id'));
  //Remove non wanted properties
  //delete movie['price'];
  //delete movie['id'];

  return movie;
}

export const genreListConstructor = () => {
  return Object.entries(GENRE_ID).map(([key, value]) => ({ id: value, value: key.replace(/^\w/, (c) => c.toUpperCase()) }))

}