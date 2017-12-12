var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var cheerio = require('cheerio');
var fs = require("fs");
var ejs = require("ejs");
var request = require("request");

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

	fs.readdir(docFolder, function (err, files) {
		if (err) {
			console.log(err)
			res.status(500).send('Internal Server Error');
		}

		files.forEach(function (files) {
			var nfileData = {};
			var fileInnerData = fs.readFileSync('data/'+files, 'utf8');
			$ = cheerio.load(fileInnerData);

			nfileData.title = files;
			nfileData.htmlcode = fileInnerData;

			docFiles.push(nfileData);
		})
		projectObj = {
         nfiles: docFiles
		};
		projectObjStr = JSON.stringify(projectObj);
		projectObjJson = JSON.parse(projectObjStr);

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

	// http 소스 crawling 후 creeping, parsing
	var url = req.protocol + '://' + req.get('host') + req.originalUrl;
	request(url, function (err, res, body) {
		if (!err) {
			var $ = cheerio.load(body); //받아온 데이터에서 필요한 데이터 추출
			fs.writeFile('@index.html', body, 'utf8', function(err){
				console.log(body)
				// 응답받은 html문서 내용 출력
			});
		}
	})

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