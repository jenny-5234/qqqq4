<%--
  Created by IntelliJ IDEA.
  User: jenny
  Date: 2020-06-17
  Time: 오후 4:00
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Title</title>
</head>
<body>
<form name="viewForm" method="post">
    <div class="box">
        <div class="box-header">
            <h3 class="box-title">상세보기</h3>
        </div>
        <div>
            작성일자 : <fmt:formatDate value="${boardDto.b_Date}" pattern="yyyy-MM-dd"/>
        </div>
        <div>
            조회수 : ${boardDto.b_Count}
        </div>
        <div>
            제목
            <input name="title" id="B_Title" value="${boardDto.b_Title}" readonly="readonly"/>
        </div>
        <div>
            내용
            <textarea name="context" rows="5" readonly="readonly">${boardDto.b_Context}</textarea>
        </div>
        <div>
            이름
            <input name="writer" id="B_Writer" value="${boardDto.b_Writer}" readonly="readonly"/>
        </div>
        <td>
            <button type="button" onclick="location.href='/board/boardlist'">목록</button>

            <button type="button" onclick="location.href='delete.do?boardId=${boardDto.boardId}'">삭제</button>

            <button type="button" onclick="location.href='/board/modify?boardId=${boardDto.boardId}'">수정</button>
        </td>

    </div>
</form>
<script>
    <%--function fn_update() {--%>
    <%--    var form = document.getElementById("viewForm")--%>

    <%--    form.action = "<c:url value="board/update.do"/>--%>
    <%--    form.submit();--%>
    <%--}--%>
</script>
</body>
</html>
