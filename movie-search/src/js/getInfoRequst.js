const fetch = require('node-fetch');
export default async function getMovieSlides(word, page) {
    const url = `https://www.omdbapi.com/?s=${word}&apikey=49ee8599&page=${page}&type=movie`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
}