import logo from './logo.svg';
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
    <div >
      <h1>Hello, world!</h1>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Genre</th>
            <th>Release</th>
            <th>Pages</th>
          </tr>
        </thead>
        <tbody>
        {
          books.map(book => {
            return (
              <tr>
              <th>{book.title}</th>
              <th>{book.author}</th>
              <th>{book.genre}</th>
              <th>{book.year}</th>
              <th>{book.pages}</th>
            </tr>
            )
            
          })
        }
        </tbody>
      </table>
    </div>
  );
}

export default App;
