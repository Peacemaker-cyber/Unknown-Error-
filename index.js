//base by Black-Tappy
//Note🚨:Do not 🚫 modify the base
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
import fs from 'fs/promises'; // Using async fs for better performance
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

// Ensure session directory exists
fs.mkdir(sessionDir, { recursive: true }).catch(console.error);

async function updateDeploymentStats() {
    let stats = { total: 0, today_deploys: { date: "", count: 0 } };
    try {
        const data = await fs.readFile(statsFilePath, 'utf-8');
        stats = JSON.parse(data);
    } catch (error) {
        if (error.code !== 'ENOENT') console.error("Error reading deployment stats:", error);
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
        await fs.writeFile(statsFilePath, JSON.stringify(stats, null, 2));
    } catch (error) {
        console.error("Error writing deployment stats:", error);
    }

    return stats;
}


async function downloadSessionData() {
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
        const data = await file.downloadBuffer();
        await fs.writeFile(credsPath, data);
        console.log("🔒 Session Successfully Loaded !!");
        return true;
    } catch (error) {
        console.error('❌ Failed to download session data:', error);
        return false;
    }
}

// --- NEW: Auto Bio Feature ---
async function setAutoBio(Matrix) {
    if (config.AUTO_BIO !== 'true' || !config.BIO_TEXTS || config.BIO_TEXTS.length === 0) {
        return;
    }

    let bioIndex = 0;
    const updateBio = async () => {
        try {
            const bioText = config.BIO_TEXTS[bioIndex];
            await Matrix.updateProfileStatus(bioText);
            console.log(lime(`Bio updated to: "${bioText}"`));
            bioIndex = (bioIndex + 1) % config.BIO_TEXTS.length; // Cycle through bios
        } catch (error) {
            console.error(chalk.red('❌ Failed to update bio:'), error);
        }
    };
    
    // Set bio immediately on start and then every 15 minutes
    updateBio();
    setInterval(updateBio, 15 * 60 * 1000); // 15 minutes
}


async function start() {
    try {
        const { state, saveCreds } = await useMultiFileAuthState(sessionDir);
        const { version, isLatest } = await fetchLatestBaileysVersion();
        console.log(`🤖 PEACE MD using WA v${version.join('.')}, isLatest: ${isLatest}`);
        
        const Matrix = makeWASocket({
            version,
            logger: pino({ level: 'silent' }),
            printQRInTerminal: useQR,
            browser: ["PEACE-MD", "Safari", "3.3"],
            auth: state,
            getMessage: async (key) => ({ conversation: "peace md whatsapp user bot" })
        });

        Matrix.ev.on('connection.update', async (update) => {
            const { connection, lastDisconnect } = update;
            if (connection === 'close') {
                if (lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut) {
                    console.log(chalk.yellow("Connection closed. Reconnecting..."));
                    start();
                } else {
                    console.log(chalk.red("Connection logged out. Please re-authenticate."));
                    await fs.rm(sessionDir, { recursive: true, force: true });
                    process.exit(1);
                }
            } else if (connection === 'open') {
                if (initialConnection) {
                    console.log(chalk.green("Connected Successfully PEACE MD 🤍"));

                    const stats = await updateDeploymentStats();
                    const ownerJid = `${config.OWNER_NUMBER}@s.whatsapp.net`;
                    const deployMessage = `*🎉 PEACE-MD Deployment Successful! 🎉*\n\n*🤖 Bot Name:* ${config.BOT_NAME}\n*📱 Bot Number:* ${Matrix.user.id.split(':')[0]}\n\n*📊 Deployment Stats:*\n  - *Today:* ${stats.today_deploys.count}\n  - *Total:* ${stats.total}\n\n*📆 Date:* ${moment().tz(config.TIME_ZONE || "Africa/Nairobi").format('dddd, MMMM Do YYYY')}\n*⏳ Time:* ${moment().tz(config.TIME_ZONE || "Africa/Nairobi").format('h:mm:ss a')}\n\n*🟢 The bot is now online and fully operational 🟢.*`;
                    await Matrix.sendMessage(ownerJid, { text: deployMessage });

                    Matrix.sendMessage(Matrix.user.id, {
                        image: { url: "https://files.catbox.moe/s2xj7v.jpg" },
                        caption: `*Hello there User! 👋🏻* \n\n> Simple, Straightforward, But Loaded With Features 🎊. Meet PEACE-MD WhatsApp Bot.\n\n*Thanks for using PEACE-MD 🚩* \n\n> Join WhatsApp Channel: ⤵️  \nhttps://whatsapp.com/channel/0029VbA9YD323n3ko5xL7J1e\n\n- *YOUR PREFIX:* = ${prefix}\n\nDon't forget to give a star to the repo ⬇️  \nhttps://github.com/Peacemaker-cyber/PEACE-MD\n\n> © 𝐏ᴏᴡᴇʀᴇᴅ 𝐁ʏ 𝐏ᴇᴀᴄᴇᴍᴀᴋᴇ𝐑`
                    });
                    
                    // --- Start Auto Bio Feature ---
                    setAutoBio(Matrix);

                    initialConnection = false;
                } else {
                    console.log(chalk.blue("♻️ Connection reestablished after restart."));
                }
            }
        });
        
        Matrix.ev.on('creds.update', saveCreds);

        // --- CONSOLIDATED MESSAGE HANDLER ---
        Matrix.ev.on("messages.upsert", async (chatUpdate) => {
            try {
                const mek = chatUpdate.messages[0];
                if (!mek || !mek.message || mek.message?.protocolMessage || mek.message?.ephemeralMessage) return;

                // --- 1. Status Handling ---
                if (mek.key && mek.key.remoteJid === 'status@broadcast') {
                    if (config.AUTO_STATUS_SEEN === 'true') {
                        await Matrix.readMessages([mek.key]);
                        console.log(lime(`Viewed status from ${mek.pushName}`));
                    }
                    if (config.AUTO_STATUS_REACT === 'true') {
                        const statusReactEmojis = ['❤️', '😂', '👍', '🎉', '🔥', '🤔', '🙏', '💯', '😮', '😊', '😢', '🚀', '✨', '💀', '🤖', '✅', '😎', '🙌', '👀', '🤯'];
                        const randomEmoji = statusReactEmojis[Math.floor(Math.random() * statusReactEmojis.length)];
                        await doReact(randomEmoji, mek, Matrix);
                    }
                    if (config.AUTO_STATUS_REPLY) {
                        const customMessage = config.STATUS_READ_MSG || '✅ Auto Status Seen Bot By PEACE-MD';
                        await Matrix.sendMessage(mek.key.remoteJid, { text: customMessage }, { quoted: mek });
                    }
                    return; // Stop processing after handling status
                }

                // --- 2. Command Handling (Delegated to Handler) ---
                // This will be processed by your existing command handler logic
                await Handler(chatUpdate, Matrix, logger);

                // --- 3. General Auto-Reaction (if not a command and enabled) ---
                const messageText = mek.message.conversation || mek.message.extendedTextMessage?.text || '';
                if (!mek.key.fromMe && config.AUTO_REACT && !messageText.startsWith(prefix)) {
                    await doReact(emojis[Math.floor(Math.random() * emojis.length)], mek, Matrix);
                }

            } catch (err) {
                console.error('Error in consolidated messages.upsert handler:', err);
            }
        });

        // Other event listeners
        Matrix.ev.on("call", async (json) => await Callupdate(json, Matrix));
        Matrix.ev.on("group-participants.update", async (messag) => await GroupUpdate(Matrix, messag));

        if (config.MODE === "public") Matrix.public = true;
        else if (config.MODE === "private") Matrix.public = false;

    } catch (error) {
        console.error('Critical Error:', error);
        process.exit(1);
    }
}

async function init() {
    try {
        await fs.access(credsPath);
        console.log("🔒 Session file found, proceeding without QR code.");
        await start();
    } catch {
        const sessionDownloaded = await downloadSessionData();
        if (sessionDownloaded) {
            console.log("🔒 Session downloaded, starting bot.");
            await start();
        } else {
            console.log("No session found, QR code will be printed for authentication.");
            useQR = true;
            await start();
        }
    }
}

init();

app.get('/', (req, res) => res.send('Hello, PEACE-MD is running!'));
app.get('/ping', (req, res) => res.status(200).send({ status: 'ok', message: 'Bot is alive!' }));

app.listen(PORT, () => {
    console.log(lime(`Server is running on port ${PORT}`));
    console.log(orange(`To keep the bot alive, ping this URL: http://localhost:${PORT}/ping`));
});
