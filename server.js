//Twilio auth
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
  }

const express = require('express');
const bodyParser = require("body-parser");
const router = express.Router();
const fs = require('fs');
const schedule = require('node-schedule');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require(`twilio`)(accountSid, authToken);

//express app
const app = express();
app.use(express.static('client'));
app.use(express.json())

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//json file
const databaseData = require('./database.json');
const { request } = require('http');

//frequency posting to json
app.post(`/frequency`,(req, res) => {
    databaseData[req.body.person]["frequency"] = req.body.frequency;
    fs.writeFileSync('./database.json', JSON.stringify(databaseData));
    console.log(req.body.frequency)
    res.send('yes')
    });


//tod posting to json 
app.post('/timeinput',(req, res) => {
    databaseData[req.body.person]["tod"] = req.body.time;
    fs.writeFileSync('./database.json', JSON.stringify(databaseData));
    console.log(databaseData[req.body.person]["tod"])

    const autoCall = new schedule.RecurrenceRule();
    autoCall.hour = req.body.time.slice(0,2)
    autoCall.minute = req.body.time.slice(3,5)

    const exec = schedule.scheduleJob(autoCall, function(){
                numb = databaseData[req.body.person]["phonenumber"]
                numb2 = databaseData[req.body.person]["frnumb"]

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
    autoCall.hour = (req.body.time.slice(0,2)+databaseData[req.body.person]["frequency"])%24
    res.send('yes')
})

//ratings posting to json
app.post('/ratings',(req,res) => {
    userRated = databaseData[req.body.person]["rated"]
    if (!userRated) {
        databaseData[req.body.person]["ratings"].push(req.body.ratings);
        databaseData[req.body.person]["rated"] = true
        fs.writeFileSync('./database.json', JSON.stringify(databaseData));
        console.log(req.body.ratings)   
        avgArr = databaseData[req.body.person]["ratings"].slice(-3)
        if (avgArr.length=3) {
            console.log(avgArr)
            sumAvg = 0
            for (r in avgArr) {
                console.log(avgArr[r])
                sumAvg = sumAvg + parseInt(avgArr[r])
            }
            console.log("avg: " +sumAvg)
            if (sumAvg<9) {
                numb2= databaseData[req.body.person]["frnumb"]
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
db.collection('users').doc(user.uid).get().then(doc => {

app.post('/text', (req,res) => {
    req.body.doc.data().Phone
    res.send('yes')
)
app.post('/friendno', (req,res) => {
    req.body.$doc.data().FriendPhone
    res.send('yes')
)
app.post('/time', (req,res) => {
    req.body.$doc.data().Time
    res.send('yes')
)
});



const eveCheck = new schedule.RecurrenceRule();
eveCheck.hour = 22;

const newDay = new schedule.RecurrenceRule();
newDay.hour = 0;

const reminder = schedule.scheduleJob(eveCheck, function(){
    databaseData.forEach(function(user){
        userRated = databaseData[user]["rated"]
        if (!userRated) {
            numb = databaseData[user]["phonenumber"]
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



app.listen(8000);   