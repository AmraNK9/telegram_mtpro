
async function pollMessages(client, channelName,onShortMessage = null) {
    const channel = await client.getEntity(channelName); 

    client.addEventHandler(async (update) => {
        if(update.className === "UpdateShortMessage"){
           if(onShortMessage != null) onShortMessage(update.message)
            try {
                // const result =  await client.invoke(
                //    new Api.messages.SendMessage({
                //     peer: 'thanwana',
                //     message: "Hello"
                //    })
                // )
                // console.log("send message success, ", result)
   
               } catch (error) {
                //    console.log("create message error -- ",error)
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
                // console.log('New message link:', messageLink);
            }
        }
    });
    // console.log(`Started polling for new messages in channel: ${channel.id}`);
}

module.exports = {pollMessages}