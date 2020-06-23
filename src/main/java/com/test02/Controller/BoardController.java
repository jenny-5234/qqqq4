package com.test02.Controller;


import com.test02.Dto.BoardDto;
import com.test02.Service.BoardServiceImpl;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.management.Attribute;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;

@RequestMapping("/board")
@Controller
public class BoardController {

    @Autowired
    BoardServiceImpl boardService;

    // 1. 게시글 목록
    @GetMapping("/boardlist")
    public String list(Model model) {
        List<BoardDto> board = boardService.getBoardList();

        model.addAttribute("board", board);

        return "/board/boardlist";
    }

    // 2. 게시글 작성
    @RequestMapping("/write")
    public String writeBoard() {

        return "/board/write";
    }

    @PostMapping(value = "insert.do")
    public String insert(@ModelAttribute("boardDto") BoardDto boardDto) throws Exception {
        System.out.println(boardDto);
        boardService.insert(boardDto);

        return "redirect:/board/boardlist";
    }

    // 3. 게시글 상세보기
    @RequestMapping(value = "/pageview", method = {RequestMethod.GET, RequestMethod.POST})
    public String pageDetail(HttpServletRequest request, Model model) {
        BoardDto boardDto = boardService.pageDetail(request);

        model.addAttribute("boardDto", boardDto);

        return "board/pageview";
    }

    // 4. 게시글 삭제
    @SneakyThrows
    @GetMapping(value = "delete.do")
    public String delete(@RequestParam(value = "boardId", required = false) int boardId) {
        boardService.delete(boardId);

        return "redirect:/board/boardlist";
    }

    // 5. 게시글 수정
    @GetMapping(value = "/modify")
    public String update(HttpServletRequest request, Model model) {
//        boardService.update(request);

        BoardDto boardDto = boardService.update(request);
        model.addAttribute("boardDto", boardDto);
//        BoardDto board = boardService.pageSend(request);
//        model.addAttribute("board", board);

        return "/board/modify";
    }

//    @PostMapping(value = "update.do")
//    public String modify(@RequestParam(value = "boardId", required = false)BoardDto boardDto) {
//        boardService.update(b);
//        return "redirect:/board/boardlist";
//    }
}
