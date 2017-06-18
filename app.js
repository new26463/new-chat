const express = require('express')
const path = require('path');
const app = express()
const session = require('express-session')
const MongoStore = require('connect-mongodb-session')(session)
const bodyParser = require('body-parser')
const db = require('./db')

const store = new MongoStore({
  uri       : 'mongodb://tinynew:mC3bTzkqVFFcSS4O@chatdb-shard-00-00-azz0h.mongodb.net:27017,chatdb-shard-00-01-azz0h.mongodb.net:27017,chatdb-shard-00-02-azz0h.mongodb.net:27017/tinynewchat?ssl=true&replicaSet=ChatDB-shard-0&authSource=admin',
  collection: 'session'
})

app.use(session({
  store            : store,
  secret           : 'chatchatchatchatchatchatchatchatchatchatchatchat',
  cookie           : {
    maxAge: 1000*60*60 // 1 hour
  },
  resave           : true,
  saveUninitialized: false
}))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('public'))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.route('/')
   .get((req, res) => {
     res.render('index', {
       pageName: 'หน้าแรก'
     })
     var data = []
     for(var i = 0; i < 100; i++) {
      data.push({
        doctype    : 'docchatmessage',
        _clientFrom: '594289862790a25377343d85',
        _clientTo  : '59428a7f60228f54684baeeb',
        message    : 'Hello ' + i
      })
     }
     db.ChatMsg.insertMany(data, err => {
       if (err) console.log('insertmany error')
       else console.log('insert complete')
     })
   })
   .post((req, res) => {
     /* CHECK DATA */
     req.session.username = req.body.username
     req.session.email = req.body.email
     req.session.phone = req.body.phone
     req.session.question = req.body.question
     var newUser = new db.Client({
       doctype : 'docclient',
       username: req.body.username,
       email   : req.body.email,
       phone   : req.body.phone,
       question: req.body.question
     })
  
     newUser.save(err => {
       if (err) {
         console.log('Save user error' + err)
       } else {
         console.log('Save user completed!')
         res.redirect('/chat')
       }
     })
   })

app.get('/chat', (req, res) => {
  res.render('chatRoom', {
    pageName: 'Chat',
    data    : req.session
  })
})

app.get('/admin', (req, res) => {
  res.render('listRoom', {
    pageName: 'Admin'
  })
})

app.get('/allmsg', (req, res) => {
  db.ChatMsg.find({doctype : 'docchatmessage'}, (err, data) => {
    if (err) console.log('find error')
    else {
      chats = data.map((object, i, array) => {
        return {
          from: object._clientFrom,
          to: object._clientTo
        }
      })
      res.send(chats)
    }
  })
})

module.exports = app