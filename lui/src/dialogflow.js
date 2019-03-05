// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
'use strict';

const functions = require('firebase-functions');
const DialogFlowApp = require('actions-on-google').DialogFlowApp;
const { WebhookClient } = require('dialogflow-fulfillment');
const { Card, Suggestion } = require('dialogflow-fulfillment');

const https = require('https');
const request = require('request');

// The Firebase Admin SDK to access the Firebase Realtime Database.
// const admin = require('firebase-admin');
// admin.initializeApp(functions.config().firebase);

process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {

    console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
    console.log('Dialogflow Request body: ' + JSON.stringify(request.body));

    //   const agent = new WebhookClient({ request, response });

    // An action is a string used to identify what needs to be done in fulfillment
    let action = request.body.queryResult.action;
    // console.log("ACTION", action);

    // Parameters are any entites that Dialogflow has extracted from the request.
    let parameters = request.body.queryResult.parameters;
    // console.log("Value", parameters.app);

    if (action === "openApp" && parameters.app) {

        console.log("OPEN APP", parameters.app);
        saveToDb(parameters.app);
    }

    //   Contexts are objects used to track and store conversation state
    //   let inputContexts = request.body.queryResult.contexts;

    //   defualt functions
    //   function welcome(agent) {
    //     agent.add(`Welcome to my agent!`);
    //   }

    //   function fallback(agent) {
    //     agent.add(`I didn't understand`);
    //     agent.add(`I'm sorry, can you try again?`);
    //   }

    // Uncomment and edit to make your own intent handler
    // uncomment `intentMap.set('your intent name here', yourFunctionHandler);`
    // below to get this function to be run when a Dialogflow intent is matched
    //   function openApp(agent) {
    //      agent.add(`This message is from Dialogflow's Cloud Functions for Firebase editor!`);
    //      agent.add(new Card({
    //        title: `Title: this is a card title`,
    //        imageUrl: 'https://developers.google.com/actions/images/badges/XPM_BADGING_GoogleAssistant_VER.png',
    //        text: `This is the body text of a card.  You can even use line\n  breaks and emoji! 💁`,
    //        buttonText: 'This is a button',
    //        buttonUrl: 'https://assistant.google.com/'
    //      })
    //  );
    //    agent.add(new Suggestion(`Quick Reply`));
    //    agent.add(new Suggestion(`Suggestion`));
    //    agent.setContext({ name: 'weather', lifespan: 2, parameters: { city: 'Rome' }});
    //    saveToDb(0);
    //   }

    // Uncomment and edit to make your own Google Assistant intent handler
    // uncomment `intentMap.set('your intent name here', googleAssistantHandler);`
    // below to get this function to be run when a Dialogflow intent is matched
    // function googleAssistantHandler(agent) {
    //   let conv = agent.conv(); // Get Actions on Google library conv instance
    //   conv.ask('Hello from the Actions on Google client library!') // Use Actions on Google library
    //   agent.add(conv); // Add Actions on Google library responses to your agent's response
    // }

    // // See https://github.com/dialogflow/dialogflow-fulfillment-nodejs/tree/master/samples/actions-on-google
    // // for a complete Dialogflow fulfillment library Actions on Google client library v2 integration sample

    //   Run the proper function handler based on the matched Dialogflow intent name
    //   let intentMap = new Map();
    //   intentMap.set('Default Welcome Intent', welcome);
    //   intentMap.set('Default Fallback Intent', fallback);
    //   intentMap.set('openApp', openApp);
    //   intentMap.set('your intent name here', googleAssistantHandler);
    //   agent.handleRequest(intentMap);
});

function saveToDb(appToSave) {
    try {
        const options = {
            method: 'PUT',
            url: 'https://luibyobm.firebaseio.com/application.json',
            headers:
            {
                'Cache-Control': 'no-cache',
                'Content-Type': 'application/json'
            },
            body: { app: appToSave },
            json: true
        };

        request(options, function (error, response, body) {
            if (error) throw new Error(error);
            console.log("update", body);
        });
    } catch (e) {
        console.log(e);
    }
}
