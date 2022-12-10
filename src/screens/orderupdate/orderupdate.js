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
import { Header, DropDown } from '../../components'
import { SIZES, COLORS, FONTS, images } from "../../constants"
import Icon from "react-native-vector-icons/Ionicons"
import { put } from "../../utilities/put"
import { get } from '../../utilities/get'
import { post } from '../../utilities/post'
import { showMessage, hideMessage } from "react-native-flash-message";


const OrderUpdate = ({navigation, route}) => {
    const [isLoading, setIsLoading] = React.useState(false)
    const [order, setOrder] = React.useState(route.params.item)
    const [restaurant, setRestaurant] = React.useState(route.params.restaurant)
    const [deliveryTask, setDeliveryTask] = React.useState(null)
    // const [deliveryWorkers, setDeliveryWorkers] = React.useState([])
    const [selected, setSelected] = React.useState(undefined);


    let data = [];
    
    const setAsCooking = async () => {
        const res = await put('/api/orderitem/' + order.orderitem.orderitemid, {
            status: "cooking"
        })

        if (res.status === true) {
            navigation.navigate('Orders', {
                restaurant: restaurant
            })
        } else {
            showMessage({
                message: "Oops! Failed to change Order Status!",
                type: "danger",
            });    
        }
    }

    const _createDeliveryTask = async () => {
        setIsLoading(true)
        const res = await post('/api/deliverytask', {
            foodserviceid: restaurant.foodserviceid,
            workerid: selected.value,
            orderid: order.orderitem.orderid
        })

        if (res.status === true) {

        } else {

        }
        setIsLoading(false)
    }

    const _sendOrder = async () => {
        const res = await post('/api/taskpackage', {
            deliverytaskid: deliveryTask.deliverytaskid,
            orderitemid: order.orderitem.orderitemid
        })

        if (res.status === true) {
            const rs = await put('/api/orderitem/' + order.orderitem.orderitemid, {
                status: "sent"
            })

            if (rs.status === true) {
                navigation.navigate('Orders', {
                    restaurant: restaurant,
                    reload: true
                })
            }
        } else {
            showMessage({
                message: "Oops! Failed to change Order Status!",
                type: "danger",
            });    
        }
    }

    const checkForPendingDeliveryTask = async () => {
        const res = await get('/api/deliverytask/'+order.orderitem.orderitemid);

        if (res.status == true) {
            setDeliveryTask(res.deliverytask)
        }
    }

    const getDeliveryWorkers = async () => {
        const res = await get('/api/deliveryworker/'+order.fooditem.foodserviceid);

        if (res.status == true) {
            res.deliveryworkers?.map((item) => {
                data.push({label: item.user.username, value: item.user.userid})
            })
            // setDeliveryWorkers(res.deliveryworkers)
        }
    }

    const updatePending = (isSet) => (
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
                >{" Order is being cooked "}</Text>
            </>
            :
            <>
                {/* <Image /> */}
                <TouchableOpacity
                    style={{
                        height: 40,
                        width: "80%",
                        backgroundColor: COLORS.primary,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 10
                    }}
                    onPress={setAsCooking}
                >
                    <Text style={{ color: COLORS.white, ...FONTS.body4 }}>{"Set As Cooking"}</Text>
                </TouchableOpacity>
            </>
            }
        </View>
    )

    const updateCooking = (isSet) => {
        (async () => {
            if (deliveryTask === null && isSet === false) {
                await getDeliveryWorkers()
                await checkForPendingDeliveryTask()
            }
        })();
        
        return (
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
                >{" Order has been sent to delivery worker"}</Text>
            </>
            :
            <>{deliveryTask !== null?
                <View
                style={{
                    flexDirection: "column"
                }}
            >
                {/* <Image /> */}
                <Text style={{ color: COLORS.white, ...FONTS.body4 }}>{"Pending Delivery Task for user"}</Text>
                <Text style={{ color: COLORS.white, ...FONTS.body4 }}>{"DeliveryTaskId: " + deliveryTask.deliverytaskid}</Text>

                {/* <DropDown label={'select delivery worker'} data={data} onSelect={setSelected} /> */}
                <TouchableOpacity
                    style={{
                        // flex: 1,
                        height: 40,
                        width: "80%",
                        margin: 10,
                        backgroundColor: COLORS.primary,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 10
                    }}
                    onPress={_sendOrder}
                >
                    <Text style={{ color: COLORS.white, ...FONTS.body4 }}>{"Send Order"}</Text>
                </TouchableOpacity>
            </View>
            :
                <View
                    style={{
                        flexDirection: "column"
                    }}
                >
                    {/* <Image /> */}
                    <Text style={{ color: COLORS.white, ...FONTS.body4 }}>{"Create New Delivery Task for user"}</Text>
                    <DropDown label={'select delivery worker'} data={data} onSelect={setSelected} />
                    <TouchableOpacity
                        style={{
                            // flex: 1,
                            height: 40,
                            width: "80%",
                            margin: 10,
                            backgroundColor: COLORS.primary,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 10
                        }}
                        onPress={_createDeliveryTask}
                    >
                        <Text style={{ color: COLORS.white, ...FONTS.body4 }}>{"Create Task"}</Text>
                    </TouchableOpacity>
                </View>
            }</>
            }
        </View>
    )}

    const renderStatus = (status) => {
        if (status === 'pending') {
            return (<>{updatePending(false)}</>)
        }
        if (status === 'cooking') {
            return (<>
            {updatePending(true)}
            {updateCooking(false)}
            </>)
        }
        if (status === 'sent') {
            return (<>
            {updatePending(true)}
            {updateCooking(true)}
            </>)
        }
        if (status === 'delivered') {
            return null
        }
    }

    const renderOrder = () => (
            <View
                key={order.orderitem.id}
                style={{
                    // flexDirection: "row",
                    // justifyContent: "space-between",
                    padding: SIZES.padding * .35,
                    backgroundColor: COLORS.appleGreen,
                    // height: SIZES.height * .2,
                    borderRadius: SIZES.padding * .5,
                    margin: 5
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        // justifyContent: "space-around"
                    }}
                >
                    <Image 
                        source={images[order.fooditem.photo]}
                        resizeMode={"cover"}
                        style={{
                            height: SIZES.width * .30,
                            width: SIZES.width * .30,
                            borderRadius: SIZES.padding * .5,
                        }}
                    />
                    <View
                        style={{
                        padding: SIZES.padding * 2,
                        width: SIZES.width * .65
                        }}
                    >
                        <Text style={{ color: COLORS.white, ...FONTS.body3 }}>{order.fooditem.name}</Text>
                        <Text style={{ color: COLORS.white, ...FONTS.body4 }}>Quantity: {order.orderitem.quantity}</Text>
                        <Text style={{ color: COLORS.white, ...FONTS.body4 }}>Cost: {order.orderitem.quantity * order.fooditem.price}</Text>
                    </View>
                </View>
                <View
                    style={{
                        // flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        paddingTop: 10
                    }}
                >
                    <Text style={{ color: COLORS.white, ...FONTS.h3 }}>Update Status</Text>
                    {renderStatus(order.orderitem.status)}
                </View>
            </View>
    )


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
    
    React.useEffect(() => {

    }, [])

    return (
        <SafeAreaView
            style={{
                flex: 1
            }}
        >
            <Header navigation={navigation} backBtn={true} />
            <ScrollView
                contentContainerStyle={{
                    padding: SIZES.padding
                }}
            >
                {renderOrder()}
            </ScrollView>
        </SafeAreaView>
    )
}

export default OrderUpdate