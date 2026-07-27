/* ============================================
   SQUIDBOT - SquidBay's Chief Squid Officer
   Powered by Claude | Mobile-optimized
   ============================================

   PORTED from squidbay/squidbay components/chatbot.js. This is the real
   widget, not a lookalike: same backend proxy, same rate limits, same
   sessionStorage handling, same HTML-escaping before render.

   The five things changed for this site, and nothing else:
     1. the avatar path (this repo's squid mark, not squidbay.io's logo)
     2. the greeting (this is the factory, not the marketplace)
     3. the offline fallback answers (factory facts, not marketplace facts)
     4. openSeller -> openManaged (the CTA this site actually has)
     5. a timeout on the backend fetch — see the note beside it. Without one,
        an unreachable proxy leaves the typing indicator spinning for ever.
        That one is a real bug, and squidbay.io still has it.
   ============================================ */

// API Configuration - Calls Railway backend proxy (key stays server-side)
const SQUIDBOT_CONFIG = {
    backendUrl: 'https://api.squidbay.io/chat',
    maxConversationLength: 10,
    maxInputLength: 500,
    requestTimeoutMs: 8000
};

// Security: Track conversation to prevent abuse
let conversationHistory = [];
let messageCount = 0;
let lastMessageTime = 0;
const RATE_LIMIT_MS = 2000; // 2 seconds between messages
const SESSION_KEY = 'squidbot_conversation';

// N-F15: Restore conversation from sessionStorage
function restoreConversation() {
    try {
        const saved = sessionStorage.getItem(SESSION_KEY);
        if (saved) {
            const data = JSON.parse(saved);
            conversationHistory = data.history || [];
            messageCount = data.messageCount || 0;
            return data.messages || [];
        }
    } catch (e) {
        console.warn('SquidBot: Could not restore session', e);
    }
    return null;
}

// N-F15: Save conversation to sessionStorage
function saveConversation() {
    try {
        const chatMessages = document.getElementById('squidbotMessages');
        if (!chatMessages) return;
        // Save DOM messages as HTML for restoration
        const msgs = [];
        chatMessages.querySelectorAll('.chat-message:not(.typing-indicator)').forEach(function(el) {
            msgs.push({ className: el.className, html: el.innerHTML });
        });
        sessionStorage.setItem(SESSION_KEY, JSON.stringify({
            history: conversationHistory,
            messageCount: messageCount,
            messages: msgs
        }));
    } catch (e) {
        console.warn('SquidBot: Could not save session', e);
    }
}

document.addEventListener('squidbay:components-loaded', function() {
    initChatbot();
});

// Fallback if event already fired
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(initChatbot, 100);
}

function initChatbot() {
    const chatbotBtn = document.getElementById('squidbotBtn');
    const chatWindow = document.getElementById('squidbotWindow');
    const chatbotClose = document.getElementById('squidbotClose');
    const chatInput = document.getElementById('squidbotInput');
    const chatSend = document.getElementById('squidbotSend');
    const chatMessages = document.getElementById('squidbotMessages');
    
    if (!chatbotBtn || !chatWindow) {
        console.warn('SquidBot: Chatbot elements not found, retrying...');
        setTimeout(initChatbot, 200);
        return;
    }
    
    // Prevent double initialization
    if (chatbotBtn.dataset.initialized) return;
    chatbotBtn.dataset.initialized = 'true';
    
    console.log('SquidBot Chief Squid Officer initializing... 🦑');
    
    // ============================================
    // TOGGLE CHATBOT
    // ============================================
    function toggleChatbot() {
        const isActive = chatWindow.classList.contains('active');
        
        if (isActive) {
            closeChatbot();
        } else {
            openChatbot();
        }
    }
    
    var greetingShown = false;
    
    function openChatbot() {
        // Close mobile menu if open
        closeMobileMenuIfOpen();
        
        // If seller mode was active from pulse CTA, restore default greeting
        if (window.squidbot && window.squidbot._sellerMode && chatMessages) {
            chatMessages.innerHTML = '';
            greetingShown = false;
            window.squidbot._sellerMode = false;
        }
        
        chatWindow.classList.add('active');
        
        // Add active state to container (hides tooltip)
        const container = document.querySelector('.chatbot-container');
        if (container) {
            container.classList.add('chatbot-active');
        }
        
        // Stream greeting on first open
        if (!greetingShown && chatMessages && chatMessages.children.length === 0) {
            greetingShown = true;
            setTimeout(function() {
                showTypingIndicator();
                setTimeout(function() {
                    hideTypingIndicator();
                    typeBotMessage("Hey. I'm SquidBot. I answer questions about the factory — what the seats do, what it costs, and what you'd actually have to do. Ask me anything.").then(function() {
                        if (chatInput) chatInput.focus();
                    });
                }, 600);
            }, 200);
        } else {
            if (chatInput) {
                setTimeout(() => {
                    chatInput.focus();
                }, 300);
            }
        }
        
        console.log('SquidBot opened');
    }
    
    function closeChatbot() {
        // CRITICAL: Remove all state classes
        chatWindow.classList.remove('active');
        chatWindow.classList.remove('keyboard-visible');
        
        // Remove active state from container
        const container = document.querySelector('.chatbot-container');
        if (container) {
            container.classList.remove('chatbot-active');
        }
        
        // CRITICAL: Force blur to close keyboard on mobile
        if (chatInput) {
            chatInput.blur();
        }
        
        // Show tooltip again after close
        showTooltipAfterClose();
        
        console.log('SquidBot closed');
    }
    
    // ============================================
    // TOOLTIP SCROLL HANDLING
    // ============================================
    function initTooltipScrollBehavior() {
        const label = document.querySelector('.chatbot-label');
        if (!label) return;
        
        let scrollTimeout;
        window.addEventListener('scroll', function() {
            label.classList.add('scrolled');
            
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                label.classList.remove('scrolled');
            }, 2000);
        }, { passive: true });
    }
    
    function showTooltipAfterClose() {
        const label = document.querySelector('.chatbot-label');
        if (label) {
            label.classList.remove('scrolled');
        }
    }
    
    // Initialize tooltip behavior
    initTooltipScrollBehavior();

    // N-F15: Restore previous conversation from sessionStorage
    const savedMessages = restoreConversation();
    if (savedMessages && savedMessages.length > 0 && chatMessages) {
        chatMessages.innerHTML = '';
        savedMessages.forEach(function(msg) {
            const div = document.createElement('div');
            div.className = msg.className;
            div.innerHTML = msg.html;
            chatMessages.appendChild(div);
        });
    }
    
    // ============================================
    // EVENT LISTENERS - BUTTON
    // ============================================
    chatbotBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        toggleChatbot();
    });
    
    chatbotBtn.addEventListener('touchend', function(e) {
        e.preventDefault();
        e.stopPropagation();
        toggleChatbot();
    }, { passive: false });
    
    // ============================================
    // EVENT LISTENERS - CLOSE
    // ============================================
    if (chatbotClose) {
        chatbotClose.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            closeChatbot();
        });
        
        chatbotClose.addEventListener('touchend', function(e) {
            e.preventDefault();
            e.stopPropagation();
            closeChatbot();
        }, { passive: false });
    }
    
    // ============================================
    // KEYBOARD HANDLING - MOBILE OPTIMIZATION
    // ============================================
    if (chatInput) {
        // Detect when keyboard appears (input focused)
        chatInput.addEventListener('focus', function() {
            // Only shift on mobile landscape
            if (window.innerWidth <= 926 && window.innerHeight <= 500 && window.matchMedia('(orientation: landscape)').matches) {
                chatWindow.classList.add('keyboard-visible');
                console.log('SquidBot: Keyboard visible (landscape) - shifting chat up');
            }
        });
        
        // Detect when keyboard disappears (input blurred)
        chatInput.addEventListener('blur', function() {
            setTimeout(() => {
                chatWindow.classList.remove('keyboard-visible');
                console.log('SquidBot: Keyboard hidden - restoring position');
            }, 100);
        });
    }
    
    // ============================================
    // ORIENTATION CHANGE HANDLER
    // ============================================
    window.addEventListener('orientationchange', function() {
        setTimeout(() => {
            chatWindow.classList.remove('keyboard-visible');
            
            // Also blur any focused inputs to close keyboard
            if (chatInput && document.activeElement === chatInput) {
                chatInput.blur();
                console.log('SquidBot: Orientation changed - closed keyboard');
            }
        }, 300); // Wait for orientation change to complete
    });
    
    // ============================================
    // RESIZE HANDLER - KEYBOARD DETECTION
    // ============================================
    let lastHeight = window.innerHeight;
    let lastWidth = window.innerWidth;
    let lastOrientation = window.matchMedia('(orientation: landscape)').matches;
    
    window.addEventListener('resize', function() {
        const currentHeight = window.innerHeight;
        const currentWidth = window.innerWidth;
        const currentOrientation = window.matchMedia('(orientation: landscape)').matches;
        const isLandscape = currentOrientation;
        
        // CRITICAL: If orientation changed, clean up keyboard-visible
        if (currentOrientation !== lastOrientation) {
            chatWindow.classList.remove('keyboard-visible');
            if (chatInput && document.activeElement === chatInput) {
                chatInput.blur();
            }
            console.log('SquidBot: Orientation change detected in resize - cleaned up');
        }
        // Only handle keyboard on mobile landscape
        else if (currentWidth <= 926 && currentHeight <= 500 && isLandscape) {
            // If window height decreased significantly, keyboard probably appeared
            if (lastHeight - currentHeight > 100) {
                if (document.activeElement === chatInput) {
                    chatWindow.classList.add('keyboard-visible');
                }
            }
            // If window height increased significantly, keyboard probably disappeared
            else if (currentHeight - lastHeight > 100) {
                chatWindow.classList.remove('keyboard-visible');
            }
        } else {
            // Remove keyboard-visible class on non-landscape mobile
            chatWindow.classList.remove('keyboard-visible');
        }
        
        lastHeight = currentHeight;
        lastWidth = currentWidth;
        lastOrientation = currentOrientation;
    }, { passive: true });
    
    // ============================================
    // SCROLL ISOLATION - PREVENT PAGE SCROLL
    // ============================================
    if (chatMessages) {
        // Wheel event - prevent page scroll when at top/bottom of chat
        chatMessages.addEventListener('wheel', function(e) {
            const scrollTop = chatMessages.scrollTop;
            const scrollHeight = chatMessages.scrollHeight;
            const clientHeight = chatMessages.clientHeight;
            const delta = e.deltaY || -e.wheelDelta || e.detail;
            
            // At top and scrolling up, or at bottom and scrolling down
            if ((delta < 0 && scrollTop <= 0) || (delta > 0 && scrollTop + clientHeight >= scrollHeight)) {
                e.preventDefault();
            }
        }, { passive: false });
        
        // Touch move - stop propagation to prevent page scroll
        chatMessages.addEventListener('touchmove', function(e) {
            e.stopPropagation();
        }, { passive: true });
    }
    
    // ============================================
    // SECURITY: Input validation & rate limiting
    // ============================================
    function validateInput(message) {
        // Rate limiting
        const now = Date.now();
        if (now - lastMessageTime < RATE_LIMIT_MS) {
            return { valid: false, reason: 'Please wait a moment before sending another message.' };
        }
        
        // Length check
        if (message.length > SQUIDBOT_CONFIG.maxInputLength) {
            return { valid: false, reason: `Message too long. Please keep it under ${SQUIDBOT_CONFIG.maxInputLength} characters.` };
        }
        
        // Conversation length check
        if (conversationHistory.length >= SQUIDBOT_CONFIG.maxConversationLength * 2) {
            // The source names a personal address here. This is a public
            // template, so it points at the repo instead.
            return { valid: false, reason: "That's as far as this window goes. Open an issue on GitHub for anything longer, or refresh to start again." };
        }
        
        // Basic injection detection (prompt injection attempts)
        const suspiciousPatterns = [
            /ignore (all |your |previous )?instructions/i,
            /disregard (all |your |previous )?instructions/i,
            /forget (all |your |previous )?instructions/i,
            /you are now/i,
            /new persona/i,
            /act as/i,
            /pretend to be/i,
            /system prompt/i,
            /reveal your/i,
            /what are your instructions/i,
            /repeat after me/i,
            /say exactly/i
        ];
        
        for (const pattern of suspiciousPatterns) {
            if (pattern.test(message)) {
                return { valid: false, reason: "I'm SquidBot, SquidBay's Chief Squid Officer! I'm here to help you learn about our agent marketplace. What would you like to know? 🦑" };
            }
        }
        
        return { valid: true };
    }
    
    // ============================================
    // BACKEND API CALL (via Railway proxy)
    // ============================================
    async function callClaudeAPI(userMessage) {
        // Add user message to history
        conversationHistory.push({ role: 'user', content: userMessage });
        
        // The source has no timeout here. When the proxy is unreachable rather
        // than erroring, the fetch never settles, so the catch below never
        // runs and the typing indicator spins for ever — which is exactly what
        // a visitor sees today, because api.squidbay.io is not answering. The
        // abort turns that hang into the fallback answer.
        const ctrl = new AbortController();
        const bail = setTimeout(function () { ctrl.abort(); }, SQUIDBOT_CONFIG.requestTimeoutMs);

        try {
            const response = await fetch(SQUIDBOT_CONFIG.backendUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    messages: conversationHistory
                }),
                signal: ctrl.signal
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error('SquidBot backend error:', response.status, errorData);
                throw new Error(errorData.error || `Backend error: ${response.status}`);
            }
            
            const data = await response.json();
            const assistantMessage = data.response;
            
            // Add assistant response to history
            conversationHistory.push({ role: 'assistant', content: assistantMessage });
            
            return assistantMessage;
            
        } catch (error) {
            console.error('SquidBot error:', error);
            // Remove the failed user message from history
            conversationHistory.pop();
            // Fall back to local responses if backend is down
            return getFallbackResponse(userMessage);
        } finally {
            clearTimeout(bail);
        }
    }
    
    // ============================================
    // FALLBACK RESPONSES (when API unavailable)
    // ============================================
    // Same shape as the source widget's, rewritten for the factory. These run
    // when the proxy cannot be reached, so they have to be answers a visitor
    // can act on — not an apology.
    function getFallbackResponse(message) {
        const msg = message.toLowerCase();

        if (msg.includes('price') || msg.includes('cost') || msg.includes('fee') || msg.includes('pay') || msg.includes('free')) {
            return "The template is **free and MIT licensed** — you bring your own Claude plan, which you are probably already paying for. If you would rather we ran it: **$99 to set up, then $25 a month**, and the Agent app is included in that, not billed separately.";
        }
        if (msg.includes('code') || msg.includes('technical') || msg.includes('developer') || msg.includes('program')) {
            return "No coding needed. The seats write the code and explain the change in plain words. Your job is to read a short summary and decide yes or no.";
        }
        if (msg.includes('merge') || msg.includes('approve') || msg.includes('safe') || msg.includes('control') || msg.includes('gate')) {
            return "You approve every change, every time. Every seat can propose a change as a pull request; **no seat can approve one**. That is how it is built, not a setting you can switch off.";
        }
        if (msg.includes('seat') || msg.includes('team') || msg.includes('who') || msg.includes('agent')) {
            return "Six working seats — Coach, Team Leader, Engineer, Creative Director, Dispatch and Inspector — plus the Agent, the seventh, which stays up when the others clock off. They check each other's work before anything reaches you.";
        }
        if (msg.includes('app') || msg.includes('phone') || msg.includes('ios') || msg.includes('android') || msg.includes('mobile')) {
            return "The Agent app is coming to iOS and Android, and it is included in the managed plan. Chat, review and merge all live in it, so you can run a whole job from a phone.";
        }
        if (msg.includes('start') || msg.includes('install') || msg.includes('setup') || msg.includes('set up') || msg.includes('begin')) {
            return "Three steps: get the Claude desktop app on any paid plan, click **Use this template** on GitHub to get your own private copy, then attach it to Claude Code and start typing. On the managed plan we do that part for you.";
        }
        if (msg.includes('connect') || msg.includes('gmail') || msg.includes('slack') || msg.includes('github') || msg.includes('notion')) {
            return "Your seats reach into Gmail, Calendar, Drive, Chrome, GitHub, Slack, Notion, Twilio, X and Meta. A connector is a door you open once and can close the same way — the seats only use the ones you have opened.";
        }
        if (msg.includes('hello') || msg === 'hi' || msg.startsWith('hi ') || msg.includes('hey')) {
            return "Hey. Ask me what the seats do, what it costs, or what you would actually have to do to run one.";
        }

        return "I can answer what the seats do, what it costs, how the merge gate works, what connectors exist, or how to start. Which one?";
    }
    
    // ============================================
    // SEND MESSAGE
    // ============================================
    async function sendMessage() {
        if (!chatInput || !chatMessages) return;
        
        const message = chatInput.value.trim();
        
        if (!message) {
            chatInput.classList.add('blink-empty');
            setTimeout(() => {
                chatInput.classList.remove('blink-empty');
            }, 1200);
            return;
        }
        
        // Validate input
        const validation = validateInput(message);
        if (!validation.valid) {
            await typeBotMessage(validation.reason);
            return;
        }
        
        // Update rate limit tracker
        lastMessageTime = Date.now();
        messageCount++;
        
        // Add user message with typewriter
        await typeUserMessage(message);
        chatInput.value = '';
        chatInput.style.height = 'auto';
        
        // CRITICAL: Blur input to dismiss mobile keyboard after sending
        if (chatInput && /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)) {
            chatInput.blur();
        }
        
        // Disable send button
        if (chatSend) chatSend.disabled = true;
        
        // Show typing indicator (bouncing dots)
        showTypingIndicator();
        
        // Get response from Claude via Railway backend
        const response = await callClaudeAPI(message);
        
        // Hide typing dots and type out the response
        hideTypingIndicator();
        await typeBotMessage(response);
        
        // N-F15: Save conversation to sessionStorage
        saveConversation();
        
        // Re-enable send button
        if (chatSend) chatSend.disabled = false;
    }
    
    // Type out user message word by word
    function typeUserMessage(text) {
        return new Promise((resolve) => {
            if (!chatMessages) { resolve(); return; }
            
            const messageDiv = document.createElement('div');
            messageDiv.className = 'chat-message user';
            messageDiv.innerHTML = `
                <div class="message-content">
                    <div class="message-text"></div>
                </div>
            `;
            chatMessages.appendChild(messageDiv);
            
            const textEl = messageDiv.querySelector('.message-text');
            const words = text.split(' ');
            let currentWord = 0;
            let displayText = '';
            
            function typeNext() {
                if (currentWord < words.length) {
                    displayText += (currentWord > 0 ? ' ' : '') + words[currentWord];
                    textEl.textContent = displayText;
                    currentWord++;
                    scrollToBottom();
                    setTimeout(typeNext, 40);
                } else {
                    resolve();
                }
            }
            
            typeNext();
        });
    }
    
    // Type out bot message character by character (like Shadow AI)
    function typeBotMessage(text) {
        return new Promise((resolve) => {
            if (!chatMessages) { resolve(); return; }
            
            const messageDiv = document.createElement('div');
            messageDiv.className = 'chat-message bot';
            messageDiv.innerHTML = `
                <div class="message-content">
                    <div class="message-avatar"><img src="assets/img/squid/squid-mark.svg" alt="SquidBot" width="28" height="28"></div>
                    <div class="message-text"></div>
                </div>
            `;
            chatMessages.appendChild(messageDiv);
            
            const textEl = messageDiv.querySelector('.message-text');
            let i = 0;
            const speed = 12; // ms per character
            
            function typeNext() {
                if (i < text.length) {
                    i++;
                    textEl.innerHTML = formatMessage(text.substring(0, i));
                    scrollToBottom();
                    setTimeout(typeNext, speed);
                } else {
                    // Final formatted version
                    textEl.innerHTML = formatMessage(text);
                    resolve();
                }
            }
            
            typeNext();
        });
    }
    
    // Instant bot message (for welcome message on open)
    function addBotMessage(text) {
        if (!chatMessages) return;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = 'chat-message bot';
        messageDiv.innerHTML = `
            <div class="message-content">
                <div class="message-avatar"><img src="assets/img/squid/squid-mark.svg" alt="SquidBot" width="28" height="28"></div>
                <div class="message-text">${formatMessage(text)}</div>
            </div>
        `;
        chatMessages.appendChild(messageDiv);
        
        scrollToBottom();
    }
    
    function showTypingIndicator() {
        if (!chatMessages) return;
        
        const typing = document.createElement('div');
        typing.className = 'chat-message bot typing-indicator';
        typing.id = 'typingIndicator';
        typing.innerHTML = `
            <div class="message-content">
                <div class="message-avatar"><img src="assets/img/squid/squid-mark.svg" alt="SquidBot" width="28" height="28"></div>
                <div class="typing-dots"><span></span><span></span><span></span></div>
            </div>
        `;
        chatMessages.appendChild(typing);
        
        scrollToBottom();
    }
    
    function hideTypingIndicator() {
        const typing = document.getElementById('typingIndicator');
        if (typing) {
            typing.remove();
        }
    }
    
    function scrollToBottom() {
        if (!chatMessages) return;
        
        requestAnimationFrame(() => {
            chatMessages.scrollTop = chatMessages.scrollHeight;
        });
    }
    
    // Helper functions for message formatting
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    function formatMessage(text) {
        // C-07 FIX: Escape HTML first to prevent XSS, then apply safe formatting
        let formatted = escapeHtml(text);
        // Convert **bold** to <strong> (safe after escaping)
        formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        // Convert newlines to <br>
        formatted = formatted.replace(/\n/g, '<br>');
        return formatted;
    }
    
    // ============================================
    // EVENT LISTENERS - SEND
    // ============================================
    if (chatSend) {
        chatSend.addEventListener('click', function(e) {
            e.preventDefault();
            sendMessage();
        });
        
        chatSend.addEventListener('touchend', function(e) {
            e.preventDefault();
            e.stopPropagation();
            sendMessage();
        }, { passive: false });
    }
    
    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
        
        chatInput.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = Math.min(this.scrollHeight, 100) + 'px';
        });
    }
    
    // ============================================
    // ESC KEY CLOSE
    // ============================================
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (chatWindow.classList.contains('active')) {
                closeChatbot();
            }
        }
    });
    
    // ============================================
    // CLOSE MOBILE MENU WHEN OPENING CHATBOT
    // ============================================
    function closeMobileMenuIfOpen() {
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu && mobileMenu.classList.contains('open')) {
            // Use the global toggle function if available
            if (typeof window.toggleMobileMenu === 'function') {
                window.toggleMobileMenu();
            } else {
                mobileMenu.classList.remove('open');
                document.body.classList.remove('menu-open');
            }
        }
    }
    
    console.log('SquidBot Chief Squid Officer ready to help! 🦑');
    
    // Expose for external use (the managed CTA, etc.)
    window.squidbot = {
        _sellerMode: false,
        open: openChatbot,
        close: closeChatbot,
        addMessage: addBotMessage,
        openManaged: function() {
            // Replace greeting with the managed-plan opener, open chat
            if (chatMessages) {
                chatMessages.innerHTML = '';
            }
            window.squidbot._sellerMode = true;
            // Bypass normal openChatbot to avoid reset
            closeMobileMenuIfOpen();
            chatWindow.classList.add('active');
            var container = document.querySelector('.chatbot-container');
            if (container) container.classList.add('chatbot-active');
            // Show typing indicator, then stream the message
            setTimeout(function() {
                showTypingIndicator();
                setTimeout(function() {
                    hideTypingIndicator();
                    typeBotMessage("Happy to talk about the managed plan. It is $99 to set up and $25 a month: we install the factory for you, and after that you send us what you need and we post a ready-to-merge pull request into it. The Agent app is included. What are you hoping it would take off your hands?").then(function() {
                        if (chatInput) chatInput.focus();
                    });
                }, 600);
            }, 200);
        }
    };
}

// ============================================
// SHOW CHATBOT AFTER PAGE LOADS
// ============================================
function showChatbotButton() {
    const chatbotContainer = document.querySelector('.chatbot-container');
    if (chatbotContainer) {
        chatbotContainer.classList.add('ready');
        console.log('SquidBot button visible');
    }
}

// Export for external use
window.showChatbotButton = showChatbotButton;
window.initChatbot = initChatbot;
