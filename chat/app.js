const express = require('express')
const path = require('path');
const app = express()
const sever = app.listen(3000)

app.use(express.static('public'))

app.set('views', path.join(__dirname, 'views'))
  console.log('user eiei')
  app.set('view engine', 'jade')

app.get('/', (req, res)=> {
  console.log('user eiei')
  res.render('index')
})

app.get('/chat', (req, res)=>{
  console.log('chat eiei');
  res.render('chatRoom')
})

app.get('/admin', (req, res)=>{
  console.log('admin eiei')
  res.render('listRoom')
})
