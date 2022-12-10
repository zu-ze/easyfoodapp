import React from "react"
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    Image,
    FlatList,
    ScrollView,
    ActivityIndicator
} from "react-native"
import { Header } from '../../components'
import { AppContext } from "../../components/appcontext/appcontext"
import { COLORS, SIZES, FONTS } from "../../constants"
import { get } from "../../utilities/get"
import styles from "./style"


const Notifications = ({navigation}) => {
    const [isLoading, setIsLoading] = React.useState(true)
    const [notifications, setNotifications] = React.useState([])
    const {userdata, setUserdata} = React.useContext(AppContext)

    const renderNotifications = () => {
        const renderItem = ({item}) => {
            if (item.type === 'promotion')
                return (
                    <TouchableOpacity
                        style={{
                            backgroundColor: COLORS.orange,
                            borderRadius: SIZES.radius * .5,
                            marginBottom: 10,
                            ...styles.shadow
                        }}
                        onPress={() => {
                            // navigation.navigate("Restaurant Profile")
                        }}
                    >
                        <Image 
                            source={item.image}
                            resizeMode="cover"
                            style={{
                                width: "100%",
                                height: 150,
                                borderRadius: SIZES.radius * .5,
                            }}
                        />
                        <View
                            style={{
                                padding: SIZES.padding
                            }}
                        >
                            <Text style={{ fontSize: SIZES.body2, paddingBottom: 5, color: COLORS.white }} >{item.from}</Text>
                            <Text style={{ fontSize: SIZES.body3, paddingBottom: 20, color: COLORS.white }} >{item.content}</Text>
                            <Text style={{ fontSize: SIZES.body5, color: COLORS.white }}>{item.created_at}</Text>
                        </View>
                    </TouchableOpacity>
                )
            else
                return (
            <TouchableOpacity
                    style={{
                        backgroundColor: COLORS.appleGreen,
                        borderRadius: SIZES.radius * .5,
                        marginBottom: 10,
                        ...styles.shadow
                    }}
                >
                    <View 
                        style={{
                            padding: SIZES.padding
                        }}
                    >
                        <Text style={{ fontSize: SIZES.body3, paddingBottom: 20, color: COLORS.white }} >{item.from}</Text>
                        <Text style={{ fontSize: SIZES.body3, paddingBottom: 20, color: COLORS.white }} >{item.content}</Text>
                        <Text style={{ fontSize: SIZES.body5, color: COLORS.white }}>{ new Date(item.created_at).getUTCDate()}</Text>
                    </View>
                </TouchableOpacity>
                )
        }

        return (
            <View 
                style={{
                    padding: SIZES.padding
                }}
            >{notifications.length === 0?
            <View
                style={{
                    // flexDirection: 'row',
                    // margin: SIZES.padding,
                    justifyContent: 'center',
                    alignItems: "center",
                    // width: "100%"
                }}
            >
                <Text style={{ ...FONTS.body2 }}>Oops! no notifications for you</Text>
            </View>
            :
                <FlatList 
                    nestedScrollEnabled={true}
                    data={notifications}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => `${item.id}`}
                    // renderItem={({item}) => {item.type === "promotion"? renderPromotion(item) : renderAnnouncement(item)}}
                    renderItem={renderItem}
                    contentContainerStyle={{
                    }}
                />
            }
            </View>
        )
    }
    
    React.useEffect(() => {
        (async () => {
            setIsLoading(true)
            const res = await get('/api/notification/'+userdata.id)
    
            if (res.status === true) setNotifications(res.notifications)

            setIsLoading(false)
        })()
    }, [])

    if (isLoading) return (
        <View
            style={{
                flex: 1,
                "justifyContent": "center"
            }}
        >
            <ActivityIndicator size={"large"} color={COLORS.orange} />
        </View>
    )

    return (
        <SafeAreaView style={{flex: 1}} >
            <Header navigation={navigation} />
            <FlatList
                ListHeaderComponent={<>
                    {renderNotifications()}
                </>}
            >
            </FlatList>
        </SafeAreaView>
    )
}

export default Notifications