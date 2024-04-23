import { EventType } from '@/types/Event';

export const eventDummyData: EventType[] = [
  {
    uid: 'event1',
    organizerUID: 'wflEa2XfzgOLRRXuGdmXpB6h7HW2',
    thumbnail:
      'https://www.ksp.go.kr/resources/crosseditor/binary/images/000001/20201130173253650_BMY0STMF.jpg',
    name: '글로벌 IT 컨퍼런스',
    category: 'IT/Technology',
    startDateTime: new Date('2024-08-10T09:00:00Z'),
    endDateTime: new Date('2024-08-10T17:00:00Z'),
    registrationStart: new Date('2024-04-01T00:00:00Z'),
    registrationEnd: new Date('2024-08-01T23:59:59Z'),
    location: '서울 강남구 삼성동',
    description:
      '최신 IT 기술과 트렌드에 대해 배우고 네트워킹을 할 수 있는 이벤트입니다.',
    likesCount: 500,
    ticketOptions: [
      {
        id: '7571e92b-f38b-4878-959c-f76ab9290ed8',
        optionName: '일반 참가',
        price: 100000,
        scheduledCount: 300,
        soldCount: 50,
      },
      {
        id: 'c66e189f-9c16-4511-91fa-f0d05d12c2c9',
        optionName: 'VIP 참가',
        price: 200000,
        scheduledCount: 100,
        soldCount: 20,
      },
    ],
    eventCreationDate: new Date('2024-04-01T12:00:00Z'),
  },
  {
    uid: 'event2',
    organizerUID: 'wflEa2XfzgOLRRXuGdmXpB6h7HW2',
    thumbnail:
      'https://img1.daumcdn.net/thumb/R1280x0.fpng/?fname=http://t1.daumcdn.net/brunch/service/user/21At/image/xZJZneBUXiIPqryxiU0G5FVAzTM.png',
    name: '디자인 씽킹 워크숍',
    category: 'Design',
    startDateTime: new Date('2024-09-15T10:00:00Z'),
    endDateTime: new Date('2024-09-15T16:00:00Z'),
    registrationStart: new Date('2024-07-01T00:00:00Z'),
    registrationEnd: new Date('2024-09-10T23:59:59Z'),
    location: '서울 중구',
    description:
      '창의력을 발휘하여 새로운 디자인을 창출할 수 있는 실습 중심 워크숍입니다.',
    likesCount: 200,
    ticketOptions: [
      {
        id: '7571e92b-f38b-4878-959c-f76ab9290ed8',
        optionName: '기본 참가',
        price: 150000,
        scheduledCount: 200,
        soldCount: 100,
      },
    ],
    eventCreationDate: new Date('2024-06-20T12:00:00Z'),
  },
  {
    uid: 'event3',
    organizerUID: 'wflEa2XfzgOLRRXuGdmXpB6h7HW2',
    thumbnail:
      'https://cdn.wadiz.kr/ft/images/green001/2018/1112/20181112162021626_0.png',
    name: '스타트업 펀딩 및 투자 세미나',
    category: 'Finance',
    startDateTime: new Date('2024-10-05T13:00:00Z'),
    endDateTime: new Date('2024-10-05T18:00:00Z'),
    registrationStart: new Date('2024-08-01T00:00:00Z'),
    registrationEnd: new Date('2024-09-30T23:59:59Z'),
    location: '서울 성동구',
    description:
      '스타트업의 펀딩 기회를 높이고, 투자자와의 네트워킹을 도모할 수 있는 세미나입니다.',
    likesCount: 300,
    ticketOptions: [
      {
        id: '7571e92b-f38b-4878-959c-f76ab9290ed8',
        optionName: '일반 참가',
        price: 50000,
        scheduledCount: 150,
        soldCount: 75,
      },
      {
        id: 'c66e189f-9c16-4511-91fa-f0d05d12c2c9',
        optionName: '프리미엄 참가',
        price: 100000,
        scheduledCount: 50,
        soldCount: 25,
      },
    ],
    eventCreationDate: new Date('2024-07-15T12:00:00Z'),
  },
  {
    uid: 'event4',
    organizerUID: 'wflEa2XfzgOLRRXuGdmXpB6h7HW2',
    thumbnail:
      'https://www.wishcompany.net/wp-content/uploads/2023/03/230306_%EB%B3%B4%EB%8F%84%EC%9E%90%EB%A3%8C%EC%9C%84%EC%8B%9C%EC%BB%B4%ED%8D%BC%EB%8B%88-%E2%80%98K-%EB%B7%B0%ED%8B%B0-%EA%B8%80%EB%A1%9C%EB%B2%8C-%EC%84%B8%EB%AF%B8%EB%82%98%E2%80%99-%EA%B0%9C%EC%B5%9C%E2%80%A6%ED%95%B4%EC%99%B8-%EA%B3%B5%EB%9E%B5%EB%B2%95-%EA%B3%B5%EC%9C%A0-1.jpg',
    name: '글로벌 마케팅 트렌드 2024',
    category: 'Marketing',
    startDateTime: new Date('2024-11-20T09:00:00Z'),
    endDateTime: new Date('2024-11-20T17:00:00Z'),
    registrationStart: new Date('2024-09-01T00:00:00Z'),
    registrationEnd: new Date('2024-11-15T23:59:59Z'),
    location: '인천 연수구',
    description:
      '2024년 주목해야 할 글로벌 마케팅 전략 및 동향을 배울 수 있는 기회입니다.',
    likesCount: 420,
    ticketOptions: [
      {
        id: '7571e92b-f38b-4878-959c-f76ab9290ed8',
        optionName: '기본 참가',
        price: 300000,
        scheduledCount: 200,
        soldCount: 120,
      },
      {
        id: 'c66e189f-9c16-4511-91fa-f0d05d12c2c9',
        optionName: '프리미엄 참가',
        price: 450000,
        scheduledCount: 100,
        soldCount: 30,
      },
    ],
    eventCreationDate: new Date('2024-08-01T12:00:00Z'),
  },
  {
    uid: 'event5',
    organizerUID: 'wflEa2XfzgOLRRXuGdmXpB6h7HW2',
    thumbnail:
      'https://chibaokta.net/wp-content/uploads/2022/11/4f8c11ba7589682c730d4ae113ac47e4-1-819x1024.jpg',
    name: '자기계발 세미나: 새로운 시작',
    category: 'SelfImprovement',
    startDateTime: new Date('2024-07-15T13:00:00Z'),
    endDateTime: new Date('2024-07-15T18:00:00Z'),
    registrationStart: new Date('2024-05-15T00:00:00Z'),
    registrationEnd: new Date('2024-07-10T23:59:59Z'),
    location: '서울 서초구',
    description:
      '개인의 성장과 발전을 위한 전문가의 조언과 함께 하는 자기계발 세미나.',
    likesCount: 200,
    ticketOptions: [
      {
        id: '7571e92b-f38b-4878-959c-f76ab9290ed8',
        optionName: '표준 참가',
        price: 100000,
        scheduledCount: 150,
        soldCount: 75,
      },
    ],
    eventCreationDate: new Date('2024-04-30T12:00:00Z'),
  },
  {
    uid: 'event6',
    organizerUID: 'wflEa2XfzgOLRRXuGdmXpB6h7HW2',
    thumbnail:
      'https://img.etoday.co.kr/pto_db/2022/05/20220504104134_1748362_1200_675.jpg',
    name: '라이프스타일 디자인 워크숍',
    category: 'Lifestyle',
    startDateTime: new Date('2024-10-05T10:00:00Z'),
    endDateTime: new Date('2024-10-05T16:00:00Z'),
    registrationStart: new Date('2024-08-01T00:00:00Z'),
    registrationEnd: new Date('2024-10-01T23:59:59Z'),
    location: '부산 해운대구',
    description:
      '일상을 아름답게 만드는 라이프스타일 디자인 기법을 배우는 워크숍.',
    likesCount: 300,
    ticketOptions: [
      {
        id: '7571e92b-f38b-4878-959c-f76ab9290ed8',
        optionName: '일반 참가',
        price: 80000,
        scheduledCount: 200,
        soldCount: 50,
      },
      {
        id: 'c66e189f-9c16-4511-91fa-f0d05d12c2c9',
        optionName: '특별 참가',
        price: 150000,
        scheduledCount: 50,
        soldCount: 20,
      },
    ],
    eventCreationDate: new Date('2024-07-01T12:00:00Z'),
  },
];
