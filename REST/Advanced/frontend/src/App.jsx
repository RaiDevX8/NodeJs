import React, { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {
   const [books, setBooks] = useState([])
   const [title, setTitle] = useState('')
   const [author, setAuthor] = useState('')
   const [price, setPrice] = useState('')
   const [error, setError] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3000/posts')
      .then(res => {
        console.log(res);
        setBooks(res.data)
      })
      .catch(error => {
        console.error('Error fetching books:', error)
        setError('Failed to fetch books. Please try again later.')
      })
  }, [])

  const handleAddBook=()=>
  {
    const newBook ={title,author,price};
    axios
      .post('http://localhost:3000/posts', newBook)
      .then(res => {
        setBooks([...books, res.data])
        setTitle('')
        setAuthor('')
        setPrice('')
      })
      .catch(error => {
        console.error('Error adding book:', error)
        setError('Failed to add book. Please try again later.')
      })
  }
  return (
    <div className="">
      <div>
        <h1>Book List</h1>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <ul>
          {books.map(book => (
            <li key={book._id || book.id}>
              {book.title} by {book.author} - ${book.price}
            </li>
          ))}
        </ul>
      </div>
      <h2>Add a New Book</h2>
      <div>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={e => setAuthor(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={e => setPrice(e.target.value)}
        />
        <button onClick={handleAddBook}>Add Book</button>
      </div>
    </div>
  )
};

export default App;
