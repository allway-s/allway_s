import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const ScrollToTop = () => {
  // 현재 페이지의 경로(pathname)를 가져옵니다.
  const { pathname } = useLocation();

  useEffect(() => {
    // 경로가 바뀔 때마다 브라우저의 스크롤을 (0, 0) 위치로 이동시킵니다.
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; // 화면에 렌더링할 것은 없으므로 null 반환
};
