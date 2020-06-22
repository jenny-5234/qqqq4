<%--
  Created by IntelliJ IDEA.
  User: jenny
  Date: 2020-06-18
  Time: 오후 2:28
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <title>Title</title>
</head>
<body>
<section id="NoticeList">
    <h1>ms sql 연동</h1>
    <table>
        <c:forEach var="dto" items="${notice}">
            <tr>
                <td>${dto.noticeId}</td>
                <td>${dto.n_Title}</td>
                <td>${dto.n_Writer}</td>
                <td>${dto.n_Date}</td>
                <td>${dto.n_Count}</td>
            </tr>
        </c:forEach>
    </table>
</section>
</body>
</html>
