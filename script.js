let typingTimer;

function generateMeow() {
    const meowVariations = ["Meow", "Meeooow", "Mrow", "Meoooow", "Mew", "Miaow"];
    const meowCount = Math.floor(Math.random() * 100) + 1;
    let meows = "";
    for (let i = 0; i < meowCount; i++) {
        meows += meowVariations[Math.floor(Math.random() * meowVariations.length)] + " ";
    }
    meows = meows.trim();
    if (Math.random() < 0.5) {
        meows += '.'
    } else {
        if (Math.random() < 0.5) {
            meows += '!'
        } else {
            meows += '?'
        }
    }
    return meows;
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
    const messageId = `catgpt-response-${Date.now()}`;
    chatBox.innerHTML += `
        <div class="chat-message">
            <img src="catgpt.png" alt="CatGPT" class="profile-pic">
            <div class="message-text" id="${messageId}"></div>
        </div>`;
    let catgptResponseDiv = document.getElementById(messageId);

    const shouldDisplayCatImage = Math.random() < 0.5; // 50% chance

    const typing = (message, index = 0) => {
        if (index < message.length) {
            catgptResponseDiv.innerHTML += message.charAt(index);
            index++;
            let speed = Math.random() > 0.1 ? 5 : 20;
            speed *= Math.random() * 5;
            setTimeout(() => typing(message, index), speed);
        } else {
            chatBox.scrollTop = chatBox.scrollHeight;
        }
    };

    if (shouldDisplayCatImage) {
        fetch('https://api.thecatapi.com/v1/images/search')
            .then(response => response.json())
            .then(data => {
                const catImageUrl = data[0].url;
                // Insert the cat image with a loading animation
                const imgElement = document.createElement('img');
                imgElement.src = catImageUrl;
                imgElement.alt = "Cat Image";
                imgElement.className = "cat-image-loading"; // Apply the loading animation class
                catgptResponseDiv.insertBefore(imgElement, catgptResponseDiv.firstChild);
                // Insert a <br> element after the image to ensure text starts from a new line
                const breakElement = document.createElement('br');
                catgptResponseDiv.insertBefore(breakElement, imgElement.nextSibling);
                catgptResponseDiv.insertBefore(breakElement, imgElement.nextSibling);

                typing(meowResponse);
            })
            .catch(error => {
                console.error('Error fetching cat image:', error);
                typing(meowResponse); // Proceed to type the message even if the image fetch fails
            });
    } else {
        typing(meowResponse);
    }
}

// Event listener for Enter key
document.getElementById('user-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        sendQuestion();
    }
});
