package com.vtd.chatwebapp.converter;

import com.vtd.chatwebapp.enums.GroupRole;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import java.util.stream.Stream;

@Converter(autoApply = true)
public class GroupRoleConverter implements AttributeConverter<GroupRole, String> {
    @Override
    public String convertToDatabaseColumn(GroupRole role) {
        if (role == null) {
            return null;
        }
        return role.getRole();
    }

    @Override
    public GroupRole convertToEntityAttribute(String dbData) {
       if (dbData == null) {
           return null;
       }
       return Stream.of(GroupRole.values())
               .filter(role -> role.getRole().equals(dbData))
               .findFirst()
               .orElseThrow(IllegalArgumentException::new);
    }
}
