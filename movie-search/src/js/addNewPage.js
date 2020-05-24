
import { state,} from './variables';

import makeRequest from './makeRequest';

export default async function addNewPage(currentWord, currentPage) {
  if (currentPage <= state.countPage) {
    makeRequest(currentWord,currentPage, false);
  }
}
