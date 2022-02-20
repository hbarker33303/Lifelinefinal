const functions = require("firebase-functions");
const { firestore } = require("firebase-admin");
const express = require('express');

const {account_sid: accountSid, auth_token: authToken } = firebase.config().twilio;
const client = require(`twilio`)(accountSid, authToken);

const app = express.Router();
app.use(express.json())
app.use(express.urlencoded());

const db = firestore();
db.settings({ ignoreUndefinedProperties: true });

// INOP
// app.post(`/frequency`,(req, res) => {
//     databaseData[req.body.person]["frequency"] = req.body.frequency;
//     fs.writeFileSync('./database.json', JSON.stringify(databaseData));
//     console.log(req.body.frequency)
//     res.send('yes')
// });

app.post('/timeinput', async (req, res) => {
    const { person } = req.body;

    const userRecords = await db.collection('users').where('bio', '==', person).get();
    
    if (userRecords.empty) {
        return res.status(404).send('not found');
    }

    const userRecord = userRecords.docs[0];

    await userRecord.ref.update({
        Time: req.body.time,
    });
    
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



export const api = functions.https('/api', app);
