<%@ page import="org.json.simple.JSONArray" %>
<%@ page import="org.json.simple.JSONObject" %>
<%@ page import="java.sql.Connection" %>
<%@ page import="java.sql.DriverManager" %>
<%@ page import="java.sql.ResultSet" %>
<%@ page import="java.sql.Statement" %>
<%--
  Created by IntelliJ IDEA.
  User: bit
  Date: 2020-05-29
  Time: 오전 9:31
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <title>Kakao 지도 시작하기</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=835adee41e6cca987ac2e420ee6a1105&libraries=services,clusterer"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <link rel="stylesheet" type="text/css" href="css/polygon.css">
  <link rel="stylesheet" type="text/css" href="css/search.css">
</head>
<body>
<%
  String test = "";
  JSONArray jsonArray = new JSONArray();
  JSONArray jsonArray2 = new JSONArray();

  try {
    Connection conn = null;
    Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
    String connString =
            "jdbc:sqlserver://14.32.18.226:1433;database=YL;user=as;password=1234";
    conn = DriverManager.getConnection(connString);

    if(conn == null){
      test += "connection nullexception";
    }

    Statement stmt = conn.createStatement();
    ResultSet rs = stmt.executeQuery("select ShopName, Latitude, Longititude, StreetNameAddress, Address, PhoneNumber, Url from Shop where StreetNameAddress like '%김포시%'");
    while (rs.next()) {
      JSONObject obj = new JSONObject();
      obj.put("place_name", rs.getString("ShopName"));
      obj.put("y", rs.getString("Latitude"));
      obj.put("x", rs.getString("Longititude"));
      obj.put("road_address_name", rs.getString("StreetNameAddress"));
      obj.put("address_name", rs.getString("Address"));
      obj.put("phone", rs.getString("PhoneNumber"));
      obj.put("detailpage", rs.getString("Url"));
//                    obj.put("id", rs.getString("id"));
      jsonArray.add(obj);
    }
    ResultSet rs2 = stmt.executeQuery("select ShopName, Latitude, Longititude, StreetNameAddress, Address, PhoneNumber, Url from Shop where StreetNameAddress like '%가평군%'");
    while (rs2.next()) {
      JSONObject obj = new JSONObject();
      obj.put("place_name", rs2.getString("ShopName"));
      obj.put("y", rs2.getString("Latitude"));
      obj.put("x", rs2.getString("Longititude"));
      obj.put("road_address_name", rs2.getString("StreetNameAddress"));
      obj.put("address_name", rs2.getString("Address"));
      obj.put("phone", rs2.getString("PhoneNumber"));
      obj.put("detailpage", rs2.getString("Url"));
//                    obj.put("id", rs.getString("id"));
      jsonArray2.add(obj);
    }
  } catch (Exception e){
    test += "아무거나";
  }
%>
<p><%=test%></p>
<%--<p><%=jsonArray%></p>--%>
<%--<p><%=jsonArray2%></p>--%>
<%--<div id="map" style="width:1000px;height:600px;"></div>--%>
<input type="button" onclick="getjson('location/seouldetail.json','서울'), panTo(37.566833213145486, 126.97865508601613);" value="서울">
<input type="button" onclick="getjson('location/ggidodetail.json', '경기도'), panTo(37.274999514115, 127.00891869697384);" value="경기">
<input type="button" onclick="getjson('location/incheon.json', '인천'), panTo(37.45601575635058, 126.70526932805312);" value="인천">
<input type="button" onclick="getjson('location/daejeon.json', '대전'), panTo(36.35054566698088, 127.38483209496621);" value="대전">
<input type="button" onclick="getjson('location/daegu.json', '대구'), panTo(35.87139021883816, 128.60180236999602);" value="대구">
<input type="button" onclick="getjson('location/sejong.json', '세종특별자치시'), panTo(36.480076633106535, 127.28919257852753);" value="세종">
<input type="button" onclick="getjson('location/gangwondo.json', '강원도'), panTo(37.88533434764741, 127.72982852649373);" value="강원도">
<input type="button" onclick="getjson('location/chungcheongbukdo.json', '충청북도', panTo(36.63536856332988, 127.49145627422729));" value="충청북도">
<input type="button" onclick="getjson('location/chungcheongnamdo.json', '충청남도', panTo(36.658839597743665, 126.67276943924477));" value="충청남도">
<input type="button" onclick="getjson('location/gyeongsangbukdo.json', '경상북도', panTo(36.57600343933538, 128.505798836928));" value="경상북도">
<input type="button" onclick="getjson('location/gyeongsangnamdo.json', '경상남도', panTo(35.237709423780196, 128.69192190637102));" value="경상남도">
<input type="button" onclick="getjson('location/busan.json', '부산광역시'), panTo(35.179750947369214, 129.07507091757356);" value="부산">
<input type="button" onclick="getjson('location/ulsan.json', '울산광역시'), panTo(35.5394845888991, 129.31146797079748);" value="울산">
<input type="button" onclick="getjson('location/jeollabukdo.json', '전라북도'), panTo(35.82020672844053, 127.10897672617733);" value="전라북도">
<input type="button" onclick="getjson('location/gwangju.json', '광주광역시'), panTo(35.160108723530996, 126.85163269066601);" value="광주">
<input type="button" onclick="getjson('location/jeollanamdo.json', '전라남도'), panTo(34.81609068924449, 126.46278335953988);" value="전라남도">
<input type="button" onclick="getjson('location/jeju.json', '제주도'), panTo(33.48892014636885, 126.49822643823065);" value="제주도">
<button onclick="hideMarkers()">감추기</button>
<button onclick="showMarkers()">보이기</button>
<div class="map_wrap">
  <div id="map" style="width:100%;height:500px;position:relative;overflow:hidden;"></div>

  <div id="menu_wrap" class="bg_white">
    <div class="option">
      <div>
        <form onsubmit="searchPlaces(); return false;">
          키워드 : <input type="text" value="긴급재난지원금" id="keyword" size="15">
          <button type="submit">검색</button>
        </form>
      </div>
    </div>
    <hr>
    <ul id="placesList"></ul>
    <div id="pagination"></div>
  </div>
</div>
<script src="js/polygon.js" type="text/javascript"></script>
<script src="js/search.js" type="text/javascript"></script>
<script>
  var kimpo =<%=jsonArray%>
  var gapyeong =<%=jsonArray2%>
</script>
<script src="js/loaddata.js" type="text/javascript"></script>
<%--<%@ include file="polygon.jsp" %>--%>
<%--<%@ include file="search.jsp" %>--%>
</body>
</html>
