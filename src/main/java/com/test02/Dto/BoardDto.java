package com.test02.Dto;

import lombok.Data;

import java.sql.Date;

@Data
public class BoardDto {
    private int BoardId;
    private String B_Writer;
    private String B_Password;
    private String B_Title;
    private String B_Context;
    private Date B_Date;
    private int B_Count;

}
