package com.vtd.chatwebapp.constant;

public class MessageConstant {

    public static final String CHAR_SEQUENCE_2 = "%s %s";
    public static final String CHAR_SEQUENCE_3 = "%s %s %s";
    public static final String CHAR_SEQUENCE_4 = "%s %s %s %s";
    public static final String CHAR_SEQUENCE_5 = "%s %s %s %s %s";

    public static final String EMAIL_EXISTS = "Email was existed!";


    // actions
    public static final String CREATE = "Create";
    public static final String FIND = "Find";
    public static final String LOGIN = "Login";
    public static final String LOGOUT = "Logout";
    public static final String REGISTER = "Register";
    public static final String REFRESH = "Refresh";
    public static final String SENT = "Send";
    public static final String TOKEN = "token!";
    // status
    public static final String SUCCESS = "successfully!";
    public static final String FAIL = "failed!";
    public static final String INVALID = "Invalid";
    public static final String NOT_FOUND = "Not found!";
    public static final String FRIEND_REQUEST = "friend request";
    public static final String CANCEL_FRIEND_REQUEST = "cancel friend request";
    public static final String DELETE_FRIEND_REQUEST = "delete friend";

    // entity
    public static final String USER = "User";
    public static final String CHAT = "Chat";


    public static final String CREATE_SUCCESS = String.format(CHAR_SEQUENCE_2, CREATE, SUCCESS);
    public static final String REGISTER_SUCCESS = String.format(CHAR_SEQUENCE_2, REGISTER, SUCCESS);
    public static final String LOGIN_SUCCESS = String.format(CHAR_SEQUENCE_2, LOGIN, SUCCESS);
    public static final String LOGOUT_SUCCESS = String.format(CHAR_SEQUENCE_2, LOGOUT, SUCCESS);
    public static final String REFRESH_TOKEN_FAIL = String.format(CHAR_SEQUENCE_3, REFRESH, TOKEN, FAIL);
    public static final String FIND_SUCCESS = String.format(CHAR_SEQUENCE_2, FIND, SUCCESS) ;
    public static final String USER_NOT_FOUND = String.format(CHAR_SEQUENCE_2, USER, NOT_FOUND);
    public static final String CHAT_NOT_FOUND = String.format(CHAR_SEQUENCE_2, CHAT, NOT_FOUND);

    public static final String SENT_ADD_FRIEND_SUCCESS = String.format(CHAR_SEQUENCE_3, SENT, FRIEND_REQUEST, SUCCESS);
    public static final String SENT_CANCEL_FRIEND_SUCCESS = String.format(CHAR_SEQUENCE_3, SENT, CANCEL_FRIEND_REQUEST, SUCCESS);
    public static final String SENT_DELETE_FRIEND_SUCCESS = String.format(CHAR_SEQUENCE_3, SENT, DELETE_FRIEND_REQUEST, SUCCESS);
}
