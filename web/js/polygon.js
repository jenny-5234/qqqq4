var mapContainer = document.getElementById('map'), // 지도를 표시할 div
    mapOption = {
        center: new kakao.maps.LatLng(37.36163453050286, 126.93520310836283), // 지도의 중심좌표 37.49461890613009, 127.02760319558533
        level: 5 // 지도의 확대 레벨
    };


var map = new kakao.maps.Map(mapContainer, mapOption),
    customOverlay = new kakao.maps.CustomOverlay({}),
    infowindow = new kakao.maps.InfoWindow({removable: true});

// 마커 클러스터러를 생성합니다
var clusterer = new kakao.maps.MarkerClusterer({
    map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체
    averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
    minLevel: 5 // 클러스터 할 최소 지도 레벨
});

/*var mapTypeControl = new kakao.maps.MapTypeControl();
map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);*/

var zoomControl = new kakao.maps.ZoomControl();
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

// HTML5의 geolocation으로 사용할 수 있는지 확인합니다
if (navigator.geolocation) {

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

    var locPosition = new kakao.maps.LatLng(37.49461890613009, 127.02760319558533),
        message = 'geolocation을 사용할수 없어요..'

    displayMarker(locPosition, message);
}

function getjson(test, city) {
//행정구역 구분
    console.log(test);
    deletePolygon(polygons);
    removeMarker();
    clusterer.clear();
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

var polygons = [];            //function 안 쪽에 지역변수로 넣으니깐 폴리곤 하나 생성할 때마다 배열이 비어서 클릭했을 때 전체를 못 없애줌.  그래서 전역변수로 만듦.

//행정구역 폴리곤
function displayArea(coordinates, name, city) {

    var yu = "";
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
        // polygons[34].setMap(null);
        /*var latlng = mouseEvent.latLng;
        console.log("위도: " + latlng.getLat() + "경도: " + latlng.getLng());*/ //위도 경도 알아내기
        if(yu!=name) {
            switch (name) {
                case("김포시"):
                    console.log("실행");
                    makecluster("city_mark_info/kimpo.json",37.61527678908309, 126.71565392785833);
                    deletepartPolygon(polygons, 16);
                    break;
                case("가평군"):
                    console.log("실행");
                    makecluster("city_mark_info/gapyeong.json", 37.83144628724424, 127.50956510475636);
                    deletepartPolygon(polygons, 21);
                    break;
                case("안산시"):
                    console.log("실행");
                    makecluster("city_mark_info/ansan.json", 37.32191305982758, 126.8308372448452);
                    deletepartPolygon(polygons, 26);
                    break;
                case("안성시"):
                    console.log("실행");
                    makecluster("city_mark_info/anseong.json", 37.0080057984534, 127.2797170597116);
                    deletepartPolygon(polygons, 15);
                    break;
                case("안양시"):
                    console.log("실행");
                    makecluster("city_mark_info/anyang.json", 37.3942615042009, 126.95685487680574);
                    deletepartPolygon(polygons, 29);
                    break;
                case("부천시"):
                    console.log("실행");
                    makecluster("city_mark_info/bucheon.json", 37.50351763465878, 126.76603786718101);
                    deletepartPolygon(polygons, 1);
                    break;
                case("동두천시"):
                    console.log("실행");
                    makecluster("city_mark_info/dongducheon.json", 37.903606760983585, 127.06043391358757);
                    deletepartPolygon(polygons, 4);
                    break;
                case("고양시"):
                    console.log("실행");
                    makecluster("city_mark_info/goyang.json", 37.65842259635158, 126.83195226626859);
                    deletepartPolygon(polygons, 23);
                    break;
                case("군포시"):
                    console.log("실행");
                    makecluster("city_mark_info/gunpo.json", 37.36163453050286, 126.93520310836283);
                    deletepartPolygon(polygons, 10);
                    break;
                case("구리시"):
                    console.log("실행");
                    makecluster("city_mark_info/guri.json", 37.59436814152007, 127.12964243445381);
                    deletepartPolygon(polygons, 6);
                    break;
                case("과천시"):
                    console.log("실행");
                    makecluster("city_mark_info/gwacheon.json", 37.429239559910044, 126.98770743965969);
                    deletepartPolygon(polygons, 5);
                    break;
                case("광주시"):
                    console.log("실행");
                    makecluster("city_mark_info/gwangju.json",37.42940410458226, 127.25513875335848);
                    deletepartPolygon(polygons, 17);
                    break;
                case("광명시"):
                    console.log("실행");
                    makecluster("city_mark_info/gwangmyeong.json", 37.4785787471002, 126.8646534476972);
                    deletepartPolygon(polygons, 2);
                    break;
                case("하남시"):
                    console.log("실행");
                    makecluster("city_mark_info/hanam.json",37.53928087643411, 127.21485835369926);
                    deletepartPolygon(polygons, 12);
                    break;
                case("화성시"):
                    console.log("실행");
                    makecluster("city_mark_info/hwaseong.json", 37.19954350601318, 126.83147395712996);
                    deletepartPolygon(polygons, 32);
                    break;
                case("이천시"):
                    console.log("실행");
                    makecluster("city_mark_info/icheon.json", 37.27227209940599, 127.43508818121765);
                    deletepartPolygon(polygons, 14);
                    break;
                case("남양주시"):
                    console.log("실행");
                    makecluster("city_mark_info/namyangju.json", 37.63603760318754, 127.21647637193799);
                    deletepartPolygon(polygons, 7);
                    break;
                case("오산시"):
                    console.log("실행");
                    makecluster("city_mark_info/osan.json", 37.14989073484177, 127.07751868124821);
                    deletepartPolygon(polygons, 8);
                    break;
                case("파주시"):
                    console.log("실행");
                    makecluster("city_mark_info/paju.json", 37.76004992869594, 126.77986886139607);
                    deletepartPolygon(polygons, 13);
                    break;
                case("포천시"):
                    console.log("실행");
                    makecluster("city_mark_info/pocheon.json", 37.894998700762386, 127.20032665354528);
                    deletepartPolygon(polygons, 19);
                    break;
                case("평택시"):
                    console.log("실행");
                    makecluster("city_mark_info/pyeongtaek.json", 36.992262930984346, 127.11268445820784);
                    deletepartPolygon(polygons, 3);
                    break;
                case("성남시"):
                    console.log("실행");
                    makecluster("city_mark_info/seongnam.json",37.41993031887288, 127.1265112485552);
                    deletepartPolygon(polygons, 24);
                    break;
                case("시흥시"):
                    console.log("실행");
                    makecluster("city_mark_info/siheung.json", 37.38012362846484, 126.8029760804121);
                    deletepartPolygon(polygons, 9);
                    break;
                case("수원시"):
                    console.log("실행");
                    makecluster("city_mark_info/suwon.json", 37.2635914378312, 127.02871082779522);
                    deletepartPolygon(polygons, 25);
                    break;
                case("의정부시"):
                    console.log("실행");
                    makecluster("city_mark_info/uijeongbu.json", 37.73806430212202, 127.03389625756047);
                    deletepartPolygon(polygons, 0);
                    break;
                case("의왕시"):
                    console.log("실행");
                    makecluster("city_mark_info/uiwang.json", 37.344765000866936, 126.96827042256258);
                    deletepartPolygon(polygons, 11);
                    break;
                case("양주시"):
                    console.log("실행");
                    makecluster("city_mark_info/yangju.json", 37.78532045762223, 127.04577814226495);
                    deletepartPolygon(polygons, 18);
                    break;
                case("양평군"):
                    console.log("실행");
                    makecluster("city_mark_info/yangpyeong.json", 37.491795966977726, 127.48757343156568);
                    deletepartPolygon(polygons, 22);
                    break;
                case("여주시"):
                    console.log("실행");
                    makecluster("city_mark_info/yeoju.json", 37.298431053050095, 127.63705490477399);
                    deletepartPolygon(polygons, 20);
                    break;
                case("연천군"):
                    console.log("실행");
                    makecluster("city_mark_info/yeoncheon.json", 38.09652315873178, 127.07534723541715);
                    deletepartPolygon(polygons, 30);
                    break;
                case("용인시"):
                    console.log("실행");
                    makecluster("city_mark_info/yongin.json", 37.24103944439466, 127.17747953553028);
                    deletepartPolygon(polygons, 31);
                    break;
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

function makecluster(path, x, y) {
    map.setLevel(5, {
        animate: {
            duration: 500
        },
        anchor: new kakao.maps.LatLng(x, y)
    });
    setTimeout(function () {
        $.get(path, function (data) {
            // console.log(data);
            var listEl = document.getElementById('placesList');
            displayPagination({first: 0, last: 0, totalCount: 0});
            // 검색 결과 목록에 추가된 항목들을 제거합니다
            removeAllChildNods(listEl);
            removeMarker();
            var markers = $(data).map(function (each) {
                var marker = new kakao.maps.Marker({
                    position: new kakao.maps.LatLng(data[each].y, data[each].x)
                });
                kakao.maps.event.addListener(marker, 'click', function () {
                    var content = '<div class="wrap">' +
                        '    <div class="info">' +
                        '        <div class="title">' +
                        data[each].place_name +
                        '            <div class="close" onclick="closeOverlay()" title="닫기"></div>' +
                        '        </div>' +
                        '        <div class="body">' +
                        '            <div class="desc">' +
                        '                <div class="ellipsis">' + data[each].road_address_name + '</div>' +
                        '                <div class="jibun ellipsis">' + data[each].address_name + '</div>' +
                        '                <div class="contact">' + data[each].phone + '</div>' +
                        '                <span class="ICON-middot"></span>' +
                        '                <div class="detail"><a href="' + data[each].place_url + '" target="_blank" class="link">상세보기</a></div>' +
                        '                <span class="ICON-middot"></span>' +
                        '                <div class="searchdirections"><a href="https://map.kakao.com/link/to/' + data[each].place_name + ',' + data[each].y + ',' + data[each].x + '" target="_blank" class="link">길찾기</a></div>' +
                        '            </div>' +
                        '        </div>' +
                        '    </div>' +
                        '</div>';
                    infowindow.setContent(content);
                    infowindow.open(map, marker);
                    // info.setMap(map);
                });

                return marker;
            });
            // 클러스터러에 마커들을 추가합니다
            clusterer.addMarkers(markers);
        });
    }, 1000);
}

//지도 위 표시되고 있는 폴리곤 제거
function deletePolygon(polygons) {
    for (var i = 0; i < polygons.length; i++) {
        polygons[i].setMap(null);
    }
    polygons = [];
}

function deletepartPolygon(polygons, part) {
    console.log(part);
    for (var i = 0; i < polygons.length; i++) {
        if(i==part && 26 <= part && part <=28) {
            console.log("테스트");
            i=28;
        }
        else if(i==part && part>=32) {
            console.log("화성");
            break;
        }
        else if(i==part) {
        }
        else {
            polygons[i].setMap(null);
        }
    }
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
