import React from "react"
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    Image,
    FlatList
} from "react-native"
import { Header } from '../../components'
import { SIZES, images, COLORS } from "../../constants"

const Welcome = ({navigation}) => {
    

    return (
        <SafeAreaView
            style={{
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <View
                style={{
                    flexDirection: "row",
                    padding: SIZES.padding,
                    marginTop: 30,
                }}
            >
                <Text
                    style={{
                        // fontSize: "14px",
                        // fontStyle: "normal",
                        // lineHeight: "20px",
                        // fontWeight: "600"
                    }}
                >Continue as </Text>
                <TouchableOpacity
                    onPress={()=>{

                    }}
                >
                    <Text
                        style={{
                            // fontSize: "16px",
                            // fontStyle: "normal",
                            // lineHeight: "20px",
                            // fontWeight: "600",
                            color: "#3FC979"
                        }}
                    >Guest</Text>
                </TouchableOpacity>
            </View>

            <View
                style={{
                    width: SIZES.width,
                    // height: SIZES.height * .75,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: COLORS.orange,
                    borderRadius: SIZES.radius,
                    paddingTop: SIZES.padding * 10
                }}
            >
                <Text>EasyFood</Text>
                <Image 
                    source={images.delivery_man_riding_scooter}  
                    resizeMode="cover"
                    style={{
                        width: SIZES.width * .9,
                        height: SIZES.height * .5
                    }}
                />
                <View
                    style={{
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: SIZES.padding
                    }}
                >
                    <TouchableOpacity
                        style={{
                            /* Auto layout */
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            // padding: "25px 94px",
                            // gap: "10px",

                            width: 350,
                            height: 70,

                            backgroundColor: "#3FC979",
                            borderRadius: 15,
                            marginBottom: 10
                        }}
                        onPress={()=>{
                            navigation.navigate("Sign Up")
                        }}
                    >
                        <Text>Sign Up</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            /* Auto layout */
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            // padding: "25px 94px",
                            // gap: "10px",

                            width: 350,
                            height: 70,

                            borderRadius: 15,
                            backgroundColor: COLORS.white
                        }}
                        onPress={()=>{
                            navigation.navigate("Sign In")
                        }}
                    >
                        <Text>Sign In</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </SafeAreaView>
    )
}

export default Welcome