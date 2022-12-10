import React,{useContext} from "react"
import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    TouchableOpacity
} from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { AppContext } from "../../components/appcontext/appcontext"
import { COLORS, SIZES } from "../../constants"
import Icon from "react-native-vector-icons/Ionicons"


const EnterCode = ({navigation}) => {
    const {userdata, setUserdata} = useContext(AppContext)
    const [code, setCode] = React.useState({value: "", error: ""})

    const persistSignIn = (data, message, status) => {
        AsyncStorage.setItem('userdetails', JSON.stringify(data))
        .then((result) => {
            setUserdata(data)
            // navigation.navigate("Welcome")
        })
        .catch(error => {
            console.log(error)
        })

    }

    return (
        <SafeAreaView>
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    width: "100%",
                    marginTop: SIZES.padding * 2,

                }}
            >
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
                    <Icon name="arrow-back" size={30} color={"black"} />
                </TouchableOpacity>
            </View>
            <View
                style={{
                    width: SIZES.width,
                    // height: SIZES.height * .75,
                    height: SIZES.height * .5,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: COLORS.orange,
                    borderRadius: SIZES.radius,
                    // marginTop: SIZES.padding * 8,
                    padding: SIZES.padding
                }}
            >
                <Text
                style={{
                    // fontSize: "18px",
                    // fontStyle: "normal",
                    // lineHeight: "24px",
                    // fontWeight: "600",
                    marginBottom: 20
                }}
                >Create Account</Text>
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
                            marginBottom: 15

                        }}
                        placeholder="enter code" 
                        inlineImageLeft="search_icon"
                        returnKeyType="next"
                        textContentType="oneTimeCode"
                        keyboardType="number-pad"
                        value={code.value}
                        onChangeText={(txt) => setCode({value: txt, error: ""})}
                    />
                    <TouchableOpacity
                        style={{
                            /* Auto layout */
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            // padding: "25px 94px",
                            // gap: "10px",

                            width: "100%",
                            height: 70,

                            backgroundColor: "#3FC979",
                            borderRadius: 15,
                            marginBottom: 10
                        }}
                        onPress={()=>{
                            // navigation.navigate("Enter Code")
                            persistSignIn({
                                id: 1,
                                username: "Guest01",
                                role: 2,
                            }, "User details", true)
                        }}
                    >
                        <Text>Continue</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default EnterCode