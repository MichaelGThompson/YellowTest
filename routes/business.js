exports.list = function(req, response) {
	http = require('http');
	
	var options = {
		host: 'api.sandbox.yellowapi.com',  
		port: 80,
		path: '/FindBusiness/?pg=1&what=accreon&where=Canada&pgLen=25&lang=en&fmt=json&apikey=bfk565jy2rcy9a682dqtfy5h&UID=9999'    //'/search.json?q=%23sencha'
	};
	
	var request = http.get(options, function(res) {
		console.log("---- statusCode: ", res.statusCode);
		var data = "";
		
		res.on('data', function(chunk) {
			data += chunk
		});
		
		res.on('end', function() {
			stuff = JSON.parse(data);
			
			console.log('---- Summary: ' + stuff.summary.what);
			
			for (var i=0; i < stuff.listings.length; i++) {
				var result = stuff.listings[i].name + '  ' 
				+ stuff.listings[i].address.street + '  '
				+ stuff.listings[i].address.city + '  '
				+ stuff.listings[i].address.prov + '  '
				+ stuff.listings[i].address.pcode;
				response.send(result);
			}
		});
		
		res.on('error', function(e) {
			console.log("There was an error: " + e.message);
		});
	});   bfk565jy2rcy9a682dqtfy5h
};


exports.findById = function(req, response) {
    //res.send({id:req.params.id, name: "The Name", description: "description"});
    
    var searchItem = req.params.id;
    
    http = require('http');
	
	var options = {
		host: 'api.sandbox.yellowapi.com',  
		port: 80,
		path: '/FindBusiness/?pg=1&what=' + searchItem + '&where=Fredericton&pgLen=25&lang=en&fmt=json&apikey=bfk565jy2rcy9a682dqtfy5h&UID=9999'  
	};
	
	var request = http.get(options, function(res) {
		console.log("---- statusCode: ", res.statusCode);
		var data = "";
		
		res.on('data', function(chunk) {
			data += chunk
		});
		
		res.on('end', function() {
			stuff = JSON.parse(data);		
			console.log('---- Summary: ' + stuff.summary.totalListings);
			response.send(stuff.listings);
		});
		
		res.on('error', function(e) {
			console.log("There was an error: " + e.message);
		});
	});
};
