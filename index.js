require('dotenv').config()
const express = require('express')
const app = express()
const jwt = require('jsonwebtoken') 

app.use(express.json())

const posts = [
  {
    username: 'Sachin',
    title: 'senior Developer'
  },
  {
    username: 'Pankaj',
    college : 'Krishna engineering College',
    title: 'Product Manager'
  } 
]
// making route for post
app.get('/posts', authenticateToken, (req, res) => {
  res.json(posts.filter(post => post.username === req.user.name)) // it will return the post that the user is access to
})
  

// login route 
app.post('/login', (req, res) => {
  // Authenticate User

  const username = req.body.username
  const user = { name: username }

 // creating a jaosn token for authenticated user
 //.env will work as a secret token
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
  res.json({ accessToken: accessToken })
})

// middleware  for authentication of token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']  // token come from header which is bearer
  const token = authHeader && authHeader.split(' ')[1]  // spilit between bearer and token
  if (token == null) return res.sendStatus(401)

     // for verifyng jwt token
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    console.log(err)
    if (err) return res.sendStatus(401)
    req.user = user
    next()
  })
}




app.listen(7000, console.log(" server is running at port 7000"));