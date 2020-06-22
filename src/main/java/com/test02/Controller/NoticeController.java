package com.test02.Controller;

import com.test02.Dto.NoticeDto;
import com.test02.Service.NoticeServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@RequestMapping("/notice")
@Controller
public class NoticeController {

    @Autowired
    NoticeServiceImpl noticeService;

    @GetMapping("/noticeList")
    public String list(Model model) {
        List<NoticeDto> notice = noticeService.getNoticeList();

        model.addAttribute("notice", notice);

        System.out.println(notice);

        return "notice/noticeList";
    }

}
