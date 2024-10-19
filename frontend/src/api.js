// src/api.js
import axios from 'axios';

const BASE_URL = `${window.location.protocol}//${window.location.hostname}:8002`; // Dynamically use backend port
/**
 * Fetch filtered books data from the backend function.
 * @param {params} filterParams paramateres passed to be used for filtering search results 
 * @returns filtered books
 */

export const fetchBooks = async (filterParams) => {
  const { isbn, authors, categories, title, page, limit } = filterParams;
  let link = `${BASE_URL}/getBooks?`;
  const encodedIsbn = encodeURIComponent(isbn);
  const encodedAuthors = encodeURIComponent(authors);
  const encodedCategories = encodeURIComponent(categories);
  const encodedTitle = encodeURIComponent(title);
  
  if (isbn !== '') link += `isbn=${encodedIsbn}&`;
  if (authors !== '') link += `author=${encodedAuthors}&`;
  if (categories !== '') link += `categories=${encodedCategories}&`;
  if (title !== '') link += `title=${encodedTitle}&`;

  link += `page=${page}&limit=${limit}&`;

  try {
    const response = await axios.get(link);
    return response.data;
  } catch (error) {
    throw new Error("Failed to load books data.", error);
  }
};
