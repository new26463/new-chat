/**
 * Created by x on 6/19/17.
 */
module.exports = function (server) {
  const io = require('socket.io')(server)
  io.on('connection', ws => {
    ws.emit('message', 'Welcome to chat serv.')
    ws.on('message', msg => {
      console.log(msg)
    })
  })
}