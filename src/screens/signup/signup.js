import React from "react"
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    TextInput,
    ScrollView
} from "react-native"
import { COLORS, keys, SIZES } from "../../constants"
import PhoneInput from "react-native-phone-number-input"
import Icon from "react-native-vector-icons/Ionicons"

const accountSid = keys.TWILIO_ACCOUNT_SID;
const authToken = keys.TWILIO_AUTH_TOKEN;
const fromnumber = keys.TWILIO_PHONE_NUMBER
// const client = require('twilio')(accountSid, authToken);

const SignUp = ({navigation}) => {
    const [username, setUsername] = React.useState({value: "", error: ""})
    const [email, setEmail] = React.useState({value: "", error: ""})
    const [phoneformat, setPhoneformat] = React.useState({value: "", error: ""})
    const [phonenumber, setPhonenumber] = React.useState({value: "", error: ""})

    const persistSignUp = () => {
        // client.messages
        // .create({body: 'Hi there', from: fromnumber, to: phoneformat + phonenumber})
        // .then(message => {
            // console.log(message.sid)
            navigation.navigate("Enter Code", {

            })
        // });
    }

    return (
        <SafeAreaView 
            style={{
                flex: 1
            }}
        >
            <ScrollView>
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
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: COLORS.orange,
                        borderRadius: SIZES.radius,
                        // marginTop: SIZES.padding * 10,
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
                            justifyContent: "center",
                            alignItems: "center",
                            padding: SIZES.padding,
                            width: "100%"
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                width: "100%",
                                height: 70,
                                borderRadius: 15,
                                backgroundColor: "#F6F6F6",
                                justifyContent: "center",
                                alignItems: "center",
                                marginBottom: 15
                            }}
                        >
                            <Text
                                style={{
                                    // fontSize: "16px",
                                    // fontStyle: "normal",
                                    // fontWeight: "700",
                                    // lineHeight: "120.5%"
                                }}
                            >Sign up with Google</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                width: "100%",
                                height: 70,
                                borderRadius: 15,
                                backgroundColor: "#F6F6F6",
                                justifyContent: "center",
                                alignItems: "center",
                                marginBottom: 15
                            }}
                        >
                            <Text
                                style={{
                                    // fontSize: "16px",
                                    // fontStyle: "normal",
                                    // fontWeight: "700",
                                    // lineHeight: "120.5%"
                                }}
                            >Sign up with Facebook</Text>
                        </TouchableOpacity>
                    </View>
                    <Text>Or</Text>
                    <View
                        style={{
                            justifyContent: "center",
                            alignItems: "center",
                            padding: SIZES.padding,
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
                            placeholder="username" 
                            inlineImageLeft="search_icon"
                            returnKeyType="search"
                            textContentType="next"
                            value={username.value}
                            onChangeText={(txt) => setUsername({value: txt, error: ""})}
                            autoFocus
                        />
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
                            placeholder="email" 
                            inlineImageLeft="search_icon"
                            returnKeyType="next"
                            textContentType="emailAddress"
                            value={email.value}
                            onChangeText={(txt) => setEmail({value: txt, error: ""})}
                        />
                        <PhoneInput
                            // ref={phoneInput}
                            defaultValue={phonenumber.value}
                            defaultCode="MW"
                            layout="first"
                            onChangeText={(text) => {
                                // console.log(text)
                                setPhonenumber({value: text, error: ""});
                            }}
                            onChangeFormattedText={(text) => {
                                // console.log(text)
                                setPhoneformat({value: text, error: ""});
                            }}
                            countryPickerProps={{ withAlphaFilter: true }}
                            containerStyle={{
                                borderRadius: 15,
                                width: "100%",
                                height: 70,
                            }}
                            ariaHideApp={false}
                            // withShadow
                            // autoFocus
                        />
                        <View>
                            <Text
                            >If you sign up, you agree to the Terms & Conditions and Privacy Policy.</Text>
                        </View>
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
                            onPress={persistSignUp}
                        >
                            <Text>Continue</Text>
                        </TouchableOpacity>
                        <View>
                            <Text

                            >Already have an account? </Text>
                            <TouchableOpacity>
                                <Text
                                    style={{
                                        // fontSize: "16px",
                                        // fontStyle: "normal",
                                        // lineHeight: "20px",
                                        // fontWeight: "600",
                                        color: "#3FC979"
                                    }}
                                >Sign in</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>

        </SafeAreaView>
    )
}

export default SignUp