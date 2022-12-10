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
import { COLORS, SIZES, FONTS, images } from "../../constants"
import { get } from '../../utilities/get'
import Icon  from 'react-native-vector-icons/Ionicons'

const Orders = ({navigation, route}) => {
    const [activeTab, setActiveTab] = React.useState(1)
    const [isLoading, setIsLoading] = React.useState(true)
    const [restaurant, setRestaurant] = React.useState(route.params.restaurant)
    const [pendingOrders, setPendingOrders] = React.useState([])
    const [cookingOrders, setCookingOrders] = React.useState([])
    const [sentOrders, setSentOrders] = React.useState([])
    const [receivedOrders, setReceivedOrders] = React.useState([])

    const groupOrders = (orders) => {
        orders?.map((item) => {
            item.orderitems.map((i) => {
                if (i.status === 'pending') {
                    setPendingOrders([...pendingOrders, {orderitem: i, fooditem: item.fooditem}])
                }
                if (i.status === 'cooking') {
                    setCookingOrders([...cookingOrders, {orderitem: i, fooditem: item.fooditem}])
                }
                if (i.status === 'sent') {
                    setSentOrders([...sentOrders, {orderitem: i, fooditem: item.fooditem}])
                }
                if (i.status === 'delivered') {
                    setReceivedOrders([...receivedOrders, {orderitem: i, fooditem: item.fooditem}])
                }
            })
        })
    }

    const renderItem = (item) => (
        <TouchableOpacity
            key={item.orderitem.orderitemid}
            style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: SIZES.padding * .2,
                backgroundColor: COLORS.appleGreen,
                height: SIZES.height * .2,
                borderRadius: SIZES.padding * .5,
                marginBottom: 5
            }}
            onPress={() => {
                navigation.navigate("Order Update", {
                    item: item,
                    restaurant: restaurant
                })
            }}
        >
            <View
                style={{
                    padding: SIZES.padding
                }}
            >
                <Icon name={"fast-food-outline"} size={35} color="white" />
            </View>
            <View
                style={{
                    flexDirection: "column",
                    justifyContent: 'flex-start',
                    pading: SIZES.padding * .8,
                    width: SIZES.width * .5
                }}
            >
                <Text style={{ ...FONTS.body3 }}>{item.fooditem.name}</Text>
                <Text style={{ color: COLORS.white, ...FONTS.body4 }}>Quantity: {item.orderitem.quantity}</Text>
            </View>
            <View
                style={{
                    flexDirection: "column",
                    justifyContent: 'center',
                    alignItems: "center",
                    pading: SIZES.padding * .8,
                    width: SIZES.width * .25
                }}
            >
                <Text style={{ color: COLORS.white, ...FONTS.body3 }}>{item.orderitem.status}</Text>
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
                    // width: "40%",
                    padding: SIZES.padding,
                }}
                onPress={() => {
                    setActiveTab(1)
                }}
            >
                <Text style={{ textAlign: "center", fontSize: SIZES.body4 }} >Pending</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={{
                    borderRadius: SIZES.padding * .5,
                    backgroundColor: COLORS.appleGreen,
                    // width: "40%",
                    padding: SIZES.padding
                }}
                onPress={() => {
                    setActiveTab(2)
                }}
            >
                <Text style={{ textAlign: "center", fontSize: SIZES.body4 }} >Cooking</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={{
                    borderRadius: SIZES.padding * .5,
                    backgroundColor: COLORS.appleGreen,
                    // width: "40%",
                    padding: SIZES.padding
                }}
                onPress={() => {
                    setActiveTab(3)
                }}
            >
                <Text style={{ textAlign: "center", fontSize: SIZES.body4 }} >Sent</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={{
                    borderRadius: SIZES.padding * .5,
                    backgroundColor: COLORS.orange,
                    // width: "40%",
                    padding: SIZES.padding
                }}
                onPress={() => {
                    setActiveTab(4)
                }}
            >
                <Text style={{ textAlign: "center", fontSize: SIZES.body4 }} >Delivered</Text>
            </TouchableOpacity>
        </View>
    )

    const renderIncomingOrders = () => {
        if (pendingOrders.length === 0) return (
            <View
                style={{
                    // flexDirection: 'row',
                    margin: SIZES.padding,
                    justifyContent: 'center',
                    alignItems: "center",
                    width: "100%"
                }}
            >
                <Text style={{ ...FONTS.body2 }}>you have no incoming orders</Text>
            </View>
            )
        return (
            <View
                style={{
                    flexDirection: "column",
                    justifyContent: "space-around"
                }}
            >{pendingOrders?.map((item) => (
                renderItem(item)
            ))}</View>
        )
    }

    const renderOrderHistory = () => {
        if (receivedOrders.length === 0) return (
            <View
                style={{
                    // flexDirection: 'row',
                    margin: SIZES.padding,
                    justifyContent: 'center',
                    alignItems: "center",
                    width: "100%"
                }}
            >
                <Text style={{ ...FONTS.body2 }}>you have no received orders</Text>
            </View>
            )
        return (
            <View
            style={{
                flexDirection: "column",
                justifyContent: "space-around"
            }}
            >{receivedOrders.map((item) => (
                renderItem(item)
            ))}</View>
        )
    }

    const renderCookingOrders = () => {
        if (cookingOrders.length === 0) return (
            <View
                style={{
                    // flexDirection: 'row',
                    margin: SIZES.padding,
                    justifyContent: 'center',
                    alignItems: "center",
                    width: "100%"
                }}
            >
                <Text style={{ ...FONTS.body2 }}>you have no cooking orders</Text>
            </View>
            )
        return (
            <View
            style={{
                flexDirection: "column",
                justifyContent: "space-around"
            }}
            >{cookingOrders?.map((item) => (
                renderItem(item)
            ))}</View>
        )
    }

    const renderSentOrders = () => {
        if (sentOrders.length === 0) return (
            <View
                style={{
                    // flexDirection: 'row',
                    margin: SIZES.padding,
                    justifyContent: 'center',
                    alignItems: "center",
                    width: "100%"
                }}
            >
                <Text style={{ ...FONTS.body2 }}>you have no sent orders</Text>
            </View>
            )
        return (
            <View
            style={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "space-around"
            }}
            >{sentOrders?.map((item) => (
                renderItem(item)
            ))}</View>
        )
    }

    const renderViews = () => {
        if (activeTab === 1) return renderIncomingOrders()
        if (activeTab === 2) return renderCookingOrders()
        if (activeTab === 3) return renderSentOrders()
        if (activeTab === 4) return renderOrderHistory() 
    }

    React.useEffect(() => {
        (async () => {
            setIsLoading(true)
            const res = await get('/api/orders/'+restaurant.foodserviceid)

            if (res.status === true) {
                groupOrders(res.order_items)
            } else {

            }
            setIsLoading(false)
        })();
    }, [])

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
                {renderViews()}
            </ScrollView>

        </SafeAreaView>
    )
}

export default Orders