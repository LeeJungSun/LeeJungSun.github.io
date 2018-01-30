# Alert

## Alert란
간략하고 중요한 메시지를 표시

**예시 이미지**
https://github.com/LeeJungSun/LeeJungSun.github.io/blob/master/study/a11y/dist/img/example01.png
https://github.com/LeeJungSun/LeeJungSun.github.io/blob/master/study/a11y/dist/img/example01_01.png
https://github.com/LeeJungSun/LeeJungSun.github.io/blob/master/study/a11y/dist/img/example02.png
https://github.com/LeeJungSun/LeeJungSun.github.io/blob/master/study/a11y/dist/img/example03.png


## WAI-ARIA 역할(Roles), 속성(Properties), 상태(States)
- aria-live
- aria-atomic


## 유의할점 note~
- 현재로서는 화면 판독기가 페이지로드가 완료되기 전에 페이지에있는 경고를 사용자에게 알리지 않는다는 점에 유의해야합니다.
- 키보드 포커스에 영향을주지 않는 것이 중요합니다. (포커스가 어디에 있는지 상관 없이 자동으로 알리기 때문)
- 자동으로 사라지는 경고를 디자인하지 않는 것이 중요합니다.
- 경고로 인한 중단 빈도 빈번한 중단은 시각 및인지 장애를 가진 사람들의 유용성을 저해


## TEST
- 테스트 환경
	- 모바일 
		- os
		- version
	- PC
		- os
		- browser
	- 스크린리더
		- NVDA, voiceover
- 테스트 결과
	- 표 형식
- 이슈사항


## 참고 사이트
https://www.w3.org/TR/wai-aria-1.1/#alert
https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_alert_role

https://www.w3.org/TR/wai-aria-1.1/#aria-live
https://www.w3.org/TR/wai-aria-1.1/#aria-atomic
https://developers.google.com/web/fundamentals/accessibility/semantics-aria/hiding-and-updating-content?hl=ko


--------

생각할것
- alert가 노출되고 일정시간이 지난 후 사라지는 경우 내당 alert의 노출시간은 어떤 기준으로 판단해야하는가?
- form을 예시로 들었을때 일정 조건이 충족되어 alert이 사라지는 경우 사라졌다는걸 명시해주어야하는가?