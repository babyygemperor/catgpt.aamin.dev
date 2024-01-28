let typingTimer;

function generateMeow() {
    const meowVariations = ["Meow", "Meeooow", "Mrow", "Meoooow", "Mew", "Miaow"];
    const meowCount = Math.floor(Math.random() * 100) + 1;
    let meows = "";
    for (let i = 0; i < meowCount; i++) {
        meows += meowVariations[Math.floor(Math.random() * meowVariations.length)] + " ";
    }
    return meows.trim();
}

function sendQuestion() {
    const userInput = document.getElementById('user-input').value;
    const chatBox = document.getElementById('chat-box');

    if (userInput.trim() !== '') {
        chatBox.innerHTML += `
            <div class="chat-message">
                <img src="user.png" alt="User" class="profile-pic">
                <div class="message-text">${userInput}</div>
            </div>`;
        animateMeowResponse(generateMeow());
    }

    document.getElementById('user-input').value = '';
}

function animateMeowResponse(meowResponse) {
    const chatBox = document.getElementById('chat-box');
    chatBox.innerHTML += `
        <div class="chat-message">
            <img src="catgpt.png" alt="CatGPT" class="profile-pic">
            <div class="message-text" id="catgpt-response-${Date.now()}"></div>
        </div>`;
    let catgptResponseDiv = chatBox.lastElementChild.querySelector('.message-text');

    let i = 0;
    clearTimeout(typingTimer); // Clear previous timer
    typingTimer = setTimeout(function typing() {
        if (i < meowResponse.length) {
            catgptResponseDiv.innerHTML += meowResponse.charAt(i);
            i++;
            let speed = Math.random() > 0.1 ? 5 : 20;
            speed *= Math.random() * 5;
            setTimeout(typing, speed);
        } else {
            chatBox.scrollTop = chatBox.scrollHeight;
        }
    }, 500 + Math.random() * 1000); // Random delay before typing starts
}

// Event listener for Enter key
document.getElementById('user-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        sendQuestion();
    }
});
