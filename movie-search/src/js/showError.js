export default function showError(error,word){
    let newErrorMessage;
    switch (error) {
      case 'Movie not found!':
        newErrorMessage = `No results for "${word}"`;
        break;
      case 'Something went wrong.':
        newErrorMessage = 'You did not enter a search query';
        break;
      case 'Too many results.':
        newErrorMessage = `There are too many results to "${word}" search`;
        break;
    }
    return newErrorMessage;
}