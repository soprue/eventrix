import { Event } from '@/types/Event';

export const eventDummyData: Event[] = [
  {
    uid: 'event1',
    organizerUID: 'org123',
    thumbnail:
      'https://www.ksp.go.kr/resources/crosseditor/binary/images/000001/20201130173253650_BMY0STMF.jpg',
    name: '글로벌 IT 컨퍼런스',
    category: 'IT/Technology',
    startDateTime: '2024-08-10T09:00:00Z',
    endDateTime: '2024-08-10T17:00:00Z',
    registrationStart: '2024-04-01T00:00:00Z',
    registrationEnd: '2024-08-01T23:59:59Z',
    locationName: '코엑스',
    locationAddress: '서울 강남구',
    description:
      '최신 IT 기술과 트렌드에 대해 배우고 네트워킹을 할 수 있는 이벤트입니다.',
    likesCount: 500,
    ticketOptions: [
      {
        optionName: '일반 참가',
        price: 100000,
        maxPurchaseLimit: 300,
        scheduledCount: 300,
        soldCount: 50,
      },
      {
        optionName: 'VIP 참가',
        price: 200000,
        maxPurchaseLimit: 100,
        scheduledCount: 100,
        soldCount: 20,
      },
    ],
    eventCreationDate: '2024-04-01T12:00:00Z',
  },
  {
    uid: 'event2',
    organizerUID: 'org456',
    thumbnail:
      'https://www.ksp.go.kr/resources/crosseditor/binary/images/000001/20201130173253650_BMY0STMF.jpg',
    name: '디자인 씽킹 워크숍',
    category: 'Design',
    startDateTime: '2024-09-15T10:00:00Z',
    endDateTime: '2024-09-15T16:00:00Z',
    registrationStart: '2024-07-01T00:00:00Z',
    registrationEnd: '2024-09-10T23:59:59Z',
    locationName: '디자인 플라자',
    locationAddress: '서울 중구',
    description:
      '창의력을 발휘하여 새로운 디자인을 창출할 수 있는 실습 중심 워크숍입니다.',
    likesCount: 200,
    ticketOptions: [
      {
        optionName: '기본 참가',
        price: 150000,
        maxPurchaseLimit: 200,
        scheduledCount: 200,
        soldCount: 100,
      },
    ],
    eventCreationDate: '2024-06-20T12:00:00Z',
  },
  {
    uid: 'event3',
    organizerUID: 'org789',
    thumbnail:
      'https://www.ksp.go.kr/resources/crosseditor/binary/images/000001/20201130173253650_BMY0STMF.jpg',
    name: '스타트업 펀딩 및 투자 세미나',
    category: 'Finance',
    startDateTime: '2024-10-05T13:00:00Z',
    endDateTime: '2024-10-05T18:00:00Z',
    registrationStart: '2024-08-01T00:00:00Z',
    registrationEnd: '2024-09-30T23:59:59Z',
    locationName: '서울 스타트업 허브',
    locationAddress: '서울 성동구',
    description:
      '스타트업의 펀딩 기회를 높이고, 투자자와의 네트워킹을 도모할 수 있는 세미나입니다.',
    likesCount: 300,
    ticketOptions: [
      {
        optionName: '일반 참가',
        price: 50000,
        maxPurchaseLimit: 150,
        scheduledCount: 150,
        soldCount: 75,
      },
      {
        optionName: '프리미엄 참가',
        price: 100000,
        maxPurchaseLimit: 50,
        scheduledCount: 50,
        soldCount: 25,
      },
    ],
    eventCreationDate: '2024-07-15T12:00:00Z',
  },
  {
    uid: 'event4',
    organizerUID: 'org1010',
    thumbnail:
      'https://www.ksp.go.kr/resources/crosseditor/binary/images/000001/20201130173253650_BMY0STMF.jpg',
    name: '글로벌 마케팅 트렌드 2024',
    category: 'Marketing',
    startDateTime: '2024-11-20T09:00:00Z',
    endDateTime: '2024-11-20T17:00:00Z',
    registrationStart: '2024-09-01T00:00:00Z',
    registrationEnd: '2024-11-15T23:59:59Z',
    locationName: '인천 송도 컨벤시아',
    locationAddress: '인천 연수구',
    description:
      '2024년 주목해야 할 글로벌 마케팅 전략 및 동향을 배울 수 있는 기회입니다.',
    likesCount: 420,
    ticketOptions: [
      {
        optionName: '기본 참가',
        price: 300000,
        maxPurchaseLimit: 200,
        scheduledCount: 200,
        soldCount: 120,
      },
      {
        optionName: '프리미엄 참가',
        price: 450000,
        maxPurchaseLimit: 100,
        scheduledCount: 100,
        soldCount: 30,
      },
    ],
    eventCreationDate: '2024-08-01T12:00:00Z',
  },
  {
    uid: 'event5',
    organizerUID: 'org1212',
    thumbnail:
      'https://www.ksp.go.kr/resources/crosseditor/binary/images/000001/20201130173253650_BMY0STMF.jpg',
    name: '자기계발 세미나: 새로운 시작',
    category: 'SelfImprovement',
    startDateTime: '2024-07-15T13:00:00Z',
    endDateTime: '2024-07-15T18:00:00Z',
    registrationStart: '2024-05-15T00:00:00Z',
    registrationEnd: '2024-07-10T23:59:59Z',
    locationName: '서울 국립중앙도서관',
    locationAddress: '서울 서초구',
    description:
      '개인의 성장과 발전을 위한 전문가의 조언과 함께 하는 자기계발 세미나.',
    likesCount: 200,
    ticketOptions: [
      {
        optionName: '표준 참가',
        price: 100000,
        maxPurchaseLimit: 150,
        scheduledCount: 150,
        soldCount: 75,
      },
    ],
    eventCreationDate: '2024-04-30T12:00:00Z',
  },
  {
    uid: 'event6',
    organizerUID: 'org1313',
    thumbnail:
      'https://www.ksp.go.kr/resources/crosseditor/binary/images/000001/20201130173253650_BMY0STMF.jpg',
    name: '라이프스타일 디자인 워크숍',
    category: 'Lifestyle',
    startDateTime: '2024-10-05T10:00:00Z',
    endDateTime: '2024-10-05T16:00:00Z',
    registrationStart: '2024-08-01T00:00:00Z',
    registrationEnd: '2024-10-01T23:59:59Z',
    locationName: '부산 벡스코',
    locationAddress: '부산 해운대구',
    description:
      '일상을 아름답게 만드는 라이프스타일 디자인 기법을 배우는 워크숍.',
    likesCount: 300,
    ticketOptions: [
      {
        optionName: '일반 참가',
        price: 80000,
        maxPurchaseLimit: 200,
        scheduledCount: 200,
        soldCount: 50,
      },
      {
        optionName: '특별 참가',
        price: 150000,
        maxPurchaseLimit: 50,
        scheduledCount: 50,
        soldCount: 20,
      },
    ],
    eventCreationDate: '2024-07-01T12:00:00Z',
  },
];
