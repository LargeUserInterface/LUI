const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card,Suggestion} = require('dialogflow-fulfillment');
//added
const requestNode = require('request');
const rp = require('request-promise');
const NUMBER_ARGUMENT = 'number';

//end


process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
const agent = new WebhookClient({request,response});
    console.log('Dialogflow Request headers:  ' + JSON.stringify(request.headers));
    console.log('Dialogflow Request body: ' + JSON.stringify(request.body));

    function welcome(agent) {
        agent.add(`Welcome called`);

    }

    function goTo(agent) {
        return new Promise((resolve,reject) =>{
        const options = {
            url: 'https://lui-medialab.firebaseio.com/voice.json',
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "goto": agent.parameters.noun,
                "update": true
            })
        };
        //get stuff
        rp('https://lui-medialab.firebaseio.com/voice.json')
            .then(function (body) {
                const apps = ["photos","videos","prismatic","game","model","landing","gesture"];
                var content = JSON.parse(body);
                if ((content.current == "home" && apps.includes(agent.parameters.noun))||(agent.parameters.noun == "home" && apps.includes(content.current))){
                    //patch
                    rp(options)
                        .then(function (body) {
                      if (agent.parameters.noun =="game"){
                        agent.add("Game is in development");
                      }
                      else{
                            agent.add(`going to ` + agent.parameters.noun);
                      }
                            resolve();
                        })
                    .catch(function (err) {
                        agent.add(`go to failed`);
                        resolve();
                    });
                }
                else{
                    rp(options)
                        .then(function (body) {
                            agent.add(`Path does not exist`);
                            console.log(body);
                            resolve();
                        })
                    .catch(function (err) {
                        agent.add(`go to failed`);
                        resolve();
                    });
                }
            });
        });
    }

	function open(agent){
       const options = {
            url: 'https://lui-medialab.firebaseio.com/voice.json',
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "clicked":true
              
            })
        };
      rp(options)
        .then(function (body) {
        });
      agent.add(`opening`);
    }
  
  function back(agent){
       const options = {
            url: 'https://lui-medialab.firebaseio.com/voice.json',
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "back":true
              
            })
        };
      rp(options)
        .then(function (body) {
        });
      agent.add(`going back`);
    }
  
  
  
    function fallback(agent) {
        agent.add(`Invalid command`);

    }


    let intentMap = new Map();
    intentMap.set('Default Welcome Intent', welcome);
    intentMap.set('Default Fallback Intent', fallback);
    
    intentMap.set('Go to', goTo);
  intentMap.set('open this', open);
  intentMap.set('go back', back);
    agent.handleRequest(intentMap);
});