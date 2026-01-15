import { useEffect, useRef, useState } from 'react';

export default function SubwayNearby() {
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const placesRef = useRef(null);
  const geocoderRef = useRef(null);

  const [keyword, setKeyword] = useState('');
  const [statusText, setStatusText] = useState('준비됨');

  useEffect(() => {
    if (!window.kakao || !window.kakao.maps) return;

    window.kakao.maps.load(() => {
      const container = document.getElementById('kakao-map');
      const map = new window.kakao.maps.Map(container, {
        center: new window.kakao.maps.LatLng(37.5665, 126.978),
        level: 5,
      });

      mapRef.current = map;
      placesRef.current = new window.kakao.maps.services.Places();
      geocoderRef.current = new window.kakao.maps.services.Geocoder();

      // ✅ 지도 클릭 → 도로명 주소만 콘솔 출력
      window.kakao.maps.event.addListener(map, 'click', (mouseEvent) => {
        const lat = mouseEvent.latLng.getLat();
        const lng = mouseEvent.latLng.getLng();

        geocoderRef.current.coord2Address(lng, lat, (result, status) => {
          if (status !== window.kakao.maps.services.Status.OK) return;

          const roadAddr = result[0]?.road_address?.address_name;
          const jibunAddr = result[0]?.address?.address_name;
          const address = roadAddr || jibunAddr || '주소 정보 없음';

          console.log('🗺️ 지도 클릭 주소:', address);
        });
      });
    });
  }, []);

  const clearMarkers = () => {
    markersRef.current.forEach((m) => m.setMap(null));
    markersRef.current = [];
  };

  // ✅ (내부적으로만) 특정 좌표를 중심으로 주변 서브웨이 검색
  // 사용자/콘솔에는 좌표를 노출하지 않음
  const searchSubwayAround = (lat, lng) => {
    const map = mapRef.current;
    const ps = placesRef.current;
    if (!map || !ps) return;

    setStatusText('주변 서브웨이 검색 중...');

    ps.keywordSearch(
      '서브웨이',
      (data, status) => {
        if (status !== window.kakao.maps.services.Status.OK) {
          setStatusText('검색 실패');
          console.log('검색 실패:', status);
          return;
        }

        clearMarkers();

        // 거리순 정렬 → 상위 N개
        const top = [...data]
          .sort((a, b) => Number(a.distance || 1e9) - Number(b.distance || 1e9))
          .slice(0, 10);

        setStatusText(`검색 결과 ${top.length}개`);

        console.log('===== ✅ 주변 서브웨이(지점명/주소만) =====');
        top.forEach((p, i) => {
          const address =
            p.road_address_name || p.address_name || '주소 정보 없음';
          console.log(`${i + 1}. ${p.place_name} / ${address}`);
        });

        const bounds = new window.kakao.maps.LatLngBounds();

        top.forEach((p) => {
          // 지도 마커 찍기용(내부 처리)
          const pos = new window.kakao.maps.LatLng(Number(p.y), Number(p.x));
          bounds.extend(pos);

          const marker = new window.kakao.maps.Marker({ position: pos });
          marker.setMap(map);
          markersRef.current.push(marker);

          // ✅ 마커 클릭 → 지점명 + 도로명주소만 콘솔 출력
          window.kakao.maps.event.addListener(marker, 'click', () => {
            const address =
              p.road_address_name || p.address_name || '주소 정보 없음';
            console.log('✅ 선택 지점:', p.place_name);
            console.log('✅ 지점 주소:', address);
          });
        });

        if (top.length) map.setBounds(bounds);
      },
      {
        location: new window.kakao.maps.LatLng(lat, lng),
        radius: 3000,
        sort: window.kakao.maps.services.SortBy.DISTANCE,
      }
    );
  };

  // ✅ 버튼: 내 위치로 검색 (UI는 좌표 안 보여줌)
  const handleSearchMyLocation = () => {
    if (!navigator.geolocation) {
      console.log('이 브라우저는 위치정보를 지원 안 함');
      return;
    }

    setStatusText('내 위치 가져오는 중...');

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        // 지도 중심만 이동(내부)
        const map = mapRef.current;
        map?.setCenter(new window.kakao.maps.LatLng(lat, lng));
        map?.setLevel(4);

        setStatusText('내 위치 기준 검색');
        searchSubwayAround(lat, lng);
      },
      (err) => {
        setStatusText('위치 권한/오류');
        console.log('위치 오류:', err);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  // ✅ 버튼: 주소로 검색 (사용자 입력 = 주소/장소명)
  const handleSearchByAddress = () => {
    const q = keyword.trim();
    if (!q) return;

    const ps = placesRef.current;
    const map = mapRef.current;
    if (!ps || !map) return;

    setStatusText('입력한 주소로 위치 찾는 중...');

    // keywordSearch는 주소/장소명 둘 다 잘 잡힘
    ps.keywordSearch(q, (data, status) => {
      if (status !== window.kakao.maps.services.Status.OK || !data?.length) {
        setStatusText('주소/장소를 못 찾음');
        return;
      }

      // 첫 결과를 기준 위치로 사용(내부 좌표)
      const first = data[0];
      const lat = Number(first.y);
      const lng = Number(first.x);

      map.setCenter(new window.kakao.maps.LatLng(lat, lng));
      map.setLevel(4);

      setStatusText(`"${q}" 기준 검색`);

      // ✅ 사용자는 주소만 보게
      console.log('📌 기준 위치(입력):', q);
      console.log('📌 찾은 장소명:', first.place_name);
      console.log(
        '📌 주소:',
        first.road_address_name || first.address_name || '주소 정보 없음'
      );

      searchSubwayAround(lat, lng);
    });
  };

  return (
    <div style={{ display: 'grid', gap: 10 }}>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <button
          onClick={handleSearchMyLocation}
          style={{ padding: '10px 12px' }}
        >
          내 위치로 서브웨이 찾기
        </button>

        <input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder='도로명 주소/장소 입력 (예: 부산대, 서면역, 부산 부산진구 중앙대로)'
          style={{ flex: 1, padding: 10 }}
        />

        <button
          onClick={handleSearchByAddress}
          style={{ padding: '10px 12px' }}
        >
          입력 위치로 찾기
        </button>
      </div>

      <div style={{ fontSize: 14, opacity: 0.8 }}>상태: {statusText}</div>

      <div
        id='kakao-map'
        style={{
          width: '400px',
          height: '400px',
          borderRadius: 10,
        }}
      />
    </div>
  );
}
