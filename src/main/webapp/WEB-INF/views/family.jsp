<%--
  Created by IntelliJ IDEA.
  User: jenny
  Date: 2020-06-16
  Time: 오전 9:58
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <title> DB List Test</title>
</head>

<body>
<section id="FamilyList">
    <table>
        <tr>
            <td>이름</td>
            <td>나이</td>
            <td>성별</td>
            <td>관계</td>
            <td>직업</td>
        </tr>
        <c:forEach var="dto" items="${familylist}">
            <tr>
                <td>${dto.name}</td>
                <td>${dto.age}</td>
                <td>${dto.sex}</td>
                <td>${dto.relation}</td>
                <td>${dto.job}</td>
            </tr>
        </c:forEach>
    </table>
</section>

</body>
</html>
