<!-- $theme: gaia -->

# Alert

## Alert 이란
사용자의 작업을 방해하지 않고 사용자에게 간략하고 중요한 메시지를 표시하는 요소입니다.

동적으로 렌더링된 Alert는 대부분의 스크린리더기에서 자동으로 사용자에게 메시지를 알리고 일부 운영체제에서는 경고음을 울릴 수 있습니다.


**예시 이미지**
https://github.com/LeeJungSun/LeeJungSun.github.io/blob/master/study/a11y/dist/img/example01.png
https://github.com/LeeJungSun/LeeJungSun.github.io/blob/master/study/a11y/dist/img/example01_01.png
https://github.com/LeeJungSun/LeeJungSun.github.io/blob/master/study/a11y/dist/img/example02.png
https://github.com/LeeJungSun/LeeJungSun.github.io/blob/master/study/a11y/dist/img/example03.png

*고려사항
1. 자동으로 사라지는 Alert를 디자인하지 않는 것이 중요합니다. 너무 빨리 사라지는 경고는 WCAG 2.0 / 2.2.3을 충족시키지 못하게 될 수 있습니다.
2. Alert으로 인한 빈번한 중단은 시각 및 인지 장애를 가진 사람들의 유용성을 저해하여 WCAG 2.0 / 2.2.4의 요구 사항을 충족시키지 못하게합니다.


Alert은 포커스가 이동할 필요가 없기 때문에 컨텐츠 작업자는 사용자가 Alert을 닫을 것을 요구해서는 안됩니다. 닫아야하는 Alert을 사용할 경우 작업자는 role="alertdialog"를 사용해야합니다.



## WAI-ARIA ~~~
aria-live
사용자가 페이지의 어느부분을 탐색하는 것과 상관없이 새롭게 업데이트된 정보를 사용자에게 즉시 알릴 수 있습니다.
[Values]
- off (default)
  해당 영역을 사용자가 탐색하는 중이 아닐 경우 변경사항을 사용자에게 제공하지않습니다.
- assertive
  사용자가 진행하던 작업을 중단하고 변경사항을 사용자에게 즉시 알리도록 하는 역할을 합니다.
  페이지에 오류가 발생했을 경우나 사용자가 작업한 입력란이 업데이트 되는 경우와 같이 중요하거나 긴급하게 알려야할 경우 사용하는 것을 권고합니다.
- polite
  사용자가 진행하던 작업을 마치면 변경사항을 알리도록하는 역할을 합니다.
  중요하지만 긴급하지 않은 변경 사항일 경우에 적합합니다.


aria-atomic
변경사항을 사용자에게 전달할 때 변경된 영역만 제공할지 변경된 영역 포함하여 전체 영역을 제공할지 여부를 나타냅니다.
[Values]
- false (default)
  변경된 사항만 표시합니다.
    
- true
  변경된 사항을 포함한 전체 영역을 표시합니다.
    
  
## 유의할점? note?
- 현재로서는 화면 판독기가 페이지로드가 완료되기 전에 페이지에있는 경고를 사용자에게 알리지 않는다는 점에 유의해야합니다.
- 키보드 포커스에 영향을주지 않는 것이 중요합니다. (포커스가 어디에 있는지 상관 없이 자동으로 알리기 때문)
- 자동으로 사라지는 경고를 디자인하지 않는 것이 중요합니다.
- 경고로 인한 중단 빈도 빈번한 중단은 시각 및인지 장애를 가진 사람들의 유용성을 저해


## TEST ~~
- 테스트 환경
	- 모바일 
		- os
		- version
	- PC
		- os
		- browser
	- 스크린리더
		- NVDA, voiceover
		- 
- 테스트 결과
	- 크롬 NVDA (X)
	- IE NVDA (O)
	- 갤4 5.0.1 talkback (O)
	- 아이폰X 11.2.2 voiceover (X)

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