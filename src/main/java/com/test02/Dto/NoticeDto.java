package com.test02.Dto;

import lombok.Data;

import java.sql.Date;

@Data
public class NoticeDto {
    private int NoticeId;
    private String N_Writer;
    private String N_Password;
    private String N_Title;
    private String N_Context;
    private Date N_Date;
    private int N_Count;

}
