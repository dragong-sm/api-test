import React from "react";

const { kakao } = window;
// 스크립트로 kakao maps api를 심어서 가져오면 window전역 객체에 들어감
// => 함수형 컴포넌트에서는 이를 바로 인식하지 못함
// =>  const { kakao } = window를 작성하여 인지 시킴
// => window에서 kakao객체를 뽑아서 사용

// 카카오 지도 그리기 ! (현재위치로)
export default function KaKaoMap() {
  function getLocation() {
    if (navigator.geolocation) {
      var options = { timeout: 60000 }; // 시간 제한 두기
      navigator.geolocation.getCurrentPosition(
        function (position) {
          // 이용 가능하면 geolocation 가져오기
          let lat = position.coords.latitude; // 위도
          let lon = position.coords.longitude; // 경도
          var locPosition = new kakao.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
            message =
              '<div style="width:100%;padding:5px;font-size:12px;font-weight:600;color:#009288;">코스 시작</div>'; // 인포윈도우에 표시될 내용입니다
          // 마커와 인포윈도우를 표시합니다
          displayMarker(locPosition, message);
        },
        function (error) {
          if (error.code === 1) {
            // gps 사용 불가능 => 기본 위치로 산림청 표시
            var locPosition = new kakao.maps.LatLng(33.450701, 126.570667),
              message =
                '<div style="padding:5px;"><p>GPS추적불가 ..</p> <p>여기는 산림청입니다.</p></div>';
            displayMarker(locPosition, message);
          } else if (error.code === 2) {
            alert("위치를 반환할 수 없습니다.");
          }
        },
        options
      );
    } else {
      alert("불가능");
      // gps 사용 불가능 => 기본 위치로 산림청 표시 (36.3597629, 127.385063)
      var locPosition = new kakao.maps.LatLng(36.3597629, 127.385063),
        message = "GPS추적불가 .. 여기는 산림청입니다.";
      displayMarker(locPosition, message);
    }
  }

  // 지도 & 마커 + 인포윈도우 표시
  function displayMarker(locPosition, message) {
    const mapContainer = document.getElementById("map"); // 지도를 표시할 div
    const mapOption = {
      // center: new kakao.maps.LatLng(locPosition.Ma, locPosition.La), // 지도 중심좌표 (초기값 : 현재위치)
      center: new kakao.maps.LatLng(37.562543, 128.428853), // 평창역
      level: 11, // 지도의 확대 레벨
    };
    const map = new kakao.maps.Map(mapContainer, mapOption); // 지도 생성
    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({
      map: map,
      // position: locPosition,
      position: new kakao.maps.LatLng(37.562543, 128.428853), // 마커를 코스 시작 위치로 표시
    });

    var marker2 = new kakao.maps.Marker({
      map: map,
      // position: locPosition,
      position: new kakao.maps.LatLng(37.7641742, 128.9017879), // 마커를 코스 종료 위치로 표시
    });

    var iwContent = message, // 인포윈도우에 표시할 내용
      iwRemoveable = true;

    // 인포윈도우를 생성합니다
    var infowindow = new kakao.maps.InfoWindow({
      content: iwContent,
      removable: iwRemoveable,
    });

    var infowindow2 = new kakao.maps.InfoWindow({
      content:
        '<div style="width:100%;padding:5px;font-size:12px;font-weight:600;color:#009288;">코스 완주</div>',
      removable: iwRemoveable,
    });

    // 인포윈도우를 마커위에 표시합니다
    infowindow.open(map, marker);
    infowindow2.open(map, marker2);

    // 지도 중심좌표를 접속위치로 변경합니다
    // map.setCenter(locPosition);

    console.log(locPosition);
    // 선을 구성하는 좌표 배열입니다. 이 좌표들을 이어서 선을 표시합니다
    var linePath = [
      new kakao.maps.LatLng(37.562543, 128.428853),
      new kakao.maps.LatLng(38.10769499999949, 128.36334800000105),
      new kakao.maps.LatLng(37.688846001431365, 128.75300989966945),
      new kakao.maps.LatLng(37.7641742, 128.9017879),
    ];

    // 지도에 표시할 선을 생성합니다
    var polyline = new kakao.maps.Polyline({
      path: linePath, // 선을 구성하는 좌표배열 입니다
      strokeWeight: 5, // 선의 두께 입니다
      strokeColor: "#006259", // 선의 색깔입니다
      strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
      strokeStyle: "solid", // 선의 스타일입니다
    });

    // 지도에 선을 표시합니다
    polyline.setMap(map);
  }

  getLocation();

  return (
    <div
      style={{
        width: "410px",
        margin: "0 5px",
        color: "#202220",
        fontSize: "20px",
        fontWeight: "700",
      }}
    >
      <p
        style={{
          paddingBottom: "15px",
          borderBottom: "1px solid #d9d9d9",
          margin: "20px 5px",
        }}
      >
        코스 소개
      </p>
      <div
        id="map"
        style={{
          width: "400px",
          height: "270px",
          margin: "30px 5px",
          borderRadius: "10px",
        }}
      >
        kakao map
      </div>
    </div>
  );
}
