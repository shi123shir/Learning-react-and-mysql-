import  express  from "express"
import mysql from "mysql2";
import cors from "cors";

const app = express()

app.use(cors())
app.use(express.json())

  const db = mysql.createConnection({
    host : "localhost",
    user : "root",
    password: "Sd@191212",
    database : "test"
})

app.get("/books", async (req,res)=>{
  let allbook = "select * from test.books"
  db.query(allbook, (err,alldata)=>{
     if(alldata){
        return  res.send(alldata)
     }else{
        return  res.send(err)
     }
  })

})

app.post ("/books", (req,res)=>{
   let q = "INSERT INTO books (`title` , `desc`, `cover`, `price`) VALUES(?)";
   const values = [
    req.body.title,
    req.body.desc, 
    req.body.cover,
    req.body.price
   ]

   db.query(q, [values], (err,data)=>{
    if(err) return res.send(err);
    return res.send("book stored sucessfully")
   })
})
app.delete("/books/:id", (req, res)=>{
 const bookId = req.params.id
 const q = "DELETE FROM books WHERE id = ?"
 db.query(q,[bookId], (err,data)=>{
   if(err){
   return res.send("book is not deleted sucessfully")}
 })
})
app.listen(8080, ()=>{
    console.log("Server is running on my port 8080")
})


