const express = require('express')
const socket = require('socket.io')
const app = express()
const port = 3000

// app.get('/', (req, res) => res.send('Hello World!'))
const server = app.listen(port, () => console.log(`Example app listening on port port!`))

// Static files
app.use(express.static('public'))

// Socket setup
const io = socket(server,{
    cors: {
        origin: "https://localhost:3000",
        methods: ["GET", "POST"]
    }})


io.on('connection', socket => {
    console.log('made socket connection', socket.id);

    socket.on('chat', data => {
        io.sockets.emit('chat', data)
    })

    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data)
    })
})
 

