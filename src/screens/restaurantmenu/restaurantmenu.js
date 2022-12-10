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
import { Header } from '../../components'
import { SIZES, images, COLORS } from "../../constants"
import { useSelector } from "react-redux"
import Icon from "react-native-vector-icons/Ionicons"
import styles from "./style"

/**
 * 
 * @param {*} param0 
 * @returns 
 */
const RestaurantMenu = ({route ,navigation}) => {
    
    const [restaurant, setRestaurant] = React.useState(false)
    const [menu, setMenu] = React.useState(false)
    const user = useSelector((store) => store.user)

    React.useEffect(() => {
        let { restaurant, menu } = route.params

        setRestaurant(restaurant)
        setMenu(menu)
    })
    /**
     * 
     * @returns 
     */
    const renderCoverImage = () => (
        <View>
                <Image
                    source={images[restaurant.photo]}
                    resizeMode="cover"
                    style={{
                        width: "100%",
                        height: 200
                    }}
                />
                <View
                    style={{
                        position: "absolute",
                        backgroundColor: COLORS.overlay,
                        height: 200,
                        width: "100%",
                        zIndex: 10,
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <Text 
                        style={{ 
                            fontSize: SIZES.body2, 
                            color: COLORS.white,
                            // fontWeight: 600
                        }} 
                    >{restaurant.name}</Text>
                </View>
        </View>
    )
    /**
     * 
     * @returns 
     */
    const renderMenu = () => (
        <View
            style={{
                padding: SIZES.padding,
                paddingTop: SIZES.padding * 5,
                
            }}
        >
            {/* 
            ****************************************************************************************************************
                ADD ITEM TO MENU
            ****************************************************************************************************************
            */}
            {user.id === restaurant.userId? 
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    padding: SIZES.padding,
                    // justifyContent: "space-between"
                    backgroundColor: COLORS.orange,
                    borderRadius: SIZES.radius * .5,
                    marginBottom: SIZES.padding,
                    ...styles.shadow
                }}
            >
                <TouchableOpacity 
                    style={{
                        height: 120,
                        width: 120,
                        borderRadius: SIZES.radius * .5,
                        borderColor: COLORS.white,
                        borderWidth: 2,
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                    onPress={()=>{
                        navigation.navigate("Add Menu Item")
                    }}
                >
                    <Icon name="add" size={20} color="white" />
                </TouchableOpacity>
                <View
                    style={{
                        padding: SIZES.padding,
                        flexDirection: "column",
                        justifyContent: "space-between",
                        width: "60%"
                    }}
                >
                    <Text
                        style={{ 
                            fontSize: SIZES.body3, 
                            color: COLORS.white,
                            paddingBottom: SIZES.padding
                        }} 
                    >add item to menu</Text>
                </View>
            </View>
            : null}
            {/* 
            ****************************************************************************************************************
                MENU LISTING
            ****************************************************************************************************************
            */}
            <View
                    style={{
                        justifyContent: "space-around"
                    }}
            >
                {menu === false? null:
                <>{menu?.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            padding: SIZES.padding,
                            // justifyContent: "space-between"
                            backgroundColor: COLORS.orange,
                            borderRadius: SIZES.radius * .5,
                            marginBottom: SIZES.padding,
                            ...styles.shadow
                        }}
                        onPress={() => {
                            navigation.navigate("Dish Profile", {
                                dish: item
                            })
                        }}
                    >
                        <Image 
                            source={images[item.photo]}
                            resizeMode="cover"
                            style={{
                                height: 120,
                                width: 120,
                                borderRadius: SIZES.radius * .5,
                            }}
                        />
                        <View
                            style={{
                                padding: SIZES.padding,
                                flexDirection: "column",
                                justifyContent: "space-between",
                                width: "60%"
                            }}
                        >
                            <Text
                                style={{ 
                                    fontSize: SIZES.body3, 
                                    color: COLORS.white,
                                    paddingBottom: SIZES.padding
                                }} 
                            >{item.name}</Text>
                            <Text
                                style={{ 
                                    fontSize: SIZES.body4, 
                                    color: COLORS.white,
                                }} 
                            >{item.description}</Text>
                        </View>
                    </TouchableOpacity>
                ))}</>}
            </View>
        </View>
    )

    return (
        <SafeAreaView>
            <Header navigation={navigation} backBtn={true} />
            <ScrollView>
                {renderCoverImage()}
                {renderMenu()}
            </ScrollView>
        </SafeAreaView>
    )
}

export default RestaurantMenu