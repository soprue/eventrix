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
  'auth/admin-restricted-operation': '이 작업은 관리자 권한이 필요합니다.',
  'auth/argument-error': '입력 값이 올바르지 않습니다. 입력 값을 확인해주세요.',
  'auth/app-not-authorized': '이 앱은 인증을 사용할 권한이 없습니다.',
  'auth/authentication-failed':
    '인증에 실패했습니다. 입력 정보를 확인하고 다시 시도하세요.',
  'auth/invalid-api-key': 'API 키가 유효하지 않습니다.',
  'auth/access-denied': '접근이 거부되었습니다. 접근 권한을 확인하세요.',
  'auth/session-expired': '세션이 만료되었습니다. 다시 로그인하세요.',
  'auth/invalid-user-token': '사용자 토큰이 유효하지 않습니다.',
  'auth/wrong-password': '비밀번호가 올바르지 않습니다. 다시 입력하세요.',
  'auth/credential-already-in-use': '이 인증 정보는 이미 사용 중입니다.',
  'auth/invalid-credential': '제공된 인증 정보가 유효하지 않습니다.',
  'auth/requires-recent-login': '보안을 위해 최근 로그인이 필요합니다.',
  'auth/account-exists-with-different-credential':
    '이 이메일은 다른 인증 방법으로 이미 등록되어 있습니다.',
  'auth/invalid-verification-code': '인증 코드가 잘못되었습니다.',
  'auth/invalid-verification-id': '인증 ID가 유효하지 않습니다.',
  'auth/email-change-needs-verification': '이메일 변경을 확인해야 합니다.',
  'auth/credential-mismatch': '인증 정보가 일치하지 않습니다.',
  'auth/unauthorized-continue-uri': '계속 URI가 승인되지 않았습니다.',
};
