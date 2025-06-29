import config from '../../config.cjs';

const startTime = Date.now();

const formatRuntime = (ms) => {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${hours}h ${minutes}m ${seconds}s`;
};

// Array of random audio files
const audioArray = [
  'https://files.catbox.moe/ucmkut.mp3',
  'https://files.catbox.moe/ucmkut.mp3',
  'https://files.catbox.moe/ucmkut.mp3',
];

// Array of random scary messages
const scaryMessages = [
  "👻 Beware! The shadows are watching you...",
  "😱 Did you hear that? Something lurks in the dark...",
  "💀 Don't turn around... you might not like what you see!",
  "🕷️ Something is crawling into your chats...",
];

const getRandomElement = (array) => array[Math.floor(Math.random() * array.length)];

const bugMenu = async (m, sock) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';

  if (cmd === "bug-menu" || cmd === "bugmenu") {
    const now = Date.now();
    const runtime = formatRuntime(now - startTime);

    let profilePictureUrl = 'https://files.catbox.moe/s2xj7v.jpg';
    try {
      const pp = await sock.profilePictureUrl(m.sender, 'image');
      if (pp) profilePictureUrl = pp;
    } catch (e) {
      console.error("Failed to fetch profile picture:", e);
    }

    const randomAudio = getRandomElement(audioArray);
    const randomScaryMessage = getRandomElement(scaryMessages);

    const text = `
╭───────────────────⭓
│ 🤖 ʙᴏᴛ : *𝗣𝗘𝗔𝗖𝗘-𝗠𝗗*
│ 🌐 ᴘʀᴇғɪx : ${prefix}
│ 📂 ᴍᴇɴᴜ : 𝗕𝗨𝗚-𝗠𝗘𝗡𝗨
│ 🧬 ᴠᴇʀ : *𝟸.𝟶.𝟶*
╰───────────────────⭓
➤ xeon-blast
➤ xeon-kill
➤ xeon-freeze
➤ peacemd-kill
➤ ios-kill
➤ peace-maker
─────────────────────
⚡𝗣𝗘𝗔𝗖𝗘-𝗠𝗗 𝗕𝗨𝗚 𝗠𝗘𝗡𝗨⚡
─────────────────────
${randomScaryMessage}
`;

    await sock.sendMessage(
      m.from,
      {
        audio: { url: randomAudio },
        caption: text.trim(),
        contextInfo: {
          forwardingScore: 5,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterName: "𝐏ᴇᴀᴄᴇ 𝐌ᴅ",
            newsletterJid: "120363421564278292@newsletter",
          },
        },
      },
      { quoted: m }
    );
  }
};

export default bugMenu;
