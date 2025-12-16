import './App.css'
import { useState, useEffect } from 'react';
import { Divider, Spin, Button } from 'antd';
import BookList from './components/BookList';
import AddBook from './components/AddBook';
import EditBook from './components/EditBook';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

const URL_BOOK = "/api/book"
const URL_CATEGORY = "/api/book-category" 

function BookScreen() {
  const navigate = useNavigate()
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(false)
  const [bookData, setBookData] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedBook, setSelectedBook] = useState(null); 
  
  const fetchCategories = async () => {
    try {
      const response = await axios.get(URL_CATEGORY)
      setCategories(response.data.map(cat => ({
        label: cat.name,
        value: cat.id
      })))
    } catch(err) {console.log(err)}
  }
  
  const fetchBooks = async () => {
    setLoading(true)
    try{
      const response = await axios.get(URL_BOOK)
      setBookData(response.data)
    } catch(err) { console.log(err) }
    finally { setLoading(false)}
  }
  
  const handleAddBook = async (book) => {
    setLoading(true)
    try{
      await axios.post(URL_BOOK, book)
      fetchBooks()
    } catch(err) { console.log(err)}
    finally {setLoading(false)}
  }
  const handleEditBook = (record) => {
    setSelectedBook(record);
  }
  
  const handleUpdateBook = async (bookData) => {
    setLoading(true);
    try {
      const { id, category, createdAt, updatedAt, ...dataToUpdate } = bookData;
      await axios.patch(`${URL_BOOK}/${bookData.id}`, dataToUpdate);
      setSelectedBook(null);
      fetchBooks(); 
    } catch (err) {
      console.error("EROR UPDATE :",err);
    } finally {
      setLoading(false);
    }
  }
  
  const handleLikeBook = async (bookId) => {
    setLoading(true)
    try{
      await axios.post(`${URL_BOOK}/${bookId}/like`)
      fetchBooks()
    } catch (err) { console.log(err) }
    finally { setLoading(false) }
  
  }
  const handleDeleteBook = async (bookId) => {
    setLoading(true)
    try {
      await axios.delete(`${URL_BOOK}/${bookId}`)
      fetchBooks()
    } catch (err) { console.log(err) }
    finally { setLoading(false) }
  }
  useEffect(() => {
    setTotalAmount(bookData.reduce((total, book) => total + (book.price * book.stock), 0))
  }, [bookData])
  
  useEffect(() => {
    fetchBooks()
    fetchCategories() 
  }, [])

  const handleCancelEdit = () => {
    setSelectedBook(null); 
  };

  const handleLogout = () => {
    localStorage.removeItem('token')
    delete axios.defaults.headers.common['Authorization']
    navigate('/login')
  }
  
  return (
  <>
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2em" }}>
    <AddBook 
      onBookAdded={handleAddBook}
      categories={categories} 
    />
    <Button onClick={handleLogout}>Logout</Button>
  </div>
    <Divider>
      My books worth {totalAmount.toLocaleString()} dollars
    </Divider>
    <Spin spinning={loading}>
    <BookList 
      data={bookData} 
      onLiked={bookId => setBookData(bookData.map(book => book.id === bookId ? { ...book, likeCount: book.likeCount + 1 } : book))}
      onDeleted={handleDeleteBook}
      onEdited={handleEditBook} 
    />
    </Spin>
    <EditBook
    isOpen={selectedBook !== null} 
    onCancel={handleCancelEdit}
    onSave={handleUpdateBook}
    item={selectedBook} 
    categories={categories}
    />
    </>
  )
}

export default BookScreen