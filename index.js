import dotenv from 'dotenv';
dotenv.config();

import {
    makeWASocket,
    Browsers,
    fetchLatestBaileysVersion,
    DisconnectReason,
    useMultiFileAuthState,
} from '@whiskeysockets/baileys';
import { Handler, Callupdate, GroupUpdate } from './data/index.js';
import express from 'express';
import pino from 'pino';
import fs from 'fs';
import { File } from 'megajs';
import NodeCache from 'node-cache';
import path from 'path';
import chalk from 'chalk';
import moment from 'moment-timezone';
import axios from 'axios';
import config from './config.cjs';
import pkg from './lib/autoreact.cjs';
const { emojis, doReact } = pkg;
const prefix = process.env.PREFIX || config.PREFIX;
const sessionName = "session";
const app = express();
const orange = chalk.bold.hex("#FFA500");
const lime = chalk.bold.hex("#32CD32");
let useQR = false;
let initialConnection = true;
const PORT = process.env.PORT || 3000;

const MAIN_LOGGER = pino({
    timestamp: () => `,"time":"${new Date().toJSON()}"`
});
const logger = MAIN_LOGGER.child({});
logger.level = "trace";

const msgRetryCounterCache = new NodeCache();

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

const sessionDir = path.join(__dirname, 'session');
const credsPath = path.join(sessionDir, 'creds.json');
const statsFilePath = path.join(__dirname, 'deployment_stats.json');

if (!fs.existsSync(sessionDir)) {
    fs.mkdirSync(sessionDir, { recursive: true });
}

async function updateDeploymentStats() {
    let stats = { total: 0, today_deploys: { date: "", count: 0 } };
    try {
        if (fs.existsSync(statsFilePath)) {
            stats = JSON.parse(fs.readFileSync(statsFilePath));
        }
    } catch (error) {
        console.error("Error reading deployment stats:", error);
    }

    const today = moment().tz(config.TIME_ZONE || "Africa/Nairobi").format("YYYY-MM-DD");

    if (stats.today_deploys.date === today) {
        stats.today_deploys.count += 1;
    } else {
        stats.today_deploys.date = today;
        stats.today_deploys.count = 1;
    }
    stats.total += 1;

    try {
        fs.writeFileSync(statsFilePath, JSON.stringify(stats, null, 2));
    } catch (error) {
        console.error("Error writing deployment stats:", error);
    }

    return stats;
}


async function downloadSessionData() {
    console.log("Debugging SESSION_ID:", config.SESSION_ID);

    if (!config.SESSION_ID) {
        console.error('❌ Please add your session to SESSION_ID env !!');
        return false;
    }

    const sessdata = config.SESSION_ID.split("PEACE~")[1];

    if (!sessdata || !sessdata.includes("#")) {
        console.error('❌ Invalid SESSION_ID format! It must contain both file ID and decryption key.');
        return false;
    }

    const [fileID, decryptKey] = sessdata.split("#");

    try {
        console.log("🔄 Downloading Session...");
        const file = File.fromURL(`https://mega.nz/file/${fileID}#${decryptKey}`);

        const data = await new Promise((resolve, reject) => {
            file.download((err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });

        await fs.promises.writeFile(credsPath, data);
        console.log("🔒 Session Successfully Loaded !!");
        return true;
    } catch (error) {
        console.error('❌ Failed to download session data:', error);
        return false;
    }
}

// --- NEW: Function to automatically follow a channel ---
async function autoFollowChannel(Matrix) {
    const targetChannelJid = '120363421564278292@newsletter';
    try {
        await Matrix.query({
            tag: 'iq',
            attrs: {
                to: targetChannelJid,
                type: 'set',
                xmlns: 'newsletter',
            },
            content: [{
                tag: 'follow',
                attrs: {}
            }]
        });
        console.log(lime(`Successfully sent request to follow channel: ${targetChannelJid}`));
    } catch (error) {
        console.error(chalk.red(`❌ Failed to follow channel ${targetChannelJid}:`), error);
    }
}


async function start() {
    try {
        const { state, saveCreds } = await useMultiFileAuthState(sessionDir);
        const { version, isLatest } = await fetchLatestBaileysVersion();
        console.log(`🤖 PEACE-MD using WA v${version.join('.')}, isLatest: ${isLatest}`);
        
        const Matrix = makeWASocket({
            version,
            logger: pino({ level: 'silent' }),
            printQRInTerminal: useQR,
            browser: ["PEACE-MD", "safari", "3.3"],
            auth: state,
            getMessage: async (key) => {
                // This part can be simplified if you don't use a message store
                return { conversation: "peace md whatsapp user bot" };
            }
        });

        Matrix.ev.on('connection.update', async (update) => {
            const { connection, lastDisconnect } = update;
            if (connection === 'close') {
                if (lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut) {
                    console.log(chalk.yellow("Connection closed. Reconnecting..."));
                    start();
                } else {
                    console.log(chalk.red("Connection logged out. Please re-authenticate."));
                    fs.rmSync(sessionDir, { recursive: true, force: true });
                    process.exit(1);
                }
            } else if (connection === 'open') {
                if (initialConnection) {
                    console.log(chalk.green("Connected Successfully PEACE-MD 🤍"));

                    const stats = await updateDeploymentStats();
                    const ownerJid = `${config.OWNER_NUMBER}@s.whatsapp.net`;
                    const deployMessage = `
*🎉 PEACE-MD Deployment Successful! 🎉*

*🤖 Bot Name:* ${config.BOT_NAME}
*📱 Bot Number:* ${Matrix.user.id.split(':')[0]}

*📊 Deployment Stats:*
  - *Today:* ${stats.today_deploys.count}
  - *Total:* ${stats.total}

*📆 Date:* ${moment().tz(config.TIME_ZONE || "Africa/Nairobi").format('dddd, MMMM Do YYYY')}
*⏳ Time:* ${moment().tz(config.TIME_ZONE || "Africa/Nairobi").format('h:mm:ss a')}

*🟢 The bot is now online and fully operational. 🟢*
`;
                    await Matrix.sendMessage(ownerJid, { text: deployMessage });

                    Matrix.sendMessage(Matrix.user.id, {
                        image: { url: "https://files.catbox.moe/s2xj7v.jpg" },
                        caption: `*Hello there User! 👋🏻* 

> Simple, Straightforward, But Loaded With Features 🎊. Meet PEACE MD WhatsApp Bot.

*Thanks for using PEACE MD 🚩* 

> Join WhatsApp Channel: ⤵️  
https://whatsapp.com/channel/0029VbA9YD323n3ko5xL7J1e

- *YOUR PREFIX:* = ${prefix}

Don't forget to give a star to the repo ⬇️  
https://github.com/Peacemaker-cyber/PEACE-MD

> © 𝐏ᴏᴡᴇʀᴇᴅ 𝐁ʏ 𝐏ᴇᴀᴄᴇᴍᴀᴋᴇ𝐑`
                    });
                    
                    // --- MODIFIED: Automatically follow the channel on startup ---
                    await autoFollowChannel(Matrix);
                    
                    initialConnection = false;
                } else {
                    console.log(chalk.blue("♻️ Connection reestablished after restart."));
                }
            }
        });
        
        Matrix.ev.on('creds.update', saveCreds);

        // Consolidated message handler
        Matrix.ev.on("messages.upsert", async (chatUpdate) => {
            // --- Main command handler ---
            await Handler(chatUpdate, Matrix, logger);

            // --- Other message-related logic ---
            try {
                const mek = chatUpdate.messages[0];
                if (!mek || !mek.message || mek.key.fromMe) return;

                // Auto-reaction logic
                if (config.AUTO_REACT && !mek.key.remoteJid.endsWith('@g.us')) { // Example: react only in private chats
                    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
                    await doReact(randomEmoji, mek, Matrix);
                }

                // Status handling logic
                if (mek.key && mek.key.remoteJid === 'status@broadcast' && config.AUTO_STATUS_SEEN) {
                    await Matrix.readMessages([mek.key]);
                    
                    if (config.AUTO_STATUS_REACT === 'true') {
                        const statusReactEmojis = ['❤️', '😂', '👍', '🎉', '🔥', '🤔', '🙏', '💯', '😮', '😊', '😢', '🚀', '✨', '💀', '🤖', '✅', '😎', '🙌', '👀', '🤯'];
                        const randomEmoji = statusReactEmojis[Math.floor(Math.random() * statusReactEmojis.length)];
                        await doReact(randomEmoji, mek, Matrix);
                    }
                    
                    if (config.AUTO_STATUS_REPLY) {
                        const customMessage = config.STATUS_READ_MSG || '✅ Auto Status Seen Bot By PEACE-MD';
                        await Matrix.sendMessage(mek.key.remoteJid, { text: customMessage }, { quoted: mek });
                    }
                }
            } catch (err) {
                // Avoid crashing on minor errors like auto-reactions
                console.error('Error in secondary message handler (react/status):', err);
            }
        });

        Matrix.ev.on("call", async (json) => await Callupdate(json, Matrix));
        Matrix.ev.on("group-participants.update", async (messag) => await GroupUpdate(Matrix, messag));

        if (config.MODE === "public") {
            Matrix.public = true;
        } else if (config.MODE === "private") {
            Matrix.public = false;
        }

    } catch (error) {
        console.error('Critical Error:', error);
        process.exit(1);
    }
}

async function init() {
    if (fs.existsSync(credsPath)) {
        console.log("🔒 Session file found, proceeding without QR code.");
        await start();
    } else {
        const sessionDownloaded = await downloadSessionData();
        if (sessionDownloaded) {
            console.log("🔒 Session downloaded, starting bot.");
            await start();
        } else {
            console.log("No session found or downloaded, QR code will be printed for authentication.");
            useQR = true;
            await start();
        }
    }
}

init();

app.get('/', (req, res) => {
    res.send('Hello, PEACE-MD is running!');
});

app.get('/ping', (req, res) => {
    res.status(200).send({ status: 'ok', message: 'Bot is alive!' });
});

app.listen(PORT, () => {
    console.log(lime(`Server is running on port ${PORT}`));
    console.log(orange(`To keep the bot alive, ping this URL: http://localhost:${PORT}/ping`));
});
