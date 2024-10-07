// Typing effect for the header text
        function typeEffect(element, text, delay) {
            let charIndex = 0;
            function typeChar() {
                if (charIndex < text.length) {
                    element.innerHTML += text.charAt(charIndex);
                    charIndex++;
                    setTimeout(typeChar, delay);
                }
            }
            typeChar();
        }
        document.addEventListener('DOMContentLoaded', function() {
            const typeText = document.getElementById('typeText');
            typeEffect(typeText, "Good Day, How Can I Assist?", 75);
        });
        async function sendMessage() {
            var inputField = document.getElementById('userInput');
            var chatbox = document.getElementById('chatbox');
            
            // Add user message to chatbox
            chatbox.innerHTML += '<b>YOU</b><br>' + inputField.value + '<br><br>';
            scrollToBottom();
            
            // Show typing indicator
            var typingIndicator = document.createElement('div');
            typingIndicator.innerHTML = '<b>Bot-Groot</b><br><span id="typingIndicator">...</span><br><br>';
            chatbox.appendChild(typingIndicator);
            scrollToBottom();
            
            // Start typing indicator animation
            var typingDots = 0;
            var typingInterval = setInterval(() => {
                var dots = '.'.repeat((typingDots % 3) + 1);
                document.getElementById('typingIndicator').innerText = dots;
                typingDots++;
            }, 500); // Update every 500ms
            
            // Send user message to server and get response
            var response = await fetch('/send_message', {
                method: 'POST',
                body: new URLSearchParams('message=' + inputField.value),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(response => response.text());
            // Stop typing indicator animation
            clearInterval(typingInterval);
            typingIndicator.remove();
            // Format the response message
            response = formatMessage(response);
            // Typing animation for AI response
            await typeMessage('Bot-Groot', response);
            
            // Clear the input field
            inputField.value = '';
        }
        function formatMessage(message) {
            message = message.replace(/\**/g, '');
            message = message.replace(/\n/g, '<br>');
            message = message.trim();
            return message;
        }
        async function typeMessage(sender, message) {
            var chatbox = document.getElementById('chatbox');
            var words = message.split(' ');
            var delay = 3;
            var typedMessageElement = document.createElement('div');
            typedMessageElement.innerHTML = '<b>' + sender + '</b><br><br>';
            chatbox.appendChild(typedMessageElement);
            scrollToBottom();
            for (var i = 0; i < words.length; i++) {
                var word = words[i];
                typedMessageElement.innerHTML += word + ' ';
                await new Promise(resolve => setTimeout(resolve, delay * word.length));
                scrollToBottom();
            }
            typedMessageElement.innerHTML += '<br><br>';
            scrollToBottom();
        }
        function scrollToBottom() {
            var chatbox = document.getElementById('chatbox');
            chatbox.scrollTop = chatbox.scrollHeight;

        }
       function closeAlert() {
                  document.getElementById('customAlert').style.display = 'none';  // Hide alert box
                  document.getElementById('overlay').style.display = 'none';  // Hide overlay
        }


        // window.onload = scrollToBottom;
