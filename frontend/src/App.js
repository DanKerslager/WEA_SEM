import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import './App.css';
import { useEffect, useState } from "react"
import axios from "axios"
function App() {
  const [books, setBooks] = useState([])
  const [error, setError] = useState(null);
  const loadBooksData = async () =>{
    axios.get("http://localhost:8002/getBooks")
    .then(books =>  {
      setBooks(books.data.bookArray)
    })
    .catch(err => {
      setError(error)
    })
  }
  useEffect(() =>{
    loadBooksData(error);
  }, [])
  
  return (
    <div>
      {console.log(error)}
      <Header />
      <Main books={books}/>
      <Footer />
    </div>
  );
}

export default App;