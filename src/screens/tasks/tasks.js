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
import { COLORS, SIZES, FONTS } from "../../constants"
import Icon  from 'react-native-vector-icons/Ionicons'
import { useSelector } from 'react-redux'
import { get } from "../../utilities/get"

const Tasks = ({navigation, route}) => {
    const user = useSelector((store) => store.user)

    const [activeTab, setActiveTab] = React.useState(1)
    const [newTasks, setNewTasks] = React.useState([])
    const [deliveredTasks, setDeliveredTasks] = React.useState([])
    const [onRoadTasks, setOnRoadTasks] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)

    const renderItem = (item) => (
        <TouchableOpacity 
            key={item}
            style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: SIZES.padding * 2,
                backgroundColor: COLORS.appleGreen,
                height: SIZES.height * .2,
                borderRadius: SIZES.padding * .5,
                marginBottom: 5,
                width: SIZES.width * .9
            }}
            onPress={() => {
                navigation.navigate("Order Delivery", {
                    deliverytask: item
                })
            }}
        >
            <View
                style={{
                    padding: SIZES.padding
                }}
            >
                <Icon name={"hourglass-outline"} size={35} color="white" />
            </View>
            <View
                style={{
                    flexDirection: "column",
                    justifyContent: 'center',
                    // alignItems: "center",
                    pading: SIZES.padding * .8,
                    width: SIZES.width * .5
                }}
            >
                <Text style={{ color: COLORS.white, ...FONTS.body3 }}>from: {item.foodservice.name}</Text>
                <Text style={{ color: COLORS.white, ...FONTS.body3 }}>task id: {item.deliverytask.deliverytaskid}</Text>
            </View>
            <View
                style={{
                    flexDirection: "column",
                    justifyContent: 'center',
                    // alignItems: "center",
                    pading: SIZES.padding * .8,
                    width: SIZES.width * .25

                }}
            >
                <Text style={{ color: COLORS.white, ...FONTS.body3 }}>{item.deliverytask.status}</Text>
            </View>
        </TouchableOpacity>
    )

    const renderNewTasks = () => {
        if (newTasks.length === 0) return (
        <View
            style={{
                // flexDirection: 'row',
                // margin: SIZES.padding,
                justifyContent: 'center',
                alignItems: "center",
                // width: "100%"
            }}
        >
            <Text style={{ ...FONTS.body2 }}>Oops! no pending orders</Text>
        </View>
        )
        return (
            <View
                style={{
                    flexDirection: "column",
                    justifyContent: 'center',
                    alignItems: "center",
                    // pading: SIZES.padding * .2
                }}
            >{newTasks?.map((item) => (
                renderItem(item)
            ))}</View>
        )
    }

    const renderTaskHistory = () => {
        if (deliveredTasks.length === 0) return (
            <View
                style={{
                    // flexDirection: 'row',
                    // margin: SIZES.padding,
                    justifyContent: 'center',
                    alignItems: "center",
                    // width: "100%"
                }}
            >
                <Text style={{ ...FONTS.body2 }}>Opps! no delivered orders</Text>
            </View>
            )
        return (
                <View
                    style={{
                        flexDirection: "column",
                        justifyContent: 'center',
                        alignItems: "center",
                        // pading: SIZES.padding * .2
                    }}
                >{deliveredTasks?.map((item) => (
                    renderItem(item)
                ))}</View>
            )
    }

    const renderOnRoadTasks = () => {
        if (onRoadTasks.length === 0) return (
            <View
                style={{
                    // flexDirection: 'row',
                    // margin: SIZES.padding,
                    justifyContent: 'center',
                    alignItems: "center",
                    // width: "100%"
                }}
            >
                <Text style={{ ...FONTS.body2 }}>Oops! no sent orders</Text>
            </View>
            )
            return (
                <View
                    style={{
                        flexDirection: "column",
                        justifyContent: 'center',
                        alignItems: "center",
                        // pading: SIZES.padding * .2
                    }}
                >{onRoadTasks?.map((item) => (
                    renderItem(item)
                ))}</View>
            )
    }

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
                    backgroundColor: COLORS.secondary,
                    padding: SIZES.padding,
                }}
                onPress={() => {
                    setActiveTab(1)
                }}
            >
                <Text style={{ textAlign: "center", fontSize: SIZES.body3 }} >Pending Tasks</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={{
                    borderRadius: SIZES.padding * .5,
                    backgroundColor: COLORS.secondary,
                    padding: SIZES.padding,
                }}
                onPress={() => {
                    setActiveTab(2)
                }}
            >
                <Text style={{ textAlign: "center", fontSize: SIZES.body3 }} >On Road Tasks</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={{
                    borderRadius: SIZES.padding * .5,
                    backgroundColor: COLORS.secondary,
                    padding: SIZES.padding,
                }}
                onPress={() => {
                    setActiveTab(3)
                }}
            >
                <Text style={{ textAlign: "center", fontSize: SIZES.body3 }} >Task History</Text>
            </TouchableOpacity>
        </View>
    )

    const renderViews = () => {
        if (activeTab === 1) return renderNewTasks()
        if (activeTab === 2) return renderOnRoadTasks()
        if (activeTab === 3) return renderTaskHistory()
    }

    React.useEffect(() => {
        (async () => {
            setIsLoading(true)
            const res = await get('/api/getdeliverytask/'+user.userid)
            if (res.status === true) {
                console.log(res.deliverytasks)
                setNewTasks(res.deliverytasks.filter((item) => item.deliverytask.status === 'pending'))
                setOnRoadTasks(res.deliverytasks.filter((item) => item.deliverytask.status === 'sent'))
                setDeliveredTasks(res.deliverytasks.filter((item) => item.deliverytask.status === 'delivered'))
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

export default Tasks