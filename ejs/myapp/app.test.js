// npm install supervisor -g : Nodejs 자동 재시작
// npm install body-parser --save : body-parser 모듈 설치

var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var fs = require("fs");

// 서버가 읽을 수 있도록 HTML 의 위치를 정의해줍니다.
app.set('views', __dirname + '/views');
// 서버가 HTML 렌더링을 할 때, EJS 엔진을 사용하도록 설정
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.listen(3000, function(){ //특정 port를 바라보게함
    console.log("Express server has started on port 3000")
});

// 정적파일
app.use('/public', express.static(path.join(__dirname + '/public')));
app.use(express.static('public')); // 'public' 정적파일 디렉토리 명

// bodyParser : post 사용
app.use(bodyParser.json()); // application/json 파싱하기 위해 설정
app.use(bodyParser.urlencoded({ extended: false })); // application/x-www-form-urlencoded 파싱 설정 (false=한번의 파싱으로 값 가져옴, true 중첩된 객체까지 파싱)
// body-parser 모듈을 추가
// 해당 모듈을 use라는 메소드를 통해서 연결
// 사용자에게 오는 모든 요청(post)은 body-parser 모듈이 가장 먼저 실행이 됨.


app.get('/form', function (req, res) {
	res.render('form', {
		title: "MY HOMEPAGE"
	})
});
app.get('/form_receiver', function (req, res) {
	var title = req.query.title;
	var description = req.query.description;

	res.send(title+','+description);
});
app.post('/form_receiver', function (req, res) {	
	var title = req.body.title;
	var description = req.body.description;

	res.send(title+','+description);
});

app.get('/topic/:id', function (req, res) {
	var topics = [
		'Javascript is....',
		'Nodejs is....',
		'Express is....'
	];
	var output = `
	<a href="/topic/0">Javascript</a><br>
	<a href="/topic/1">Nodejs</a><br>
	<a href="/topic/2">Express</a><br>
	${topics[req.params.id]}
	`
	res.send(output);
})


// get 메소드 : 연결 (router)
app.get('/', function (req, res) { //request, response
	res.send('Hello home page');
});

var router = require('./router/main')(app, fs); //라우터 모듈인 main.js 를 불러와서 app 에 전달해줍니다.