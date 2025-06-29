import moment from 'moment-timezone'; import pkg from '@whiskeysockets/baileys'; const { generateWAMessageFromContent, proto } = pkg; import config from '../../config.cjs';

const allMenu = async (m, sock) => { const prefix = config.PREFIX; const mode = config.MODE; const pushName = m.pushName || 'User'; const text = m.body.toLowerCase();

// Calculate uptime const uptimeSeconds = process.uptime(); const days = Math.floor(uptimeSeconds / (24 * 3600)); const hours = Math.floor((uptimeSeconds % (24 * 3600)) / 3600); const minutes = Math.floor((uptimeSeconds % 3600) / 60); const seconds = Math.floor(uptimeSeconds % 60);

// Real time function const realTime = moment().tz("Africa/Nairobi").format("HH:mm:ss");

// Pushwish function let pushwish = ""; if (realTime < "05:00:00") { pushwish = 𝙶𝙾𝙾𝙳 𝙼𝙾𝚁𝙽𝙸𝙽𝙶 🌄; } else if (realTime < "11:00:00") { pushwish = 𝙶𝙾𝙾𝙳 𝙼𝙾𝚁𝙽𝙸𝙽𝙶 🌄; } else if (realTime < "15:00:00") { pushwish = 𝙶𝙾𝙾𝙳 𝙰𝙵𝚃𝙴𝚁𝙽𝙾𝙾𝙽 🌅; } else if (realTime < "19:00:00") { pushwish = 𝙶𝙾𝙾𝙳 𝙴𝚅𝙴𝙽𝙸𝙽𝙶 🌃; } else { pushwish = 𝙶𝙾𝙾𝙳 𝙽𝙸𝙶𝙷𝚃 🌌; }

const menuMap = { "1": "islamicmenu", "2": "downloadmenu", "3": "aimenu", "4": "searchmenu", "5": "toolsmenu", "6": "logomenu", "7": "groupmenu", "8": "ownermenu", "9": "othermenu" };

if (text === prefix + "menu") { await m.React('📋'); await sock.sendMessage( m.from, { text: ╭───❍「 *😇𝐏ᴇᴀᴄᴇ 𝐌ᴅ😇* 」\n│ 🧑‍💻 *ᴜsᴇʀ:* ${pushName} ${pushwish}\n│ 🌐 *ᴍᴏᴅᴇ:* ${mode}\n│ ⏰ *ᴛɪᴍᴇ:* ${realTime}\n│ 🚀 *ᴜᴘᴛɪᴍᴇ:* ${days}d ${hours}h ${minutes}m ${seconds}s\n╰───────────❍\n\n_Select a menu below:_, footer: "PEACE-MD Menu Powered by Peacemaker", buttons: [ { buttonId: prefix + "islamicmenu", buttonText: { displayText: "📿 Islamic" }, type: 1 }, { buttonId: prefix + "downloadmenu", buttonText: { displayText: "⬇️ Download" }, type: 1 }, { buttonId: prefix + "aimenu", buttonText: { displayText: "🤖 AI" }, type: 1 }, { buttonId: prefix + "searchmenu", buttonText: { displayText: "🔍 Search" }, type: 1 }, { buttonId: prefix + "toolsmenu", buttonText: { displayText: "⚙️ Tools" }, type: 1 }, { buttonId: prefix + "logomenu", buttonText: { displayText: "🎨 Logos" }, type: 1 }, { buttonId: prefix + "groupmenu", buttonText: { displayText: "👥 Group" }, type: 1 }, { buttonId: prefix + "ownermenu", buttonText: { displayText: "👑 Owner" }, type: 1 }, { buttonId: prefix + "othermenu", buttonText: { displayText: "📦 Other" }, type: 1 } ], headerType: 1, contextInfo: { isForwarded: true, forwardingScore: 999, forwardedNewsletterMessageInfo: { newsletterJid: '120363421564278292@newsletter', newsletterName: "PEACE-MD", serverMessageId: -1, }, externalAdReply: { title: "PEACE-MD", body: pushName, thumbnailUrl: 'https://files.catbox.moe/n0dgjr.jpg', sourceUrl: 'https://github.com/Peacemaker-cyber/PEACE-MD', mediaType: 1, renderLargerThumbnail: true, } } }, { quoted: m } ); return; }

// Button reply handling if (menuMap[text]) { m.body = prefix + menuMap[text]; m.body = m.body.toLowerCase(); return await allMenu(m, sock); }

// Continue with original command-based logic here (e.g., if m.body === .islamicmenu etc) };

export default allMenu;
