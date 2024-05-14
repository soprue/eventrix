import { expect } from '@jest/globals';
import { Timestamp } from 'firebase/firestore/lite';

import { EventType } from '@/types/event';
import calculateEventStatus from '@utils/mypage/calculateEventStatus';

// Timestamp 객체를 모방하기 위한 Mock 클래스
class MockTimestamp {
  constructor(public dateInput: string | number) {}

  toDate() {
    const date =
      typeof this.dateInput === 'string'
        ? new Date(this.dateInput)
        : new Date(this.dateInput * 1000);
    return date;
  }
}

describe('calculateEventStatus 유틸리티 함수 테스트', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  const baseEvent: EventType = {
    organizerUID: 'organizer123',
    thumbnail: 'thumbnail.jpg',
    name: 'Test Event',
    category: 'IT/기술',
    startDateTime: new MockTimestamp(
      '2024-06-01T10:00:00+09:00',
    ) as unknown as Timestamp,
    endDateTime: new MockTimestamp(
      '2024-06-01T12:00:00+09:00',
    ) as unknown as Timestamp,
    registrationStart: new MockTimestamp(
      '2024-05-01T00:00:00+09:00',
    ) as unknown as Timestamp,
    registrationEnd: new MockTimestamp(
      '2024-05-31T23:59:59+09:00',
    ) as unknown as Timestamp,
    location: 'Test Location',
    description: 'This is a test event',
    likesCount: 0,
    ticketOptions: [
      {
        scheduledCount: 100,
        soldCount: 0,
        price: 10000,
        optionName: '일반',
        id: 'ticket1',
      },
    ],
    eventCreationDate: new MockTimestamp(
      '2024-04-01T00:00:00+09:00',
    ) as unknown as Timestamp,
  };

  it('현재 날짜가 등록 시작일 이전일 경우 "모집 준비"를 반환해야 합니다.', () => {
    jest.setSystemTime(new Date('2024-04-30T23:59:59+09:00'));

    const status = calculateEventStatus(baseEvent);
    expect(status).toBe('모집 준비');
  });

  it('현재 날짜가 등록 기간 중이고 티켓이 남아 있을 경우 "모집 진행"을 반환해야 합니다.', () => {
    jest.setSystemTime(new Date('2024-05-15T12:00:00+09:00'));

    const status = calculateEventStatus(baseEvent);
    expect(status).toBe('모집 진행');
  });

  it('현재 날짜가 등록 기간 중이지만 티켓이 모두 팔린 경우 "모집 마감"을 반환해야 합니다.', () => {
    const soldOutEvent = {
      ...baseEvent,
      ticketOptions: [
        {
          scheduledCount: 100,
          soldCount: 100,
          price: 10000,
          optionName: '일반',
          id: 'ticket1',
        },
      ],
    };

    jest.setSystemTime(new Date('2024-05-15T12:00:00+09:00'));
    const status = calculateEventStatus(soldOutEvent);
    expect(status).toBe('모집 마감');
  });

  it('현재 날짜가 등록 종료일 이후일 경우 "모집 마감"을 반환해야 합니다.', () => {
    jest.setSystemTime(new Date('2024-06-01T00:00:00+09:00'));

    const status = calculateEventStatus(baseEvent);
    expect(status).toBe('모집 마감');
  });

  it('현재 날짜가 이벤트 기간 중일 경우 "행사 진행"을 반환해야 합니다.', () => {
    jest.setSystemTime(new Date('2024-06-01T11:00:00+09:00'));

    const status = calculateEventStatus(baseEvent);
    expect(status).toBe('행사 진행');
  });

  it('현재 날짜가 이벤트 종료일 이후일 경우 "행사 종료"를 반환해야 합니다.', () => {
    jest.setSystemTime(new Date('2024-06-01T12:01:00+09:00'));

    const status = calculateEventStatus(baseEvent);
    expect(status).toBe('행사 종료');
  });
});
