package com.vtd.chatwebapp.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.vtd.chatwebapp.enums.GroupRole;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "group_member", schema = "public")
public class GroupMember extends BaseEntity {
    @Id
    @Column(name = "group_member_id", nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int groupMemberId;

    @ManyToOne
    @JoinColumn(name = "group_id", referencedColumnName = "group_id")
    @JsonIgnore
    private Group group;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    private User user;

    @Column(name = "role", nullable = false)
    private GroupRole role;
}
