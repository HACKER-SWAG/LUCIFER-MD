import config from '../../config.cjs';

const deleteMessage = async (m, gss) => {
  try {
    const botNumber2 = await gss.decodeJid(gss.user.id);
    const isCreator = [botNumber2, config.OWNER_NUMBER + '@s.whatsapp.net'].includes(m.sender);
    const prefixMatch = m.body.match(/^[\\/!#.]/);
    const prefix = prefixMatch ? prefixMatch[0] : '/';
    const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';

    const validCommands = ['del', 'delete'];

    if (validCommands.includes(cmd)) {
      if (!isCreator) {
        return m.reply("*📛 𝐓ʜɪꜱ 𝐈ꜱ 𝐀ɴ 𝐎ᴡɴᴇʀ 𝐂ᴏᴍᴍᴀɴᴅ*");
      }
      if (validCommands.includes(cmd)) {
      if (!isGroup) {
        return m.reply("*📛 𝐓ʜɪꜱ 𝐈ꜱ 𝐀ɴ 𝐎ᴡɴᴇʀ 𝐂ᴏᴍᴍᴀɴᴅ*");
      }


      if (!m.quoted) {
        return m.reply('✳️ Reply to the message you want to delete');
      }

      const key = {
        remoteJid: m.from, 
        id: m.quoted.key.id,
        participant: m.quoted.key.participant || m.quoted.key.remoteJid
      };

      await gss.sendMessage(m.from, { delete: key });
    }
  } catch (error) {
    console.error('Error deleting message:', error);
    m.reply('An error occurred while trying to delete the message.');
  }
};

export default deleteMessage;
