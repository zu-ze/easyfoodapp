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
import Icon from "react-native-vector-icons/Ionicons"
import { SIZES, COLORS, FONTS, images } from "../../constants"
import {get} from '../../utilities/get'
import {put} from '../../utilities/put'


const OrderStatus = ({navigation, route}) => {
    
    const [isLoading, setIsLoading] = React.useState(true)
    const [order, setOrder] = React.useState(route.params.order)
    const [orderItems, setOrderItems] = React.useState([])

    const _confirmdelivery = async (id) => {
        setIsLoading(true)
        const res = await put('/api/confirmdelivery/' + id, {
            status: 'delivered'
        });
        
        if (res.status === true) {
            navigation.navigate("User Order History")
        } else {

        }
        setIsLoading(false)
    }

    const renderOrderStatus = () => {
        if (orderItems.length === 0) return (
        <View
            style={{
                // flexDirection: 'row',
                margin: SIZES.padding,
                justifyContent: 'center',
                alignItems: "center",
                width: "100%"
            }}
        >
            <Text style={{ ...FONTS.body2 }}>you have no pending order items</Text>
        </View>
        )
        return(
            <View
                style={{
                    padding: SIZES.padding
                }}
            >
                {orderItems.map((item) => (
                    <View
                        key={item.orderitem.id + (Math.random() * 1097)}
                        style={{
                            // flexDirection: "row",
                            justifyContent: "center",
                            padding: SIZES.padding * .35,
                            backgroundColor: COLORS.appleGreen,
                            // height: SIZES.height * .2,
                            borderRadius: SIZES.padding * .5,
                            marginBottom: 5
                        }}
                    >
                        <View
                            style={{
                                flexDirection: "column",
                                // justifyContent: "space-around"
                            }}
                        >
                            <Image 
                                source={images[item.fooditem.photo]}
                                resizeMode={"cover"}
                                style={{
                                    height: 140,
                                    width: "100%",
                                    borderRadius: SIZES.padding * .5,
                                }}
                            />
                            <View
                                style={{
                                    padding: SIZES.padding,
                                }}
                            >
                                <Text style={{color: COLORS.white, ...FONTS.body2 }}>{item.fooditem.name}</Text>
                                <Text style={{color: COLORS.white, ...FONTS.body4 }}>Quantity: {item.orderitem.quantity}</Text>
                                <Text style={{ color: COLORS.white, ...FONTS.body4 }}>Cost: {item.orderitem.quantity * item.fooditem.price}</Text>
                            </View>
                        </View>
                        <View
                            style={{
                                flex: 1,
                                justifyContent: "center",
                                alignItems: "center",
                                marginTop: 10,
                            }}
                        >
                            <Text style={{ color: COLORS.white, ...FONTS.h3 }}>Status</Text>
                            {renderStatus(item.orderitem.status)}
                            {renderButtons(item.orderitem.id)}
                        </View>
                    </View>
                ))}

            </View>
        )
    }

    const pending = ( isSet ) => (
        <View
            style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                padding: SIZES.padding,
                width: SIZES.width * .8,
                borderRadius: SIZES.radius * .5,
                backgroundColor: COLORS.purple,
                margin: 2
            }}
        >
            {isSet?
            <>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Icon name="checkmark-circle-outline" size={30} color={"green"} />
                </View>
                <Text
                    style={{
                        fontSize: SIZES.body4,
                        color: "white"
                    }}
                >{" Order has been received "}</Text>
            </>
            :
            <>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Icon name="checkmark-circle-outline" size={30} color={"green"} />
                </View>
                <Text
                    style={{
                        fontSize: SIZES.body4,
                        color: "white"
                    }}
                >{" Order is pending"}</Text>
            </>
            }
        </View>
    )

    const cooking = ( isSet ) => (
        <View
            style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                padding: SIZES.padding,
                width: SIZES.width * .8,
                borderRadius: SIZES.radius * .5,
                backgroundColor: COLORS.purple,
                margin: 2
            }}
        >
            {isSet?
            <>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Icon name="checkmark-circle-outline" size={30} color={"green"} />
                </View>
                <Text
                    style={{
                        fontSize: SIZES.body4,
                        color: "white"
                    }}
                >{" Order is has being prepared and is on its way to you "}</Text>
            </>
            :
            <>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Icon name="checkmark-circle-outline" size={30} color={"green"} />
                </View>
                <Text
                    style={{
                        fontSize: SIZES.body4,
                        color: "white"
                    }}
                >{" Order is being prepared"}</Text>
            </>
            }
        </View>
    )

    const renderStatus = (status) => {
        if (status === 'pending') {
            return (<>{pending(false)}</>)
        }
        if (status === 'cooking') {
            return (<>
            {pending(true)}
            {cooking(false)}
            </>)
        }
        if (status === 'sent') {
            return (<>
            {pending(true)}
            {cooking(true)}
            </>)
        }
        if (status === 'delivered') {
            return (<>
            {pending(true)}
            {cooking(true)}
            </>)
        }
    }


    const renderButtons = (id) => (
        <View
            style={{
                // flexDirection: 'row',
                margin: SIZES.padding,
                justifyContent: 'center',
                alignItems: "center",
                width: "100%"
            }}
        >
            <TouchableOpacity
                style={{
                    // flex: 1,
                    height: 50,
                    width: "80%",
                    // marginBottom: 10,
                    backgroundColor: COLORS.primary,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 10
                }}
                onPress={() => {
                    _confirmdelivery(id)
                }}
            >
                <Text style={{ ...FONTS.h4, color: COLORS.white }}>Confirm Delivery</Text>
            </TouchableOpacity>
        </View>
    )

    React.useEffect(() => {
        (async () => {
            let res = await get('/api/orderitem/' + route.params.order.orderid);

            if (res.status === true) {
                console.log(res.orderitems)
                setOrderItems(res.orderitems)
            }
            setIsLoading(false)
        })();
    }, [])

    if (isLoading) return(<View style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }} >
        <ActivityIndicator size={"large"} color={COLORS.orange} />
    </View>)

    return (
        <SafeAreaView
            style={{
                flex: 1
            }}
        >
            <Header navigation={navigation} backBtn={true} />
            <ScrollView>
                <Text style={{ paddingTop: 10, paddingHorizontal: 10, color: COLORS.black, ...FONTS.h3 }}>Order Items</Text>
                {renderOrderStatus()}
            </ScrollView>
        </SafeAreaView>
    )
}

export default OrderStatus