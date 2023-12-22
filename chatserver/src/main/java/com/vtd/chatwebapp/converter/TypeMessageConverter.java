package com.vtd.chatwebapp.converter;

import com.vtd.chatwebapp.enums.TypeMessage;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import java.util.stream.Stream;


@Converter(autoApply = true)
public class TypeMessageConverter implements AttributeConverter<TypeMessage, String> {

    @Override
    public String convertToDatabaseColumn(TypeMessage typeMessage) {
        if (typeMessage == null) {
            return null;
        }
        return typeMessage.getType();
    }

    @Override
    public TypeMessage convertToEntityAttribute(String dbData) {
        if(dbData == null) {
            return null;
        }
        return Stream.of(TypeMessage.values())
                .filter(type -> type.getType().equals(dbData))
                .findFirst()
                .orElseThrow(IllegalArgumentException::new);
    }
}

