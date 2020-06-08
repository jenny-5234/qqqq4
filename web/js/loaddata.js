// 마커를 표시할 위치와 내용을 가지고 있는 객체 배열입니다
var positions = [
    {
        title: '카카오',
        lat: '33.450705',
        lng: '126.570677',
        road_address_name: '도로명 주소 테스트',
        address_name: '지번 주소 테스트',
        phone: '010-1234-5678',
        detailpage: 'http://www.naver.com',
        id: '테스트'
    },
    {
        title: '생태연못',
        lat: '33.450936',
        lng: '126.569477',
        road_address_name: '도로명 주소 테스트3',
        address_name: '지번 주소 테스트3',
        phone: '010-9846-1668',
        detailpage: 'http://www.naver.com',
        id: 'test'
    }
];

for (var i = 0; i < positions.length; i++) {
    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({

        map: map, // 마커를 표시할 지도
        position: new kakao.maps.LatLng(positions[i].lat, positions[i].lng) // 마커의 위치

    });
    // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록합니다
    // 이벤트 리스너로는 클로저를 만들어 등록합니다
    // for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
    // kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, infowindow));
    // kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));
    (function (marker, title, road_address_name, address_name, phone, detailpage, id, x,y) {
        kakao.maps.event.addListener(marker, 'click', function () {
            displayInfowindow(marker, title, road_address_name, address_name, phone, detailpage, id, x, y);
        });
    })(marker, positions[i].title, positions[i].road_address_name, positions[i].address_name, positions[i].phone, positions[i].detailpage, positions[i].id, positions[i].lat, positions[i].lng);
}

// 인포윈도우를 표시하는 클로저를 만드는 함수입니다
function makeOverListener(map, marker, infowindow) {
    return function () {
        infowindow.open(map, marker);
    };
}

// 인포윈도우를 닫는 클로저를 만드는 함수입니다
function makeOutListener(infowindow) {
    return function () {
        infowindow.close();
    };
}