/**
 * Created by x on 6/15/17.
 */
const mongoose = require('mongoose')

mongoose.connect('mongodb://tinynew:mC3bTzkqVFFcSS4O@chatdb-shard-00-00-azz0h.mongodb.net:27017,chatdb-shard-00-01-azz0h.mongodb.net:27017,chatdb-shard-00-02-azz0h.mongodb.net:27017/tinynewchat?ssl=true&replicaSet=ChatDB-shard-0&authSource=admin')

const ClientSchema = mongoose.Schema({
  doctype : String,
  username: String,
  email   : String,
  phone   : String,
  question: String
}, { collection: 'chat' })

const ChatMsgSchema = mongoose.Schema({
  doctype    : String,
  _clientFrom: String,
  _clientTo  : String,
  message    : String
}, { collection: 'chat' })

module.exports = {
  Client : mongoose.model('Client', ClientSchema),
  ChatMsg: mongoose.model('ChatMsg', ChatMsgSchema)
}