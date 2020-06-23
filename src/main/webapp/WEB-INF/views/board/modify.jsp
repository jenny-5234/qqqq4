<%--
  Created by IntelliJ IDEA.
  User: jenny
  Date: 2020-06-17
  Time: 오후 3:59
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <title>게시글 수정</title>
</head>
<body>
<form name="bdto" method="post" action="/board/update.do">
    <input type="hidden" name="boardId" value="${boardDto.boardId}"/>
    <div>제목<input name="B_Title" id="B_Title" size="20" placeholder="글 제목 입력"></div>
    <div>비밀번호<input name="B_Password" id="B_Password" size="15" placeholder="비밀번호 입력"></div>
    <div>이름<input name="B_Writer" id="B_Writer" placeholder="이름 입력"></div>
    <div>내용<textarea name="B_Context" id="B_Context" rows="8" cols="80" placeholder="글 내용 입력"></textarea></div>

    <div style="">
        <input type="submit" value="수정하기">
        <td><button type="button" onclick="location.href='/board/boardlist'">취소</button>
    </div>
</form>
</body>
</html>
