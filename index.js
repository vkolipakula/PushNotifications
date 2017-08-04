var expresss = require('express');
var app = express();
var bodyParser = require('body-parser')

app.set('port', (process.env.PORT || 5000));
app.get("/status",function(req,res){
	
	res.status(200);
	res.send({message:"Server is running"});
	
});

app.post("/notify",function(req,res){
	var body = req.body
	
	res.send({"data":body});
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});