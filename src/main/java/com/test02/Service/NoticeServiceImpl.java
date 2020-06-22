package com.test02.Service;

import com.test02.Dao.NoticeDao;
import com.test02.Dto.NoticeDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NoticeServiceImpl implements NoticeService {

    @Autowired
    NoticeDao noticeDao;

    @Override
    public List<NoticeDto> getNoticeList() {
        List<NoticeDto> list = noticeDao.getNoticeList();
        return list;
    }

}
