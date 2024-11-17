// Function to chunk the array
function chunkArray(array, chunkSize) {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
}

function makeFilterObject(requestQuery) {
  // Filtration variables
  let isbn = requestQuery.isbn;
  let author = requestQuery.author;
  let categories = requestQuery.categories;
  let title = requestQuery.title;
  let favorites = requestQuery.favorites;
  let showHidden = requestQuery.showHidden;
  let showRated = requestQuery.showRated;
  let userId = requestQuery.userId;
  // Filter parameter object carrying the filter values
  let filter = {};
  if (isbn) {
    filter.isbn13 = { $regex: isbn, $options: 'i' };
  }
  if (author) {
    filter.authors = { $regex: author, $options: 'i' }; // Author filtration (case-insensitive)
  }
  if (categories) {
    filter.categories = { $regex: categories, $options: 'i' }; // Categories filtration (case-insensitive)
  }
  if (title) {
    filter.title = { $regex: title, $options: 'i' }; // Title filtration (case-insensitive)
  }
  if(favorites){
    let parsedFavorites = JSON.parse(favorites);
    filter._id = { $in: parsedFavorites  };
  }
  if(showHidden){
    let parsedShowHidden = JSON.parse(showHidden);
    if(parsedShowHidden === false){
      filter.available = true;
    }
  }
  if(showRated){
    let parsedShowRated = JSON.parse(showRated);
    let parsedUserId = JSON.parse(userId);
    console.log(parsedShowRated)
    if(parsedShowRated === true && userId){
      filter.user_rating = {
        $elemMatch: { user: parsedUserId }, // MongoDB query for an array match
      };
    }
  }
return filter;
}

module.exports = {
    chunkArray,
    makeFilterObject
};