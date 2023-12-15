package com.vtd.chatwebapp.exception;

import lombok.Builder;

@Builder
public class ErrorDetails {
    private int errorCode;
    private String errorMessage;
}
