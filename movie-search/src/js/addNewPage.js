import state from '../index';
import getMovieSlides from './fillSwiper';

export default async function addNewPage(word, page) {
    if (page<state.countPage){
        await getMovieSlides (word,page,false);
    }
}