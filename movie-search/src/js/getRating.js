export default async function getRating(imdbiD, num) {
  const url = `https://www.omdbapi.com/?i=${imdbiD}&apikey=bea3a778&page=${num}`;
  const res = await fetch(url);
  const data = await res.json();
  
  return data.imdbRating;
}
