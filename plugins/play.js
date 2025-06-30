import ytdl from 'ytdl-core';
import yts from 'yt-search';
import ffmpeg from 'fluent-ffmpeg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import config from '../config.cjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const prefix = config.PREFIX || '.';
const watermark = '🎧 Powered by PEACE MD';

// Funny messages to rotate after command
const funnyLines = [
  "💃 Summoning DJs from the cloud... hold tight!",
  "🎧 This bot’s got better taste than your ex 😎",
  "🕺 Hold up... I’m tuning my invisible guitar 🎸",
  "📦 Packaging your audio with extra bass...",
  "🎤 Don’t sing too loud, your cat is judging 🐱",
  "⚡ Getting your song before your vibe fades 🔥",
  "🍿 Grab popcorn while I cook your beat 🎶",
  "🎛️ Mixing this track like a pro DJ… almost!",
];

export default {
  name: 'play',
  alias: ['ytplay', 'ytmp3'],
  category: 'music',
  desc: 'Play any song from YouTube in mp3 format.',
  usage: `${prefix}play <song name>`,

  async exec(m, sock, args) {
    try {
      if (!args || args.length === 0) {
        return m.reply(`🔎 *Usage:* ${prefix}play <song name>`);
      }

      const query = args.join(' ');
      const searchResult = await yts(query);

      if (!searchResult.videos.length) {
        return m.reply('❌ No results found for your query.');
      }

      const video = searchResult.videos[0];
      const url = video.url;
      const title = video.title;
      const author = video.author.name;
      const duration = video.timestamp;

      const fileId = `${Date.now()}_${Math.floor(Math.random() * 1000)}`;
      const outputPath = path.join(__dirname, `${fileId}.mp3`);
      const stream = ytdl(url, { filter: 'audioonly' });

      const randomFunny = funnyLines[Math.floor(Math.random() * funnyLines.length)];

      m.reply(
        `🎵 *Title:* ${title}\n` +
        `📺 *Channel:* ${author}\n` +
        `⏱️ *Duration:* ${duration}\n\n` +
        `${randomFunny}\n${watermark}`
      );

      ffmpeg(stream)
        .audioBitrate(128)
        .format('mp3')
        .on('error', (err) => {
          console.error(err);
          m.reply('⚠️ Error while converting audio.');
        })
        .on('end', async () => {
          const buffer = fs.readFileSync(outputPath);
          await sock.sendMessage(m.chat, {
            audio: buffer,
            mimetype: 'audio/mpeg',
            ptt: false,
            caption: `🎵 *${title}*\n📺 *${author}*\n⏱️ *${duration}*\n\n${watermark}`,
          }, { quoted: m });

          fs.unlinkSync(outputPath);
        })
        .save(outputPath);

    } catch (err) {
      console.error(err);
      m.reply('❌ Something went wrong. Please try again later.');
    }
  }
};
