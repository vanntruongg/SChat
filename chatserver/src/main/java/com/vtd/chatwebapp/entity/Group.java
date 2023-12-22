package com.vtd.chatwebapp.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.vtd.chatwebapp.enums.TypeMessage;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "group", schema = "public")
public class Group extends BaseEntity {
    @Id
    @Column(name = "group_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int groupId;

    @Column(name = "group_name")
    private String groupName;

    @OneToMany(mappedBy = "group")
    @JsonManagedReference
    private List<GroupMember> groupMemberList = new ArrayList<>();

    @Column(name = "type_message")
    private TypeMessage typeMessage;
}
