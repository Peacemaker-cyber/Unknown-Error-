import moment from 'moment-timezone'; import fs from 'fs'; import os from 'os'; import pkg from '@whiskeysockets/baileys'; const { generateWAMessageFromContent, proto } = pkg; import config from '../config.cjs'; import axios from 'axios';

const totalMemoryBytes = os.totalmem(); const freeMemoryBytes = os.freemem();

const byteToKB = 1 / 1024; const byteToMB = byteToKB / 1024; const byteToGB = byteToMB / 1024;

function formatBytes(bytes) { if (bytes >= Math.pow(1024, 3)) { return (bytes * byteToGB).toFixed(2) + ' GB'; } else if (bytes >= Math.pow(1024, 2)) { return (bytes * byteToMB).toFixed(2) + ' MB'; } else if (bytes >= 1024) { return (bytes * byteToKB).toFixed(2) + ' KB'; } else { return bytes.toFixed(2) + ' bytes'; } }

const uptime = process.uptime(); const day = Math.floor(uptime / (24 * 3600)); const hours = Math.floor((uptime % (24 * 3600)) / 3600); const minutes = Math.floor((uptime % 3600) / 60); const seconds = Math.floor(uptime % 60);

const uptimeMessage = *I am alive now since ${day}d ${hours}h ${minutes}m ${seconds}s*; const runMessage = *☀️ ${day} Day*\n*🕐 ${hours} Hour*\n*⏰ ${minutes} Minutes*\n*⏱️ ${seconds} Seconds*\n;

const xtime = moment.tz("Africa/Nairobi").format("HH:mm:ss"); const xdate = moment.tz("Africa/Nairobi").format("DD/MM/YYYY"); const time2 = moment().tz("Africa/Nairobi").format("HH:mm:ss"); let pushwish = "";

if (time2 < "05:00:00") { pushwish = Good Morning 🌄; } else if (time2 < "11:00:00") { pushwish = Good Morning 🌄; } else if (time2 < "15:00:00") { pushwish = Good Afternoon 🌅; } else if (time2 < "18:00:00") { pushwish = Good Evening 🌃; } else if (time2 < "19:00:00") { pushwish = Good Evening 🌃; } else { pushwish = Good Night 🌌; }

const menu = async (m, Matrix) => { const prefix = config.PREFIX; const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : ''; const mode = config.MODE === 'public' ? 'public' : 'private'; const pref = config.PREFIX;

const validCommands = ['fullmenu', 'menu', 'listcmd'];

if (validCommands.includes(cmd)) { const str = ` 💠 ${config.BOT_NAME} MENU 💠 👤 User: ${m.pushName} 🌐 Mode: ${mode} 🕓 Time: ${xtime} 📆 Date: ${xdate}

${pushwish}, ${m.pushName}!

Please select a category: `;

const buttons = [
  { buttonId: prefix + 'downloadmenu', buttonText: { displayText: '⬇️ Download' }, type: 1 },
  { buttonId: prefix + 'aimenu', buttonText: { displayText: '🤖 AI' }, type: 1 },
  { buttonId: prefix + 'toolsmenu', buttonText: { displayText: '⚙️ Tools' }, type: 1 },
  { buttonId: prefix + 'groupmenu', buttonText: { displayText: '👥 Group' }, type: 1 },
  { buttonId: prefix + 'searchmenu', buttonText: { displayText: '🔍 Search' }, type: 1 },
  { buttonId: prefix + 'ownermenu', buttonText: { displayText: '👑 Owner' }, type: 1 },
  { buttonId: prefix + 'convertermenu', buttonText: { displayText: '🔄 Converter' }, type: 1 },
  { buttonId: prefix + 'stalkmenu', buttonText: { displayText: '🕵️‍♂️ Stalk' }, type: 1 },
  { buttonId: prefix + 'mainmenu', buttonText: { displayText: '📦 Main' }, type: 1 }
];

let menuImage;
if (config.MENU_IMAGE && config.MENU_IMAGE.trim() !== '') {
  try {
    const response = await axios.get(config.MENU_IMAGE, { responseType: 'arraybuffer' });
    menuImage = Buffer.from(response.data, 'binary');
  } catch (error) {
    console.error('Error fetching menu image from URL, falling back to local image:', error);
    menuImage = fs.readFileSync('./media/peace.jpg');
  }
} else {
  menuImage = fs.readFileSync('./media/peace.jpg');
}

await Matrix.sendMessage(m.from, {
  image: menuImage,
  caption: str,
  buttons,
  footer: `© ${config.BOT_NAME}`,
  headerType: 4,
  contextInfo: {
    mentionedJid: [m.sender],
    forwardingScore: 999,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: '120363421564278292@newsletter',
      newsletterName: "𝐏ᴇᴀᴄᴇ 𝐌ᴅ",
      serverMessageId: 143
    }
  }
}, { quoted: m });

await Matrix.sendMessage(m.from, {
  audio: { url: 'https://files.catbox.moe/l9319m.mp3' },
  mimetype: 'audio/mp4',
  ptt: true
}, { quoted: m });

} };

export default menu;

