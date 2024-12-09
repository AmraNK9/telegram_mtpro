const { Api } = require('telegram/tl');
const fs = require("fs")


async function getAllMessages(client, channelName, limit = 100, offsetId = 0) {
    let allMessages = [];
    let isFirstTime = true;
    const channel = await client.getEntity(channelName);
    let breakOffset;
    fs.readFile(`data/offsets/${channelName}.json`, (err, data) => {
        let json = JSON.parse(data);
        breakOffset = json['offset'];
    })
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
        if (offsetId == breakOffset) {
            break;
        }
        if (isFirstTime) {
            isFirstTime = false;
            let jsonData = { 'offset': offsetId }
            fs.writeFile(`data/offsets/${channelName}.json`, JSON.stringify(jsonData), 'utf8', (err) => {
                if (err) {
                    console.error('Error writing file:', err);
                    return;
                }
                console.log('JSON data has been appended to the file');
                // insertMovieToDb(`${channel}.json`)

            });
        }

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

module.exports = { getAllMessages, getMessages };