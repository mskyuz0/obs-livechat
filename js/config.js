var URL_PARAMS = new URLSearchParams(window.location.search);

var APP_CONFIG = {
    sessionId: URL_PARAMS.get('session') || '',
    mockMode: URL_PARAMS.has('demo') || !URL_PARAMS.get('session'),
    messageLimit: parseInt(URL_PARAMS.get('limit')) || 50,
    mockInterval: 2500
};

var MAX_RECONNECT_ATTEMPTS = 5;

var BADGE_CONFIG = {
    verified: { label: '✓ VERIFIED', class: 'badge-verified' },
    mod: { label: 'MOD', class: 'badge-mod' },
    subscriber: { label: 'SUB', class: 'badge-subscriber' },
    vip: { label: 'VIP', class: 'badge-vip' }
};

var MOCK_MESSAGES = [
    { username: 'Cyber_Patrol_01', message: 'Sistem pengamanan aktif. Stream aman.', badge: 'verified', platform: 'youtube', avatar: 'https://ui-avatars.com/api/?name=Cyber+Patrol&background=ff0000' },
    { username: 'SergeantSmith', message: 'Semua unit tetap waspada', badge: 'mod', platform: 'twitch', avatar: 'https://ui-avatars.com/api/?name=Sergeant&background=9146ff' },
    { username: 'Dispatch_Unit_5', message: 'Sektor 7 clear, lanjut patroli', badge: 'subscriber', platform: 'youtube', avatar: 'https://ui-avatars.com/api/?name=Dispatch&background=ff0000' },
    { username: 'Patrol_Car_12', message: 'Visual jernih! Kualitas mantap 🔥', badge: 'vip', platform: 'tiktok', avatar: 'https://ui-avatars.com/api/?name=Patrol&background=25f4ee' },
    { username: 'Commander_Gray', message: 'Good work team, pertahankan!', badge: 'verified', platform: 'facebook', avatar: 'https://ui-avatars.com/api/?name=Commander&background=1877f2' },
    { username: 'Traffic_Control', message: 'Jalur data stabil 99.9%', badge: 'subscriber', platform: 'youtube', avatar: 'https://ui-avatars.com/api/?name=Traffic&background=ff0000' },
    { username: 'K9_Cyber', message: 'Scan selesai, no threat detected 🐕', badge: 'mod', platform: 'twitch', avatar: 'https://ui-avatars.com/api/?name=K9&background=9146ff' },
    { username: 'SWAT_Team_1', message: 'Siap siaga!', badge: 'vip', platform: 'kick', avatar: 'https://ui-avatars.com/api/?name=SWAT&background=00b26f' },
    { username: 'Detective_Code', message: 'Jejak digital terlacak 🔍', badge: 'verified', platform: 'discord', avatar: 'https://ui-avatars.com/api/?name=Detective&background=5865f2' },
    { username: 'Beat_Cop_23', message: 'Monitor on, lanjutkan misi! 👮', badge: 'subscriber', platform: 'youtube', avatar: 'https://ui-avatars.com/api/?name=Beat+Cop&background=ff0000' }
];
