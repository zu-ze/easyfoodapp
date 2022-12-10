import React from "react"
import { render } from "react-dom"
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
import { useSelector } from 'react-redux'
import Icon  from 'react-native-vector-icons/Ionicons'
import { COLORS, SIZES, FONTS, icons } from "../../constants"
import { get } from "../../utilities/get"


const UserOrderHistory = ({navigation, route}) => {
    const user = useSelector((store) => store.user)
    
    const [activeTab, setActiveTab] = React.useState(1)
    const [pending, setPending] = React.useState([])
    const [delivered, setDelivered] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)

    React.useEffect(() => {
        (async () => {
            setIsLoading(true)
            const res = await get('/api/order/'+user.userid)
            if (res.status === true) {
                setPending(res.orders.filter((item) => item.status === 'pending'))
                setDelivered(res.orders.filter((item) => item.status === 'delivered'))
            }
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

    const renderItem = (item) => (
        <TouchableOpacity
            key={item.orderid}
            style={{
                flexDirection: "row",
                justifyContent: "space-between",
                padding: SIZES.padding * 2,
                backgroundColor: COLORS.appleGreen,
                height: SIZES.height * .2,
                borderRadius: SIZES.padding * .5,
                marginBottom: 5
            }}
            onPress={() => {
                navigation.navigate("Order Status", {
                    order: item
                })
            }}
        >
            <View>
                <Icon name={"fast-food-outline"} size={35} color="white" />
            </View>
            <View>
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    marginBottom: 15
                }} >
                    <Image
                        source={icons.pin}
                        resizeMode="contain"
                        style={{
                            width: 20,
                            height: 20,
                            tintColor: COLORS.darkgray
                        }}
                    />
                    <Text style={{ color: COLORS.white, ...FONTS.body5 }}>{item.locationGoogle}</Text>
                </View>
                <Text style={{ color: COLORS.white, ...FONTS.h5 }}>Location Description: </Text>
                <Text style={{ color: COLORS.white, ...FONTS.body5 }}>{item.locationDescription}</Text>
            </View>
            <View style={{
                justifyContent: "center",
                alignItems: "center"
            }} >
                <Text style={{ color: COLORS.white, ...FONTS.h5 }}>Status</Text>
                <Text style={{ color: COLORS.white, ...FONTS.body5 }}>{item.status}</Text>
            </View>
        </TouchableOpacity>
    )

    const renderTabs = () => (
        <View
            style={{
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
                padding: SIZES.padding * 2,
            }}
        >
            <TouchableOpacity
                style={{
                    borderRadius: SIZES.padding * .5,
                    backgroundColor: COLORS.appleGreen,
                    width: "40%",
                    padding: SIZES.padding
                }}
                onPress={() => {
                    setActiveTab(1)
                }}
            >
                <Text style={{ textAlign: "center", fontSize: SIZES.body3 }} >Pending Orders</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={{
                    borderRadius: SIZES.padding * .5,
                    backgroundColor: COLORS.orange,
                    width: "40%",
                    padding: SIZES.padding
                }}
                onPress={() => {
                    setActiveTab(2)
                }}
            >
                <Text style={{ textAlign: "center", fontSize: SIZES.body3 }} >Received Orders</Text>
            </TouchableOpacity>
        </View>
    )

    const renderPendingOrders = () => {
        if (pending.length === 0) return (
        <View
            style={{
                // flexDirection: 'row',
                // margin: SIZES.padding,
                justifyContent: 'center',
                alignItems: "center",
                // width: "100%"
            }}
        >
            <Text style={{ ...FONTS.body2 }}>you have no pending orders</Text>
        </View>
        )
        return (
            <>{pending.map((item) => (
                renderItem(item)
            ))}</>
        )
    }

    const renderReceivedOrders = () => {
        if (delivered.length === 0) return (
            <View
                style={{
                    // flexDirection: 'row',
                    // margin: SIZES.padding,
                    justifyContent: 'center',
                    alignItems: "center",
                    // width: "100%"
                }}
            >
                <Text style={{ ...FONTS.body2 }}>you have no received orders</Text>
            </View>
            )

        return (
            <>{delivered.map((id) => (
                renderItem(id)
            ))}</>
        )
    }

    return (
        <SafeAreaView
            style={{
                flex: 1
            }}
        >
            <Header navigation={navigation} backBtn={true} />
            {renderTabs()}
            <ScrollView
                contentContainerStyle={{
                    padding: SIZES.padding
                }}
            >
                {activeTab === 1?
                    <>{renderPendingOrders()}</>
                :
                    <>{renderReceivedOrders()}</>
                }
            </ScrollView>

        </SafeAreaView>
    )
}

export default UserOrderHistory