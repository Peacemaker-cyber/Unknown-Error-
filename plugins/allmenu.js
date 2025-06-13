import moment from 'moment-timezone';
import pkg from '@whiskeysockets/baileys';
const { generateWAMessageFromContent, proto } = pkg;
import config from '../../config.cjs';

const allMenu = async (m, sock) => {
  const prefix = config.PREFIX;
  const mode = config.MODE;
  const pushName = m.pushName || 'User';

  const cmd = m.body.startsWith(prefix)
    ? m.body.slice(prefix.length).split(' ')[0].toLowerCase()
    : '';
    
        // Calculate uptime
    const uptimeSeconds = process.uptime();
    const days = Math.floor(uptimeSeconds / (24 * 3600));
    const hours = Math.floor((uptimeSeconds % (24 * 3600)) / 3600);
    const minutes = Math.floor((uptimeSeconds % 3600) / 60);
    const seconds = Math.floor(uptimeSeconds % 60);
    //realtime function
        const realTime = moment().tz("Africa/Nairobi").format("HH:mm:ss");
// pushwish function
    let pushwish = "";
    
        if (realTime < "05:00:00") {
  pushwish = `𝙶𝙾𝙾𝙳 𝙼𝙾𝚁𝙽𝙸𝙽𝙶 🌄`;
} else if (realTime < "11:00:00") {
  pushwish = `𝙶𝙾𝙾𝙳 𝙼𝙾𝚁𝙽𝙸𝙽𝙶 🌄`;
} else if (realTime < "15:00:00") {
  pushwish = `𝙶𝙾𝙾𝙳 𝙰𝙵𝚃𝙴𝚁𝙽𝙾𝙾𝙽 🌅`;
} else if (realTime < "18:00:00") {
  pushwish = `𝙶𝙾𝙾𝙳 𝙴𝚅𝙴𝙽𝙸𝙽𝙶 🌃`;
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
            newsletterJid: '120363421564278292@newsletter', // Preserved newsletter JID
            newsletterName: "PEACE-MD",
            serverMessageId: -1,
          },
          externalAdReply: {
            title: "PEACE-MD",
            body: pushName,
            thumbnailUrl: 'https://files.catbox.moe/n0dgjr.jpg', // Thumbnail URL
            sourceUrl: 'https://github.com/Peacemaker-cyber/PEACE-MD', // Source URL
            mediaType: 1,
            renderLargerThumbnail: true,
          },
        },
      },
      { quoted: m }
    );
  };

  // Command: allmenu
  if (cmd === "list") {
    await m.React('⏳'); // React with a loading icon
    const aliveMessage = `
╭───❍「 *😇𝐏ᴇᴀᴄᴇ 𝐌ᴅ😇* 」
│ 🧑‍💻 *ᴜsᴇʀ:* ${pushName} ${pushwish}
│ 🌐 *ᴍᴏᴅᴇ:* ${mode}
│ ⏰ *ᴛɪᴍᴇ:* ${realTime}
│ 🚀 *ᴜᴘᴛɪᴍᴇ:* ${days}d ${hours}h ${minutes}m ${seconds}s
╰───────────❍
╭───❍「 *👻𝐏ᴇᴀᴄᴇ 𝐌ᴅ 𝐌ᴇɴᴜ👻* 」
*│* 💙 *${prefix}𝐈𝐬𝐥𝐚𝐦𝐢𝐜𝐦𝐞𝐧𝐮*
*│* 📥 *${prefix}𝐃𝐨𝐰𝐧𝐥𝐨𝐚𝐝𝐦𝐞𝐧𝐮*
*│* 🤖 *${prefix}𝐀𝐢𝐦𝐞𝐧𝐮*
*│* 💭 *${prefix}𝐒𝐞𝐚𝐫𝐜𝐡𝐦𝐞𝐧𝐮*
*│* ⚙️ *${prefix}𝐓𝐨𝐨𝐥𝐬𝐦𝐞𝐧𝐮*
*│* ©️ *${prefix}𝐋𝐨𝐠𝐨𝐦𝐞𝐧𝐮*
*│* 🫂 *${prefix}𝐆𝐫𝐨𝐮𝐩𝐦𝐞𝐧𝐮*
╰───────────❍ 
╭───────────❍
│𝐏ᴏᴡᴇʀᴇᴅ 𝐁ʏ 𝐏ᴇᴀᴄᴇ 𝐌ᴅ
╰───────────❍
`;

    await m.React('✅'); // React with success icon
    await sendCommandMessage(aliveMessage);
  }
// islamic menu 
  if (cmd === "islamicmenu") {
    await m.React('⏳'); // React with a loading icon

    const islamicmenuMessage = `
╭───❍「 *😇𝐏ᴇᴀᴄᴇ 𝐌ᴅ-𝐈ꜱʟᴀᴍɪᴄ 𝐌ᴇɴᴜ😇* 」
│ 🧑‍💻 *ᴜsᴇʀ:* ${pushName} ${pushwish}
│ 🌐 *ᴍᴏᴅᴇ:* ${mode}
│ ⏰ *ᴛɪᴍᴇ:* ${realTime}
│ 🚀 *ᴜᴘᴛɪᴍᴇ:* ${days}d ${hours}h ${minutes}m ${seconds}s
╰───────────❍
╭───❍「 *👻ɪsʟᴀᴍɪᴄ ᴍᴇɴᴜ👻* 」
*│* 💙 *${prefix}𝚂𝚞𝚛𝚊𝚑𝚊𝚞𝚍𝚒𝚘* 
*│* 💙 *${prefix}𝚚𝚞𝚛𝚊𝚗𝚟𝚒𝚍
*│* 💙 *${prefix}𝚂𝚞𝚛𝚊𝚑𝚞𝚛𝚍𝚞*
*│* 💙 *${prefix}𝙰𝚜𝚖𝚊𝚞𝚕𝚑𝚞𝚜𝚗𝚊*
*│* 💙 *${prefix}𝙿𝚛𝚘𝚙𝚑𝚎𝚝𝚗𝚊𝚖𝚎*
╰───────────❍  
╭───────────❍
│𝐏ᴏᴡᴇʀᴇᴅ 𝐁ʏ 𝐏ᴇᴀᴄᴇ 𝐌ᴅ
╰───────────❍
`;
await m.React('✅'); // React with success icon
    await sendCommandMessage(islamicmenuMessage);
  }
  // Command: downloadmenu
  if (cmd === "downloadmenu") {
    await m.React('⏳'); // React with a loading icon

    const downloadmenuMessage = `
╭───❍「 *𝐏ᴇᴀᴄᴇ 𝐌ᴅ* 」
│ 🧑‍💻 *𝚄𝚜𝚎𝚛:* ${pushName} ${pushwish}
│ 🌐 *𝙼𝚘𝚍𝚎:* ${mode}
│ ⏰ *𝚃𝚒𝚖𝚎:* ${realTime}
│ 🚀 *𝚄𝚙𝚃𝚒𝚖𝚎:* ${days}d ${hours}h ${minutes}m ${seconds}s
╰───────────❍
╭───❍「 *👻ᴅᴏᴡɴʟᴏᴀᴅ ᴍᴇɴᴜ👻* 」
*┋*⏬️ *${prefix}𝙵𝚋*
*┋*⏬️ *${prefix}𝙸𝚗𝚜𝚝𝚊*
*┋*⏬️ *${prefix}𝙿𝚕𝚊𝚢*
*┋*⏬️ *${prefix}𝚂𝚘𝚗𝚐*   
*┋*⏬️ *${prefix}𝚅𝚒𝚍𝚎𝚘*
*┋*⏬️ *${prefix}𝚃𝚒𝚔𝚝𝚘𝚔*
*┋*⏬️ *${prefix}𝚈𝚝𝚖𝚙3*
*┋*⏬️ *${prefix}𝚈𝚝𝚖𝚙4*
*┋*⏬️ *${prefix}𝙼𝚎𝚍𝚒𝚊𝙵𝚒𝚛𝚎*
*┋*⏬️ *${prefix}𝙶𝚍𝚛𝚒𝚟𝚎*
*┋*⏬️ *${prefix}𝙰𝚙𝚔*
╰───────────❍   
╭───────────❍
│𝐏ᴏᴡᴇʀᴇᴅ 𝐁ʏ 𝐏ᴇᴀᴄᴇ 𝐌ᴅ
╰───────────❍
`;
await m.React('✅'); // React with success icon
    await sendCommandMessage(downloadmenuMessage);
  }
  // Command: aimenu
  if (cmd === "aimenu") {
    await m.React('⏳'); // React with a loading icon

    const aimenuMessage = `
╭───❍「 *𝐏ᴇᴀᴄᴇ 𝐌ᴅ* 」
│ 🧑‍💻 *ᴜsᴇʀ:* ${pushName} ${pushwish}
│ 🌐 *ᴍᴏᴅᴇ:* ${mode}
│ ⏰ *ᴛɪᴍᴇ:* ${realTime}
│ 🚀 *ᴜᴘᴛɪᴍᴇ:* ${days}d ${hours}h ${minutes}m ${seconds}s
╰───────────❍
╭───❍「 *👻ᴀɪ ᴍᴇɴᴜ👻* 」
*┋*🧠 *${prefix}𝙶𝚙𝚝*
*┋*🧠 *${prefix}𝚇𝚎𝚘𝚗*
*┋*🧠 *${prefix}𝙰𝚒*
╰───────────❍
╭───────────❍
│𝐏ᴏᴡᴇʀᴇᴅ 𝐁ʏ 𝐏ᴇᴀᴄᴇ 𝐌ᴅ
╰───────────❍
`;
await m.React('✅'); // React with success icon
    await sendCommandMessage(aimenuMessage);
  }
  // Command: groupmenu
  if (cmd === "logomenu") {
    await m.React('⏳'); // React with a loading icon

    const logomenuMessage = `
╭───❍「 *😇𝐏ᴇᴀᴄᴇ 𝐌ᴅ😇* 」
│ 🧑‍💻 *ᴜsᴇʀ:* ${pushName} ${pushwish}
│ 🌐 *ᴍᴏᴅᴇ:* ${mode}
│ ⏰ *ᴛɪᴍᴇ:* ${realTime}
│ 🚀 *ᴜᴘᴛɪᴍᴇ:* ${days}d ${hours}h ${minutes}m ${seconds}s
╰───────────❍
╭───❍「 *👻ʟᴏɢᴏ ᴍᴇɴᴜ👻* 
*┋* ©️ *${prefix}𝙻𝚘𝙶𝚘*
*┋* ©️ *${prefix}𝙻𝚘𝙶𝚘1*
*┋* ©️ *${prefix}𝙻𝚘𝙶𝚘2*
*┋* ©️ *${prefix}𝙻𝚘𝙶𝚘3*
*┋* ©️ *${prefix}𝙻𝚘𝙶𝚘4*
*┋* ©️ *${prefix}𝙻𝚘𝙶𝚘5*
*┋* ©️ *${prefix}𝙻𝚘𝙶𝚘6*
*┋* ©️ *${prefix}𝙻𝚘𝙶𝚘6*
*┋* ©️ *${prefix}𝙻𝚘𝙶𝚘7*
*┋* ©️ *${prefix}𝙻𝚘𝙶𝚘8*
*┋* ©️ *${prefix}𝙻𝚘𝙶𝚘9*
*┋* ©️ *${prefix}𝙻𝚘𝙶𝚘10*
*┋* ©️ *${prefix}𝙻𝚘𝙶𝚘11*
*┋* ©️ *${prefix}𝙻𝚘𝙶𝚘12*
*┋* ©️ *${prefix}𝙻𝚘𝙶𝚘13*
*┋* ©️ *${prefix}𝙻𝚘𝙶𝚘14*
*┋* ©️ *${prefix}𝙻𝚘𝙶𝚘15*
*┋* ©️ *${prefix}𝙻𝚘𝙶𝚘16*
*┋* ©️ *${prefix}𝙻𝚘𝙶𝚘17*
*┋* ©️ *${prefix}𝙻𝚘𝙶𝚘18*
*┋* ©️ *${prefix}𝙻𝚘𝙶𝚘19*
╭───────────❍
│𝐏ᴏᴡᴇʀᴇᴅ 𝐁ʏ 𝐏ᴇᴀᴄᴇ 𝐌ᴅ
╰───────────❍
`;

await m.React('✅'); // React with success icon
    await sendCommandMessage(logomenuMessage);
  }
  // Command: 𝚐𝚛𝚘𝚞𝚙
  if (cmd === "groupmenu") {
    await m.React('⏳'); // React with a loading icon

    const stalkerMessage = `
╭───❍「 *😇𝐏ᴇᴀᴄᴇ 𝐌ᴅ😇* 」
│ 🧑‍💻 *ᴜsᴇʀ:* ${pushName} ${pushwish}
│ 🌐 *ᴍᴏᴅᴇ:* ${mode}
│ ⏰ *ᴛɪᴍᴇ:* ${realTime}
│ 🚀 *ᴜᴘᴛɪᴍᴇ:* ${days}d ${hours}h ${minutes}m ${seconds}s
╰───────────❍
╭───❍「 *👻ɢʀᴏᴜᴘ ᴍᴇɴᴜ👻* 
*┋* 🫂 *${prefix}𝙾𝚙𝚎𝚗*
*┋* 🫂 *${prefix}𝙲𝚕𝚘𝚜𝚎*
*┋* 🫂 *${prefix}𝚃𝚊𝚐𝚊𝚕𝚕*
*┋* 🫂 *${prefix}𝙺𝚒𝚌𝚔*
*┋* 🫂 *${prefix}𝙰𝚍𝚍*
*┋* 🫂 *${prefix}𝙳𝚒𝚜 24𝚑*
*┋* 🫂 *${prefix}𝙸𝚗𝚟𝚒𝚝𝚎*
╭───────────❍
│𝐏ᴏᴡᴇʀᴇᴅ 𝐁ʏ 𝐏ᴇᴀᴄᴇ 𝐌ᴅ
╰───────────❍
`;
await m.React('✅'); // React with success icon
    await sendCommandMessage(stalkerMessage);
  }
 
  // Command: allmenu
  if (cmd === "searchmenu") {
    await m.React('⏳'); // React with a loading icon

    const stickerMessage = `
╭───❍「 *😇𝐏ᴇᴀᴄᴇ 𝐌ᴅ😇* 」
│ 🧑‍💻 *ᴜsᴇʀ:* ${pushName} ${pushwish}
│ 🌐 *ᴍᴏᴅᴇ:* ${mode}
│ ⏰ *ᴛɪᴍᴇ:* ${realTime}
│ 🚀 *ᴜᴘᴛɪᴍᴇ:* ${days}d ${hours}h ${minutes}m ${seconds}s
╰───────────❍
╭───❍「 *👻sᴇᴀʀᴄʜ ᴍᴇɴᴜ👻* 」
*┋*📡 *${prefix}𝚈𝚝𝚜*
*┋*📡 *${prefix}𝚆𝚊𝚕𝚕𝚙𝚊𝚙𝚎𝚛*
*┋*📡 *${prefix}𝚂𝚙𝚘𝚝𝚒𝚏𝚢*
╰───────────❍
╭───────────❍
│𝐏ᴏᴡᴇʀᴇᴅ 𝐁ʏ 𝐏ᴇᴀᴄᴇ 𝐌ᴅ
╰───────────❍
`;
await m.React('✅'); // React with success icon
    await sendCommandMessage(stickerMessage);
  }
  // Command: ownermenu
  if (cmd === "ownermenu") {
    await m.React('⏳'); // React with a loading icon

    const ownerMessage = `
╭───❍「 *😇𝐏ᴇᴀᴄᴇ 𝐌ᴅ😇* 」
│ 🧑‍💻 *ᴜsᴇʀ:* ${pushName} ${pushwish}
│ 🌐 *ᴍᴏᴅᴇ:* ${mode}
│ ⏰ *ᴛɪᴍᴇ:* ${realTime}
│ 🚀 *ᴜᴘᴛɪᴍᴇ:* ${days}d ${hours}h ${minutes}m ${seconds}s
╰───────────❍
 ╭───❍「 *😇ᴏᴡɴᴇʀ ᴍᴇɴᴜ😇* 」
*┋*💫 *${prefix}𝚁𝚎𝚜𝚝𝚊𝚛𝚝*
*┋*💫 *${prefix}𝚁𝚎𝚊𝚌𝚝*
*┋*💫 *${prefix}𝙹𝚘𝚒𝚗*
*┋*💫 *${prefix}𝙻𝚎𝚏𝚝*
*┋*💫 *${prefix}𝚅𝚟*
*┋*💫 *${prefix}𝚅𝚟2*
*┋*💫 *${prefix}𝙳𝚎𝚕𝚎𝚝𝚎*
*┋*💫 *${prefix}𝚂𝚊𝚟𝚎*
╰───────────❍
╭───────────❍
│😇𝐏ᴏᴡᴇʀᴇᴅ 𝐁ʏ 𝐏ᴇᴀᴄᴇ 𝐌ᴅ😇
╰───────────❍
`;

    await m.React('✅'); // React with success icon
    await sendCommandMessage(ownerMessage);
  }
  //Command: othermenu
  if (cmd === "othermenu") {
    await m.React('⏳'); // React with a loading icon

    const otherMessage = `
╭───❍「 *😇𝐏ᴇᴀᴄᴇ 𝐌ᴅ😇* 」
│ 🧑‍💻 *ᴜsᴇʀ:* ${pushName} ${pushwish}
│ 🌐 *ᴍᴏᴅᴇ:* ${mode}
│ ⏰ *ᴛɪᴍᴇ:* ${realTime}
│ 🚀 *ᴜᴘᴛɪᴍᴇ:* ${days}d ${hours}h ${minutes}m ${seconds}s
╰───────────❍
╭───❍「 *😇ᴏᴛʜᴇʀ ᴍᴇɴᴜ😇* 」
*│ *🗿 *${prefix}𝙿𝚒𝚗𝚐*
*│ *🗿 *${prefix}𝚛𝚎𝚙𝚘*
*│ *🗿 *${prefix}𝙰𝚕𝚒𝚟𝚎*
*│ *🗿 *${prefix}𝚄𝚛𝚕*
*│ *🗿 *${prefix}𝚂𝚎𝚗𝚍𝚖𝚎*
╰───────────❍   
╭───────────❍
│𝐏ᴏᴡᴇʀᴇᴅ 𝐁ʏ 𝐏ᴇᴀᴄᴇ 𝐌ᴅ
╰───────────❍
`;
await m.React('✅'); // React with success icon
    await sendCommandMessage(otherMessage);
  }
    if (cmd === "toolsmenu") {
    await m.React('⏳'); // React with a loading icon
    const toolsMessage = `
╭───❍「 *😇𝐏ᴇᴀᴄᴇ 𝐌ᴅ😇* 」
│ 🌐 *ᴍᴏᴅᴇ:* ${mode}
│ ⏰ *ᴛɪᴍᴇ:* ${realTime}
│ 🚀 *ᴜᴘᴛɪᴍᴇ:* ${days}d ${hours}h ${minutes}m ${seconds}s
╰───────────❍
╭───❍「 *😇ᴛᴏᴏʟs ᴍᴇɴᴜ😇* 」
*┋*🛡  *${prefix}𝚃𝚝𝚝s*
*┋*🛡  *${prefix}𝙵𝚎𝚝𝚌𝚑*
╰───────────❍  
╭───────────❍
│𝐏ᴏᴡᴇʀᴇᴅ 𝐁ʏ 𝐏ᴇᴀᴄᴇ 𝐌ᴅ
╰───────────❍
`;
await m.React('✅'); // React with success icon
    await sendCommandMessage(toolsMessage);
  }
};

export default allMenu;
