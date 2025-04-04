const socket = io();
const clientsTotal = document.getElementById('client-total');

const messageContainer = document.getElementById('message-container');
const nameInput = document.getElementById('name-input');
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');

const messageTone = new Audio('/public_message-tone.mp3');

messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    sendMessage();
});

socket.on('clients-total', (data) => {
    clientsTotal.innerText = `Total Clients: ${data}`;
});

function sendMessage() {
    if (messageInput.value.trim() === '') return; // Avoid empty messages
    const data = {
        name: nameInput.value || 'Anonymous',
        message: messageInput.value,
        dateTime: new Date(),
    };
    socket.emit('message', data);

    addMessageToUI(true, data);
    messageInput.value = ''; // Clear the input field
}

socket.on('chat-message', (data) => {
    messageTone.play();
    addMessageToUI(false, data);
});

function addMessageToUI(isOwnMessage, data) {
    clearFeedback();
    const formattedTime = dayjs(data.dateTime).fromNow(); // Use Day.js to format time
    const element = `
        <li class="${isOwnMessage ? 'message-right' : 'message-left'}">
            <p class="message">
                ${data.message}
                <span>${data.name} • ${formattedTime}</span>
            </p>
        </li>`;
    messageContainer.innerHTML += element;
    scrollToBottom();
}

function scrollToBottom() {
    messageContainer.scrollTo(0, messageContainer.scrollHeight);
}

messageInput.addEventListener('focus', () => {
    socket.emit('feedback', { feedback: `${nameInput.value || 'Anonymous'} is typing a message...` });
});

messageInput.addEventListener('keypress', () => {
    socket.emit('feedback', { feedback: `${nameInput.value || 'Anonymous'} is typing a message...` });
});

messageInput.addEventListener('blur', () => {
    socket.emit('feedback', { feedback: '' });
});

socket.on('feedback', (data) => {
    clearFeedback();
    if (data.feedback) {
        const element = `
            <li class="message-feedback">
                <p class="feedback">${data.feedback}</p>
            </li>`;
        messageContainer.innerHTML += element;
    }
});

function clearFeedback() {
    document.querySelectorAll(`li.message-feedback`).forEach(element => {
        element.parentNode.removeChild(element);
    });
}
