import React from "react"
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    ScrollView
} from "react-native"
import { COLORS, SIZES } from "../../constants"
import {TextInput} from '../../components'
import { AppContext } from "../../components/appcontext/appcontext"
import Icon from "react-native-vector-icons/Ionicons"
import { post } from "../../utilities/post"
import { emailValidator, nameValidator } from "../../utilities/validator"

const RegisterFoodService = ({navigation}) => {
    const [name, setName] = React.useState({value: "", error: ""})
    const [paypalemail, setPaypalemail] = React.useState({value: "", error: ""})
    const [error, setError] = React.useState({message: ""})
    const {userdata, setUserdata} = React.useContext(AppContext)


    const registerfoodservice = async () => {
        if(!validateCredential()) return

        const response = await post('/api/foodservice', {
            userId: userdata.user.id,
            name: name.value,
            paypalemail: paypalemail.value
        })

        if (response.status === true) {
            await post('/api/notification', {
                type: "register",
                from: userdata.id,
                to: "administrator",
                content: "I would like to register my food service."
            })

            navigation.navigate('Profile');
            // return;
        } else {
            setError({message: response.message})
            return
        }
    }

    const validateCredential = () => {
        const nameError = nameValidator(name.value)
        const paypalemailError = emailValidator(paypalemail.value)

        if (nameError !== '' || paypalemailError !== '') {
            setName({value: name.value, error: nameError})
            setPaypalemail({value: paypalemail.value, error: paypalemailError})
            return false
        }

        return true
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
                    >Register a Food Service</Text>
                    <Text
                        style={{
                            color: COLORS.error,
                            fontSize: SIZES.body3,
                            textAlign: "center",
                            marginBottom: 15
                        }}
                    >{error.message}</Text>
                    <View
                        style={{
                            justifyContent: "center",
                            alignItems: "center",
                            padding: SIZES.padding,
                            width: "100%"
                        }}
                    >
                        
                        <TextInput
                            placeholder="food service name" 
                            type="text"
                            value={name.value}
                            onChange={setName}
                        />
                        <TextInput
                            placeholder="paypal email" 
                            type="emailAddress"
                            value={paypalemail.value}
                            onChange={setPaypalemail}
                        />

                        <View>
                            <Text
                            >If you register food service, you agree to the Terms & Conditions and Privacy Policy.</Text>
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
                            onPress={registerfoodservice}
                        >
                            <Text>Continue</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

        </SafeAreaView>
    )
}

export default RegisterFoodService