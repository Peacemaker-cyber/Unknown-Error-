import config from '../config.cjs';

const ping = async (m, Matrix) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';

  if (cmd === "ping") {
    const reactionEmojis = ['🔥', '⚡', '🚀', '👻', '🎲', '🔗', '🌟', '💥', '🕐', '🔹'];
    const textEmojis = ['💎', '🏆', '⚡️', '🚀', '🎶', '🌠', '⭐', '🔱', '🛡️', '✨'];

    const reactionEmoji = reactionEmojis[Math.floor(Math.random() * reactionEmojis.length)];
    let textEmoji = textEmojis[Math.floor(Math.random() * textEmojis.length)];

    while (textEmoji === reactionEmoji) {
      textEmoji = textEmojis[Math.floor(Math.random() * textEmojis.length)];
    }

    await m.React(textEmoji);

    // Simulated response time between 800ms – 1800ms
    const responseTime = Math.floor(Math.random() * (1800 - 800 + 1)) + 800;

    // Determine speed badge
    let speedStatus = '🟢 FAST';
    if (responseTime >= 1500) speedStatus = '🔴 SLOW';
    else if (responseTime >= 1000) speedStatus = '🟡 AVERAGE';

    // Get current date and time in local format
    const now = new Date();
    const time = now.toLocaleTimeString('en-KE', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const date = now.toLocaleDateString('en-KE', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' });

    // Styled text layout
    const fancyHeader = `╔════════════════════╗\n║  🔰  𝐏𝐄𝐀𝐂𝐄 𝐌𝐃 𝐁𝐎𝐓  🔰  ║\n╚════════════════════╝`;
    const fancyFooter = `╔════════════════════╗\n║  ⚙️  𝐒𝐲𝐬𝐭𝐞𝐦 𝐎𝐧𝐥𝐢𝐧𝐞 ⚙️  ║\n╚════════════════════╝`;

    const stylishText = `\n\n${textEmoji} *Ping Response:* _${responseTime} ms_ ${reactionEmoji}\n📊 *Status:* ${speedStatus}\n📡 *Bot:* Online & Responsive\n📅 *Date:* ${date}\n🕒 *Time:* ${time}\n\n👤 @${m.sender.split('@')[0]}`;

    const finalMessage = `\`\`\`\n${fancyHeader}\n\`\`\`${stylishText}\n\`\`\`${fancyFooter}\n\`\`\``;

    await Matrix.sendMessage(m.from, {
      text: finalMessage,
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
  }
};

export default ping;
