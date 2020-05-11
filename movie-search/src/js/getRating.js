export default async function getRating(imdbiD, num) {
  const url = `https://www.omdbapi.com/?i=${imdbiD}&apikey=552647f3&page=${num}&type=movie`;
  const res = await fetch(url);
  const data = await res.json();

  return data.imdbRating;
}
