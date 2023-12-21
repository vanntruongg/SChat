package com.vtd.chatwebapp.converter;

import com.vtd.chatwebapp.enums.FriendRequestStatus;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import java.util.stream.Stream;

@Converter(autoApply = true)
public class FriendRequestStatusConverter implements AttributeConverter<FriendRequestStatus, String> {

    @Override
    public String convertToDatabaseColumn(FriendRequestStatus attribute) {
        if(attribute == null) {
            return null;
        }
        return attribute.getStatus();
    }

    @Override
    public FriendRequestStatus convertToEntityAttribute(String dbData) {
        if (dbData == null) {
            return null;
        }
        return Stream.of(FriendRequestStatus.values())
                .filter(status -> status.getStatus().equals(dbData))
                .findFirst()
                .orElseThrow(IllegalArgumentException::new);

    }
}
