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

    public static final String ID_PARAM = "/{id}";
    public static final String ID = "/id";
    public static final String NOT = "/not";
    public static final String JOINED = "/joined";

    // actions
    public static final String CREATE = "/create";
    public static final String GET = "/get";
    public static final String ADD = "/add";
    public static final String LOGIN = "/login";
    public static final String LOGOUT = "/logout";
    public static final String REQUEST = "/request";
    public static final String SENT = "/sent";
    public static final String CANCEL = "/cancel";
    public static final String DELETE = "/delete";
    public static final String RECEIVED = "/received";
    public static final String REFRESH_TOKEN = "/refresh-token";

    public static final String USER = "/user";
    public static final String FRIEND = "/friend";
    public static final String FRIENDS = "/friends";
    public static final String GROUP = "/group";
    public static final String GROUPS = "/groups";
    public static final String CHAT = "/chat";
    public static final String CHATS = "/chats";
    public static final String MESSAGE = "/message";
    public static final String MESSAGES = "/messages";

    public static final String USER_GET_ALL = "/users";
    public static final String USER_CREATE = USER + CREATE;
    public static final String USER_GET_BY_ID = USER + GET + ID_PARAM;
    public static final String GET_ALL_FRIEND_BY_ID = FRIENDS + ID_PARAM;
    public static final String USER_GET_ALL_NOT_FRIEND = USER + GET + NOT + FRIENDS + ID_PARAM;
    public static final String USER_GET_ALL_GROUPS_JOINED = USER + GET + GROUPS + JOINED + ID_PARAM;
    public static final String USER_GET_ALL_NOT_JOINED_GROUPS = USER_GET_ALL + GROUP + NOT + JOINED + ID_PARAM;
    public static final String USER_GET_ALL_CHAT = USER + GET + CHATS + ID_PARAM;
    public static final String USER_GET_BY_EMAIL = USER + GET + EMAIL + EMAIL_PARAM;

    public static final String MESSAGE_GET_ALL_BY_CHAT_ID = MESSAGES + GET + CHAT + ID_PARAM;
    public static final String FRIEND_REQUEST = FRIEND + REQUEST;
    public static final String CANCEL_FRIEND_REQUEST = CANCEL + FRIEND + REQUEST + ID_PARAM;
    public static final String DELETE_FRIEND = DELETE + FRIEND + ID_PARAM;
    public static final String FRIENDS_REQUEST_SENT = FRIENDS + REQUEST + SENT + ID_PARAM;
    public static final String FRIENDS_REQUEST_RECEIVED = FRIENDS + REQUEST + RECEIVED + ID_PARAM;
}
