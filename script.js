const socket = io('http://localhost:3000')
const messageInput = document.querySelector('.msg-input')
const messageButton = document.querySelector('.msg-button')
const messageContainer = document.querySelector('.messages')

const names = prompt("What is your name?")
appendMessage('You joined')
socket.emit('new-user', names)

socket.on('chat-message', data => {
    appendMessage(`${data.names}: ${data.message}`)
})

socket.on('user-connected', names => {
    appendMessage(`${names} connected`)
})

socket.on('user-disconnected', names => {
    appendMessage(`${names} disconnected`)


})


messageButton.addEventListener('click', sendServer)


function sendServer(event){
    event.preventDefault()
    const message = messageInput.value
    appendMessage(`You: ${message}`)
    socket.emit('send-chat-message',message)
    messageInput.value = ""
}

function appendMessage(message){
    const messageElement = document.createElement('li')
    messageElement.innerText = message
    messageContainer.append(messageElement)
    
}