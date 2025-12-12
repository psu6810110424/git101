import './App.css'
import { useState, useEffect } from 'react';
import { Divider } from 'antd';
import BookList from './components/BookList'
import AddBook from './components/AddBook';

function App() {
  const [totalAmount, setTotalAmount] = useState(0);
  const [title, setTitle] = useState(null);
  const [price, setPrice] = useState(null);
  const [stock, setStock] = useState(null);
  const [bookData, setBookData] = useState([
    { id: 1, title: "Harry Potter", author: "J.K. Rowling", description: "Orphan Harry learns he is a wizard", price: 15.70, isbn: "978-1408825945", stock: 10, likeCount: 5, category: "fiction"  },
    { id: 2, title: "Sapiens", author: "Yuval Noah Harari", description: "A brief history of humankind", price: 22.99, isbn: "978-0062316097", stock: 50, likeCount: 7, category: "non-fiction" },
  ])

  useEffect(() => {
    setTotalAmount(bookData.reduce((total, book) => total + (book.price * book.stock), 0))
  }, [bookData])
  
  return (
    <>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "2em" }}>
        <AddBook onBookAdded={book => setBookData([...bookData, book])}/>
      </div>
      <Divider>
        My books worth {totalAmount.toLocaleString()} dollars
      </Divider>
      <BookList 
        data={bookData} 
        onLiked={bookId => setBookData(bookData.map(book => book.id === bookId ? { ...book, likeCount: book.likeCount + 1 } : book))}
        onDeleted={bookId => setBookData(bookData.filter(book => book.id !== bookId))}
      />
    </>
  )
}

export default App
