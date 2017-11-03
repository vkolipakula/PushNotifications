var API_ML = "lnns9ZsrNRgq7odDP7WSAeFqwaToPRFl"
var mLab = require('mongolab-data-api')(API_ML);

//PUSH NOTIFY OBJ
var PushNotification = require('push-notification');
var DeviceType = PushNotification.DeviceType;
var path = require('path');
var fs = require('fs');

PushNotification.init({
    apn: {
        cert: path.resolve('./latestcert/apns-dev-cert.pem'),
        key: path.resolve('./latestcert/apns-dev-key.pem'),
		passphrase:"Deloitte123"
    }

});
console.log("-----------",path.resolve('./latestcert/apns-dev-cert.pem'))
module.exports.getAllTokens = function(req,res){

	var options = {
	  database: 'device',
	  collectionName: 'devdevice',
	  query: '{}'
	};

	mLab.listDocuments(options, function (err, data) {
		if(err){
			res.status(500);
			res.send({"message":"some thing went wrong"})
		}else{
			res.status(200);
			res.send({"tokens":data,"message":'success'})
		}		
	});


}

module.exports.getTokenBySF = function(req,res){

	var sfid = req.params.sfid;
	var options = {
	  database: 'device',
	  collectionName: 'devdevice',
	  query: JSON.stringify({"sfcustomerid": sfid })
	};

	mLab.listDocuments(options, function (err, data) {
		if(err){
			res.status(500);
			res.send({"message":"some thing went wrong"})
		}else{
			res.status(200);
			res.send({"data":data,"message":'success'})
		}
	  
	});
}

module.exports.deleteToken = function(req,res){

	var sfid = req.params.sfid;
	var device_id = req.params.did
	var options = {
	  database: 'device',
	  collectionName: 'devdevice',
	  query: JSON.stringify({"sfcustomerid": sfid ,"device_token":device_id})
	};

	mLab.deleteDocuments(options, function (err, data) {
		if(err){
			res.status(500);
			res.send({"message":"some thing went wrong"})
		}else{
			res.status(200);
			res.send({"data":data,"message":'success'})
		}
	  
	});
}


/*
payload:
	{
    "sfcustomerid": "12345",
    "device_token": "8882882828282828818181",
    "createdBy": "test123"
    }
*/
module.exports.insertToken = function(req,res){

	var document = req.body.data


	var options = {
	  database: 'device',
	  collectionName: 'devdevice',
	  documents: document 
	};

	mLab.insertDocuments(options, function (err, data) {
		if(err){
			res.status(500);
			res.send({"message":"some thing went wrong"})
		}else{
			res.status(200);
			res.send({"data":data,"message":'success'})
		}
	  
	});
}

/*payload data :

{       
  "data": {   
        "casenum":"12344",
    	"message":"This is for testing",
        "token": "8882882828282828818181"
  		  }
    
} 

*/

module.exports.notifyDevice = function(req,res){

	var payload = req.body.data
	var caseNum = payload.casenum
	var message = payload.message
	var device_token = payload.token					  	
	var badge = "Your case ref num is "+caseNum+" "+message
	console.log("------",badge,"------token is ",device_token)
	var sound = null;
	var payload = {title: 'No matter', message: message, badge: 'Hola is working', sound: ''};
		
	PushNotification.pushSingle(DeviceType.IOS, device_token, message, badge, sound, payload);				
	
/*			var message = 'Testing';	
			var badge = "Your case ref num is "+caseNum+" "+"THis is working";
			var sound = null;
			var payload = {title: 'No matter', message: message, badge: 'Hola is working', sound: ''};
		
			PushNotification.pushSingle(DeviceType.IOS, device_token, message, badge, sound, payload);	*/
			res.send({"data":"Notification has been forwarded","message":"Done"});
}
