<%--
  Created by IntelliJ IDEA.
  User: jenny
  Date: 2020-06-17
  Time: 오후 4:00
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Title</title>
</head>
<body>
<%--<section class="content">--%>
<form name="form1" method="get">
    <div class="box">
        <div class="box-header">
            <h3 class="box-title">상세보기</h3>
        </div>
        <div class="box-body">
            <div class="form-group">
                <label>제목</label>
                <input type="text" name="title"
                       class="form-control" value="${boardDto.b_Title}"
                       readonly="readonly"/>
            </div>
            <div class="form-group">
                <label>내용</label>
                <textarea name="content" rows="5"
                          readonly="readonly" class="form-control">${boardDto.b_Context}</textarea>
            </div>
            <div class="form-group">
                <label>작성자</label>
                <input type="text"
                       class="form-control" value="${boardDto.b_Writer}"
                       readonly="readonly"/>
            </div>
        </div>
        <button class="btn btn-primary" id="listbtn">목록</button>
        <button class="btn btn-danger" id="deletebtn">삭제</button>
    </div>
</form>

<script>
    document.getElementById("listbtn").addEventListener("click", function () {
        location.href = "boardlist";
    });
    document.getElementById("deletebtn").addEventListener("click", function () {
        location.href = "boardlist";
    });


</script>
</body>
</html>
