const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInp = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");
const audio = new Audio('ting.mp3');

const append = (message , position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if (position === 'left'){
        audio.play();
    }
}

form.addEventListener('submit' ,(e) => {
    e.preventDefault();
    const message = messageInp.value;
    append(`You: ${message}`,'right');
    socket.emit('send',message);
    messageInp.value = '';
})

let names = prompt("Enter your name to join");
socket.emit('new-user-joined', names);

socket.on('user-joined', names => {
    append(`${names} joined the chat`,'left');
})

socket.on ('receive',(data) => {
    append(`${data.names} : ${data.message}`,'left');
})

socket.on('left',names => {
    append(`${names} left the chat`,'left');
})