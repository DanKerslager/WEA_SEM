import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import './App.css';
import { useEffect, useState } from "react"
import axios from "axios"
function App() {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1); // Current page
  const [totalPages, setTotalPages] = useState(1); // Total pages
  const [author, setAuthor] = useState('Bruce Patton'); // Author filter
  const [genre, setGenre] = useState(''); // Genre filter
  const [loading, setLoading] = useState(false);
  const limit = 10; // Number of books per page
  const [error, setError] = useState(null);
  const filter = async () => {
    let link = "http://localhost:8002/getBooks?"
    if (author != '') {
      link = link + "author=${author}&"
    }
    if (genre != '') {
      link = link + "genre=${genre}&"
    }
    console.log(link);
    return link; 
  }
  const loadBooksData = async (link) =>{
    axios.get(await link)
    .then(books =>  {
      setBooks(books.data.bookArray)
      setTotalPages(books.data.totalPages); // Set total pages
    })
    .catch(err => {
      setError(error)
    })
  }
  useEffect(() =>{
    let link=filter();
    loadBooksData(link);
  },[]);
  
  
  return (
    <div>
      <Header />
      <Main books={books} setPage={setPage} page={page} totalPages={totalPages} setAuthor={setAuthor} setGenre={setGenre}/>
      <Footer />
    </div>
  );
}

export default App;