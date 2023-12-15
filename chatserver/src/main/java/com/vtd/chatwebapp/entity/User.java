package com.vtd.chatwebapp.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "user", schema = "public")
public class User extends BaseEntity  {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "user_id", nullable = false, updatable = false, length = 10)
    private Long userId;

    @Column(name = "user_name", length = 50, unique = true)
    private String userName;

    @Column(name = "real_name", length = 50, nullable = false)
    private String realName;

    @Column(name = "avatar")
    private String avatar;

    @Column(name = "email", nullable = false, updatable = false, unique = true, length = 100)
    private String email;

    @Column(name = "password")
    @JsonIgnore
    private String password;

    @ManyToMany
    @JoinTable(name = "friend",
            joinColumns = @JoinColumn(name = "sender_id"),
            inverseJoinColumns = @JoinColumn(name = "receiver_id")
    )
    @JsonIgnore
    private List<User> friends;



}
