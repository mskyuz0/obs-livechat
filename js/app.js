var messages = [];
var wsConnection = null;
var reconnectAttempts = 0;

var chatContainer = null;
var statusDot = null;
var statusText = null;
var errorBanner = null;
var footerTime = null;

function updateFooterTime() {
    footerTime.textContent = formatTime();
}

function showError(msg) {
    errorBanner.textContent = '⚠ SSN Error: ' + msg;
    errorBanner.style.display = 'block';
}

function hideError() {
    errorBanner.style.display = 'none';
}

function updateConnectionStatus(connected) {
    if (connected) {
        statusDot.classList.add('connected');
        statusText.textContent = 'SSN // CONNECTED';
        hideError();
    } else {
        statusDot.classList.remove('connected');
        statusText.textContent = APP_CONFIG.mockMode ? 'APEX-09 // INTERCOM' : 'SSN // STANDBY';
    }
}

function addMessage(data) {
    var messageData = {
        id: data.id || Date.now() + '_' + Math.random(),
        username: data.username || data.chatname || 'Anonymous',
        message: data.message || data.chatmessage || '',
        badge: data.badge || mapSSNBadge(data),
        avatar: data.avatar || data.chatimg || null,
        platform: data.platform || data.type || 'youtube',
        timestamp: data.timestamp || Date.now()
    };

    if (!messageData.message) return;

    messages.push(messageData);

    if (messages.length > APP_CONFIG.messageLimit) {
        messages.shift();
        if (chatContainer.firstChild) {
            chatContainer.removeChild(chatContainer.firstChild);
        }
    }

    renderMessage(chatContainer, messageData, APP_CONFIG.messageLimit);
}

function connectWebSocket() {
    if (!APP_CONFIG.sessionId) {
        return;
    }

    try {
        wsConnection = new WebSocket('wss://io.socialstream.ninja');

        wsConnection.onopen = function() {
            updateConnectionStatus(true);
            reconnectAttempts = 0;

            wsConnection.send(JSON.stringify({
                join: APP_CONFIG.sessionId,
                in: 4,
                out: 3
            }));
        };

        wsConnection.onmessage = function(event) {
            try {
                var data = JSON.parse(event.data);
                if (data && typeof data === 'object') {
                    if (data.chatname || data.chatmessage) {
                        addMessage(data);
                    }
                }
            } catch (e) {
                // skip invalid payload
            }
        };

        wsConnection.onerror = function() {
            showError('Connection error');
        };

        wsConnection.onclose = function(event) {
            updateConnectionStatus(false);
            wsConnection = null;

            if (event.code !== 1000 && reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
                reconnectAttempts++;
                var delay = Math.min(1000 * reconnectAttempts, 5000);
                setTimeout(connectWebSocket, delay);
            } else if (reconnectAttempts >= MAX_RECONNECT_ATTEMPTS) {
                showError('Max reconnect attempts reached');
            }
        };
    } catch (e) {
        showError('Failed to connect: ' + e.message);
    }
}

function startMockMode() {
    updateConnectionStatus(false);

    var initialMessages = MOCK_MESSAGES.slice(0, 5);
    initialMessages.forEach(function(msg, idx) {
        setTimeout(function() {
            var copy = {};
            for (var key in msg) {
                copy[key] = msg[key];
            }
            copy.id = Date.now() + '_' + idx;
            addMessage(copy);
        }, 500 + idx * 400);
    });

    setInterval(function() {
        var randomMsg = MOCK_MESSAGES[Math.floor(Math.random() * MOCK_MESSAGES.length)];
        var copy = {};
        for (var key in randomMsg) {
            copy[key] = randomMsg[key];
        }
        copy.id = Date.now();
        addMessage(copy);
    }, APP_CONFIG.mockInterval);
}

function initApp() {
    chatContainer = document.getElementById('chatContainer');
    statusDot = document.getElementById('statusDot');
    statusText = document.getElementById('statusText');
    errorBanner = document.getElementById('errorBanner');
    footerTime = document.getElementById('footerTime');

    if (!chatContainer) {
        return;
    }

    updateFooterTime();
    setInterval(updateFooterTime, 1000);

    if (APP_CONFIG.mockMode) {
        startMockMode();
    } else {
        connectWebSocket();
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}
