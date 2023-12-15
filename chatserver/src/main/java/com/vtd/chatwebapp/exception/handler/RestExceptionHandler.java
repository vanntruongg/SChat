package com.vtd.chatwebapp.exception.handler;

import com.vtd.chatwebapp.common.CommonResponse;
import com.vtd.chatwebapp.entity.User;
import com.vtd.chatwebapp.exception.DuplicateException;
import com.vtd.chatwebapp.exception.NotFoundException;
import org.apache.commons.lang3.StringUtils;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.HttpMediaTypeNotAcceptableException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

@ControllerAdvice
public class RestExceptionHandler {

    @ExceptionHandler(value = DuplicateException.class)
    public ResponseEntity<CommonResponse<Object>> handleDuplicateException(Exception exception, WebRequest request) {
        return ResponseEntity.internalServerError().body(CommonResponse.builder()
                .isSuccess(false)
                .message(exception.getMessage())
                .errorDetails(exception.getCause() != null ? exception.getCause().getMessage() : StringUtils.EMPTY)
                .build());
    }

    @ExceptionHandler(value = NotFoundException.class)
    public ResponseEntity<CommonResponse<Object>> handleNotFoundException(Exception exception, WebRequest request) {
        return ResponseEntity.internalServerError().body(CommonResponse.builder()
                .isSuccess(false)
                .message(exception.getMessage())
                .errorDetails(exception.getCause() != null ? exception.getCause().getMessage() : StringUtils.EMPTY)
                .build());
    }

}
