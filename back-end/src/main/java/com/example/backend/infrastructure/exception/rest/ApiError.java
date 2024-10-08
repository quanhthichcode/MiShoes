package com.example.backend.infrastructure.exception.rest;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

/**
 * @author Nguyễn Vinh
 */
@AllArgsConstructor
@Getter
@Setter
public class ApiError {

    private String message;

}
