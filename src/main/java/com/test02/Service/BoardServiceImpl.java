package com.test02.Service;

import com.test02.Dao.BoardDao;
import com.test02.Dto.BoardDto;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Service
public class BoardServiceImpl implements BoardService {

    @Autowired
    BoardDao boardDao;

    // 게시글 보기
    @Override
    public List<BoardDto> getBoardList() {
        List<BoardDto> list = boardDao.getBoardList();
        return list;
    }

    // 게시글 작성
    @SneakyThrows
    @Override
    public void insert(BoardDto boardDto) {
        boardDao.insert(boardDto);
    }

    // 게시글 상세보기
    @SneakyThrows
    @Transactional(isolation = Isolation.READ_COMMITTED)
    @Override
    public BoardDto pageDetail(HttpServletRequest request) {
        String BoardId = request.getParameter("BoardId");

        //조회수 증가 메소드
        boardDao.increaseCount((Integer.parseInt(BoardId)));
        return boardDao.pageDetail(Integer.parseInt(BoardId));
    }

    // 게시글 삭제
    @Override
    public int delete(int BoardId) {
        return boardDao.delete(BoardId);
    }

    // 게시글 수정

    @Override
    public BoardDto update(HttpServletRequest request) {
        String B_Title = request.getParameter("B_Title");
        String B_Context = request.getParameter("B_Context");
        String B_Writer = request.getParameter("B_Writer");

        BoardDto boardDto = new BoardDto();
        boardDto.setB_Title(B_Title);
        boardDto.setB_Context(B_Context);
        boardDto.setB_Writer(B_Writer);
        boardDao.update(boardDto);
        return boardDto;
    }

//
//    @SneakyThrows
//    @Override
//    public int update(int BoardId) {
//        return boardDao.update(BoardId);
//    }

    // modify에 넘기기
    @SneakyThrows
    @Transactional(isolation = Isolation.READ_COMMITTED)
    @Override
    public BoardDto pageSend(HttpServletRequest request) {
        String BoardId = request.getParameter("BoardId");

        return boardDao.pageDetail(Integer.parseInt(BoardId));
    }
}
