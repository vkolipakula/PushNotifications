var express = require('express');
var app = express();
var bodyParser = require('body-parser')
const logger = require('heroku-logger')
 
var PushNotification = require('push-notification');
var DeviceType = PushNotification.DeviceType;
var path = require('path');
var store = require('json-fs-store')('./db.json');
var fs = require('fs');
var tmp_arr = []
var _ = require('underscore');

console.log("--------------",store)

//var cert = path.resolve('./certs/cer/Certificates_Ana.p12')
//agent.set('pfx file', cert);

// our credentials were for development
//agent.enable('sandbox');


app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json()); // for parsing application/json

app.set('port', (process.env.PORT || 4999));

PushNotification.init({
    apn: {
        cert: path.resolve('./dev/AnaCertFinal.pem'),
        key: path.resolve('./dev/AnaKey.pem')
    }
	logger.info('Certificates initialized')

});
app.get("/status",function(req,res){
	
	res.status(200);
	res.send({message:"Server is running"});
});

app.post("/notify",function(req,res){
	var body = req.body.data
	var caseNum = body.casenum
	var msg = body.message
	console.log("-------note----",body);
	
	logger.info('Certificates initialized',body);

	//var iosToken = '25659ed9379895eb99cfcce944320f928438ef2def5841c1ef84327b156f8492';
	//Raj
	//var iosToken = '468479b65dbab9d78a22e09e3af54e454a162fff9392289bf4ed2331adea8517';
	
		_.each(tmp_arr,function(eachObj){
			console.log("data ----",eachObj)
			console.log("data ----",typeof eachObj)
			logger.info('device token',eachObj);

			
			var message = 'Testing';
			var badge = "Your case ref num is "+caseNum+" "+msg;
			var sound = null;
			var payload = {title: 'No matter', message: message, badge: 'Hola is working', sound: ''};
			// send a notification to a single device 
			
			try{
				PushNotification.pushSingle(DeviceType.IOS, eachObj, message, badge, sound, payload);	
				logger.info('Notification sent to IOS device',message);
			}
			catch(ex){
				logger.error('Exception occured',ex);
			}
		})
	

 
	// send a notification to multiple devices 
	//PushNotification.prepare(message, badge, sound, payload);
	//PushNotification.addTarget(DeviceType.IOS, iosToken);
	//PushNotification.push();
	
	res.send({"data":"Notification done"});
});

app.get('/store',function(req,res){
	console.log("-----",req.query);
	var data = req.query.data
	tmp_arr.push(data);
	tmp_arr = _.uniq(tmp_arr);
	res.send({data:tmp_arr})
	
});

 
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});