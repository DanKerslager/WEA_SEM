import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import './App.css';
import { useEffect, useState } from "react"
import axios from "axios"
function App() {
  const [books, setBooks] = useState([])
  useEffect(() =>{
    axios.get("http://localhost:3001/getBooks")
    .then(books => setBooks(books.data))
    .catch(err => console.log(err))
  }, [])

  
  return (
    <div>
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default App;