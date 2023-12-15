package com.vtd.chatwebapp.constant;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.NONE)
public class ApiEndpoint {

    public static final String ASTERISK_MATCHER = "/**";
    public static final String AUTH_ENDPOINT = "/auth";

    //
    public static final String EMAIL_PARAM = "/{email}";
    public static final String EMAIL = "/email";

    // actions
    public static final String CREATE = "/create";
    public static final String GET = "/get";
    public static final String LOGIN = "/login";
    public static final String LOGOUT = "/logout";
    public static final String REFRESH_TOKEN = "/refresh-token";

    public static final String USER = "/user";
    public static final String FRIEND = "/friends";

    public static final String USER_GET_ALL = "/users";
    public static final String USER_CREATE = USER + CREATE;
    public static final String USER_GET_BY_EMAIL = USER + GET + EMAIL + EMAIL_PARAM;
    public static final String GET_ALL_FRIEND_BY_EMAIL = FRIEND + EMAIL + EMAIL_PARAM;
}
