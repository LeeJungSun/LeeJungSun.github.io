<!-- $theme: gaia -->

live region


케이스
- form alert
- search
- timer
- chatting




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
  
  
aria-relevant
https://www.w3.org/TR/2011/CR-wai-aria-20110118/states_and_properties#aria-relevant

