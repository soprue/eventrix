import { expect } from '@jest/globals';
import { Timestamp } from 'firebase/firestore/lite';

import formatEventPeriod from '@utils/event/formatEventPeriod';

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

describe('formatEventPeriod 유틸리티 함수 테스트', () => {
  it('같은 날짜의 시작과 종료 타임스탬프에 대해 올바르게 포맷된 문자열을 반환한다.', () => {
    const startTimestamp = new MockTimestamp(
      '2024-04-26T00:00:00+09:00',
    ) as unknown as Timestamp;
    const endTimestamp = new MockTimestamp(
      '2024-04-26T03:00:00+09:00',
    ) as unknown as Timestamp;

    const expectedOutput =
      '2024년 4월 26일 금요일 오전 12:00 - 4월 26일 금요일 오전 03:00';

    expect(formatEventPeriod(startTimestamp, endTimestamp)).toBe(
      expectedOutput,
    );
  });

  it('다른 날짜의 시작과 종료 타임스탬프에 대해 올바르게 포맷된 문자열을 반환한다.', () => {
    const startTimestamp = new MockTimestamp(
      '2024-04-26T00:00:00+09:00',
    ) as unknown as Timestamp;
    const endTimestamp = new MockTimestamp(
      '2024-04-27T03:00:00+09:00',
    ) as unknown as Timestamp;

    const expectedOutput =
      '2024년 4월 26일 금요일 오전 12:00 - 4월 27일 토요일 오전 03:00';

    expect(formatEventPeriod(startTimestamp, endTimestamp)).toBe(
      expectedOutput,
    );
  });
});
