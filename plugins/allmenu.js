import moment from 'moment-timezone';
import pkg from '@whiskeysockets/baileys';
const { generateWAMessageFromContent, proto } = pkg;
import config from '../../config.cjs';

const allMenu = async (m, sock) => {
  const prefix = config.PREFIX;
  const mode = config.MODE;
  const pushName = m.pushName || 'User';
  const text = m.body.toLowerCase();

  // Calculate uptime
  const uptimeSeconds = process.uptime();
  const days = Math.floor(uptimeSeconds / (24 * 3600));
  const hours = Math.floor((uptimeSeconds % (24 * 3600)) / 3600);
  const minutes = Math.floor((uptimeSeconds % 3600) / 60);
  const seconds = Math.floor(uptimeSeconds % 60);

  // Real time function
  const realTime = moment().tz("Africa/Nairobi").format("HH:mm:ss");

  // Pushwish function
  let pushwish = "";
  if (realTime < "05:00:00") {
    pushwish = `𝙶𝙾𝙾𝙳 𝙼𝙾𝚁𝙽𝙸𝙽𝙶 🌄`;
  } else if (realTime < "11:00:00") {
    pushwish = `𝙶𝙾𝙾𝙳 𝙼𝙾𝚁𝙽𝙸𝙽𝙶 🌄`;
  } else if (realTime < "15:00:00") {
    pushwish = `𝙶𝙾𝙾𝙳 𝙰𝙵𝚃𝙴𝚁𝙽𝙾𝙾𝙽 🌅`;
  } else if (realTime < "19:00:00") {
    pushwish = `𝙶𝙾𝙾𝙳 𝙴𝚅𝙴𝙽𝙸𝙽𝙶 🌃`;
  } else {
    pushwish = `𝙶𝙾𝙾𝙳 𝙽𝙸𝙶𝙷𝚃 🌌`;
  }

  const sendCommandMessage = async (messageContent) => {
    await sock.sendMessage(
      m.from,
      {
        text: messageContent,
        contextInfo: {
          isForwarded: true,
          forwardingScore: 999,
          forwardedNewsletterMessageInfo: {
            newsletterJid: '120363421564278292@newsletter',
            newsletterName: "PEACE-MD",
            serverMessageId: -1,
          },
          externalAdReply: {
            title: "PEACE-MD",
            body: pushName,
            thumbnailUrl: 'https://files.catbox.moe/n0dgjr.jpg',
            sourceUrl: 'https://github.com/Peacemaker-cyber/PEACE-MD',
            mediaType: 1,
            renderLargerThumbnail: true,
          },
        },
      },
      { quoted: m }
    );
  };

  // Menu number → command map
  const menuMap = {
    "1": "islamicmenu",
    "2": "downloadmenu",
    "3": "aimenu",
    "4": "searchmenu",
    "5": "toolsmenu",
    "6": "logomenu",
    "7": "groupmenu",
    "8": "ownermenu",
    "9": "othermenu"
  };

  if (text === prefix + "menu") {
    await m.React('📋');
    const numberedMenu = `
╭───❍「 *😇𝐏ᴇᴀᴄᴇ 𝐌ᴅ😇* 」
│ 🧑‍💻 *ᴜsᴇʀ:* ${pushName} ${pushwish}
│ 🌐 *ᴍᴏᴅᴇ:* ${mode}
│ ⏰ *ᴛɪᴍᴇ:* ${realTime}
│ 🚀 *ᴜᴘᴛɪᴍᴇ:* ${days}d ${hours}h ${minutes}m ${seconds}s
╰───────────❍
╭───❍「 *👻𝐏ᴇᴀᴄᴇ 𝐌ᴅ 𝐌ᴇɴᴜs👻* 」
1️⃣ Islamic Menu
2️⃣ Download Menu
3️⃣ AI Menu
4️⃣ Search Menu
5️⃣ Tools Menu
6️⃣ Logo Menu
7️⃣ Group Menu
8️⃣ Owner Menu
9️⃣ Other Menu

_Reply with a number (e.g., 2) to view that section._
╰───────────❍`;
    await sendCommandMessage(numberedMenu);
    return;
  }

  // Check if user replied with a number (submenu selector)
  if (menuMap[text]) {
    m.body = prefix + menuMap[text];
    m.body = m.body.toLowerCase();
    return allMenu(m, sock); // Recursive call to trigger corresponding menu
  }

  // Continue with the original command-based logic here (unchanged)
};

export default allMenu;
