const schedule = require('node-schedule');
const { insertingMovieFeed } = require('./feed_inserting_schedule');
const { connect } = require('mongoose');
const { connectDb } = require('../../Database/connection');

//comment out when run manurelly
// (async ()=>{
//     await connectDb()
//     insertingMovieFeed()

// })()
// Schedule job to run every Monday at 10:00 AM
const job = schedule.scheduleJob({ hour: 23, minute: 30, dayOfWeek: 0 },async () => {
  console.log('Running job every Monday at 10:00 AM');
  await connectDb()
    await  insertingMovieFeed()
    console.log("success ----")
});
