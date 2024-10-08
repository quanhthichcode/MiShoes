package com.example.backend.infrastructure.common;

import com.example.backend.infrastructure.constant.PaginationConstant;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public abstract class PageableRequest {
    private int page = PaginationConstant.DEFAULT_PAGE;
    private int size = PaginationConstant.DEFAULT_SIZE;
}
