//Twilio auth
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
  }

const express = require('express');
const admin = require('firebase-admin');
const bodyParser = require("body-parser");
const fs = require('fs');
const schedule = require('node-schedule');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require(`twilio`)(accountSid, authToken);

const serviceAccount = require('./durhack-66182-firebase-adminsdk-fyf1q-9d63adf87c.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://durhack-66182-default-rtdb.europe-west1.firebasedatabase.app"
});

const db = admin.firestore();

//express app
const app = express();
app.use(express.static('client'));
app.use(express.json())

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//json file
const databaseData = require('./database.json');

//frequency posting to json
app.post(`/frequency`,(req, res) => {
    databaseData[req.body.person]["frequency"] = req.body.frequency;
    fs.writeFileSync('./database.json', JSON.stringify(databaseData));
    console.log(req.body.frequency)
    res.send('yes')
    });


//tod posting to json 
app.post('/timeinput', async (req, res) => {
    const { person, uid } = req.body;

    // const userRecords = await db.collection('users').where('bio', '==', person).get();
    const userRecord = await db.collection('users').doc(uid).get();
    
    // if (userRecords.empty) {
    //     return res.status(404).send('not found');
    // }
    
    if (!userRecord.exists)

    // const userRecord = userRecords.docs[0];

    await userRecord.ref.update({
        Time: req.body.time,
    });

    console.log('Auto Call Scheduled for ', person);

    const autoCall = new schedule.RecurrenceRule();
    autoCall.hour = req.body.time.slice(0,2)
    autoCall.minute = req.body.time.slice(3,5)

    const exec = schedule.scheduleJob(autoCall, function(){
                const { Phone: numb, FriendPhone: numb2} = userRecord.data();

                client.messages.create({
                    body: 'Calling in 10 seconds',
                    from: '+447360537793', 
                    to: numb2,
                })
               
               
               setTimeout(function(){client.calls.create({
                   to: numb2,
                   from: `+447360537793`,
                   twiml: `<Response>
                   <Dial>${numb}</Dial>
                   </Response>`
                  });
               },10000);

            })
    // autoCall.hour = (req.body.time.slice(0,2)+databaseData[req.body.person]["frequency"])%24
    res.send('yes')
})

//ratings posting to json
app.post('/ratings',(req,res) => {
    const userRated = databaseData[req.body.person]["rated"]
    if (!userRated) {
        databaseData[req.body.person]["ratings"].push(req.body.ratings);
        databaseData[req.body.person]["rated"] = true
        fs.writeFileSync('./database.json', JSON.stringify(databaseData));
        console.log(req.body.ratings)   
        const avgArr = databaseData[req.body.person]["ratings"].slice(-3)
        if (avgArr.length===3) {
            console.log(avgArr)
            const sumAvg = 0
            for (const r in avgArr) {
                console.log(avgArr[r])
                const sumAvg = sumAvg + parseInt(avgArr[r])
            }
            console.log("avg: " +sumAvg)
            if (sumAvg<9) {
                const numb2= databaseData[req.body.person]["frnumb"]
                console.log(numb2)
                client.messages
                .create({
                    body: `Hi, ${req.body.person} is feeling down, maybe send them a message to check they're okay!`,
                    from: `+447360537793`, 
                    to: numb2,
                })
                .then(message => console.log(message.sid));
        }}
        res.send('yes')
    }

})
// db.collection('users').doc(user.uid).get().then(doc => {

// app.post('/text', (req,res) => {
//     req.body.doc.data().Phone
//     res.send('yes')
// )
// app.post('/friendno', (req,res) => {
//     req.body.$doc.data().FriendPhone
//     res.send('yes')
// )
// app.post('/time', (req,res) => {
//     req.body.$doc.data().Time
//     res.send('yes')
// )
// });



const eveCheck = new schedule.RecurrenceRule();
eveCheck.hour = 22;

const newDay = new schedule.RecurrenceRule();
newDay.hour = 0;

const reminder = schedule.scheduleJob(eveCheck, function(){
    databaseData.forEach(function(user){
        const userRated = databaseData[user]["rated"]
        if (!userRated) {
            const numb = databaseData[user]["phonenumber"]
            client.messages.create({
                body: `User Rating Reminder`,
                from: `+447360537793`, 
                to: numb,
           })}
    })   
})

const refresh = schedule.scheduleJob(newDay, function(){
    databaseData.forEach(function(user){
        console.log('midnight call')
        databaseData[user]["rated"] = false
    })
})



app.listen(8000, () => console.log('App running on port 8000'));   