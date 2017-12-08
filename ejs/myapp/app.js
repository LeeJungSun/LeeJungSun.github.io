var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var cheerio = require('cheerio');
var fs = require("fs");
var ejs = require("ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('views', './views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(express.static('public'));
app.use('/public', express.static(path.join(__dirname + '/public')));


app.get('/guide/new', function (req, res) {
	res.render('new');
});

app.get(['/guide', '/guide/:id'], function (req, res) {
	var docFolder = 'data',
	 	 docFiles = [];

	// function ejs2html(path, information) {
	// 	fs.readFile('views/index.html', 'utf8', function (err, data) {
	// 		var ejs_string = data,
	// 			 template = ejs.compile(ejs_string),
	// 			 html = template(information);
	// 		fs.writeFile(path + '.html', html, function(err) {
 //            if(err) { console.log(err); return false }
 //            return true;
 //        	});
	// 	})		
	// }
	// ejs2html(__dirname+"/index.ejs")
	// console.log(ejs2html)

	fs.readFile('views/index.html', 'utf8', function (err, data) {
		var ejs_string = data,
			 template = ejs.compile(ejs_string)
	})		

	fs.readdir(docFolder, function (err, files) {
		if (err) {
			console.log(err)
			res.status(500).send('Internal Server Error');
		}

		files.forEach(function (files) {
			var nfileData = {};
			var fileInnerData = fs.readFileSync('data/'+files, 'utf8');
			$ = cheerio.load(fileInnerData);

			nfileData.htmlcode = fileInnerData;

			docFiles.push(nfileData);
		})
		projectObj = {
         nfiles: docFiles
		};
		projectObjStr = JSON.stringify(projectObj);
		projectObjJson = JSON.parse(projectObjStr);



		
		// fs.readFile('views/index.html', 'utf8', function (err, data) {
		// 	fs.writeFile('@index.html', data, 'utf8', function(err){
		// 		console.log('write end')
		// 	});
		// })
		


		var id = req.params.id;

		if (id) {
			fs.readFile('data/'+id, 'utf8', function (err, data) {
				if (err) {
					console.log(err)
					res.status(500).send('Internal Server Error');
				}
				res.render('index.html', {obj:files, title:id, description:data});
			});
		} else {
			res.render('index.html', {obj:files, title:'Welcome', description:'Hello'});
		}
	});
});

app.post('/guide', function (req, res) {
	var title = req.body.title;
	var description = req.body.description;

	fs.writeFile('data/'+title, description, function (err) {
		if (err) {
			console.log(err);
			res.status(500).send('Internal Server Error');
		}
		res.redirect('/guide/'+title);
	});
});

app.listen(3000, function(){
    console.log("Express server has started on port 3000")
});