var fetch = require("node-fetch")
var fs = require("fs")
var btoa = require("btoa")
require("dotenv").config()

// if you are on node v0.10, set a Promise library first, eg.
// fetch.Promise = require('bluebird');

var comp = "10855";
var match = "1139060400";
var data = ""
// plain text or html

var url = "http://" + process.env.NETBALL_URL + comp + "/fixture.xml";
// var url = 'https://' +
//             process.env.FIFA_URL +
//             '/tournaments'

fetch(url, {
  method: "GET",
  credentials: "same-origin",
  redirect: "follow",
  agent: null,
  headers: {
    "Content-Type": "text/plain",
    Authorization:
      "Basic " + btoa(process.env.THE_USER + ":" + process.env.THE_PASSWORD)
  },
  timeout: 5000
})
  .then(function(response) {
    if (response.status !== 200) {
      console.log(
        "Looks like there was a problem. Status Code: " + response.status
      )
      return
    }
    return response.text().then(function(body) {
      console.log(body)
      fs.writeFile("./output/matches.xml", body, (err) => {  
        // throws an error, you could also catch it here
        if (err) throw err;
    
        // success case, the file was saved
        console.log('File saved!')
      })
      return
    })
  })
  .catch(function(error) {
    console.log(
      "There has been a problem with your fetch operation: " + error.message
    )
  })
