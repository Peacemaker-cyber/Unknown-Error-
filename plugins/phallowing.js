import _0x151494 from '../../config.cjs';
import _0x9b5bdb from 'node-fetch';

async function fetchJson(_0x46f0cb, _0x406ba0 = {}) {
  const _0x6899b6 = await _0x9b5bdb(_0x46f0cb, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ..._0x406ba0.headers
    },
    ..._0x406ba0
  });
  if (!_0x6899b6.ok) throw new Error("HTTP error! status: " + _0x6899b6.status);
  return await _0x6899b6.json();
}

const play = async (_0x2d1bf8, _0x4d7f43) => {
  const _0xd68a27 = _0x151494.PREFIX;
  const _0x583687 = _0x2d1bf8.body.startsWith(_0xd68a27) ? _0x2d1bf8.body.slice(_0xd68a27.length).split(" ")[0].toLowerCase() : '';
  const _0x1faf12 = _0x2d1bf8.body.slice(_0xd68a27.length + _0x583687.length).trim();

  if (_0x583687 === "play") {
    if (!_0x1faf12) return _0x2d1bf8.reply("🎶 Tell me the song you're in the mood for! 🎶");

    try {
      await _0x4d7f43.sendMessage(_0x2d1bf8.from, {
        text: `🔎 Finding "${_0x1faf12}"...`
      }, { quoted: _0x2d1bf8 });

      // 🔄 Use Zahirdz API to fetch audio
      const result = await fetchJson(`https://zahirdz.xyz/api/playmp3?query=${encodeURIComponent(_0x1faf12)}&apikey=zahirgans`);
      const audioUrl = result.result.url;
      const title = result.result.title || "Unknown Title";
      const thumb = result.result.thumbnail || 'https://files.catbox.moe/og4tsk.jpg';

      if (!audioUrl) {
        return _0x2d1bf8.reply("⚠️ Couldn't grab the audio. Let's try later! 😔");
      }

      await _0x4d7f43.sendMessage(_0x2d1bf8.from, {
        audio: { url: audioUrl },
        fileName: title + ".mp3",
        mimetype: "audio/mpeg",
        contextInfo: {
          forwardingScore: 5,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterName: "🪄 𝐏ᴇᴀᴄᴇ 𝐌ᴅ 𝐌ᴜꜱɪᴄ 𝐁ᴏ𝐱 ✨",
            newsletterJid: "120363421564278292@newsletter"
          },
          externalAdReply: {
            title: "🎧 Now playing: " + title + " 🎧",
            body: ".mp3 audio delivered",
            thumbnailUrl: thumb,
            mediaType: 1,
            renderLargerThumbnail: true,
            thumbnailHeight: 500,
            thumbnailWidth: 500
          }
        }
      }, { quoted: _0x2d1bf8 });

    } catch (err) {
      console.error("Error in play command:", err);
      _0x2d1bf8.reply("😅 Something went wrong. Try again in a bit!");
    }
  }
};

export default play;
