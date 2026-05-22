let chatOpen = true;

function toggleChat() {
    let msgDiv = document.getElementById('chatMessages');
    let inputDiv = document.querySelector('.chat-input');
    if (chatOpen) {
        msgDiv.style.display = 'none';
        inputDiv.style.display = 'none';
        chatOpen = false;
        document.querySelector('.chat-header span:last-child').innerHTML = '▲';
    } else {
        msgDiv.style.display = 'block';
        inputDiv.style.display = 'flex';
        chatOpen = true;
        document.querySelector('.chat-header span:last-child').innerHTML = '▼';
    }
}

function sendMessage() {
    let input = document.getElementById('chatInput');
    let text = input.value.trim();
    if (!text) return;
    let msgs = JSON.parse(localStorage.getItem('ftap_chat') || '[]');
    msgs.push({ name: "Player", text: text, time: new Date().toLocaleTimeString() });
    localStorage.setItem('ftap_chat', JSON.stringify(msgs));
    input.value = '';
    displayMessages();
}

function displayMessages() {
    let msgs = JSON.parse(localStorage.getItem('ftap_chat') || '[]');
    let container = document.getElementById('chatMessages');
    let html = '<div class="chat-message"><span class="chat-name">System:</span> Welcome to FTAP Chat!</div>';
    for (let i = Math.max(0, msgs.length - 20); i < msgs.length; i++) {
        html += `<div class="chat-message"><span class="chat-name">${escapeHtml(msgs[i].name)}:</span> ${escapeHtml(msgs[i].text)}</div>`;
    }
    container.innerHTML = html;
    container.scrollTop = container.scrollHeight;
}

function escapeHtml(t) { 
    let d = document.createElement('div'); 
    d.textContent = t; 
    return d.innerHTML; 
}

setInterval(displayMessages, 2000);
displayMessages();