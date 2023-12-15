create table "user"
(
    user_id   bigint primary key,
    email     varchar(100) not null unique,
    real_name varchar(50)  not null,
    "password"  varchar(255),
    create_at date default current_timestamp
);

create table friend
(
    friend_id   serial primary key,
    sender_id   bigint references "user" (user_id),
    receiver_id bigint references "user" (user_id),
    status      varchar(20) not null,
    create_at date default current_timestamp
);

create table chat
(
    chat_id serial primary key
);

create table user_chat
(
    sender_id    bigint references "user" (user_id),
    receiver_id  bigint references "user" (user_id),
    chat_id      integer references chat (chat_id),
    user_deleted varchar(10),
    primary key (sender_id, receiver_id),
    create_at date default current_timestamp
);

create table "message"
(
    message_id serial primary key,
    sender_id  bigint references "user" (user_id),
    chat_id    integer references chat (chat_id),
    "content"    text      not null,
    sent_at  timestamp not null,
    create_at date default current_timestamp
);

create table "group"
(
    group_id   serial primary key,
    group_name varchar(50) not null,
    chat_id    integer references chat (chat_id),
    create_at date default current_timestamp
);

create table group_member
(
    group_member_id serial primary key,
    group_id        integer references "group" (group_id),
    user_id         bigint references "user" (user_id),
    "role"          varchar(20) not null,
    create_at date default current_timestamp
);








