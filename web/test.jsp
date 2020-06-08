<%--
  Created by IntelliJ IDEA.
  User: bit
  Date: 2020-05-29
  Time: 오전 9:31
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="java.sql.*" %>
<%@ page import="java.util.ArrayList" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8"/>
    <title>Kakao 지도 시작하기</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=835adee41e6cca987ac2e420ee6a1105&libraries=services"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <link rel="stylesheet" type="text/css" href="css/polygon.css">
    <link rel="stylesheet" type="text/css" href="css/search.css">
</head>
<body>
<%
    String test = "";
    ArrayList result = new ArrayList();
    Connection conn = null;
    try {
        String user = "system";
        String pw = "1234";
        String url = "jdbc:oracle:thin:@localhost:1521:XE";

        Class.forName("oracle.jdbc.driver.OracleDriver");
        conn = DriverManager.getConnection(url, user, pw);
        Statement stmt = conn.createStatement();
        ResultSet rs = stmt.executeQuery("select * from modum");
        while(rs.next()) {
            result.add(rs.getString("title"));
            result.add(rs.getString("lat"));
            result.add(rs.getString("lng"));
            result.add(rs.getString("phone"));
            result.

        }
    } catch (ClassNotFoundException cnfe) {
        test = "DB 드라이버 로딩 실패";
    } catch (SQLException sqle) {
        test ="DB 접속실패 : ";
    } catch (Exception e) {
        test = "Unkonwn error";
        e.printStackTrace();
    }
%>
<p><%=test%></p>
<p><%=result%></p>
<%--<div id="map" style="width:1000px;height:600px;"></div>--%>
<input type="button" onclick="getjson('location/jeju.json', '제주도'), panTo(33.48892014636885, 126.49822643823065);" value="제주도">
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
<script src="js/loaddata.js" type="text/javascript"></script>
<%--<%@ include file="polygon.jsp" %>--%>
<%--<%@ include file="search.jsp" %>--%>
</body>
</html>
