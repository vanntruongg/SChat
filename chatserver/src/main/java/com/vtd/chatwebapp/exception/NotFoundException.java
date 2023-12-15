package com.vtd.chatwebapp.exception;


public class NotFoundException extends RuntimeException {
    private final transient ErrorDetails errorDetails;

    public NotFoundException(int errorCode, String errorMessage) {
        super(errorMessage);
        this.errorDetails = ErrorDetails.builder()
                .errorCode(errorCode)
                .errorMessage(errorMessage)
                .build();
    }

    public NotFoundException(int errorCode, String errorMessage, Throwable cause) {
        super(errorMessage, cause);
        this.errorDetails = ErrorDetails.builder()
                .errorCode(errorCode)
                .errorMessage(errorMessage)
                .build();
    }
}
