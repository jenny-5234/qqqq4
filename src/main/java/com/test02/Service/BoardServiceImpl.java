package com.test02.Service;

import com.test02.Dao.BoardDao;
import com.test02.Dto.BoardDto;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
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
    public void update(BoardDto boardDto) throws Exception {
        boardDao.update(boardDto);
    }
}
