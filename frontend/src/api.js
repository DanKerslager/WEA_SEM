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
export const postRegister = async (userParams) =>{
  const { username, email, password } = userParams;
  try {
    const response = await axios.post(`${BASE_URL}/register`, {
      username,
      email,
      password
    });
    // Vrátíme response data
    return response;
  } catch (error) {
    // Vrátíme chybu, pokud k ní dojde
    console.error("Error during register:", error);
    return error.response ? error.response.data : { message: 'Unknown error' };
  }
};
export const getLogin = async (userParams) => {
  const { email, password } = userParams;
  try {
    const response = await axios.post(`${BASE_URL}/login`, {
      email,
      password
    });
    // Vrátíme response data
    return response;
  } catch (error) {
    // Vrátíme chybu, pokud k ní dojde
    console.error("Error during login:", error);
    return error.response ? error.response.data : { message: 'Unknown error' };
  }
};
export const fetchBookDetail = async(bookParams) => {
  let { bookId } = bookParams;
  let link = `${BASE_URL}/getBooks/${bookId}`;
  try {
    const response = await axios.get(link);
    // Vrátíme response data
    return response.data;
  } catch (error) {
    // Vrátíme chybu, pokud k ní dojde
    console.error("Error during book detail:", error);
    return error.response ? error.response.data : { message: 'Unknown error' };
  }
}
export const createComment = async(userParams) => {
  const {bookId, text, user} = userParams;
  let link = `${BASE_URL}/getBooks/${bookId}/comments`;
  try{
    const response = await axios.post(link, {
      bookId,
      text,
      user
    })
    console.log(response)
    //Vratíme response data
    return response
  }
  catch (error){
    // Vrátíme chybu, pokud k ní dojde
    console.error("Error during comment post:", error);
    return error.response ? error.response.data : { message: 'Unknown Error' }
  }
  
}