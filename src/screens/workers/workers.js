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
import { get } from '../../utilities/get'
import { COLORS, SIZES, images, FONTS } from "../../constants"

const Workers = ({navigation, route}) => {
    const [isLoading, setIsLoading]  =  React.useState(false)
    const [restaurant, setRestaurant] = React.useState(route.params.restaurant)
    const [deliveryWorkers, setDeliveryWorkers] = React.useState([])

    const getDeliveryWorkers = async () => {
        const res = await get('/api/deliveryworker/'+restaurant.foodserviceid);

        if (res.status == true) {
            setDeliveryWorkers(res.deliveryworkers)
        }
    }

    React.useEffect(() => {
        (async () => {
            setIsLoading(true)
            await getDeliveryWorkers()
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


    const renderButtons = () => (
        <View
            style={{
                // flexDirection: 'row',
                marginTop: SIZES.padding * 2,
                justifyContent: 'center',
                alignItems: "center",
                width: "100%"
            }}
        >
            <TouchableOpacity
                style={{
                    // flex: 1,
                    height: 70,
                    width: "90%",
                    marginBottom: 10,
                    backgroundColor: COLORS.primary,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 10
                }}
                onPress={() => navigation.navigate("Invite Worker", {
                    
                })}
            >
                <Text style={{ ...FONTS.h4, color: COLORS.white }}>Invite Worker</Text>
            </TouchableOpacity>
        </View>
    )

    const renderInviteCard = () => (
        <View
            style={{
                // height: SIZES.height * .35,
                // width: SIZES.width,
                margin: SIZES.padding,
                backgroundColor: COLORS.appleGreen,
                borderRadius: 15,
            }}
        >
            <Image 
                source={images.delivery_man_riding_scooter} 
                resizeMode={'cover'} 
                style={{
                    height: 250,
                    width: "100%"
                }}
            />
            {renderButtons()}
        </View>
    )

    const renderWorkersList = () => {
        const renderItem = (item) => (
            <TouchableOpacity
                key={item.user.userid}
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    padding: SIZES.padding * 2,
                    backgroundColor: COLORS.appleGreen,
                    height: SIZES.height * .1,
                    borderRadius: SIZES.padding * .5,
                    marginBottom: 2.5
                }}
                onPress={() => {
                    // navigation.navigate("Order Status", {
                        
                    // })
                }}
            >
                    <Text style={{ color: COLORS.white, ...FONTS.body3 }}>{item.user.username}</Text>
                    <Text style={{ color: COLORS.white, ...FONTS.body4 }}>{item.worker.status}</Text>
            </TouchableOpacity>
        )

        return (
            <View
                style={{
                    padding: SIZES.padding
                }}
            >
                <Text>Registered Worker</Text>
                <>{deliveryWorkers?.map((item) => (
                    renderItem(item)
                ))}</>
            </View>
        )
    }

    return (
        <SafeAreaView>
            <Header navigation={navigation} backBtn={true} />
            <ScrollView>
                {renderInviteCard()}
                {renderWorkersList()}
            </ScrollView>
        </SafeAreaView>
    )
}

export default Workers