package com.vtd.chatwebapp.exception;

public class DuplicateException extends RuntimeException {
    private final transient ErrorDetails errorDetails;

    public DuplicateException(int errorCode, String errorMessage) {
        super(errorMessage);
        this.errorDetails = ErrorDetails.builder()
                .errorCode(errorCode)
                .errorMessage(errorMessage)
                .build();
    }

    public DuplicateException(int errorCode, String errorMessage, Throwable cause) {
        super(errorMessage, cause);
        this.errorDetails = ErrorDetails.builder()
                .errorCode(errorCode)
                .errorMessage(errorMessage)
                .build();
    }
}
