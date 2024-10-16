// src/api.js
import axios from 'axios';

export const fetchBooks = async (filterParams) => {
  const { authors, categories, title, page, limit } = filterParams;
  let link = "http://localhost:8002/getBooks?";
  const encodedAuthors = encodeURIComponent(authors);
  const encodedCategories = encodeURIComponent(categories);
  const encodedTitle = encodeURIComponent(title);

  if (authors !== '') link += `author=${encodedAuthors}&`;
  if (categories !== '') link += `categories=${encodedCategories}&`;
  if (title !== '') link += `title=${encodedTitle}&`;

  link += `page=${page}&limit=${limit}&`;

  try {
    const response = await axios.get(link);
    return response.data;
  } catch (error) {
    throw new Error("Failed to load books data.");
  }
};