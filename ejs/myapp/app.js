var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var fs = require("fs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('views', './views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(express.static('public'));
app.use('/public', express.static(path.join(__dirname + '/public')));

// 생성
app.get('/new', function (req, res) {
	fs.readdir('data', function (err, files) {
		if (err) {
			console.log(err)
			res.status(500).send('Internal Server Error');
		}
		res.render('new', {topics:files});
	});
});

// app.get(['/', '/:id'], function (req, res) {
// 	fs.readdir('data', function (err, files) {
// 		if (err) {
// 			console.log(err)
// 			res.status(500).send('Internal Server Error');
// 		}
// 		var id = req.params.id;	

// 		if (id) {
// 			fs.readFile('data/'+id, 'utf8', function (err, data) {

// 				if (err) {
// 					console.log(err)
// 					res.status(500).send('Internal Server Error');
// 				}
// 				res.render('index.html', {topics:files, title:id, desciption:data})
// 			})
// 		} else {
// 			res.render('index.html', {topics:files, title:'Welcome', desciption:'Hello,Hello,Hello,Hello'})
// 		}
// 	})
// });

app.get(['/', '/:id'], function (req, res) {
	var docFolder = 'data',
		 docFiles = [];

	fs.readdir(docFolder, function (err, files) {
		if (err) {
			console.log(err)
			res.status(500).send('Internal Server Error');
		}

		files.forEach(function (file) {
			var nfileData = '';

			

			docFiles.push(nfileData);
		})

		// console.log(files)
		console.log(docFiles)

		var id = req.params.id;

		if (id) {
			fs.readFile('data/'+id, 'utf8', function (err, data) {

				if (err) {
					console.log(err)
					res.status(500).send('Internal Server Error');
				}
				res.render('index.html', {topics:files, title:id, desciption:data})
			})
		} else {
			res.render('index.html', {topics:files, title:'Welcome', desciption:'Hello,Hello,Hello,Hello'})
		}
		
	})
});

app.post('/', function (req, res) {
	var title = req.body.title,
		 desciption = req.body.desciption;

	fs.writeFile('/'+title, desciption, function (err) {
		if (err) {
			console.log(err)
			res.status(500).send('Internal Server Error');
		}
		res.redirect('/'+title);
	})
})

app.listen(3000, function(){
    console.log("Express server has started on port 3000")
});



