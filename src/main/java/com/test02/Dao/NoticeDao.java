package com.test02.Dao;

import com.test02.Dto.NoticeDto;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("noticeDao")
public class NoticeDao {

        @Autowired
        SqlSession sqlSession;

        public List<NoticeDto> getNoticeList() {
            List<NoticeDto> list = null;

            try {
                list = sqlSession.selectList("notice.getNoticeList");
            } catch (Exception e) {
                e.printStackTrace();
            }

            System.out.println("List :" + list);
            return list;
        }


}
