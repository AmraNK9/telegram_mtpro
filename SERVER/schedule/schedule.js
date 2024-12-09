const schedule = require('node-schedule');
const { insertingMovieFeed } = require('./feed_inserting_schedule');
const { connect } = require('mongoose');
const { connectDb } = require('../../Database/connection');

//comment out when run manurelly
// (async ()=>{
//     await connectDb()
//    await  insertingMovieFeed()
//    console.log("success")
// })()

// Schedule job to run every Monday at 10:00 AM
const job = schedule.scheduleJob({ hour: 11, minute: 49, dayOfWeek: 6 },async () => {
  console.log('Running job every Monday at 10:00 AM');
  await connectDb()
    await  insertingMovieFeed()
    console.log("success ----")
});


module.exports = {job}