import React, { useEffect } from "react";

// https://developer.mozilla.org/ko/docs/Web/API/Geolocation_API/Using_the_Geolocation_API
// // HTML5 => Geolocation API
export default function GpsTest() {
  // // gps 사용가능 check 후, geolocation 실행
  function getLocation() {
    if (navigator.geolocation) {
      var options = { timeout: 60000 }; // 시간 제한 두기
      navigator.geolocation.getCurrentPosition(
        function (position) {
          // 이용 가능하면 geolocation 가져오기
          let lat = position.coords.latitude; // 위도
          let lon = position.coords.longitude; // 경도
          console.log(lat, lon);
        },
        function (error) {
          if (error.code === 1) {
          } else if (error.code === 2) {
            alert("위치를 반환할 수 없습니다.");
          }
        },
        options
      );
    } else {
      alert("불가능");
    }
  }

  useEffect(() => {
    getLocation();
  }, []);

  // 하버사인(harvesine) 공식사용 : https://en.wikipedia.org/wiki/Haversine_formula
  function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    // 위, 경도를 라디안으로 변환하는 함수
    function d2r(deg) {
      return (deg * Math.PI) / 180;
    }

    const R = 6371; // 지구 반지름(km) => WGS84좌표계

    // 위,경도를 라디안으로 변환
    const dLat = d2r(Math.abs(lat1 - lat2));
    const dLon = d2r(Math.abs(lon1 - lon2));

    // 변환한 라디안 값을 sin에 대입
    const sinDLat = Math.sin(dLat / 2);
    const sinDLon = Math.sin(dLon / 2);

    const sqrt = Math.sqrt(
      sinDLat * sinDLat +
        Math.cos(d2r(lat1)) * Math.cos(d2r(lat2)) * (sinDLon * sinDLon)
    );

    // 두 지점 사이의 거리
    return 2 * R * Math.asin(sqrt);
  }

  console.log(
    "hi",
    getDistanceFromLatLonInKm(36.3597629, 127.385063, 37.3620736, 126.9235712)
  );

  return <div id="map" style={{ width: "500px", height: "500px" }}></div>;
}
