// Make connection
const port = process.env.port || 3000

// const socket = io.connect('http://10.251.0.68:3000/')
const socket = io.connect('http://localhost:'+port)


// Query DOM
const message = document.querySelector('#message'),
    handle = document.querySelector('#handle'),
    btn = document.querySelector('#send'),
    output = document.querySelector('.output'),
    feedback = document.querySelector('.feedback')

// Emit events
btn.addEventListener('click', ()=>{
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    })

    message.value = "";
})

message.addEventListener('keypress', () => {
    socket.emit('typing', handle.value)
})

// Listen for events
socket.on('chat', ({ message, handle }) => {
    feedback.innerHTML = "";

    output.innerHTML += `<p><strong>${handle}</strong>: ${message}</p>` 
})

let timeout;
message.addEventListener('keyup',function(){
 socket.emit('typing', handle.value);
 clearTimeout(timeout)
 timeout = setTimeout(() => {
    socket.emit("typing", false)}, 2000)
})

socket.on('typing', data => {
    feedback.innerHTML = data ? `<p><em>${data} skriver...</em></p>` : ''
  });

