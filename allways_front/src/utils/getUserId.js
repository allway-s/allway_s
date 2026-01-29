export const getUserIdFromToken = () => {
  const token = localStorage.getItem('accessToken');
  if (!token) return null;

  try {
    const payload = token.split('.')[1];
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join(''),
    );
    const decoded = JSON.parse(jsonPayload);
    return decoded.userId ?? null;
  } catch (e) {
    console.error('토큰 파싱 실패', e);
    return null;
  }
};