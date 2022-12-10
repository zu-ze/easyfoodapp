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
import { restaurantData } from "../../constants/data"
import { useSelector, useDispatch } from 'react-redux'
import { setCart } from "../../redux/actions/CartAction"
import { icons, COLORS, SIZES, FONTS, images } from '../../constants'
import styles from './style'


const ShopingCart = ({navigation}) => {
    
    const [restaurant, setRestaurant] = React.useState(restaurantData[0]);
    const [currentLocation, setCurrentLocation] = React.useState(null);
    const [orderItems, setOrderItems] = React.useState([]);
    const cart = useSelector((store) => store.cart)
    const dispatch = useDispatch()


    function editOrder(action, id) {
        let newcart = cart.map((ordr) => {
            if(ordr.fooditemid === id){
                if (action == "+") {
                    ordr.quantity += 1
                } else {
                    if (ordr.quantity <= 1) {
                        ordr.quantity = 1
                    } else {
                        ordr.quantity -= 1
                    }
                }
                ordr.cost = parseFloat(ordr.quantity) * parseFloat(ordr.dish.price)
            }
            return ordr
        })
        dispatch(setCart(newcart))
    }

    function sumOrder() {
        let total = 0
        cart?.map((ordr) => {
            total += ordr.cost
            return ordr
        })

        return total
    }


    const renderDishDetails = () => (
        <View
            style={{
                paddingVertical: SIZES.padding,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
        {cart?.map((item, index) => (
            <View
                key={`menu-${index}`}
                style={{ 
                    width: "95%",
                    marginBottom: 10,
                    backgroundColor: COLORS.orange,
                    borderRadius: SIZES.radius * .5,
                    flexDirection: "row",
                    padding: SIZES.padding
                }}
            >
                {/* Food Image */}
                <Image
                    source={images[item.dish.photo]}
                    resizeMode="cover"
                    style={{
                        borderRadius: SIZES.radius * .5,
                        width: 130,
                        height: 130
                    }}
                />
                <View
                    style={{
                        alignItems: "flex-start",
                        justifyContent: "flex-start",
                        flexDirection: "column",
                        paddingLeft: 10
                        // width: "60%"
                    }}
                >
                    {/* Name & Description */}
                    <View
                        style={{
                            marginTop: 15,
                            // paddingHorizontal: SIZES.padding * 2,
                            
                        }}
                    >
                        <Text style={{ marginVertical: 10, fontSize: SIZES.body3, color: "white"}}>{item.dish.name}</Text>
                        <Text style={{ marginVertical: 10, fontSize: SIZES.body3, color: "white"}}>{item.dish.price * item.quantity }</Text>
                    </View>
                    {/* Quantity */}
                    <View
                        style={{
                            justifyContent: 'center',
                            flexDirection: 'row'
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                width: 50,
                                backgroundColor: COLORS.white,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderTopLeftRadius: 25,
                                borderBottomLeftRadius: 25
                            }}
                            onPress={() => editOrder("-", item.fooditemid)}
                        >
                            <Text style={{ ...FONTS.body1 }}>-</Text>
                        </TouchableOpacity>

                        <View
                            style={{
                                width: 50,
                                backgroundColor: COLORS.white,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <Text style={{ ...FONTS.h2 }}>{item.quantity}</Text>
                        </View>

                        <TouchableOpacity
                            style={{
                                width: 50,
                                backgroundColor: COLORS.white,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderTopRightRadius: 25,
                                borderBottomRightRadius: 25
                            }}
                            onPress={() => editOrder("+", item.fooditemid)}
                        >
                            <Text style={{ ...FONTS.body1 }}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        ))}
        </View>
    )

    const renderOptions = () => {

        return (
            <View>
                <View
                    style={{
                        backgroundColor: COLORS.orange,
                        borderRadius: 40,
                    }}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            paddingVertical: SIZES.padding * 2,
                            paddingHorizontal: SIZES.padding * 3,
                        }}
                    >
                        <Text>{cart.length} items in Cart</Text>
                        <Text>Mwk{sumOrder()}</Text>

                    </View>


                    {/* Order Button */}
                    <View
                        style={{
                            padding: SIZES.padding * 2,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                width: SIZES.width * 0.9,
                                padding: SIZES.padding,
                                backgroundColor: COLORS.primary,
                                alignItems: 'center',
                                borderRadius: SIZES.radius
                            }}
                            onPress={() => navigation.navigate("Confirm Order", {
                                orderItems: orderItems
                            })}
                        >
                            <Text style={{ color: COLORS.white, ...FONTS.h2 }}>proceed to checkout</Text>
                        </TouchableOpacity>
                    </View>
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
            <ScrollView>
                {renderDishDetails()}
                {renderOptions()}
            </ScrollView>
        </SafeAreaView>
    )
}

export default ShopingCart