# JSON 오브젝트

- JavaScript Object Notation
- 빌트인 오브젝트
- new로 인스턴스 생성 불가
- 자바스크립트 값 타입 지원
- 다른 언어에서도 사용하므로 완전하게 같지는 않음
- 데이터 송수신 상호간의 데이터 변환 기준
- 오브젝트가 아닌 텍스트 형태이므로 송수신 속도가 빠름
- XML에서 JSON으로 대체



## parse()

- JSON형태의 문자열을 자바스크립트 값 타입으로 변환
- JSON.parse() 형태로 호출
- object 위치에 JSON 오브젝트 작성
- 첫 번째 파라미터에 변환할 데이터 작성
- 두 번째 파라미터에 변환을 완료한 후 호출할 함수 작성

```
var result = JSON.parse("123");
console.log(result);
console.log(typeof result);
- 문자열 타입 "123"을 Number 타입으로 변환

console.log(JSON.parse("true"));
console.log(typeof JSON.parse("true"));
- 문자열 "true"를 boolean 타입으로 변환
- "TRUE", "FALSE"와 같이 대문자 사용 불가 (소문자 사용)

console.log(JSON.parse('[]'))
console.log(Array.isArray(JSON.parse("[]")));
- 문자열 "[]"를 배열 오브젝트로 변환
- 작은따옴표, 큰따옴표 사용 가능

result = JSON.parse('["ABC", "가나다"]');
for (var k = 0; k < result.length; k++) {
    console.log(result[k]);
};
- "ABC"와 같이 값이 큰따옴표를 사용할 때는 배열은 '[]'와 같이 작은따옴표 사용

console.log(JSON.parse("null"));
- 문자열 "null"을 Null 타입으로 변환
- "NULL"과 같이 대문자 사용 불가하며 소문자 사용 (대문자 사용시 에러)

var result = JSON.parse('{"sports" : "soccer"}');
for (var name in result) {
    console.log('name:' + name);
    console.log('value:' + result[name]);
}
```



## stringify()

- 자바스크립트 형태의 값을 JSON 형태의 문자열로 변환
- JSON.stringify() 형태로 호출