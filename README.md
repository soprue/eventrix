![og_image](https://github.com/soprue/eventrix/assets/62260343/f1473bc4-9535-4924-8f45-ed5c6e528e68)

> 📌 <br/><br/>
**Eventrix**는 다양한 컨퍼런스 및 이벤트 티켓을 예약할 수 있는 온라인 플랫폼입니다.  <br/><br/>
배포 URL: https://eventrix.vercel.app/  
GitBook URL: https://eventrix-1.gitbook.io/docs/  
개발 기간: 2024.04 ~ 2024.05 (4주)

<br/>

> 💻 테스트 계정  <br/><br/>
[주최자]    
ID: organizer@email.com  
PW: abcd1234! <br/><br/>
[참여자]  
ID: buyer@email.com  
PW: abcd1234!

<br />

## 주요 기능 - [GIF과 함께 보기](https://eventrix-1.gitbook.io/docs/features/undefined)

#### [이벤트 모아보기]
- 필터링: 사용자는 카테고리, 가격 필터를 적용하여 원하는 이벤트를 쉽게 찾을 수 있습니다.
- 정렬 옵션: 사용자는 최신순 또는 인기순으로 이벤트를 정렬할 수 있습니다.

#### [이벤트 상세 정보 및 참여]
- 상세 정보 제공: 각 이벤트 페이지에서는 장소, 시간 등 상세 정보를 제공합니다.
- 참여하기와 찜하기: `참여자`는 상세 페이지를 통해 참여 신청을 하거나 찜하기 기능을 이용할 수 있습니다.

#### [이벤트 참여하기 및 결제]
- 간편한 예약 프로세스: 사용자는 티켓을 선택하고, 몇 단계의 간단한 절차를 통해 티켓을 예약하고 결제할 수 있습니다.
- 다양한 결제 옵션: 결제 과정은 여러 결제 방법을 지원하여 사용자가 편리하게 결제할 수 있도록 설계되었습니다.

#### [장바구니]
- 장바구니에 추가: 사용자는 관심 있는 이벤트의 티켓을 장바구니에 추가할 수 있습니다. 이를 통해 여러 이벤트의 티켓을 한 곳에서 모아보고, 필요에 따라 한 번에 결제할 수 있습니다.
- 로컬 스토리지 활용: 장바구니에 담긴 티켓 정보는 로컬 스토리지에 저장됩니다. 이를 통해 사용자가 브라우저를 닫았다가 다시 열어도 이전에 추가한 티켓 정보가 유지됩니다.

#### [`참여자`용 티켓 관리]
- 티켓 상태 확인 및 관리: 참여자는 자신이 구매한 티켓의 상태를 확인할 수 있고, 필요한 경우 취소할 수 있습니다.

#### [`주최자`용 이벤트 관리]
- 이벤트 관리: 주최자는 이벤트를 등록, 수정, 삭제할 수 있으며, 테이블을 통해 자신의 이벤트를 한눈에 볼 수 있습니다. 상태별로 필터링하여 볼 수도 있습니다.

#### [`주최자`용 주문 관리 테이블]
- 주문 상태 관리: 주최자는 모든 티켓 판매 상태를 확인하고, 주문 상태를 업데이트할 수 있는 테이블을 사용할 수 있습니다.

<br />

## 기술 스택
![image](https://github.com/soprue/eventrix/assets/62260343/ac619bed-a5b2-4c68-8d56-6056c9347cca)

<br />

## 기술적 도전
- [React DevTools 프로파일러를 활용하여 컴포넌트 렌더링 성능 개선하기](https://velog.io/@aborrencce/React-DevTools-프로파일러-렌더링-성능-개선하기)  
- [Vite 환경에서 Bundle Analyzer로 빌드 최적화하기](https://velog.io/@aborrencce/Vite-환경에서-Bundle-Analyzer로-최적화하기)  
  - **빌드 시간** 11.66초 -> 6.15초, 47% 개선
- [Lighthouse를 기반으로 LCP 성능 개선하기](https://velog.io/@aborrencce/Lighthouse를-기반으로-LCP-성능-개선하기)
  - **LCP** 3.0초 -> 1.1초, 63.33% 감소
  - **성능 점수** 75점 -> 92점, 22.67% 증가

<br />

## 트러블 슈팅
- [zustand/local storage/firebase 로그인 상태 동기화 설계](https://velog.io/@aborrencce/zustand-firebase-로그인-상태-동기화-설계)
- [[Cypress] Firebase를 활용한 회원가입 자동화 테스트 트러블 슈팅](https://velog.io/@aborrencce/Cypress-Firebase-테스트-트러블-슈팅)

<br />

## 아키텍처
![311127838-b4ca4f5b-6b57-44bd-99f5-7811c82467e5](https://github.com/soprue/eventrix/assets/62260343/75737710-b0c2-4571-acc2-863b5744f405)
```
📦eventrix
 ┣ 📂__test__
 ┣ 📂cypress
 ┣ 📂public
 ┣ 📂src
 ┃ ┣ 📂assets
 ┃ ┣ 📂components
 ┃ ┣ 📂constants
 ┃ ┣ 📂hooks
 ┃ ┣ 📂pages
 ┃ ┣ 📂services
 ┃ ┣ 📂store
 ┃ ┣ 📂types
 ┗ ┗ 📂utils
```

- `__test__`: 단위 테스트 파일을 포함합니다.
- `cypress`: E2E 테스트 파일을 포함합니다.
- `src/services`: 백엔드와의 통신을 처리하는 서비스 로직이 위치합니다.
- `src/store`: 상태 관리 로직이 포함된 폴더입니다.
