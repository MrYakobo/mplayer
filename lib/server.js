exports.start = (title, files, port)=>{

	var express = require('express');
	var app = express();

	var fs = require('fs');
	var Handlebars = require('handlebars');

	app.get('/',(res,req)=>{
		var htmlFile = fs.readFileSync(`${__dirname}/index.html`,'utf8');
		var template = Handlebars.compile(htmlFile, {noEscape: true});
		var data = {title: title, music: JSON.stringify(files)};
		var html = template(data);

		req.send(html);
	})

	function prettify(s){
		return s.replace(/music\/|\..+/g,'').replace(/\_/g,' ');
	}
	
	app.use('/favicon.png', express.static(`${__dirname}/../lib/favicon.png`));
	app.use('/bower_components', express.static(`${__dirname}/../bower_components`));
	app.use('/music', express.static(process.cwd()));

	app.listen(port,()=>{
		//console.log(`Listening on ${port}`);
	})
}
