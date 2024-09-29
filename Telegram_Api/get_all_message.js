const { Api } = require('telegram/tl');

async function getAllMessages(client, channelName, limit = 100, offsetId = 0) {
    let allMessages = [];
    const channel = await client.getEntity(channelName); 
    while (true) {
        const history = await client.invoke(
            new Api.messages.GetHistory({
                peer: new Api.InputPeerChannel({
                    channelId: channel.id,
                    accessHash: channel.accessHash,
                }),
                offsetId: offsetId,
                limit: limit,
            })
        );

        if (history.messages.length === 0) {
            break; 
        }

        allMessages = allMessages.concat(history.messages);
        offsetId = history.messages[history.messages.length - 1].id;
        console.log(`Fetched ${history.messages.length} messages, total: ${allMessages.length}`);
    }

    return allMessages;
}


async function getMessages(client, channelName, limit = 100, offsetId = 0) {
    let allMessages = [];
    const channel = await client.getEntity(channelName); 
        const history = await client.invoke(
            new Api.messages.GetHistory({
                peer: new Api.InputPeerChannel({
                    channelId: channel.id,
                    accessHash: channel.accessHash,
                }),
                offsetId: offsetId,
                limit: limit,
            })
        );
        if (history.messages.length === 0) {
            return allMessages; 
        }
        allMessages = allMessages.concat(history.messages);
        offsetId = history.messages[history.messages.length - 1].id;

        console.log(`Fetched ${history.messages.length} messages, total: ${allMessages.length}, last offset: ${offsetId}`);
    

    return allMessages;
}

module.exports = {getAllMessages,getMessages};