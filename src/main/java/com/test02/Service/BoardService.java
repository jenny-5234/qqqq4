package com.test02.Service;

import com.test02.Dto.BoardDto;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Service
public interface BoardService {
    // 게시글 조회
    public List<BoardDto> getBoardList();
    // 게시글 작성
    public void insert(BoardDto boardDto) throws Exception;
    // 게시글 상세보기
    public BoardDto pageDetail(HttpServletRequest request) throws Exception;
    // 게시글 삭제
    public int delete(int BoardId);
    // 게시글 수정
//    public int update(int BoardId);
    public BoardDto update(HttpServletRequest request);
    //김영훈만듬
    public BoardDto pageSend(HttpServletRequest request);
}

