const chatbox = document.getElementById('chatbox');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

// Predefined chatbot responses
const responses = [
    "Hello! How can I help you?",
    "That's interesting! Tell me more.",
    "I'm just a simple bot, but I'm here to chat.",
    "What do you think about the weather today?",
    "Thanks for chatting! 😊",
    "I don't understand that, but let's keep talking!",
    "Sure thing!",
    "Haha, that's funny!",
    "Okay, noted.",
    "Goodbye for now!"
];

// Load messages from localStorage on page load
window.onload = function() {
    const savedMessages = JSON.parse(localStorage.getItem('chatMessages')) || [];
    savedMessages.forEach(msg => {
        appendMessage(msg.text, msg.type, msg.timestamp);
    });
    scrollToBottom();
};

function sendMessage() {
    const message = messageInput.value.trim();
    if (message === '') return;

    const timestamp = new Date().toLocaleTimeString();
    appendMessage(message, 'sent', timestamp);
    saveMessage(message, 'sent', timestamp);
    messageInput.value = '';

    // Simulate chatbot response after a short delay
    setTimeout(() => {
        const botResponse = responses[Math.floor(Math.random() * responses.length)];
        const botTimestamp = new Date().toLocaleTimeString();
        appendMessage(botResponse, 'received', botTimestamp);
        saveMessage(botResponse, 'received', botTimestamp);
    }, 1000);

    scrollToBottom();
}

function appendMessage(text, type, timestamp) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', type);
    messageDiv.innerHTML = `<div>${text}</div><div class="timestamp">${timestamp}</div>`;
    chatbox.appendChild(messageDiv);
}

function saveMessage(text, type, timestamp) {
    const savedMessages = JSON.parse(localStorage.getItem('chatMessages')) || [];
    savedMessages.push({ text, type, timestamp });
    localStorage.setItem('chatMessages', JSON.stringify(savedMessages));
}

function scrollToBottom() {
    chatbox.scrollTop = chatbox.scrollHeight;
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}