import _0x151494 from '../../config.cjs';
import _0x9b5bdb from 'node-fetch';
async function fetchJson(_0x46f0cb, _0x406ba0 = {}) {
  const _0x6899b6 = await _0x9b5bdb(_0x46f0cb, {
    'method': "GET",
    'headers': {
      'Content-Type': "application/json",
      ..._0x406ba0.headers
    },
    ..._0x406ba0
  });
  if (!_0x6899b6.ok) {
    throw new Error("HTTP error! status: " + _0x6899b6.status);
  }
  return await _0x6899b6.json();
}
const play = async (_0x2d1bf8, _0x4d7f43) => {
  const _0xd68a27 = _0x151494.PREFIX;
  const _0x583687 = _0x2d1bf8.body.startsWith(_0xd68a27) ? _0x2d1bf8.body.slice(_0xd68a27.length).split(" ")[0x0].toLowerCase() : '';
  const _0x1faf12 = _0x2d1bf8.body.slice(_0xd68a27.length + _0x583687.length).trim();
  if (_0x583687 === "play") {
    if (!_0x1faf12) {
      return _0x2d1bf8.reply("🎶 Tell me the song you're in the mood for! 🎶");
    }
    try {
      await _0x4d7f43.sendMessage(_0x2d1bf8.from, {
        'text': "🔎 Finding \"" + _0x1faf12 + "\"..."
      }, {
        'quoted': _0x2d1bf8
      });
      let _0x52303e = await fetchJson("https://api.agatz.xyz/api/ytsearch?message=" + encodeURIComponent(_0x1faf12));
      let _0x426b85 = _0x52303e.data[0x0];
      if (!_0x426b85) {
        return _0x2d1bf8.reply("Hmm, couldn't find that tune. 😔 Maybe try again?");
      }
      let _0x4770e2 = await fetchJson("https://api.nexoracle.com/downloader/yt-audio2?apikey=free_key@maher_apis&url=" + _0x426b85.url);
      let _0x5c4c42 = _0x4770e2.result.audio;
      if (!_0x5c4c42) {
        return _0x2d1bf8.reply("⚠️ Couldn't grab the audio. Let's try later! 😔");
      }
      await _0x4d7f43.sendMessage(_0x2d1bf8.from, {
        'audio': {
          'url': _0x5c4c42
        },
        'fileName': _0x426b85.title + ".mp3",
        'mimetype': "audio/mpeg",
        'contextInfo': {
          'forwardingScore': 0x5,
          'isForwarded': true,
          'forwardedNewsletterMessageInfo': {
            'newsletterName': "🪄 𝐏ᴇᴀᴄᴇ 𝐌ᴅ 𝐌ᴜꜱɪᴄ 𝐁ᴏ𝐱 ✨",
            'newsletterJid': "120363421564278292@newsletter"
          },
          'externalAdReply': {
            'title': "🎧 Now playing: " + _0x426b85.title + " 🎧",
            'body': ".mp3 audio delivered",
            'thumbnailUrl': _0x426b85.thumbnail || 'https://files.catbox.moe/og4tsk.jpg',
            'mediaType': 0x1,
            'renderLargerThumbnail': true,
            'thumbnailHeight': 0x1f4,
            'thumbnailWidth': 0x1f4
          }
        }
      }, {
        'quoted': _0x2d1bf8
      });
    } catch (_0x390b7d) {
      console.error("Error in play command:", _0x390b7d);
      _0x2d1bf8.reply("Hmm, something went wrong. 😅 Let's try again!");
    }
  }
};
export default play;
