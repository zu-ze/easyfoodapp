import React from "react"
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
} from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
// import { AppContext } from "../../components/appcontext/appcontext"
import { useDispatch } from 'react-redux'
import { setUser } from "../../redux/actions/UserAction"
import { COLORS, SIZES } from "../../constants"
import Icon from "react-native-vector-icons/Ionicons"
import { nameValidator, passwordValidator } from "../../utilities/validator"
import { post } from "../../utilities/post"
import { TextInput } from "../../components"

const SignIn = ({navigation}) => {
    const [username, setUsername] = React.useState({value: "", error: ""})
    const [password, setPassword] = React.useState({value: "", error: ""})
    const [error, setError] = React.useState({message: ""})
    // const {userdata, setUserdata} = React.useContext(AppContext)
    const dispatch = useDispatch()

    const persistSignIn = (data, message, status) => {
        AsyncStorage.setItem('userdetails', JSON.stringify(data))
        .then((result) => {
            dispatch(setUser(data))
            navigation.navigate("Home")
        })
        .catch(error => {
            console.log(error)
        })

    }

    const authenticateCredentials = async () => {
        if(!validateCredentials()) return

        const response = await post('/api/login', {
            username: username.value,
            password: password.value
        })

        if (response.status === true ) {
            persistSignIn(response.user, 'user signed in', true)
        } else {
            setError({message: response.message})
            return
        }
    }

    const validateCredentials = () => {
        const usernameError = nameValidator(username.value)
        const passwordError = passwordValidator(password.value)

        if (usernameError !== '' || passwordError !== '' ) {
            setUsername({value: username.value, error: usernameError})
            setPassword({value: password.value, error: passwordError})
            return false
        }
        
        return true
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
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: COLORS.orange,
                    borderRadius: SIZES.radius,
                    // marginTop: SIZES.padding * 6,
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
                >Sign In</Text>
                <View
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                        padding: SIZES.padding,
                        width: "100%",
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
                        >Sign in with Google</Text>
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
                        >Sign in with Facebook</Text>
                    </TouchableOpacity>
                </View>
                <Text>Or</Text>
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
                        width: "100%",
                    }}
                >
                    <TextInput
                        placeholder="email or username" 
                        type="text"
                        value={username.value}
                        onChange={setUsername}
                        error={username.error}
                    />
                    <TextInput
                        placeholder="password" 
                        type="password"
                        value={password.value}
                        onChange={setPassword}
                        error={password.error}
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
                            // console.log('click')
                            authenticateCredentials()
                        }}
                    >
                        <Text>Continue</Text>
                    </TouchableOpacity>
                    <View>
                        <Text>Don't have an account? </Text>
                        <TouchableOpacity>
                            <Text
                                style={{
                                    // fontSize: "16px",
                                    // fontStyle: "normal",
                                    // lineHeight: "20px",
                                    // fontWeight: "600",
                                    color: "#3FC979"
                                }}
                            >Sign up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

        </SafeAreaView>
    )
}

export default SignIn