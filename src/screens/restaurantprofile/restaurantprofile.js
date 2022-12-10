import React from "react"
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    Image,
    FlatList,
    ScrollView
} from "react-native"
import { Header, Dishes } from '../../components'
import { COLORS, SIZES, images } from "../../constants"
import { useSelector } from "react-redux"
import Icon from 'react-native-vector-icons/Ionicons'
import styles from "./style"
import { loadComment, loadMenu } from "../../utilities/loaddata"

const RestaurantProfile = ({route, navigation}) => {
    
    const [restaurant, setRestaurant] = React.useState(route.params.item)
    const [menu, setMenu] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(false)
    const user = useSelector((store) => store.user)

    const loadData = async () => {

        setMenu(await loadMenu(restaurant?.foodserviceid))
    
    }

    React.useEffect(() => {

        if (!isLoading) {
            loadData()
        }
    }, [])

    const renderRestaurantDetails = () => (
        <View
            style={{
                paddingBottom: SIZES.padding,
                backgroundColor: COLORS.orange,
                justifyContent: "center",
                alignItems: "center",
                borderBottomEndRadius: SIZES.radius * .5,
                borderBottomStartRadius: SIZES.radius * .5 
            }}
        >
            <View
                style={{
                    width: "100%",
                    height: 200,
                    justifyContent: "center",
                    alignItems: "center",
                }}            
            >
                <Image 
                    source={images[restaurant?.photo]}
                    resizeMode="cover"
                    style={{
                        width: "100%",
                        height: 200,
                        ...styles.shadow
                    }}
                />
            </View>

            <Text style={{padding: SIZES.padding * .5, fontSize: SIZES.h3, color: COLORS.white }} >{restaurant?.name}</Text>
            <Text style={{padding: SIZES.padding * .5, fontSize: SIZES.h3, color: COLORS.white }} >{restaurant?.rating}</Text>

            <TouchableOpacity  
                onPress={() => {
                    navigation.navigate("Restaurant Direction", 
                    {
                        restaurant: restaurant
                    })
                    
                }}
                style={{
                    ...styles.btn
                }}
            >
                <Text style={{ fontSize: SIZES.body4, color: COLORS.white }}>View on Map</Text>
            </TouchableOpacity>
            <TouchableOpacity  
                onPress={() => {
                    navigation.navigate("Edit Restaurant Profile",
                    {
                        restaurant: restaurant
                    })
                    
                }}
                style={{
                    ...styles.btn
                }}
            >
                <Text style={{ fontSize: SIZES.body4, color: COLORS.white }}>edit</Text>
            </TouchableOpacity>
        </View>
    )

    const renderOptions = () => {


        return (
            <View
                style={{
                    paddingBottom: 50
                }}
            >

                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Text style={{ fontSize: SIZES.h3, padding: SIZES.padding }} >Menu</Text>
                    <TouchableOpacity
                        onPress={()=>{
                            navigation.navigate("Restaurant Menu", {
                                restaurant: restaurant,
                                menu: menu
                            })
                        }}
                    >
                        <Text style={{ fontSize: SIZES.body3, padding: SIZES.padding }} >See All</Text>
                    </TouchableOpacity>
                </View>

                <Dishes navigation={navigation} data={menu} />

            </View>
        )
    }

    const renderTools = () => {

        return (
            <View
            >
                <Text style={{ fontSize: SIZES.h3, padding: SIZES.padding }} >Tools</Text>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-around",
                        alignItems: "center",
                        flexWrap: "wrap",
                        padding: SIZES.padding
                    }}
                >
                    <TouchableOpacity
                        style={{
                            width: SIZES.width * .4,
                            margin: 5,
                            height: 140,
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "darkorange",
                            borderRadius: SIZES.radius * .5
                        }}
                        onPress={() => {
                            navigation.navigate("Orders", {
                                restaurant: restaurant
                            })
                        }}
                    >
                        <Icon name="fast-food" size={40} color="white" />
                        <Text style={{ fontSize: SIZES.body2, color: COLORS.white }} >Orders</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            width: SIZES.width * .4,
                            margin: 5,
                            height: 140,
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: COLORS.appleGreen,
                            borderRadius: SIZES.radius * .5
                        }}
                        onPress={() => {
                            navigation.navigate("Analytics", {
                                restaurant: restaurant
                            })
                        }}
                    >
                        <Icon name="stats-chart" size={40} color="white" />
                        <Text style={{ fontSize: SIZES.body2, color: COLORS.white }} >Analytics</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            width: SIZES.width * .4,
                            margin: 5,
                            height: 140,
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: COLORS.appleGreen,
                            borderRadius: SIZES.radius * .5
                        }}
                        onPress={() => {
                            navigation.navigate("Cash In", {
                                restaurant: restaurant
                            })
                        }}
                    >
                        <Icon name="wallet" size={40} color="white" />
                        <Text style={{ fontSize: SIZES.body2, color: COLORS.white }} >Cash In</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            width: SIZES.width * .4,
                            margin: 5,
                            height: 140,
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: COLORS.appleGreen,
                            borderRadius: SIZES.radius * .5
                        }}
                        onPress={() => {
                            navigation.navigate("Workers", {
                                restaurant: restaurant
                            })
                        }}
                    >
                        <Icon name="people" size={40} color="white" />
                        <Text style={{ fontSize: SIZES.body2, color: COLORS.white }} >Workers</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    return (
        <SafeAreaView
            style={{
                flex: 1
            }}
        >
            <Header navigation={navigation} backBtn={true} />
            <FlatList
                ListHeaderComponent={<>
                    {renderRestaurantDetails()}
                </>}
                ListFooterComponent={<>
                    {user.userid === restaurant.userid? renderTools() : null}
                    {renderOptions()}
                </>}
            >
            </FlatList>
        </SafeAreaView>
    )
}

export default RestaurantProfile