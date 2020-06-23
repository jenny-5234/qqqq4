<%--
  Created by IntelliJ IDEA.
  User: jenny
  Date: 2020-06-17
  Time: 오후 3:59
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<html>
<head>
    <title>정보마당</title>
    <link rel="stylesheet" href="/css/test.css"/>
</head>
<body>
<section id="Board_notice">
    <table>
        <tr>
            <td>번호</td>
            <td>제목</td>
            <td>작성자</td>
            <td>날짜</td>
            <td>조회수</td>
        </tr>
        <c:forEach var="dto" items="${board}">
            <tr>
                <td>${dto.boardId}</td>
                <td><a href="/board/pageview?BoardId=${dto.boardId}">${dto.b_Title}</a></td>
                <td>${dto.b_Writer}</td>
                <td><fmt:formatDate value="${dto.b_Date}" pattern="yyyy-MM-dd"/> </td>
                <td>${dto.b_Count}</td>
            </tr>
        </c:forEach>
    </table>
</section>
<a href="write">글쓰기</a>
</body>
</html>
