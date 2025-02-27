
import { useState, useEffect} from 'react'
import './App.css'

function App() {
 const [book, setBook] = useState([])


 useEffect(() => {
  fetchbooks()
  }, [])

 const fetchbooks = async () => {
  try {
  const response = await fetch('http://127.0.0.1:8000/api/books/')
  const data = await response.json()
  setBook(data)
  console.log(data)
  }
  catch (error) {
    console.log(error)
    }
 };

  return (
    <>
      <h1>Book website</h1>

      <div>
        <input type="text" placeholder="book title" />
        <input type="number" placeholder="release year" />
        <button>Add book</button>
      </div>

    </>
  )
}

export default App
