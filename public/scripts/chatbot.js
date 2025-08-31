// LUMIÈRE - AI Chatbot Integration

class LumiereChatbot {
    constructor() {
        this.isOpen = false;
        this.isMinimized = false;
        this.messages = [];
        this.isTyping = false;
        
        // API Configuration
        this.apiConfig = {
            endpoint: 'https://oi-server.onrender.com/chat/completions',
            headers: {
                'CustomerId': 'cus_Sv6tMEKOxtWx2k',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer xxx'
            },
            model: 'openrouter/anthropic/claude-sonnet-4'
        };
        
        // System prompt for luxury perfume assistant
        this.systemPrompt = `You are an elegant AI assistant for LUMIÈRE, a luxury perfume boutique. You help customers with:

STORE INFORMATION:
- Address: 123 Luxury Boulevard, Fashion District, NY 10001
- Hours: Monday-Saturday 10AM-8PM, Sunday 12PM-6PM
- Phone: (555) 123-4567
- Email: info@lumiereperfumes.com
- Facebook: facebook.com/lumiereperfumes
- Instagram: instagram.com/lumiereperfumes

SERVICES:
- Fragrance consultations
- Custom perfume creation
- Gift selection and wrapping
- Personal shopping appointments

PRODUCT KNOWLEDGE:
Our signature collection includes:
1. Midnight Essence (Oriental) - $185 - Rich oud and sandalwood
2. Garden of Dreams (Floral) - $165 - Dreamy peony and rose bouquet
3. Urban Legend (Fresh) - $155 - Modern citrus and marine accords
4. Velvet Noir (Woody) - $195 - Sophisticated black pepper and ebony
5. Golden Hour (Oriental) - $175 - Warm saffron and amber
6. Crystal Waters (Fresh) - $145 - Pure cucumber and water lily
7. Rose Imperial (Floral) - $205 - Finest Bulgarian roses
8. Smoky Legends (Woody) - $185 - Intense tobacco and vetiver

PERSONALITY:
- Sophisticated and knowledgeable about luxury fragrances
- Helpful with store information and contact details
- Warm but professional tone
- Focus on personalized fragrance recommendations
- Always mention how customers can contact us or visit our boutique

Keep responses concise, elegant, and focused on being helpful. Always offer to help with store visits, consultations, or connecting customers with our team.`;

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.addWelcomeMessage();
    }

    setupEventListeners() {
        // Toggle chatbot
        const chatToggle = document.getElementById('chatToggle');
        if (chatToggle) {
            chatToggle.addEventListener('click', () => this.toggleChat());
        }

        // Minimize/Close buttons
        const chatMinimize = document.getElementById('chatMinimize');
        const chatClose = document.getElementById('chatClose');
        
        if (chatMinimize) {
            chatMinimize.addEventListener('click', () => this.minimizeChat());
        }
        
        if (chatClose) {
            chatClose.addEventListener('click', () => this.closeChat());
        }

        // Send message
        const chatSend = document.getElementById('chatSend');
        const chatInput = document.getElementById('chatInput');
        
        if (chatSend) {
            chatSend.addEventListener('click', () => this.sendMessage());
        }
        
        if (chatInput) {
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.sendMessage();
                }
            });
        }

        // Quick actions for common queries
        this.addQuickActions();
    }

    toggleChat() {
        const chatWidget = document.getElementById('chatWidget');
        const chatToggle = document.getElementById('chatToggle');
        
        if (chatWidget && chatToggle) {
            if (this.isOpen) {
                this.closeChat();
            } else {
                this.openChat();
            }
        }
    }

    openChat() {
        const chatWidget = document.getElementById('chatWidget');
        const chatToggle = document.getElementById('chatToggle');
        
        if (chatWidget && chatToggle) {
            chatWidget.classList.add('active');
            chatToggle.style.display = 'none';
            this.isOpen = true;
            this.isMinimized = false;
            
            // Focus input
            const chatInput = document.getElementById('chatInput');
            if (chatInput) {
                setTimeout(() => chatInput.focus(), 300);
            }
            
            // Track analytics
            this.trackEvent('chat_opened');
        }
    }

    closeChat() {
        const chatWidget = document.getElementById('chatWidget');
        const chatToggle = document.getElementById('chatToggle');
        
        if (chatWidget && chatToggle) {
            chatWidget.classList.remove('active');
            chatWidget.classList.remove('minimized');
            chatToggle.style.display = 'flex';
            this.isOpen = false;
            this.isMinimized = false;
            
            // Track analytics
            this.trackEvent('chat_closed');
        }
    }

    minimizeChat() {
        const chatWidget = document.getElementById('chatWidget');
        
        if (chatWidget) {
            if (this.isMinimized) {
                chatWidget.classList.remove('minimized');
                this.isMinimized = false;
            } else {
                chatWidget.classList.add('minimized');
                this.isMinimized = true;
            }
        }
    }

    async sendMessage() {
        const chatInput = document.getElementById('chatInput');
        const chatSend = document.getElementById('chatSend');
        
        if (!chatInput || !chatSend) return;
        
        const message = chatInput.value.trim();
        if (!message) return;

        // Add user message to chat
        this.addMessage(message, 'user');
        chatInput.value = '';
        chatSend.disabled = true;

        // Show typing indicator
        this.showTypingIndicator();

        try {
            // Send to AI API
            const response = await this.callAI(message);
            this.hideTypingIndicator();
            this.addMessage(response, 'bot');
            
            // Track successful interaction
            this.trackEvent('message_sent', { message_length: message.length });
            
        } catch (error) {
            console.error('Chatbot error:', error);
            this.hideTypingIndicator();
            this.addMessage(
                "I apologize, but I'm having trouble connecting right now. Please feel free to call us at (555) 123-4567 or visit our boutique at 123 Luxury Boulevard. Our team will be happy to assist you!",
                'bot'
            );
            
            // Track error
            this.trackEvent('chat_error', { error: error.message });
        } finally {
            chatSend.disabled = false;
        }
    }

    async callAI(userMessage) {
        const messages = [
            { role: "system", content: this.systemPrompt },
            ...this.messages.slice(-10), // Keep last 10 messages for context
            { role: "user", content: userMessage }
        ];

        const requestBody = {
            model: this.apiConfig.model,
            messages: messages,
            max_tokens: 500,
            temperature: 0.7
        };

        const response = await fetch(this.apiConfig.endpoint, {
            method: 'POST',
            headers: this.apiConfig.headers,
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        
        if (data.choices && data.choices[0] && data.choices[0].message) {
            return data.choices[0].message.content;
        } else {
            throw new Error('Invalid API response format');
        }
    }

    addMessage(content, sender) {
        const chatMessages = document.getElementById('chatMessages');
        if (!chatMessages) return;

        // Store message in history
        this.messages.push({ role: sender === 'user' ? 'user' : 'assistant', content });

        // Create message element
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        messageContent.innerHTML = `<p>${this.formatMessage(content)}</p>`;
        
        const messageTime = document.createElement('span');
        messageTime.className = 'message-time';
        messageTime.textContent = this.formatTime(new Date());
        
        messageDiv.appendChild(messageContent);
        messageDiv.appendChild(messageTime);
        chatMessages.appendChild(messageDiv);

        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    formatMessage(content) {
        // Basic HTML escaping and formatting
        return content
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/\n/g, '<br>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>');
    }

    formatTime(date) {
        return date.toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: '2-digit',
            hour12: true 
        });
    }

    showTypingIndicator() {
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.style.display = 'flex';
            this.isTyping = true;
            
            // Scroll to show typing indicator
            const chatMessages = document.getElementById('chatMessages');
            if (chatMessages) {
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }
        }
    }

    hideTypingIndicator() {
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.style.display = 'none';
            this.isTyping = false;
        }
    }

    addWelcomeMessage() {
        // Welcome message is already in HTML, just ensure it's visible
        const welcomeShown = localStorage.getItem('lumiere_welcome_shown');
        if (!welcomeShown) {
            localStorage.setItem('lumiere_welcome_shown', 'true');
        }
    }

    addQuickActions() {
        // Add quick action buttons after a delay
        setTimeout(() => {
            if (!this.isOpen && !localStorage.getItem('lumiere_quick_actions_shown')) {
                this.showQuickActionPrompt();
                localStorage.setItem('lumiere_quick_actions_shown', 'true');
            }
        }, 10000); // Show after 10 seconds
    }

    showQuickActionPrompt() {
        const chatToggle = document.getElementById('chatToggle');
        if (chatToggle && !this.isOpen) {
            // Animate to draw attention
            chatToggle.style.animation = 'pulse 1s ease-in-out 3';
        }
    }

    trackEvent(eventName, properties = {}) {
        // Analytics tracking (Google Analytics, if implemented)
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, {
                event_category: 'chatbot',
                ...properties
            });
        }
        
        // Console logging for development
        console.log(`Chatbot Event: ${eventName}`, properties);
    }

    // Public methods for external access
    startChatWithMessage(message) {
        this.openChat();
        setTimeout(() => {
            const chatInput = document.getElementById('chatInput');
            if (chatInput) {
                chatInput.value = message;
                chatInput.focus();
            }
        }, 500);
    }

    getConversationHistory() {
        return this.messages;
    }

    clearConversation() {
        this.messages = [];
        const chatMessages = document.getElementById('chatMessages');
        if (chatMessages) {
            // Keep welcome message
            const welcomeMessage = chatMessages.querySelector('.bot-message');
            chatMessages.innerHTML = '';
            if (welcomeMessage) {
                chatMessages.appendChild(welcomeMessage);
            }
        }
    }
}

// Global function to start chat (for use in HTML)
function startChat(message = '') {
    if (window.lumiereChatbot) {
        if (message) {
            window.lumiereChatbot.startChatWithMessage(message);
        } else {
            window.lumiereChatbot.openChat();
        }
    }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.lumiereChatbot = new LumiereChatbot();
    console.log('LUMIÈRE Chatbot initialized');
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LumiereChatbot;
}