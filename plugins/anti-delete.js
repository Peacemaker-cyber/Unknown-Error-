// Peace-MD Enhanced AntiDelete System import fs from 'fs'; import config from '../../config.cjs'; import pkg from '@whiskeysockets/baileys'; const { proto, downloadContentFromMessage } = pkg;

const prefix = config.PREFIX; const demonContext = { forwardingScore: 999, isForwarded: true, forwardedNewsletterMessageInfo: { newsletterJid: '120363421564278292@newsletter', newsletterName: "ᴘᴇᴀᴄᴇ ᴍᴅ", serverMessageId: 143 } };

const statusPath = './demon_antidelete.json'; let statusData = fs.existsSync(statusPath) ? JSON.parse(fs.readFileSync(statusPath)) : { chats: {} };

class DemonAntiDelete { constructor() { this.messageCache = new Map(); this.cacheExpiry = 5 * 60 * 1000; setInterval(() => this.cleanExpiredMessages(), this.cacheExpiry); }

cleanExpiredMessages() { const now = Date.now(); for (const [key, msg] of this.messageCache.entries()) { if (now - msg.timestamp > this.cacheExpiry) this.messageCache.delete(key); } }

formatTime(timestamp) { return new Date(timestamp).toLocaleString('en-KE', { timeZone: 'Africa/Nairobi', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }); } }

const demonDelete = new DemonAntiDelete();

const AntiDelete = async (m, Matrix) => { const chatId = m.from; const chatStatus = statusData.chats[chatId] || { enabled: false, mode: 'global', activatedBy: null };

if (m.body.toLowerCase() === ${prefix}antidelete) { await Matrix.sendMessage(m.from, { text: `🛡️ Peace-MD Anti-Delete Control

Select a mode to activate:

1. 🌐 Chat → Recovered messages sent to group


2. 👤 Private → Messages sent only to you


3. 📩 DM → Messages sent to who deleted



Examples: .antidelete mode global .antidelete mode private .antidelete mode dm

Disable: .antidelete off

✨ Current Mode: ${chatStatus.mode} ✅ Status: ${chatStatus.enabled ? 'Enabled' : 'Disabled'}

━━━━━━━━━━━━━ ᵀᵄᴠᴼᴼᴾʏ ᴽᴿ ᴽᴿ ᴿᴿ`, contextInfo: demonContext }, { quoted: m }); return; }

if (/^.antidelete mode (global|private|dm)$/i.test(m.body)) { const selected = m.body.trim().split(' ')[2].toLowerCase(); statusData.chats[chatId] = { enabled: true, mode: selected, activatedBy: m.sender }; fs.writeFileSync(statusPath, JSON.stringify(statusData, null, 2)); await Matrix.sendMessage(m.from, { text: ✅ *Anti-Delete Mode Set To:* ${selected.toUpperCase()}, contextInfo: demonContext }, { quoted: m }); return; }

if (m.body.toLowerCase() === ${prefix}antidelete off) { statusData.chats[chatId] = { enabled: false, mode: 'global', activatedBy: null }; fs.writeFileSync(statusPath, JSON.stringify(statusData, null, 2)); await Matrix.sendMessage(m.from, { text: ❌ *Anti-Delete Disabled Successfully.*, contextInfo: demonContext }, { quoted: m }); return; }

Matrix.ev.on('messages.upsert', async ({ messages }) => { if (!messages?.length) return; for (const msg of messages) { if (msg.key.fromMe || !msg.message || msg.key.remoteJid === 'status@broadcast') continue;

try {
    const content = msg.message.conversation ||
      msg.message.extendedTextMessage?.text ||
      msg.message.imageMessage?.caption ||
      msg.message.videoMessage?.caption ||
      msg.message.documentMessage?.caption;

    let media, type, mimetype;
    const mediaTypes = ['image', 'video', 'audio', 'sticker', 'document'];

    for (const mediaType of mediaTypes) {
      if (msg.message[`${mediaType}Message`]) {
        const stream = await downloadContentFromMessage(msg.message[`${mediaType}Message`], mediaType);
        let buffer = Buffer.from([]);
        for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);
        media = buffer;
        type = mediaType;
        mimetype = msg.message[`${mediaType}Message`].mimetype;
        break;
      }
    }

    if (msg.message.audioMessage?.ptt) {
      const stream = await downloadContentFromMessage(msg.message.audioMessage, 'audio');
      let buffer = Buffer.from([]);
      for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);
      media = buffer;
      type = 'voice';
      mimetype = msg.message.audioMessage.mimetype;
    }

    if (content || media) {
      demonDelete.messageCache.set(msg.key.id, {
        content, media, type, mimetype,
        sender: msg.key.participant || msg.key.remoteJid,
        timestamp: Date.now(),
        chatJid: msg.key.remoteJid
      });
    }
  } catch {}
}

});

Matrix.ev.on('messages.update', async (updates) => { if (!updates?.length) return; for (const update of updates) { const { key, update: data } = update; const isDeleted = data?.messageStubType === proto.WebMessageInfo.StubType.REVOKE; const cached = demonDelete.messageCache.get(key.id); if (!isDeleted || !cached) continue;

demonDelete.messageCache.delete(key.id);
  const status = statusData.chats[cached.chatJid] || { enabled: false, mode: 'global' };
  if (!status.enabled) continue;

  const baseMsg = `🗡️ *Deleted Message Recovered*

👤 From: @${(cached.sender || '').split('@')[0]} ⏰ Sent: ${demonDelete.formatTime(cached.timestamp)} ⚠️ Deleted: ${demonDelete.formatTime(Date.now())}`;

const destination = status.mode === 'dm'
    ? key.participant || cached.sender
    : status.mode === 'private'
    ? status.activatedBy || key.participant
    : cached.chatJid;

  if (cached.media) {
    await Matrix.sendMessage(destination, {
      [cached.type]: cached.media,
      mimetype: cached.mimetype,
      caption: baseMsg,
      contextInfo: demonContext
    });
  } else if (cached.content) {
    await Matrix.sendMessage(destination, {
      text: `${baseMsg}

📝 Content: ${cached.content}`, contextInfo: demonContext }); } } }); };

export default AntiDelete;

