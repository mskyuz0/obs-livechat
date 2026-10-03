function createMessageElement(data) {
    var messageDiv = document.createElement('div');
    messageDiv.className = 'message';

    var headerDiv = document.createElement('div');
    headerDiv.className = 'message-header';

    if (data.avatar) {
        var avatar = document.createElement('img');
        avatar.className = 'message-avatar';
        avatar.src = data.avatar;
        avatar.alt = data.username || 'User';
        avatar.onerror = function() { this.style.display = 'none'; };
        headerDiv.appendChild(avatar);
    }

    var platformIconUrl = getPlatformIcon(data.platform);
    if (platformIconUrl) {
        var platformIcon = document.createElement('img');
        platformIcon.className = 'platform-icon';
        platformIcon.src = platformIconUrl;
        platformIcon.alt = data.platform || 'Platform';
        platformIcon.onerror = function() { this.style.display = 'none'; };
        headerDiv.appendChild(platformIcon);
    }

    var username = document.createElement('span');
    username.className = 'message-username';
    username.textContent = data.username || 'Anonymous';
    headerDiv.appendChild(username);

    if (data.badge && BADGE_CONFIG[data.badge]) {
        var badge = document.createElement('span');
        badge.className = 'badge ' + BADGE_CONFIG[data.badge].class;
        badge.textContent = BADGE_CONFIG[data.badge].label;
        headerDiv.appendChild(badge);
    }

    var bodyDiv = document.createElement('div');
    bodyDiv.className = 'message-body';
    bodyDiv.textContent = data.message || '';

    var footerDiv = document.createElement('div');
    footerDiv.className = 'message-footer';
    footerDiv.textContent = formatTime(data.timestamp);

    messageDiv.appendChild(headerDiv);
    messageDiv.appendChild(bodyDiv);
    messageDiv.appendChild(footerDiv);

    return messageDiv;
}

function renderMessage(chatContainer, messageData, messageLimit) {
    var messageElement = createMessageElement(messageData);
    chatContainer.appendChild(messageElement);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}
