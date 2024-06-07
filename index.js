const { TelegramClient } = require('telegram');
const { StringSession } = require('telegram/sessions');
const { Api } = require('telegram/tl');
const readline = require('readline');
const { message, users } = require('telegram/client');
const { title } = require('process');

const apiId = 20211869; // Replace with your API ID
const apiHash = '739e29484824a3a409b9e1a7a88e9974'; // Replace with your API Hash
const phoneNumber = '+959420479093'; //// Replace with your phone number

const myToken = "1BQANOTEuMTA4LjU2LjE4NQG7SHmQvrP9BdjRQsF3n1gMFDKIXNKWjy1Q6rPfi4/REH2HIFAKWGzarAxDaAyKBIW5VHlg6quYhz624VstKn+fNupkOWvNNJDhO0XrX43rk6mOeWjfehmCE186CflHWbcFJHjvjNDHmIHyygsnMsiblkYTMtikTFsKRDmr4S7JFUWvchzGTg00W9eb/GtRmghRxSywBdPeNMH3jSbNG4psgdMyzWKDX+w+fXpTC2GNni0uPQ/O9UWDq4MiFbnGam55r2OkJ9pfDCS/2tYZiNXExtEu3xuS+lYMNA1ROaky5TEyy0LcpRr4s3SDUpIvLwXj5vcxjvV95bme6bZPcZBVvg=="

const stringSession = new StringSession(myToken); // Empty string for a new session

const client = new TelegramClient(stringSession, apiId, apiHash, {
    connectionRetries: 5,
});

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function input(question) {
    return new Promise((resolve) => rl.question(question, resolve));
}

async function downloadPhoto(client, media, filePath) {
    const buffer = await client.downloadMedia(media);
    fs.writeFileSync(filePath, buffer);
    console.log(`Photo saved to ${filePath}`);
}



async function pollMessages(client, channel,onShortMessage = null) {
    client.addEventHandler(async (update) => {
        if(update.className === "UpdateShortMessage"){
           if(onShortMessage != null) onShortMessage(update.message)
            try {
                const result =  await client.invoke(
                   new Api.messages.SendMessage({
                    peer: 'thanwana',
                    message: "Hello"
                   })
                )
                console.log("send message success, ", result)
   
               } catch (error) {
                   console.log("create message error -- ",error)
               }
        }
        console.log( 'new update - ',update.className);
        if (update.className === 'UpdateNewMessage') {
            const message = update.message;
            console.log("message__s", message);
         
            if (message.peerId.className === 'PeerChannel' && message.peerId.channelId.eq(channel.id)) {
                if (message.media && message.media.className === 'MessageMediaPhoto') {
                    const filePath = path.join(__dirname, `photo_${message.id}.jpg`);
                    await downloadPhoto(client, message.media, filePath);
                }
                const messageLink = `https://t.me/${channel.username}/${message.id}`;
                console.log('New message link:', messageLink);
            }
        }
    });
    console.log(`Started polling for new messages in channel: ${channel.id}`);
}


async function getAllMessages(client, channel, limit = 100, offsetId = 0) {
    let allMessages = [];
    // let offsetId = 0;
    // let limit = 100; // You can adjust the limit as needed

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
            break; // Exit the loop when there are no more messages
        }

        allMessages = allMessages.concat(history.messages);
        offsetId = history.messages[history.messages.length - 1].id;
        console.log(`Fetched ${history.messages.length} messages, total: ${allMessages.length}`);
    }

    return allMessages;
}

(async () => {



    await client.start({

        phoneNumber: async () => phoneNumber,
        password: async () => await input('Enter your password: '),
        phoneCode: async () => await input('Enter the code you received: '),
        onError: (err) => console.log(err),
    });

    console.log('You are now connected.');

    const channel = await client.getEntity('myanmar_epubs'); // Channel username
    // client.sendMessage()
    const result = await getAllMessages(client, channel)
    // You can specify message IDs here
    await client.invoke(
        new Api.messages.SentEncryptedFile(
            {
             
                
            }
        )
    )

    console.log("session save", client.session.save())
    console.log(result);
   
    await pollMessages(client, channel)
})();
