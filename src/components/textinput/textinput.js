import React from "react"
import {
    View,
    Text,
    TextInput
} from "react-native"
import { COLORS, SIZES } from "../../constants"

const Input = ({onChange, value, error, type, placeholder}) => {
    
    return (
        <View
            style={{
                width: "100%"
            }}
        >
            <TextInput
                style={{
                    height: 70,
                    backgroundColor: COLORS.white,
                    width: "100%",
                    borderRadius: SIZES.radius * .5,
                    paddingHorizontal: SIZES.padding,
                    fontSize: SIZES.body3,

                }}
                placeholder={placeholder} 
                inlineImageLeft="search_icon"
                returnKeyType="next"
                textContentType={type}
                value={value}
                onChangeText={(txt) => onChange({value: txt, error: ""})}
            />
            <Text
                style={{
                    color: COLORS.error,
                    fontSize: SIZES.body3,
                    textAlign: "center",
                    marginBottom: 15
                }}
            >{error}</Text>
        </View>
    )
}

export default Input