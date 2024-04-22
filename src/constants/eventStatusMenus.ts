export const statusMenus = [
  '모집 준비',
  '모집 진행',
  '모집 마감',
  '행사 진행',
  '행사 종료',
] as const;

export type StatusMenuType = (typeof statusMenus)[number];
