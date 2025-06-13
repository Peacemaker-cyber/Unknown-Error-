import config from '../../config.cjs';

const menu = async (m, sock) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const text = m.body.slice(prefix.length + cmd.length).trim();

  if (cmd === "menu") {
    const start = new Date().getTime();
    await m.React('🔓');
    const end = new Date().getTime();
    const responseTime = (end - start) / 1000;

    // Always use the constant background image
    const profilePictureUrl = 'https://files.catbox.moe/n0dgjr.jpg';

    const menuText = `
🌀━━━━━━━━━━━━━━━━━━━━━━━━━━━━━🌀
     😇 𝙋𝙀𝘼𝘾𝙀 𝙈𝘿 — 𝙑𝙀𝙍𝙎𝙄𝙊𝙉 7.1.0 😇
🌀━━━━━━━━━━━━━━━━━━━━━━━━━━━━━🌀
👑 *CREATED BY:* 𝙋𝙀𝘼𝘾𝙀-𝙈𝘿  
⚡ *ULTRASONIC SPEED + POWER*
💎 *Built for Smart & Fast Execution*

✨ _“Unleash the magic with every command.”_ ✨
🔮━━━━━━━━━━━━━━━━━━━━━🔮

📂 SYSTEM PANEL
   ━━━━━━━━━━━━━━━━━━━
   🔹 .menu
   🔹 .alive
   🔹 .owner
   🔹 .menu

👑 OWNER PANEL
   ━━━━━━━━━━━━━━━━━━━
   ⚔️ .join / .leave
   ⚔️ .block / .unblock
   ⚔️ .autobio / .autolikestatus
   ⚔️ .anticall / .antidelete on
   ⚔️ .settings / .setname

🧠 GPT / AI PANEL
   ━━━━━━━━━━━━━━━━━━━
   🧬 .ai
   🧬 .bug
   🧬 .report
   🧬 .chatbot
   🧬 .gpt
   🧬 .peacemaker 

🔄 CONVERTER PANEL
   ━━━━━━━━━━━━━━━━━━━
   🎞️ .attp
   🎞️ .gimage
   🎞️ .play
   🎞️ .video

🔍 SEARCH PANEL
   ━━━━━━━━━━━━━━━━━━━
   🌐 .google
   🌐 .mediafire
   🌐 .facebook
   🌐 .instagram
   🌐 .tiktok
   🌐 .lyrics
   🌐 .imdb

🎉 FUN PANEL
   ━━━━━━━━━━━━━━━━━━━
   😂 .getpp
   😂 .url
   😂 .roast

🧾━━━━━━━━━━━━━━━━━━━━━━━━━🧾
💥 *POWERED BY:* 𝘿𝙚𝙫 𝙋𝙚𝙖𝙘𝙚 𝙈𝘿 💥
🧾━━━━━━━━━━━━━━━━━━━━━━━━━🧾
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
