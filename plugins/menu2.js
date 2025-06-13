import config from '../../config.cjs';

const menu = async (m, sock) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const text = m.body.slice(prefix.length + cmd.length).trim();

  if (cmd === "menu2") {
    const start = new Date().getTime();
    await m.React('🔓');
    const end = new Date().getTime();
    const responseTime = (end - start) / 1000;

    // Always use the constant background image
    const profilePictureUrl = 'https://files.catbox.moe/n0dgjr.jpg';

    const menuText = `
╭───❍「 *😇𝐏ᴇᴀᴄᴇ 𝐌ᴅ😇* 」
│ *🏷️Version*: 7.1.0 |
│ *👑Developed By PEACE-MD*
│ *🎲Ultrasonic Power and Speed⚡
╰───────────❍
> Explore the Bot command 🪄 for ultimate magic ✨ 
╭─⊳⋅🤖 ꜱʏꜱᴛᴇᴍ ᴍᴇɴᴜ 🤖⋅⊲❍
⌬ ${prefix}menu
⌬ ${prefix}alive
⌬ ${prefix}owner
⌬ ${prefix}menu
╰─⊲⋅═════════⋅⊳─❍

╭─⊳⋅⛩️ ᴏᴡɴᴇʀ ᴍᴇɴᴜ ⛩️⋅⊲❍
⌬ ${prefix}join
⌬ ${prefix}leave
⌬ ${prefix}autobio
⌬ ${prefix}block
⌬ ${prefix}autolikestatus
⌬ ${prefix}unblock
⌬ ${prefix}antidelete on
⌬ ${prefix}anticall
⌬ ${prefix}settings
⌬ ${prefix}setname
╰─═══════════⋅⊳❍

╭─⊳⋅🔍 ɢᴘᴛ ᴍᴇɴᴜ 🔍⋅⊲❍
⌬ ${prefix}ai
⌬ ${prefix}bug
⌬ ${prefix}report
⌬ ${prefix}chatbot
⌬ ${prefix}gpt
⌬ ${prefix}popkid
╰─⊲⋅══════════⋅⊳❍

╭─⊳⋅📦 ᴄᴏɴᴠᴇʀᴛᴇʀ ᴍᴇɴᴜ 📦⋅⊲❍
⌬ ${prefix}attp
⌬ ${prefix}gimage
⌬ ${prefix}play
⌬ ${prefix}video
╰─⊲⋅════════════⋅⊳❍

╭─⊳⋅🪄 ꜱᴇᴀʀᴄʜ ᴍᴇɴᴜ 🪄⋅⊲❍
⌬ ${prefix}google
⌬ ${prefix}mediafire
⌬ ${prefix}facebook
⌬ ${prefix}instagram
⌬ ${prefix}tiktok
⌬ ${prefix}lyrics
⌬ ${prefix}imdb
╰─⊲⋅═══════⋅⊳❍

╭─⊳⋅😂 ꜰᴜɴ ᴍᴇɴᴜ 😂⋅⊲❍
⌬ ${prefix}getpp
⌬ ${prefix}url
⌬ ${prefix}roast
╰─⊲⋅══════════⋅⊳❍
📢 *Dᴇᴠ 𝐏ᴇᴀᴄᴇ 𝐌ᴅ*
`;

    await sock.sendMessage(m.from, {
      image: { url: profilePictureUrl },
      caption: menuText.trim(),
      contextInfo: {
        forwardingScore: 5,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterName: "𝐏ᴇᴀᴄᴇ 𝐌ᴅ",
          newsletterJid: "120363421564278292@newsletter",
        },
      }
    }, { quoted: m });
  }
};

export default menu;