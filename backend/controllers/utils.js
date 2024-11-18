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
  if (showRated) {
    try {
      let parsedShowRated = JSON.parse(showRated);
      let parsedUserId = JSON.parse(userId);
      if (parsedShowRated === true && parsedUserId) {
        filter.user_ratings = {
          $elemMatch: { user: parsedUserId },
        };
      }
    } catch (err) {
      console.error("Invalid JSON for showRated or userId:", err);
    }
  }
return filter;
}

function createOperation(chunk){
  const operations = chunk.map(book => ({
    updateOne: {
      filter: { isbn13: book.isbn13 }, // Use isbn13 as unique identifier
      update: {
        $set: {
          isbn10: book.isbn10,
          title: book.title,
          categories: book.categories,
          subtitle: book.subtitle,
          authors: book.authors,
          thumbnail: book.thumbnail,
          description: book.description,
          published_year: book.published_year,
          average_rating: book.average_rating,
          num_pages: book.num_pages,
          ratings_count: book.ratings_count,
          available: true, // Set book as available
        },
        $push: book.comments ? { comments: { $each: book.comments } } : {}
      },
      upsert: true
    }
  }));
  return operations;
}

module.exports = {
    chunkArray,
    makeFilterObject,
    createOperation
};