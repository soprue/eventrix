export const AuthErrorMap: { [key: string]: string } = {
  'auth/invalid-email': '유효하지 않은 이메일 형식입니다.',
  'auth/email-already-in-use': '이미 사용 중인 이메일 주소입니다.',
  'auth/weak-password':
    '비밀번호가 너무 약합니다. 더 강력한 비밀번호를 사용하세요.',
  'auth/user-disabled': '이 사용자 계정은 비활성화되었습니다.',
  'auth/user-not-found': '해당 사용자를 찾을 수 없습니다.',
  'auth/network-request-failed':
    '네트워크 오류가 발생했습니다. 연결을 확인하고 다시 시도하세요.',
  'auth/internal-error':
    '서버 내부 오류가 발생했습니다. 나중에 다시 시도하세요.',
  'auth/operation-not-allowed': '이 작업은 현재 허용되지 않습니다.',
  'auth/too-many-requests': '요청이 너무 많습니다. 나중에 다시 시도하세요.',
};
