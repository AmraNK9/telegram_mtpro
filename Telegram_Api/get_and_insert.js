const { TelegramClient, version } = require('telegram');
const { StringSession } = require('telegram/sessions');
const readline = require('readline');
const fs = require("fs")
// const { message, users } = require('telegram/client');
// const { title } = require('process');
const { getAllMessages } = require("./get_all_message")
// const { pollMessages } = require("./util/polling_message");
const { adsFilter } = require('./util/ads_filter');
const { findMovie } = require('../TMDB_Api/search_movie');
const { filterYearFromTitle } = require('./util/year_filter_title');
const { insertMovieToDb } = require('../Database/data_insertion');
require("dotenv").config();


const apiId = parseInt(process.env.API_ID, 10) || 20211869;
const apiHash = process.env.API_HASH || "739e29484824a3a409b9e1a7a88e9974";
const phoneNumber = process.env.PHONE || "+959420479093";

const myToken = process.env.TOKEN || "1BQANOTEuMTA4LjU2LjE5NwG7OnjpvwfskxWFLDRZ5PVgjBATjOHgnnV1ka4uhm78S6ffKtugZMiJpAUf+JoPmxAsVNwCkPp01lFInc2o218xrGPCCebEQAxAGBinYO9jZXZogVEarupkGnzHtk1fTYKtmGU5Q754qHd962IrA4KHUjvioWOf7VwwvvjwKg47BjYHvxCp37KX1RCnRjguT39wzyiYPfkh8snf1A4jFEJHIJgneH5vI0YMibquMIH4Y1KrXQ1Ex2edIqqh5sO1YL6X3nzX8l2qpOOnYiskF13DLSewD/CWMADvGGfklmkDjOUOMOS+KHyf0kW8LGAoI8c6kb6vXV872tgwWzh/uJGTRA=="
console.log('api id', apiId)
console.log('token', myToken)
console.log('phone', phoneNumber)
console.log("hash", apiHash)

const stringSession = new StringSession(myToken);

const client = new TelegramClient(stringSession, apiId, apiHash, {
    connectionRetries: 5,
});


//Input 
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function input(question) {
    return new Promise((resolve) => rl.question(question, resolve));
}

//DownloadPhoto
async function downloadPhoto(client, media, filePath) {
    const buffer = await client.downloadMedia(media);
    fs.writeFileSync(filePath, buffer);
    console.log(`Photo saved to ${filePath}`);
}

const getAndInsertTeleMoviesToDb = async (channelName = '', {onlyGet = false}) => {
    await client.start({
        phoneNumber: async () => phoneNumber,
        password: async () => await input('Enter your password: '),
        phoneCode: async () => await input('Enter the code you received: '),
        onError: (err) => console.log(err),
    });
    console.log("session save", client.session.save())

    console.log('You are now connected.');
    // https://t.me/moviecrazyy252
    //https://t.me/youthfavouritemovies
    // https://t.me/Movie_Zone_Mm
    // https://t.me/Kyaungni18
    const channel =  channelName;
    // client.sendMessage()
    // https://t.me/movieparadise227
    const result = await getAllMessages(client, channel, 10)
    // https://t.me/myanmar_epubs
    //https://t.me/Kyaungni02
    // https://t.me/moviecrazyy531

    let movieList = [];
    for (let index = 0; index < result.length; index++) {
        const value = result[index];
        let description = value["message"] || '';
        if (description == null
            || description == undefined
            || description == ''
            || adsFilter(description)
        ) {
            console.log("return ")

        } else {

            let line = description.split("\n")
            let title = line[0];
            // https://t.me/Horror_Night_SC
            let onlyTitle = filterYearFromTitle(title)
            let teleLink = `https://t.me/${channel}/${value['id']}`;



            console.log(`number-${index} \n`)

            console.log("title", onlyTitle)
            let v = await findMovie(onlyTitle)
            if (v.tmdb_id != null) {

                v["description"] = description
                v['tele_link'] = teleLink

                movieList.push(v)
            }
        }


    }

    let jsonData = JSON.stringify(movieList)
    if(onlyGet){
        return jsonData
    }
    // C:\Users\kim\Project\Tele Movie\telegram_mtpro\data
     fs.writeFile(`../telegram_mtpro/data/${channel}.json`, jsonData, 'utf8', (err) => {
        if (err) {
            console.error('Error writing file:', err);
            return;
        }
        console.log('JSON data has been appended to the file');
        insertMovieToDb(`../telegram_mtpro/data/${channel}.json`)

    });

    return jsonData;

    // result.map(  (value, index) => {

    // },)
    // await pollMessages(client, "moviecrazyy252")
};

// https://t.me/MMSUBMOVIEFORFREE
// https://t.me/horrorvscartoons2
// https://t.me/mm23movieschannel
// LarverCartoonAndMovie
// adgj24/531

// https://t.me/deliveryman_mmsub/
// getAndInsertTeleMoviesToDb("adgj24",{onlyGet:false})
// insertMovieToDb(`../telegram_mtpro/data/mm23movieschannel.json`)

module.exports = {getAndInsertTeleMoviesToDb}