var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const Logger = require('heroku-logger').Logger;
var PushNotification = require('push-notification');
var DeviceType = PushNotification.DeviceType;
var path = require('path');
var fs = require('fs');
var _ = require('underscore');
var service = require("./api/service")

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json()); // for parsing application/json

app.set('port', (process.env.PORT || 4999));

app.get("/ping",function(req,res){
	res.status(200);
	res.send({message:"Server is running"});

});


//API for token service
app.get("/api/token/all",service.getAllTokens);
app.get("/api/token/sf/:sfid",service.getTokenBySF);
app.delete("/api/token/sf/:sfid/device/:did",service.deleteToken);
app.post("/api/token/save",service.insertToken);

//API for Notification service
app.post("/api/notify/",service.notifyDevice)



app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
