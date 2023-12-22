package com.vtd.chatwebapp.entity.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;

import java.util.List;

@Getter
public class GroupDto {
    @NotBlank
    private Long leaderId;
    @NotBlank
    private String groupName;
    @NotEmpty
    private List<Long> userIds;
}
