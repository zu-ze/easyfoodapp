import React from "react"
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    Image,
    FlatList,
    // TextInput,
    ActivityIndicator
} from "react-native"
import { Header, TextInput } from '../../components'
import { COLORS, SIZES, images, FONTS } from "../../constants"
import { post } from "../../utilities/post"

const InviteWorker = ({navigation}) => {
    const [isLoading, setIsLoading] = React.useState(false)
    const [username, setUsername] = React.useState({value: "", error: ""})

    const _processInvite = async () => {
        if (validateCredentials()) {
            let res = await post('/api/invite', {
                
            })
        }
    }

    if (isLoading) return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
            }}
        >
            <ActivityIndicator size={"large"} color={COLORS.orange} />
        </View>
    )

    return (
        <SafeAreaView>
            <Header navigation={navigation} backBtn={true} />
            <View
                style={{
                    width: SIZES.width * .95,
                    // height: SIZES.height * .75,
                    // height: SIZES.height * .5,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: COLORS.orange,
                    borderRadius: SIZES.radius,
                    marginTop: SIZES.padding * 2,
                    padding: SIZES.padding
                }}
            >
                <Text
                    style={{ ...FONTS.h4, color: COLORS.white }}
                >Send Invitation request</Text>
                <View
                    style={{
                        width: "100%"
                    }}
                >
                    <TextInput
                        placeholder="enter email or username" 
                        type="text"
                        value={username.value}
                        onChange={setUsername}
                        error={username.error}
                        autofocus={true}
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
                        onPress={_processInvite}
                    >
                        <Text>Continue</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default InviteWorker