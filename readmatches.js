axios = require('axios')
var fs = require('fs');
require('dotenv').config()
var btoa = require('btoa');

var comp = '10855'
var match = '1139060400'

// var statsUrl = 'http://' +
//             process.env.THE_URL +
//             comp + '/' +
//             'stats-' + match + '/'

var statsUrl = 'http://' +
            process.env.THE_URL +
            comp + '/fixture.xml'

            // + comp + '/stats-' + match + '.xml'



console.log('Url ' + statsUrl)

var username = process.env.THE_USER;
var password = process.env.THE_PASSWORD;
var basicAuth = 'Basic ' + btoa(username + ':' + password);
// axios.post(statsUrl, {}, {
//   headers: { 'Authorization': + basicAuth }
// }).then(function(response) {
//   console.log('Authenticated');
// }).catch(function(error) {
//   console.log('Error on Authentication');
// });

axios.post(statsUrl, {}, {
    auth: {
      username: username,
      password: password
    }
  }).then(function(response) {
    console.log('Authenticated');
  }).catch(function(error) {
    console.log('Error on Authentication');
  });


// var token = ''

// var config = {}
  
// axios.get(statsUrl).then(function (response) {
//   if (response.data.success == true) {
//     console.log(response.data.message)
//     token = response.data.responses.token
//     // console.log(response.data.responses.token)

//     // config = {
//     //     headers: { Authorization: "Bearer " + token }
//     //   }
//   }
//   else {
//       // log the unexpected reply
//       console.log("Unexpected response")
//       // fs.writeFile('./output/fifa-reply.json',
//       //     JSON.stringify(response),
//       //     (error) => { 
//       //         console.log(error)
//       //     });
//       console.log(response.data.message)  
//   }
// }).catch (function (e) {
  
//   console.log("Error handler")
//   console.log(e);
//   fs.writeFile('./output/file-error.json', 
//       e,
//       (error) => { 
//           console.log(error)
//       });
// })

function showTournaments ()  {
  console.log("Looking for tournaments")
  axios.get(baseUrl + '/tournaments', config).then(function (response) {
    console.log(response.data)
    for (i=0; i<response.data.tournaments.length; i++ ) {
      console.log('\x1b[33m', "===> Tournament ", 
          response.data.tournaments[i].config.basics.name, '\x1b[0m',
          response.data.tournaments[i]._id,
        'Format: ', response.data.tournaments[i].config.format.playingFormat, 
        response.data.tournaments[i].config.format.playersNumber, 'players.', 
        response.data.tournaments[i].config.stage.secondLegOption  
       )
    }

//    console.log(response.data.tournaments[0])
     
  }).catch (function (e) {
    console.log("Error handler")
    console.log(e);
    fs.writeFile('./output/fifa-error.json', 
        e,
        (error) => { 
            console.log(error)
        });
  })
}