package com.test02.Controller;


import com.test02.Dto.BoardDto;
import com.test02.Service.BoardServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;

@RequestMapping("/board")
@Controller
public class BoardController {

    @Autowired
    BoardServiceImpl boardService;

    @GetMapping("/boardlist")
    public String list(Model model) {
        List<BoardDto> board = boardService.getBoardList();

        model.addAttribute("board", board);

        return "/board/boardlist";
    }

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

    @GetMapping("/pageview")
    public String pageDetail(HttpServletRequest request, Model model) {
        BoardDto boardDto = boardService.pageDetail(request);

        model.addAttribute("boardDto", boardDto);

        return "board/pageview";
    }

    @GetMapping("/delete.do")
    public String deleteById(@RequestParam int BoardId) throws  Exception{
        boardService.deleteById(BoardId);
        return "redirect:/board/boardlist";
    }
}
