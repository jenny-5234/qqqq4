var mapContainer = document.getElementById('map'), // 지도를 표시할 div
    mapOption = {
        center: new kakao.maps.LatLng(37.49461890613009, 127.02760319558533), // 지도의 중심좌표
        level: 8 // 지도의 확대 레벨
    };


var map = new kakao.maps.Map(mapContainer, mapOption),
    customOverlay = new kakao.maps.CustomOverlay({}),
    infowindow = new kakao.maps.InfoWindow({removable: true});

// HTML5의 geolocation으로 사용할 수 있는지 확인합니다
/*if (navigator.geolocation) {

    // GeoLocation을 이용해서 접속 위치를 얻어옵니다
    navigator.geolocation.getCurrentPosition(function(position) {

        var lat = position.coords.latitude, // 위도
            lon = position.coords.longitude; // 경도

        var locPosition = new kakao.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
            message = '<div style="padding:5px;">여기에 계신가요?!</div>'; // 인포윈도우에 표시될 내용입니다

        // 마커와 인포윈도우를 표시합니다
        displayMarker(locPosition, message);

    });

} else { // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다

    var locPosition = new kakao.maps.LatLng(33.450701, 126.570667),
        message = 'geolocation을 사용할수 없어요..'

    displayMarker(locPosition, message);
}*/

function getjson(test, city) {
//행정구역 구분
    console.log(test);
    deletePolygon(polygons);
    removeMarker();
    $.getJSON(test, function (geojson) {
        var data = geojson.features;
        var coordinates = [];    //좌표 저장할 배열
        var name = '';            //행정 구 이름

        $.each(data, function (index, val) {
            coordinates = val.geometry.coordinates;
            name = val.properties.SIG_KOR_NM;

            displayArea(coordinates, name, city);
        })
    });
}

var polygons = [];                //function 안 쪽에 지역변수로 넣으니깐 폴리곤 하나 생성할 때마다 배열이 비어서 클릭했을 때 전체를 못 없애줌.  그래서 전역변수로 만듦.

var yu = "";
//행정구역 폴리곤
function displayArea(coordinates, name, city) {

    var path = [];            //폴리곤 그려줄 path
    var points = [];        //중심좌표 구하기 위한 지역구 좌표들

    $.each(coordinates[0], function (index, coordinate) {        //console.log(coordinates)를 확인해보면 보면 [0]번째에 배열이 주로 저장이 됨.  그래서 [0]번째 배열에서 꺼내줌.
        var point = new Object();
        point.x = coordinate[1];
        point.y = coordinate[0];
        points.push(point);
        path.push(new kakao.maps.LatLng(coordinate[1], coordinate[0]));            //new daum.maps.LatLng가 없으면 인식을 못해서 path 배열에 추가
    });

    // 다각형을 생성합니다
    var polygon = new kakao.maps.Polygon({
        map: map, // 다각형을 표시할 지도 객체
        path: path,
        strokeWeight: 2,
        strokeColor: '#004c80',
        strokeOpacity: 0.8,
        fillColor: '#fff',
        fillOpacity: 0.7
    });

    polygons.push(polygon);

    // 다각형에 mouseover 이벤트를 등록하고 이벤트가 발생하면 폴리곤의 채움색을 변경합니다
    // 지역명을 표시하는 커스텀오버레이를 지도위에 표시합니다
    kakao.maps.event.addListener(polygon, 'mouseover', function (mouseEvent) {
        polygon.setOptions({fillColor: '#09f'});

        customOverlay.setContent('<div class="area">' + name + '</div>');

        customOverlay.setPosition(mouseEvent.latLng);
        customOverlay.setMap(map);
    });

    // 다각형에 mousemove 이벤트를 등록하고 이벤트가 발생하면 커스텀 오버레이의 위치를 변경합니다
    kakao.maps.event.addListener(polygon, 'mousemove', function (mouseEvent) {

        customOverlay.setPosition(mouseEvent.latLng);
    });

    // 다각형에 mouseout 이벤트를 등록하고 이벤트가 발생하면 폴리곤의 채움색을 원래색으로 변경합니다
    // 커스텀 오버레이를 지도에서 제거합니다
    kakao.maps.event.addListener(polygon, 'mouseout', function () {
        polygon.setOptions({fillColor: '#fff'});
        customOverlay.setMap(null);
    });

    // 다각형에 click 이벤트를 등록하고 이벤트가 발생하면 다각형의 이름과 면적을 인포윈도우에 표시합니다
    kakao.maps.event.addListener(polygon, 'click', function (mouseEvent) {
        console.log(name);

        if(yu!=name) {
            switch (name) {
                case("김포시"):
                    console.log("실행");
                    makemarkerjson(kimpo);
                    // console.log(yu + name + (yu == name));
                    break;
                case("가평군"):
                    console.log("실행");
                    makemarkerjson(gapyeong);
                    break;
                /*case("파주시"):
                    console.log("실행"); break;
                case("고양시"):
                    console.log("실행"); break;*/
                default:
                    ps.keywordSearch(city + name + " 긴급재난지원금", placesSearchCB);
                console.log("실행");
            }
            yu = name;
        }
        else {
            console.log("미실행");
        }
        closeOverlay();
        // ps.keywordSearch(city + name + " 긴급재난지원금", placesSearchCB);

        /*var content = '<div class="info">' +
            '   <div class="title">' + name + '</div>' +
            '   <div class="size">총 면적 : 약 ' + Math.floor(polygon.getArea()) + ' m<sup>2</sup></area>' +
            '</div>';*/

        // ps.keywordSearch(city + name + " 긴급재난지원금", placesSearchCB);
        // infowindow.setContent(content);
        // infowindow.setPosition(mouseEvent.latLng);
        // infowindow.setMap(map);
        // 현재 지도 레벨에서 2레벨 확대한 레벨
        // var level = map.getLevel()-2;

        // 지도를 클릭된 폴리곤의 중앙 위치를 기준으로 확대합니다
        /*map.setLevel(level, {anchor: centroid(points), animate: {
                duration: 350            //확대 애니메이션 시간
            }});*/
        // deletePolygon(polygons);                    //폴리곤 제거
    });
}

//지도 위 표시되고 있는 폴리곤 제거
function deletePolygon(polygons) {
    for (var i = 0; i < polygons.length; i++) {
        polygons[i].setMap(null);
    }
    polygons = [];
}

// 지도 위에 표시되고 있는 마커를 모두 제거합니다
function removeMarker() {
    for ( var i = 0; i < markers.length; i++ ) {
        markers[i].setMap(null);
    }
    markers = [];
}

function panTo(lat, lng) {
    // 이동할 위도 경도 위치를 생성합니다
    var moveLatLon = new kakao.maps.LatLng(lat, lng);
    // var level = map.getLevel();
    // 지도 중심을 부드럽게 이동시킵니다
    // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
    map.setLevel('11');
    map.panTo(moveLatLon);
}

// 지도에 마커와 인포윈도우를 표시하는 함수입니다
function displayMarker(locPosition, message) {

    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({
        map: map,
        position: locPosition
    });

    var iwContent = message, // 인포윈도우에 표시할 내용
        iwRemoveable = true;

    // 인포윈도우를 생성합니다
    var infowindow = new kakao.maps.InfoWindow({
        content : iwContent,
        removable : iwRemoveable
    });

    // 인포윈도우를 마커위에 표시합니다
    infowindow.open(map, marker);

    // 지도 중심좌표를 접속위치로 변경합니다
    map.setCenter(locPosition);
}

//centroid 알고리즘 (폴리곤 중심좌표 구하기 위함)
function centroid (points) {
    var i, j, len, p1, p2, f, area, x, y;

    area = x = y = 0;

    for (i = 0, len = points.length, j = len - 1; i < len; j = i++) {
        p1 = points[i];
        p2 = points[j];

        f = p1.y * p2.x - p2.y * p1.x;
        x += (p1.x + p2.x) * f;
        y += (p1.y + p2.y) * f;
        area += f * 3;
    }
    return new daum.maps.LatLng(x / area, y / area);
}

function relayout() {

    // 지도를 표시하는 div 크기를 변경한 이후 지도가 정상적으로 표출되지 않을 수도 있습니다
    // 크기를 변경한 이후에는 반드시  map.relayout 함수를 호출해야 합니다
    // window의 resize 이벤트에 의한 크기변경은 map.relayout 함수가 자동으로 호출됩니다
    map.relayout();
}
