import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import axios from "axios"

const Books = () => {
    const [book , setBooks] = useState([])

    useEffect(()=>{
        const getbooks = async ()=>{
            try {
                let data = await axios.get("http://localhost:8080/books")
                setBooks(data.data)
            } catch (err) {
                console.log(err)
            }
        }
        getbooks()
    })
  return (
    <div>
      <h1>Sharma Book Shop</h1>
      <div className='books'>
        {book.map(book => (
            <div className='book' key={book.id}>
                {book.cover && <img src={book.cover} alt ="" />}
                <h2>{book.title}</h2>
                <p>{book.desc}</p>
                <span>{book.price}</span>
            </div>
           ))}
      </div>
      <button><Link  to = "/add">Add new Book</Link></button>
    </div>
  )
}

export default Books