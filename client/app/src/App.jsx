import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Edit2, Plus, Save, X } from "lucide-react";
import "./App.css";

function App() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("http://127.0.0.1:8000/api/books/");
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const createBook = async () => {
    if (!title || !year) return;
    try {
      setIsLoading(true);
      const response = await fetch("http://127.0.0.1:8000/api/books/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, release_year: year }),
      });
      const data = await response.json();
      setBooks([...books, data]);
      setTitle("");
      setYear("");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateBook = async () => {
    if (!selectedBook) return;
    try {
      setIsLoading(true);
      const response = await fetch(
        `http://127.0.0.1:8000/api/books/${selectedBook.id}/update/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, release_year: year }),
        }
      );
      const updatedBook = await response.json();
      setBooks(books.map((book) => (book.id === selectedBook.id ? updatedBook : book)));
      setSelectedBook(null);
      setTitle("");
      setYear("");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const confirmDelete = (id) => {
    setBookToDelete(id);
    setShowConfirm(true);
  };

  const deleteBook = async () => {
    if (!bookToDelete) return;
    try {
      setIsLoading(true);
      await fetch(`http://127.0.0.1:8000/api/books/${bookToDelete}/delete/`, {
        method: "DELETE",
      });
      setBooks(books.filter((book) => book.id !== bookToDelete));
      setShowConfirm(false);
      setBookToDelete(null);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h1 className="app-title">📚 Book Management</h1>

      {/* Form */}
      <div className="form">
        <input
          type="text"
          placeholder="Book Title"
          className="input-field"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="Release Year"
          className="input-field"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        {selectedBook ? (
          <>
            <button className="update-btn" onClick={updateBook}>
              <Save size={18} /> Save
            </button>
            <button className="cancel-btn" onClick={() => setSelectedBook(null)}>
              <X size={18} /> Cancel
            </button>
          </>
        ) : (
          <button className="add-btn" onClick={createBook}>
            <Plus size={18} /> Add Book
          </button>
        )}
      </div>

      {/* Book List */}
      <div className="book-list">
        <AnimatePresence>
          {books.map((book) => (
            <motion.div key={book.id} className="book-item">
              <div>
                <h2>{book.title}</h2>
                <p>Released in {book.release_year}</p>
              </div>
              <div className="actions">
                <button className="edit-btn" onClick={() => setSelectedBook(book)}>
                  <Edit2 size={20} />
                </button>
                <button className="delete-btn" onClick={() => confirmDelete(book.id)}>
                  <Trash2 size={20} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Delete Confirmation */}
      {showConfirm && (
        <div className="confirm-popup">
          <p>Are you sure you want to delete?</p>
          <button className="confirm-yes" onClick={deleteBook}>
            Yes
          </button>
          <button className="confirm-no" onClick={() => setShowConfirm(false)}>
            No
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
