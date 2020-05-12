export default async function getRating(imdbiD, num) {
  const url = `https://www.omdbapi.com/?i=${imdbiD}&apikey=49ee8599&page=${num}&type=movie`;
  const res = await fetch(url);
  const data = await res.json();

  return data.imdbRating;
}
