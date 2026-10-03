# OBS Livechat - Cyber Police Theme

Browser Source OBS untuk live chat Social Stream Ninja. Vanilla JS, tanpa build step.

**Pilihan hosting:**
- **Cloud (Vercel):** https://obs-livechat2.vercel.app (no setup, free, online)
- **Local server:** `python3 -m http.server` atau `npx http-server` (offline, kontrol penuh)

<p align="center">
  <img src="https://media.discordapp.net/attachments/1531751267859169573/1555945532013412382/image.png?backend=b2&ex=6ac25eb2&is=6ac10d32&hm=2480c29737c5c63b027cd92cb6e5fac2f6abc177ed417c5572f2918361571706&=&format=webp&quality=lossless&width=327&height=768" width="300" alt="Preview overlay cyber police">
</p>

## Daftar Isi

- [Fitur](#fitur)
- [Prasyarat](#prasyarat)
- [Cara Pakai](#cara-pakai)
- [Parameter URL](#parameter-url)
- [Struktur Proyek](#struktur-proyek)
- [Troubleshooting](#troubleshooting)
- [Lisensi](#lisensi)

## Fitur

- Tema cyber police: header HUD, grid halus, scanlines
- Pesan gaya terminal-log: avatar, logo platform, username, badge role, timestamp bawah kanan
- Badge role: `VERIFIED`, `MOD`, `SUB`, `VIP`
- Real-time via WebSocket SSN channel 4
- Mode demo tanpa SSN
- Auto-prune pesan lama, batas bisa diatur
- Kompatibel OBS Browser Source

## Prasyarat

- OBS Studio 28+
- Social Stream Ninja extension atau desktop app
- Session ID SSN

## Cara Pakai

**Pilih salah satu metode hosting:**

### Opsi A: Gunakan Vercel Cloud (Recommended)

Tidak perlu install apapun, langsung pakai URL:

```text
https://obs-livechat2.vercel.app/index.html?demo=1
https://obs-livechat2.vercel.app/index.html?session=SESSION_ID_KAMU
```

Langsung ke [step 3: Tambah ke OBS](#3-tambah-ke-obs).

### Opsi B: Local Server (Offline)

Pilih ini jika ingin kontrol penuh atau tanpa internet.

#### B1. Jalankan local server

`file://` memblokir WebSocket. Pakai server lokal:

**Python 3:**
```bash
cd obs-livechat2
python3 -m http.server 8000
```

**Node.js:**
```bash
npx http-server . -p 8000
```

Biarkan terminal jalan selama streaming.

#### B2. Test di browser

```text
http://localhost:8000/index.html?demo=1
http://localhost:8000/index.html?session=SESSION_ID_KAMU
```

Demo mode harus tampilkan pesan otomatis.

### Opsi C: Deploy ke Vercel Sendiri

1. Fork/clone repo ini
2. Install Vercel CLI: `npm i -g vercel`
3. Login: `vercel login`
4. Deploy: `vercel --prod`
5. Dapatkan URL custom: `https://nama-kamu.vercel.app`

---

### 1. Ambil Session ID

1. Buka Social Stream Ninja
2. Tambah chat source: YouTube, Twitch, TikTok, atau lainnya
3. Buka SSN dock di browser
4. Copy nilai `session` dari URL dock

Contoh:

```text
https://socialstream.ninja/dock.html?session=[sessionID]
```

Session ID = `[sessionID]`.

### 2. Aktifkan SSN API

1. Buka SSN Settings lalu tab Mechanics
2. Aktifkan `Enable remote API control of extension`
3. Aktifkan `Send chat messages to API server`
4. Simpan dan restart SSN bila diminta

### 3. Tambah ke OBS

1. OBS lalu Sources klik `+`
2. Pilih `Browser`
3. Nama misal `Live Chat`
4. Isi properties:

| Properti | Nilai |
| --- | --- |
| URL | `https://obs-livechat2.vercel.app/index.html?session=SESSION_ID_KAMU` |
| Width | `400` |
| Height | `800` |
| FPS | `30` |
| Shutdown source when not visible | Centang |
| Refresh browser when scene becomes active | Centang |

5. Klik OK
6. Posisikan source di preview

### 4. Verifikasi

1. Kirim chat di platform yang connect ke SSN
2. Pesan muncul dalam 1-2 detik
3. Header tampil `SSN // CONNECTED` dengan dot hijau
4. Bila masih `SSN // STANDBY`, ulangi langkah Session ID dan SSN API

## Parameter URL

| Parameter | Contoh | Fungsi |
| --- | --- | --- |
| `session` | `?session=abc123` | Session ID SSN untuk live mode |
| `demo` | `?demo=1` | Simulasi tanpa SSN |
| `limit` | `?session=abc123&limit=20` | Maksimal pesan, default `50` |

Contoh lengkap:

```text
https://obs-livechat2.vercel.app/index.html?session=[sessionID]&limit=30
https://obs-livechat2.vercel.app/index.html?demo=1
```

## Struktur Proyek

```text
obs-livechat2/
├── index.html
├── css/
│   ├── base.css
│   └── message.css
├── js/
│   ├── config.js
│   ├── utils.js
│   ├── message.js
│   └── app.js
└── README.md
```

| File | Fungsi |
| --- | --- |
| `index.html` | Struktur overlay |
| `css/base.css` | Layout, header, grid, scanlines, scrollbar |
| `css/message.css` | Gaya pesan, avatar, badge, timestamp |
| `js/config.js` | URL params, mock data, badge config |
| `js/utils.js` | Format waktu, icon platform, mapping badge |
| `js/message.js` | Buat elemen DOM pesan |
| `js/app.js` | WebSocket, mock mode, render loop |

## Troubleshooting

<details>
<summary>Pesan tidak muncul di OBS tapi muncul di browser</summary>

- Refresh Browser Source di OBS
- Jika pakai local server, pakai `http://localhost:8000`, bukan `file://`
- Jika pakai Vercel, pastikan internet tersambung
</details>

<details>
<summary>Status STANDBY terus</summary>

- Samakan Session ID dengan SSN dock
- Aktifkan dua toggle API SSN
- Buka console browser dengan F12 untuk log WebSocket
- Test `?demo=1` untuk pastikan overlay sehat
</details>

<details>
<summary>Avatar atau logo platform hilang</summary>

- Biasanya URL gambar diblokir CORS atau offline
- Elemen otomatis disembunyikan agar layout aman
- Logo platform butuh internet ke `socialstream.ninja`
</details>

## Lisensi

Ikuti ketentuan Social Stream Ninja GPL-3.0.

Support SSN:

- https://discord.socialstream.ninja
- https://github.com/steveseguin/social_stream/issues
