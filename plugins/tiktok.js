/*

*_𝗥𝗔𝗡𝗗𝗢𝗠 𝗧𝗜𝗞𝗧𝗢𝗞 𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗 𝗡𝗨𝗠𝗕𝗘𝗥 𝗥𝗘𝗣𝗟𝗬 𝗣𝗟𝗨𝗚𝗜𝗡...👇❤_*

*𝚄𝚂𝙰𝙶𝙴 -: .𝚛𝚝𝚒𝚔 𝚜𝚛𝚒 𝚕𝚊𝚗𝚔𝚊*
*/
/*
Please Give Credit 🙂❤️
⚖️𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 - : ©𝐌𝐑 𝐌𝐀𝐍𝐔𝐋 𝐎𝐅𝐂 💚
*/
//=============================================
const { cmd, commands } = require('../command');
const { fetchJson } = require('../lib/functions');
const domain = `https://mr-manul-ofc-apis.vercel.app`;

//=============================================
cmd({
    pattern: "rtiktok",
    alias: ["randomtiktok","randomtik","tiktok2"],
    desc: 'Download tiktok random Video',
    use: '.rtik Title',
    react: "🎬",
    category: 'download',
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return reply('Please provide a title.');
        const response = await fetchJson(`${domain}/random-tiktok?apikey=Manul-Official-Key-3467&query=${q}`);
        const manul = response.data
        const title = manul.title
        const cover = manul.cover
        const no_watermark = manul.no_watermark
        const watermark = manul.watermark
        const music = manul.music
        let desc = `
*🎬 𝐓𝐈𝐊𝐓𝐎𝐊 𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃𝐄𝐑 🎬*

*𝗧𝗶𝘁𝗹𝗲 -:* _~${title}~_

*◄❪ Reply This Message With Nambars ❫►*

1. 𝗪𝗶𝘁𝗵 𝗪𝗮𝘁𝗲𝗿 𝗠𝗮𝗿𝗸 ✅
2. 𝗡𝗼 𝗪𝗮𝘁𝗲𝗿 𝗠𝗮𝗿𝗸 ❎
3. 𝗔𝗨𝗗𝗜𝗢 🎧

> *⚖️𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 - : ©𝐌𝐑 𝐃𝐈𝐍𝐄𝐒𝐇 𝐎𝐅𝐂 💚*
`;

        const vv = await conn.sendMessage(from, { image: { url: cover }, caption: desc }, { quoted: mek });

        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const selectedOption = msg.message.extendedTextMessage.text.trim();

            if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === vv.key.id) {
                switch (selectedOption) {
                    case '1':
                    await conn.sendMessage(from,{video:{url: watermark },mimetype:"video/mp4",caption :"> ⚖️𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 - : ©𝐌𝐑 𝐃𝐈𝐍𝐄𝐒𝐇 𝐎𝐅𝐂 💚"},{quoted:mek})
                        break;
                        
                    case '2':
                    await conn.sendMessage(from,{video:{url: no_watermark },mimetype:"video/mp4",caption :"> ⚖️𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 - : ©𝐌𝐑 𝐃𝐈𝐍𝐄𝐒𝐇 𝐎𝐅𝐂 💚"},{quoted:mek})
                        break;
       
                    case '3':               
//============Send Audio======================
await conn.sendMessage(from,{audio:{url: music },mimetype:"audio/mpeg",caption :"> *⚖️𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 - : ©𝐌𝐑 𝐃𝐈𝐍𝐄𝐒𝐇 𝐎𝐅𝐂 💚*"},{quoted:mek})
                        break;
 
                    default:
                        reply("Invalid option. Please select a valid option 💗");
                }

            }
        });

    } catch (e) {
        console.error(e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
        reply('An error occurred while processing your request.');
    }
});
//=============©𝐌𝐑 DINESH 𝐎𝐅𝐂 💚==========
