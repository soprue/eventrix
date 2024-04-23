export const CATEGORIES = {
  'IT/Technology': 'IT/기술',
  Finance: '금융',
  Design: '디자인',
  Career: '커리어',
  Business: '비즈니스',
  Marketing: '마케팅',
  SelfImprovement: '자기계발',
  Sports: '스포츠',
  Lifestyle: '라이프스타일',
  Hobby: '취미',
} as const;

export type Category = keyof typeof CATEGORIES;
