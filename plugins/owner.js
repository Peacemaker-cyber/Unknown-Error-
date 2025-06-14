import config from '../config.cjs';

const ownerContact = async (m, gss) => {
  const ownerNumber = config.OWNER_NUMBER;
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const text = m.body.slice(prefix.length + cmd.length).trim();

  if (cmd === 'owner') {
    try {
      const fancyHeader = `╔═══════════════════════════╗\n║     👑  ᴘᴇᴀᴄᴇ ᴍᴅ ᴏᴡɴᴇʀ     ║\n╚═══════════════════════════╝`;
      const fancyFooter = `╔═══════════════════════════╗\n║ 🛡️  ᴄᴏɴᴛᴀᴄᴛ ꜱᴀꜣᴇʟʏ ᴡɪᴛʜ ᴏᴡɴᴇʀ  🛡️ ║\n╚═══════════════════════════╝`;

      const info = `
📛 *Name:* 𝙋𝙀𝘼𝘾𝙀𝙈𝘼𝙆𝙀𝙍💚
📡 *Bot Name:* 𝐏𝐄𝐀𝐂𝐄 𝐌𝐃
🌍 *Country:* Kenya 🇰🇪
💼 *Role:* Developer & Owner
📶 *Status:* Online ✅
📝 *Tap the button below to message the owner.*`;

      const fullText = `\`\`\`\n${fancyHeader}\n\`\`\`${info}\n\`\`\`${fancyFooter}\n\`\`\``;

      await gss.sendMessage(m.from, {
        text: fullText,
        footer: '🔰 𝐏𝐄𝐀𝐂𝐄 𝐌𝐃 𝐁𝐎𝐓 🔰',
        buttons: [
          {
            buttonId: `.menu`,
            buttonText: { displayText: '💬 Message Owner' },
            type: 1,
          }
        ],
        headerType: 1,
        contextInfo: {
          externalAdReply: {
            title: "Chat with Owner",
            body: "Tap to message the developer",
            mediaType: 1,
            thumbnailUrl: "https://telegra.ph/file/4592cbd7a6cb89dfcd9a3.jpg", // Optional image
            mediaUrl: `https://wa.me/${ownerNumber.replace(/[^0-9]/g, '')}`,
            sourceUrl: `https://wa.me/${ownerNumber.replace(/[^0-9]/g, '')}`
          },
          mentionedJid: [m.sender]
        }
      }, { quoted: m });

      await m.React("✅");
    } catch (error) {
      console.error('Error sending owner info:', error);
      await m.reply('❌ Error sending owner contact.');
      await m.React("❌");
    }
  }
};

export default ownerContact;
