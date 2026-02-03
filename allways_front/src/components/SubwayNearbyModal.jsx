/** @jsxImportSource @emotion/react */
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { s } from "./SubwayNearbyModalStyle";

// ✅ onSelect props 추가: 주소가 확정되면 이 함수를 호출합니다.
export default function SubwayNearbyModal({ isOpen, onClose, onSelect }) {
  const mapRef = useRef(null);
  const mapElRef = useRef(null);

  const markersRef = useRef([]);          // 서브웨이 마커들
  const redMarkerRef = useRef(null);      // 내가 찍은 빨간핀
  const searchMarkerRef = useRef(null);   // ✅ 검색(입력) 위치 마커
  const infoRef = useRef(null);           // 인포윈도우

  const placesRef = useRef(null);
  const geocoderRef = useRef(null);

  const [keyword, setKeyword] = useState("");
  const [statusText, setStatusText] = useState("준비됨");

  const [subwayList, setSubwayList] = useState([]);
  const [pickedAddress, setPickedAddress] = useState("");
  const [pickedTitle, setPickedTitle] = useState("다른 위치");

  // ---- helpers ----
  const clearSubwayMarkers = () => {
    markersRef.current.forEach((m) => m.setMap(null));
    markersRef.current = [];
  };

  const openInfo = (marker, title) => {
    const map = mapRef.current;
    if (!map || !infoRef.current || !marker) return;

    infoRef.current.setContent(
      `<div style="padding:6px 8px;font-size:12px;font-weight:900;">${title}</div>`
    );
    infoRef.current.open(map, marker);
  };

  const setRedMarkerAt = (lat, lng, title = "내가 찍은 위치") => {
    const map = mapRef.current;
    if (!map) return;

    const pos = new window.kakao.maps.LatLng(lat, lng);

    // 기존 빨간핀 제거
    if (redMarkerRef.current) redMarkerRef.current.setMap(null);

    // 빨간 마커(공식 예제 사이즈/오프셋)
    const markerImage = new window.kakao.maps.MarkerImage(
      "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png",
      new window.kakao.maps.Size(35, 35),
      { offset: new window.kakao.maps.Point(12, 35) }
    );

    const redMarker = new window.kakao.maps.Marker({
      position: pos,
      image: markerImage,
    });

    redMarker.setMap(map);
    redMarkerRef.current = redMarker;

    openInfo(redMarker, title);
  };

  const setSearchMarkerAt = (lat, lng, title = "검색 위치") => {
    const map = mapRef.current;
    if (!map) return;

    const pos = new window.kakao.maps.LatLng(lat, lng);

    // 기존 검색 마커 제거
    if (searchMarkerRef.current) searchMarkerRef.current.setMap(null);

    // 파란/별 마커(구분용)
    const blueImage = new window.kakao.maps.MarkerImage(
      "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
      new window.kakao.maps.Size(24, 35),
      { offset: new window.kakao.maps.Point(12, 35) }
    );

    const marker = new window.kakao.maps.Marker({
      position: pos,
      image: blueImage,
    });

    marker.setMap(map);
    searchMarkerRef.current = marker;

    openInfo(marker, title);
  };

  const searchSubwayAround = (lat, lng) => {
    const map = mapRef.current;
    const ps = placesRef.current;
    if (!map || !ps) return;

    setStatusText("주변 서브웨이 검색 중...");

    ps.keywordSearch(
      "서브웨이",
      (data, status) => {
        if (status !== window.kakao.maps.services.Status.OK) {
          setStatusText("검색 실패");
          setSubwayList([]);
          return;
        }

        clearSubwayMarkers();

        const top = [...data]
          .sort((a, b) => Number(a.distance || 1e9) - Number(b.distance || 1e9))
          .slice(0, 10);

        setSubwayList(top);
        setStatusText(`검색 결과 ${top.length}개`);

        const bounds = new window.kakao.maps.LatLngBounds();

        top.forEach((p) => {
          const pos = new window.kakao.maps.LatLng(Number(p.y), Number(p.x));
          bounds.extend(pos);

          const marker = new window.kakao.maps.Marker({ position: pos });
          marker.setMap(map);
          markersRef.current.push(marker);

          window.kakao.maps.event.addListener(marker, "click", () => {
            openInfo(marker, p.place_name);
          });
        });

        if (top.length) map.setBounds(bounds);
      },
      {
        location: new window.kakao.maps.LatLng(lat, lng),
        radius: 1500,
        sort: window.kakao.maps.services.SortBy.DISTANCE,
      }
    );
  };

  const focusSubway = (idx) => {
    const map = mapRef.current;
    if (!map) return;

    const p = subwayList[idx];
    if (!p) return;

    const pos = new window.kakao.maps.LatLng(Number(p.y), Number(p.x));
    map.panTo(pos);

    const marker = markersRef.current[idx];
    if (marker) openInfo(marker, p.place_name);
  };

  // ---- map init (open마다 새로 생성) ----
  useEffect(() => {
    if (!isOpen) return;

    if (!window.kakao || !window.kakao.maps) {
      console.error("Kakao Maps SDK가 아직 로드되지 않았습니다.");
      return;
    }

    let disposed = false;

    window.kakao.maps.load(() => {
      if (disposed) return;

      const container = mapElRef.current;
      if (!container) return;

      // 🔥 중요: 재오픈 시 이전 지도 잔상/DOM 꼬임 방지
      container.innerHTML = "";

      const map = new window.kakao.maps.Map(container, {
        center: new window.kakao.maps.LatLng(37.5665, 126.978),
        level: 5,
      });

      mapRef.current = map;
      placesRef.current = new window.kakao.maps.services.Places();
      geocoderRef.current = new window.kakao.maps.services.Geocoder();
      infoRef.current = new window.kakao.maps.InfoWindow({ zIndex: 3 });

      // 모달에서 지도 깨짐 방지(2프레임 정도 보정)
      requestAnimationFrame(() => {
        if (!mapRef.current) return;
        map.relayout();
        map.setCenter(map.getCenter());
        requestAnimationFrame(() => {
          if (!mapRef.current) return;
          map.relayout();
          map.setCenter(map.getCenter());
        });
      });

      // 지도 클릭 => 빨간핀 + 주소
      window.kakao.maps.event.addListener(map, "click", (mouseEvent) => {
        const lat = mouseEvent.latLng.getLat();
        const lng = mouseEvent.latLng.getLng();

        const geocoder = geocoderRef.current;
        if (!geocoder) return;

        geocoder.coord2Address(lng, lat, (result, status) => {
          if (status !== window.kakao.maps.services.Status.OK) return;

          const roadAddr = result[0]?.road_address?.address_name;
          const jibunAddr = result[0]?.address?.address_name;
          const address = roadAddr || jibunAddr || "주소 정보 없음";

          setPickedTitle("내가 찍은 위치");
          setPickedAddress(address);

          setRedMarkerAt(lat, lng, "내가 찍은 위치");
        });
      });
    });

    // cleanup
    return () => {
      disposed = true;

      clearSubwayMarkers();

      if (redMarkerRef.current) {
        redMarkerRef.current.setMap(null);
        redMarkerRef.current = null;
      }

      // ✅ 검색 마커 제거
      if (searchMarkerRef.current) {
        searchMarkerRef.current.setMap(null);
        searchMarkerRef.current = null;
      }

      infoRef.current?.close();
      infoRef.current = null;

      placesRef.current = null;
      geocoderRef.current = null;
      mapRef.current = null;

      setSubwayList([]);
      setStatusText("준비됨");
      // pickedTitle/pickedAddress는 유지하고 싶으면 지우지 말고,
      // 닫을 때 초기화 원하면 아래 주석 해제
      // setPickedTitle("다른 위치");
      // setPickedAddress("");
    };
  }, [isOpen]);

  // ---- actions ----
  const handleSearchMyLocation = () => {
    if (!navigator.geolocation) return;

    setStatusText("내 위치 가져오는 중...");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        const map = mapRef.current;
        if (!map) return;

        map.setCenter(new window.kakao.maps.LatLng(lat, lng));
        map.setLevel(4);
        requestAnimationFrame(() => map.relayout());

        setStatusText("내 위치 기준 검색");
        searchSubwayAround(lat, lng);
      },
      () => setStatusText("위치 권한/오류"),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handleSearchByAddress = () => {
    const q = keyword.trim();
    if (!q) return;

    const ps = placesRef.current;
    const map = mapRef.current;
    if (!ps || !map) return;

    setStatusText("입력한 주소로 위치 찾는 중...");

    ps.keywordSearch(q, (data, status) => {
      if (status !== window.kakao.maps.services.Status.OK || !data?.length) {
        setStatusText("주소/장소를 못 찾음");
        setSubwayList([]);
        return;
      }

      const first = data[0];
      const lat = Number(first.y);
      const lng = Number(first.x);

      // ✅ 검색한 주소도 목록에 보여주기(원하면)
      const addr = first.road_address_name || first.address_name || "주소 정보 없음";
      setPickedTitle("검색한 위치");
      setPickedAddress(addr);

      map.setCenter(new window.kakao.maps.LatLng(lat, lng));
      map.setLevel(4);
      requestAnimationFrame(() => map.relayout());

      // ✅ 여기 핵심: 검색한 주소에도 마커 1개 찍기
      setSearchMarkerAt(lat, lng, `검색 위치: ${q}`);

      setStatusText(`"${q}" 기준 검색`);
      searchSubwayAround(lat, lng);
    });
  };

  // ✅ [추가] "이 위치로 설정하기" 버튼 핸들러
  const handleConfirmAddress = () => {
    if (!pickedAddress) {
        alert("지도를 클릭하거나 주소를 검색하여 배달받을 위치를 선택해주세요.");
        return;
    }
    // 부모 컴포넌트(CartPage)로 주소 전달
    if (onSelect) {
        onSelect(pickedAddress);
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div css={s.overlay} onClick={onClose}>
      <div css={s.modal} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div css={s.header}>
          <div css={s.title}>서브웨이 찾기</div>
          <button css={s.closeBtn} onClick={onClose}>닫기</button>
        </div>

        {/* Search Row */}
        <div css={s.searchRow}>
          <button css={s.primaryBtn} onClick={handleSearchMyLocation}>
            내 위치로 찾기
          </button>

          <input
            css={s.input}
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="도로명 주소/장소 입력"
          />

          <button css={s.ghostBtn} onClick={handleSearchByAddress}>
            입력 위치로 찾기
          </button>
        </div>

        <div css={s.status}>상태: {statusText}</div>

        {/* List */}
        <div css={s.listBox}>
          <div css={s.section}>
            <div css={s.sectionLabel}>📍 {pickedTitle}</div>
            <div css={s.pickedCard}>{pickedAddress || "지도를 클릭하세요"}</div>
            
            {/* ✅ [추가] 주소 선택 확정 버튼 (주소가 있을 때만 표시) */}
            {pickedAddress && (
                <button 
                    onClick={handleConfirmAddress}
                    style={{
                        marginTop: '8px',
                        width: '100%',
                        padding: '10px',
                        backgroundColor: '#009223', // 서브웨이 그린
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        fontSize: '14px'
                    }}
                >
                    이 위치로 설정하기
                </button>
            )}
          </div>

          <div css={s.section}>
            <div css={s.sectionLabel}>🥪 서브웨이 목록</div>

            <div css={s.cards}>
              {subwayList.length === 0 ? (
                <div css={s.emptyText}>“내 위치로 찾기” 또는 “입력 위치로 찾기”</div>
              ) : (
                subwayList.map((p, idx) => {
                  const address = p.road_address_name || p.address_name || "주소 정보 없음";
                  const dist = p.distance ? `${Math.round(Number(p.distance))}m` : "";

                  return (
                    <button
                      key={`${p.id || p.place_name}-${idx}`}
                      css={s.cardBtn}
                      onClick={() => focusSubway(idx)}
                    >
                      <div css={s.cardTop}>
                        <div css={s.cardTitle}>{p.place_name}</div>
                        <div css={s.cardDist}>{dist}</div>
                      </div>
                      <div css={s.cardAddr}>{address}</div>
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Map */}
        <div ref={mapElRef} css={s.map} />
      </div>
    </div>,
    document.body
  );
}