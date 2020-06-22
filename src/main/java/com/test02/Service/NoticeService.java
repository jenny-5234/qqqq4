package com.test02.Service;

import com.test02.Dto.NoticeDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface NoticeService {
    public List<NoticeDto> getNoticeList();

}
