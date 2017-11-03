console.log("testing")
app.post('/store',function(req,res){
	console.log("-----",req.body);
	var data = req.body.data
	tmp_arr.push(data);
	tmp_arr = _.uniq(tmp_arr);
	res.send({data:tmp_arr})
	
});


//var cert = path.resolve('./certs/cer/Certificates_Ana.p12')
//agent.set('pfx file', cert);

// our credentials were for development
//agent.enable('sandbox');


	//logger.info('Certificates initialized',body);

	//var iosToken = '25659ed9379895eb99cfcce944320f928438ef2def5841c1ef84327b156f8492';
	//Raj
	//var iosToken = '468479b65dbab9d78a22e09e3af54e454a162fff9392289bf4ed2331adea8517';



app.post("/notify",function(req,res){
	var body = req.body.data
	var caseNum = body.casenum
	var msg = body.message
	
					  
			var message = 'Testing';	
			var badge = "Your case ref num is "+caseNum+" "+msg;
			var sound = null;
			var payload = {title: 'No matter', message: message, badge: 'Hola is working', sound: ''};
		
			for(i=0;i<tmp_arr.length;i++){
				var eachObj = tmp_arr[i];
				PushNotification.pushSingle(DeviceType.IOS, eachObj, message, badge, sound, payload);	
				console.log("Notification",eachObj,"message",message);
				
			}
		console.log(" Push Notification Closed");
 
	// send a notification to multiple devices 
	//PushNotification.prepare(message, badge, sound, payload);
	//PushNotification.addTarget(DeviceType.IOS, iosToken);
	//PushNotification.push();
	
	res.send({"data":"Notification done"});
});


//ask999
//sai123 --pass