import React from "react"
import {
    View,
    Text,
    TouchableOpacity,
    Image,
} from "react-native"
import { icons, COLORS, FONTS, SIZES } from '../../constants'
import { useSelector } from "react-redux"
import Icon from "react-native-vector-icons/Ionicons"

const Header = ({navigation, backBtn = false}) => {
    const cart = useSelector((store) => store.cart)

    return (
        <View style={{ 
            flexDirection: 'row', 
            backgroundColor: COLORS.yellow, 
            padding: 2.5, 
            paddingTop: 25,
            // borderBottomEndRadius: SIZES.radius * .5,
            // borderBottomStartRadius: SIZES.radius * .5 
            }} 
        >
            {backBtn === false? 
            <TouchableOpacity
                style={{
                    width: 50,
                    padding: SIZES.padding,
                    justifyContent: 'center'
                }}
                onPress={() => {

                }}
            >
                <Image 
                    source={icons.nearby}
                    resizeMode="contain"
                    style={{
                        width: 25,
                        height: 25,
                    }}
                />
            </TouchableOpacity>
            :
            <TouchableOpacity
                style={{
                    // width: 50,
                    padding: SIZES.padding,
                    justifyContent: 'center'
                }}
                onPress={() => {
                    navigation.goBack()
                }}
            >
                <Icon name="arrow-back" size={30} color={"white"} />
            </TouchableOpacity>
            }

            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <View
                    style={{
                        width: '70%',
                        height: 40,
                        backgroundColor: COLORS.lightGray3,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: SIZES.radius
                    }}
                >
                    <Text style={{ ...FONTS.h3 }}>{"Mzuzu"}</Text>
                </View>
            </View>


            <TouchableOpacity
                style={{
                    // width: 50,
                    padding: SIZES.padding,
                    justifyContent: 'center'
                }}
                onPress={() => {
                    navigation.navigate("Shoping Cart")
                }}
            >
                <Text
                    style={{
                        position: "absolute",
                        bottom: 20,
                        fontSize: SIZES.body2,
                        fontWeight: "500",
                        color: COLORS.white
                    }}
                >{cart.length}</Text>
                <Icon name="cart" size={30} color={"white"} />
            </TouchableOpacity>
        </View>
    )
}

export default Header