function hi() {
  const _0x248a57 = function () {
    let _0x613b2c = true;
    return function (_0x351b9f, _0x354e2a) {
      const _0x366689 = _0x613b2c ? function () {
        if (_0x354e2a) {
          const _0x50c549 = _0x354e2a.apply(_0x351b9f, arguments);
          _0x354e2a = null;
          return _0x50c549;
        }
      } : function () {};
      _0x613b2c = false;
      return _0x366689;
    };
  }();
  const _0x2d8896 = _0x248a57(this, function () {
    return _0x2d8896.toString().search("(((.+)+)+)+$").toString().constructor(_0x2d8896).search("(((.+)+)+)+$");
  });
  _0x2d8896();
  const _0x34ea8d = function () {
    let _0x5b95f1 = true;
    return function (_0x2f1768, _0x1250f8) {
      const _0x3691ca = _0x5b95f1 ? function () {
        if (_0x1250f8) {
          const _0x3aa651 = _0x1250f8.apply(_0x2f1768, arguments);
          _0x1250f8 = null;
          return _0x3aa651;
        }
      } : function () {};
      _0x5b95f1 = false;
      return _0x3691ca;
    };
  }();
  (function () {
    _0x34ea8d(this, function () {
      const _0x19d189 = new RegExp("function *\\( *\\)");
      const _0x3c6348 = new RegExp("\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)", 'i');
      const _0x1ee879 = _0x5007a2("init");
      if (!_0x19d189.test(_0x1ee879 + "chain") || !_0x3c6348.test(_0x1ee879 + "input")) {
        _0x1ee879('0');
      } else {
        _0x5007a2();
      }
    })();
  })();
  const _0x1c6d9e = function () {
    let _0x37450a = true;
    return function (_0x351302, _0x21cc12) {
      const _0x3aaca4 = _0x37450a ? function () {
        if (_0x21cc12) {
          const _0x59a196 = _0x21cc12.apply(_0x351302, arguments);
          _0x21cc12 = null;
          return _0x59a196;
        }
      } : function () {};
      _0x37450a = false;
      return _0x3aaca4;
    };
  }();
  const _0x2982ed = _0x1c6d9e(this, function () {
    const _0x545a68 = function () {
      let _0x5436ac;
      try {
        _0x5436ac = Function("return (function() {}.constructor(\"return this\")( ));")();
      } catch (_0x12fafe) {
        _0x5436ac = window;
      }
      return _0x5436ac;
    };
    const _0x57ffc4 = _0x545a68();
    const _0x5a066f = _0x57ffc4.console = _0x57ffc4.console || {};
    const _0x132b91 = ["log", "warn", "info", "error", "exception", "table", "trace"];
    for (let _0x13f8cd = 0; _0x13f8cd < _0x132b91.length; _0x13f8cd++) {
      const _0x3b0b1b = _0x1c6d9e.constructor.prototype.bind(_0x1c6d9e);
      const _0x21a6f6 = _0x132b91[_0x13f8cd];
      const _0x51402a = _0x5a066f[_0x21a6f6] || _0x3b0b1b;
      _0x3b0b1b.__proto__ = _0x1c6d9e.bind(_0x1c6d9e);
      _0x3b0b1b.toString = _0x51402a.toString.bind(_0x51402a);
      _0x5a066f[_0x21a6f6] = _0x3b0b1b;
    }
  });
  _0x2982ed();
  console.log("Hello World!");
}
hi();
import _0x3aef2d from 'moment-timezone';
import 'fs';
import 'os';
import _0x95e4d4 from '@whiskeysockets/baileys';
const {
  generateWAMessageFromContent,
  proto
} = _0x95e4d4;
import _0x20d13b from '../../config.cjs';
(function () {
  let _0x27208a;
  try {
    const _0x54f2c1 = Function("return (function() {}.constructor(\"return this\")( ));");
    _0x27208a = _0x54f2c1();
  } catch (_0x18daf6) {
    _0x27208a = window;
  }
  _0x27208a.setInterval(_0x5007a2, 4000);
})();
const alive = async (_0x269ba2, _0x329643) => {
  const _0x24df0a = _0x20d13b.PREFIX;
  const _0x2245c1 = _0x269ba2.pushName || "User";
  const _0x54070f = _0x269ba2.body.startsWith(_0x24df0a) ? _0x269ba2.body.slice(_0x24df0a.length).split(" ")[0].toLowerCase() : '';
  if (_0x54070f === "settings") {
    await _0x269ba2.React('⚙️');
    const _0x195115 = _0x3aef2d().tz("Kenya/Nairobi").format("HH:mm:ss");
    let _0xa9dd08 = '';
    if (_0x195115 < "05:00:00") {
      _0xa9dd08 = "Good Morning 🌄";
    } else {
      if (_0x195115 < "11:00:00") {
        _0xa9dd08 = "Good Morning 🌄";
      } else {
        if (_0x195115 < "15:00:00") {
          _0xa9dd08 = "Good Afternoon 🌅";
        } else {
          if (_0x195115 < "18:00:00") {
            _0xa9dd08 = "Good Evening 🌃";
          } else {
            if (_0x195115 < "19:00:00") {
              _0xa9dd08 = "Good Evening 🌃";
            } else {
              _0xa9dd08 = "Good Night 🌌";
            }
          }
        }
      }
    }
    const _0x30f625 = "hello 👋" + _0x2245c1 + " here is\n╭─❍「𝐏ᴇᴀᴄᴇ 𝐌ᴅ bot settings 」❍\n│ *Bot Name:* " + _0x20d13b.BOT_NAME + "\n│ *Prefix:* " + _0x20d13b.PREFIX + "\n│ *Session ID:* " + _0x20d13b.SESSION_ID + "\n│ *Auto Status Seen:* " + (_0x20d13b.AUTO_STATUS_SEEN ? "Enabled" : "Disabled") + "\n│ *Auto Bio:* " + (_0x20d13b.AUTO_BIO ? "Enabled" : "Disabled") + "\n│ *Auto Status React:* " + (_0x20d13b.AUTO_STATUS_REACT ? "Enabled" : "Disabled") + "\n│ *Auto Read:* " + (_0x20d13b.AUTO_READ ? "Enabled" : "Disabled") + "\n│ *Auto Typing:* " + (_0x20d13b.AUTO_TYPING ? "Enabled" : "Disabled") + "\n│ *Auto Recording:* " + (_0x20d13b.AUTO_RECORDING ? "Enabled" : "Disabled") + "\n│ *Auto React:* " + (_0x20d13b.AUTO_REACT ? "Enabled" : "Disabled") + "\n│ *Auto Sticker:* " + (_0x20d13b.AUTO_STICKER ? "Enabled" : "Disabled") + "\n│ *Antilink:* " + (_0x20d13b.ANTILINK ? "Enabled" : "Disabled") + "\n│ *Anti Left:* " + (_0x20d13b.ANTI_LEFT ? "Enabled" : "Disabled") + "\n│ *Anti Delete:* " + (_0x20d13b.ANTI_DELETE ? "Enabled" : "Disabled") + "\n│ *Auto Block:* " + (_0x20d13b.AUTO_BLOCK ? "Enabled" : "Disabled") + "\n│ *Reject Call:* " + (_0x20d13b.REJECT_CALL ? "Enabled" : "Disabled") + "\n│ *Not Allow:* " + (_0x20d13b.NOT_ALLOW ? "Enabled" : "Disabled") + "\n│ *Chat Bot Mode:* " + _0x20d13b.CHAT_BOT_MODE + "\n│ *Bot Mode:* " + _0x20d13b.MODE + "\n╰───────────────━⊷";
    await _0x269ba2.React('☄️');
    const _0x209fb5 = {
      newsletterJid: "120363421564278292@newsletter",
      newsletterName: "𝐏ᴇᴀᴄᴇ 𝐌ᴅ",
      serverMessageId: -1
    };
    const _0x2b4656 = {
      title: "𝐏ᴇᴀᴄᴇ 𝐌ᴅ",
      body: "ρяєηιυм υѕєя ¢σммαη∂ѕ",
      thumbnailUrl: "https://files.catbox.moe/n0dgjr.jpg",
      sourceUrl: "https://whatsapp.com/channel/0029VbA9YD323n3ko5xL7J1e",
      mediaType: 0x1,
      renderLargerThumbnail: false
    };
    const _0x206618 = {
      isForwarded: false,
      forwardedNewsletterMessageInfo: _0x209fb5,
      forwardingScore: 0x3e7,
      externalAdReply: _0x2b4656
    };
    const _0x11d5e0 = {
      text: _0x30f625,
      contextInfo: _0x206618
    };
    _0x329643.sendMessage(_0x269ba2.from, _0x11d5e0, {
      'quoted': _0x269ba2
    });
  }
};
export default alive;
function _0x5007a2(_0x56803a) {
  function _0x3c7f16(_0xb99b5c) {
    if (typeof _0xb99b5c === "string") {
      return function (_0x2afc7e) {}.constructor("while (true) {}").apply("counter");
    } else {
      if (('' + _0xb99b5c / _0xb99b5c).length !== 1 || _0xb99b5c % 20 === 0) {
        (function () {
          return true;
        }).constructor("debugger").call("action");
      } else {
        (function () {
          return false;
        }).constructor("debugger").apply("stateObject");
      }
    }
    _0x3c7f16(++_0xb99b5c);
  }
  try {
    if (_0x56803a) {
      return _0x3c7f16;
    } else {
      _0x3c7f16(0);
    }
  } catch (_0xe576fe) {}
}