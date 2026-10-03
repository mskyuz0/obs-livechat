function formatTime(timestamp) {
    var date = timestamp ? new Date(timestamp) : new Date();
    var hours = String(date.getHours()).padStart(2, '0');
    var minutes = String(date.getMinutes()).padStart(2, '0');
    var seconds = String(date.getSeconds()).padStart(2, '0');
    return hours + ':' + minutes + ':' + seconds;
}

function getPlatformIcon(type) {
    var platformIcons = {
        'youtube': 'https://socialstream.ninja/sources/images/youtube.png',
        'twitch': 'https://socialstream.ninja/sources/images/twitch.png',
        'tiktok': 'https://socialstream.ninja/sources/images/tiktok.png',
        'facebook': 'https://socialstream.ninja/sources/images/facebook.png',
        'kick': 'https://socialstream.ninja/sources/images/kick.png',
        'discord': 'https://socialstream.ninja/sources/images/discord.png',
        'instagram': 'https://socialstream.ninja/sources/images/instagram.png',
        'rumble': 'https://socialstream.ninja/sources/images/rumble.png'
    };
    return platformIcons[type ? String(type).toLowerCase() : 'youtube'] || null;
}

function mapSSNBadge(data) {
    if (data.mod) return 'mod';
    if (data.vip) return 'vip';
    if (data.membership) return 'subscriber';
    if (data.chatbadges && Array.isArray(data.chatbadges)) {
        for (var i = 0; i < data.chatbadges.length; i++) {
            var badge = data.chatbadges[i];
            var text = (badge.text || badge.rawText || '').toLowerCase();
            if (text.indexOf('verified') !== -1 || text === '✓') return 'verified';
            if (text.indexOf('mod') !== -1) return 'mod';
            if (text.indexOf('sub') !== -1) return 'subscriber';
            if (text.indexOf('vip') !== -1) return 'vip';
        }
    }
    return null;
}
