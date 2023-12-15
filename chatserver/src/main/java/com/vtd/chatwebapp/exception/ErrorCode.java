package com.vtd.chatwebapp.exception;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.NONE)
public class ErrorCode {
    public static final Integer NOT_NULL = 403;
    public static final Integer NOT_FOUND = 404;
}
