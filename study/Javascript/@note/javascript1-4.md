# Array (ES3)

- **작성순서가 순서의 의미를 가짐**
- 순서를 가지므로 처음부터 읽거나 인덱스를 지정하여 읽을 수 있음
- 배열에 엘리먼트를 추가, 삭제 가능(불가능한 언어도 있음)



## 배열 형태

1차원 배열 : [1,2,3]

2차원 배열 : [[1,2,3,], [4,5,6]]

3차원 배열 : 2차원 배열과 같으나 []가 3개인 상태

**for문 안에 for문 까지는 괜찮으나 그 이상은 함수 호출하여 사용 (가독성이 떨어짐)**



## 배열 생성

- 대괄호로 생성 var sports = [];
- new Array()로 생성 var sports = new Array();
- Array()로 생성 var sports = Array();

- var values = [12, "", true, " ", {book: "자바스크립트"}];
- 자바스크립트가 지원하는 모든 값 타입, 오브젝트 사용 가능
- 값을 작성하지 않고 콤마만 작성하면 undefinde가 출력됨

**큰 따옴표만 사용할 건지 작은따옴표만 사용할 건지 선택해서 통일화하여 사용**



## 참고

```
- 객체 지향에서는 추가와 삭제를 함께하는건(두가지 이상의 함수를 한 번에 실행) 바람직하지 않음
- crud(create, read, ,u..? ,delete)를 복합적으로 사용하는건 바람직하지 않으므로 쪼개서 사용!
- 코드를 프로그램으로 풀면 안됨, 프로세스로 풀어야한다.
  프로세스 -> 로직을 정리
  시나리오를 먼저 만듦
 	 ~하고 ~한다 (X)
  	 ~한다 (O)
```



## length

- 배열 오브젝트에 length 프로퍼티가 자동으로 설정됨
- 열거, 삭제는 할 수 없지만 변경은 가능
- length 프로퍼티 값을 변경하면 배열의 엘리먼트 수에 반영됨



## pop()

빈 배열이면 삭제할 수 없으며 undefined가 반환됨



## shift()

- 배열의 첫번째 엘리먼트를 삭제하고 삭제한 엘리먼트를 반환
- 삭제한 엘리먼트값이 undefined로 남지 않고 완전히 삭제됨 -> length값이 줄어듦
- 빈 배열이면 삭제할 수 없으며 undefined가 반환됨



## sort()

- 배열의 엘리먼트 값을 승순(가나다순)으로 정렬하여 반환
- Unicode값이 작으면 앞에 오고 크면 뒤에 옴
- sort대상 배열도 정렬되어 순서가 바뀜(원본도 바뀜)
- 역순 sort는 제공하지 않으나 파라미터에 함수를 작성하여 역순 sort가능



## reverse()

- 배열의 엘리먼트 위치를 역순으로 바꿈
- 대상 배열도 바뀜



## slice()

- 첫 번째 파라미터의 인덱스부터 두번째 파라미터의 인덱스 직전까지의 엘리먼트 반환
- 파라미터를 모두 작성하지 않으면 배열 전체 반환



## splice()

- 배열에서 엘리먼트를 삭제하고 삭제한 엘리먼트 반환





# Array (ES5)

- 키워드 : 시멘틱



## isArray()



## forEach()

- [1,2].forEach(function (element, index, list) {...});
- 배열 엘리먼트를 하나씩 읽어가면서 콜백 함수 호출
- 반복 횟수는 forEach()를 시작할 때 결정됨
- **forEach문을 사용가능한지 먼저 체크하고 불가능하면 for값을 사용한다.**



### for()와 forEach() 차이점

- 끝까지 돌아야하면 forEach(break문이 없음) 끝나야하면 for
- forEach()는 반복 시작 인덱스를 지정할 수 없으나 for()는 지정 할 수 있다. (ex: var i = 0)

```
for (var k = 2; k < 5; K++){...}
[1,2,3].forEach(function (element, index, values) {...})
```



## every()

- 배열 엘리먼트를 하나씩 읽어가면서 반환 값이 false가 될 때까지 콜백 함수 호출

```
var value = [20, 10, 30];
var result = value.every(function (element, index, list){
    console.log('값:' + element);
    return element > 15;
})
1. 10이 15보다 작으므로 false를 반환한다.
2. false를 반환하면 반복을 종료하므로 배열 마지막의 30이 실행되지 않는다.
```



## some()

- 반환값이 true가 될 때까지 콜백 함수 호출

```
var value = [20, 10, 30];
var result = value.some(function (element, index, all){
    console.log('값:' + element);
    return element < 15;
})
1. 10이 15보다 작으므로 true를 반환한다.
2. true를 반환하면 반복을 종료하므로 배열 마지막의 30이 실행되지 않는다.
```



## filter()

- 콜백 함수에서 true를 반환했을 때의 엘리먼트 값을 배열로 묶어 반환
- 콜백 함수에서 false만 반환한 후 종료하면 빈 배열을 반환
- 조건에 맞는 엘리먼트를 추려낼 때 사용 (엘리먼트 값이 바뀌지 않음)
- 반복과 파라미터 값을 넘겨주는 방법은 forEach()와 같음

```
var result = [10, 20, 30, 40].filter(function (element, index, list) {
    return element < 25;
})
```



## map()

- 콜백 함수에서 반환한 값을 새로운 배열에 설정하여 반환
- 반복과 파라미터 값을 넘겨주는 방법은 forEach()와 같음

```
var result = [10, 20, 30].map(function (element, index, list) {
    return element * 7;
})
1. 배열 엘리먼트 값에 7을 곱해 반환한다.
2. 반환한 값을 새로운 배열에 설정하여 반환한다.
```



## reduce()

- 배열 끝까지 콜백 함수를 호출하고 콜백 함수에서 반환한 값을 반환
- 두 번째 파라미터를 작성하면 처리가 다름
- 첫번째 파라미터만 작성한 경우 콜백 함수를 호출하면서 네 개의 파라미터 값을 넘겨 줌
  - 직전 값(previous), 현재값(current), 인덱스, 배열 전체
- 두번째 파라미터를 작성한 경우 콜백 함수를 호출하면서 네 개의 파라미터 값을 넘겨 줌
  - 직전 값(previous), 현재값(current), 인덱스, 배열 전체

```
var value = [10, 20, 30, 40];
var result = value.reduce(function (previous, current, index, all) {
    console.log('pre:' + previous + ', cur:' current);
    return previous + current;
})
```



## reduceRight()

- 배열 끝에서 앞으로 읽어가면서 콜백 함수를 호출하고 콜백 함수에서 반환한 값을 반환
- 다른 처리방법은 reduce()와 같음



## indexOf()

- 파라미터 값과 일치하는 엘리먼트의 인덱스를 반환
- 왼쪽에서 오른쪽으로 검색
- 일치하는 엘리먼트가 있으면 더 이상 검색하지 않고 종료 (일치하는 엘리먼트가 없으면 -1 반환)
- 데이터 타입까지 체크 (1 === '1'은 다름)
- 두 번째 파라미터를 작성하면 작성한 인덱스부터 검색, 디폴트 : 0
- 음수 값을 작성하면 length 프로퍼티 값을 더해 인덱스로 사용 (더한 값이 음수이면 0 사용)
- String과 Array 오브젝트의 반환 값이 서로 다르다.



## lastIndexOf()

- 배열 끝에서 부터 검색
- 나머지는 indexOf()와 같음