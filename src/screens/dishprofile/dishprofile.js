import React, { useEffect } from "react"
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
// import { restaurantData } from "../../constants/data"
// import { AppContext } from "../../components/appcontext/appcontext"
import { useSelector, useDispatch } from 'react-redux'
import { setCart } from "../../redux/actions/CartAction"
import { icons, COLORS, SIZES, FONTS, images } from '../../constants'
import { showMessage, hideMessage } from "react-native-flash-message";
// import styles from './style'


const DishProfile = ({route, navigation}) => {
    
    const [dish, setDish] = React.useState(route.params.dish)
    // const [orderitem, setOrderitem] = React.useState()
    const [quantity, setQuantity] = React.useState(0)
    // const {userdata, setUserdata} = React.useContext(AppContext)
    const cart = useSelector((store) => store.cart)
    const dispatch = useDispatch()

    // console.log(dish)

    const _addtocart = () => {
        if (cart.length === 0) {
            showMessage({
                message: "Item Added to Cart",
                type: "success",
            });
            cart.push({
                fooditemid: dish.fooditemid,
                dish: dish,
                quantity: quantity,
                cost: sumOrderItem()
            })
            dispatch(setCart(cart))
            return
        } else {
            let incart = false
            let newcart = cart.map((ordr) => {
                if (ordr.fooditemid === dish.fooditemid) {
                    showMessage({
                        message: "Item Is Already in Cart",
                        type: "danger",
                    });              
                    ordr.quantity = quantity,
                    ordr.cost = sumOrderItem()
                    incart = true
                }
                return ordr
            })
            
            if (!incart) {
                showMessage({
                    message: "Item Added to Cart",
                    type: "success",
                });  
                newcart.push({
                    fooditemid: dish.fooditemid,
                    dish: dish,
                    quantity: quantity,
                    cost: sumOrderItem()
                })
            }
            dispatch(setCart(newcart))
            return
        }
    }
    
    React.useEffect(() => {
        // let {dish} = route.params
        // setDish(dish)
    })
    /**
     * 
     * @param {*} action 
     * @param {*} menuId 
     * @param {*} price 
     */
    function editOrder(action) {

        if (action == "+") {
            setQuantity(quantity + 1)
            return
        } else {
            if (quantity === 0) setQuantity(0)
            else setQuantity(quantity - 1)
            return
        }
    }
    /**
     * 
     * @returns 
     */
    function sumOrderItem() {
        return dish.price * quantity
    }
    /**
     * 
     * @returns 
     */
    const renderDishDetails = () => (
        <View
            style={{
                // padding: SIZES.padding,
                // justifyContent: "center",
                // alignItems: "center",
                marginBottom: 60
            }}
        >
            <View
                style={{ alignItems: 'center' }}
            >
                <View style={{ height: SIZES.height * 0.35 }}>
                    {/* ****************************************************************************************** */}
                    {/* Food Image */}
                    {/* ****************************************************************************************** */}
                    <Image
                        source={images[dish.photo]}
                        resizeMode="cover"
                        style={{
                            width: SIZES.width,
                            height: "100%"
                        }}
                    />
                    {/* ****************************************************************************************** */}
                    {/* Quantity */}
                    {/* ****************************************************************************************** */}
                    <View
                        style={{
                            position: 'absolute',
                            bottom: - 20,
                            width: SIZES.width,
                            height: 50,
                            justifyContent: 'center',
                            flexDirection: 'row'
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                width: 50,
                                backgroundColor: COLORS.orange,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderTopLeftRadius: 25,
                                borderBottomLeftRadius: 25
                            }}
                            onPress={() => editOrder("-")}
                        >
                            <Text style={{ ...FONTS.body1 }}>-</Text>
                        </TouchableOpacity>

                        <View
                            style={{
                                width: 50,
                                backgroundColor: COLORS.orange,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <Text style={{ ...FONTS.h2 }}>{quantity}</Text>
                        </View>

                        <TouchableOpacity
                            style={{
                                width: 50,
                                backgroundColor: COLORS.orange,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderTopRightRadius: 25,
                                borderBottomRightRadius: 25
                            }}
                            onPress={() => editOrder("+")}
                        >
                            <Text style={{ ...FONTS.body1 }}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {/* ****************************************************************************************** */}
                {/* Name & Description */}
                {/* ****************************************************************************************** */}
                <View
                    style={{
                        width: SIZES.width,
                        alignItems: 'center',
                        marginTop: 15,
                        paddingHorizontal: SIZES.padding * 2
                    }}
                >
                    <Text style={{ marginVertical: 10, textAlign: 'center', ...FONTS.h2 }}>{dish.name} - Mwk{dish.price}</Text>
                    <Text style={{ ...FONTS.body3 }}>{dish.description}</Text>
                </View>

            </View>
        </View>
    )
    /**
     * 
     * @returns 
     */
    const renderOptions = () => {
        return (
            <View
            >
                <View
                    style={{
                        backgroundColor: COLORS.orange,
                        borderTopLeftRadius: 40,
                        borderTopRightRadius: 40,
                        paddingBottom: 50,
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
                        {/* <Text>{getBasketItemCount()} items</Text> */}
                        <Text>Mwk{sumOrderItem()}</Text>
                    </View>

                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingVertical: SIZES.padding * 2,
                            paddingHorizontal: SIZES.padding * 3
                        }}
                    >
                        <View style={{ flexDirection: 'row' }}>
                            <Image
                                source={icons.pin}
                                resizeMode="contain"
                                style={{
                                    width: 20,
                                    height: 20,
                                    tintColor: COLORS.darkgray
                                }}
                            />
                            <Text style={{ marginLeft: SIZES.padding, ...FONTS.h4 }}>Location</Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Image
                                source={icons.master_card}
                                resizeMode="contain"
                                style={{
                                    width: 20,
                                    height: 20,
                                    tintColor: COLORS.darkgray
                                }}
                            />
                            <Text style={{ marginLeft: SIZES.padding, ...FONTS.h4 }}>8888</Text>
                        </View>
                    </View>
                    {/* *********************************************************************************************  */}
                    {/* ADD TO CART BUTTON */}
                    {/* ********************************************************************************************* */}
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
                            onPress={() => {
                                _addtocart()
                            }}
                        >
                            <Text style={{ color: COLORS.white, ...FONTS.h2 }}>add to cart</Text>
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
            <ScrollView
                contentContainerStyle={{
                    justifyContent: "space-between"
                }}
            >
                {dish === false?
                <></>
                :
                <>
                    {renderDishDetails()}
                    {renderOptions()}
                </>
                }
            </ScrollView>
        </SafeAreaView>
    )
}

export default DishProfile