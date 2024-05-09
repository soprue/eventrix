export const CATEGORIES = {
  'IT/기술': 'IT/기술',
  금융: '금융',
  디자인: '디자인',
  커리어: '커리어',
  비즈니스: '비즈니스',
  마케팅: '마케팅',
  자기계발: '자기계발',
  스포츠: '스포츠',
  라이프스타일: '라이프스타일',
  취미: '취미',
} as const;

export type Category = keyof typeof CATEGORIES;
