package com.vtd.chatwebapp.converter;

import com.vtd.chatwebapp.enums.FriendStatus;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import java.util.stream.Stream;

@Converter(autoApply = true)
public class FriendRequestStatusConverter implements AttributeConverter<FriendStatus, String> {

    @Override
    public String convertToDatabaseColumn(FriendStatus attribute) {
        if(attribute == null) {
            return null;
        }
        return attribute.getStatus();
    }

    @Override
    public FriendStatus convertToEntityAttribute(String dbData) {
        if (dbData == null) {
            return null;
        }
        return Stream.of(FriendStatus.values())
                .filter(status -> status.getStatus().equals(dbData))
                .findFirst()
                .orElseThrow(IllegalArgumentException::new);

    }
}
