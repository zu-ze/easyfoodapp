import React from "react"
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    Image,
    Button,
    ScrollView,
    ActivityIndicator
} from "react-native"
import { Header, TextInput } from '../../components'
import { COLORS, SIZES, FONTS, icons, images, GOOGLE_API_KEY } from "../../constants"
import MapView, {PROVIDER_GOOGLE, Marker} from "react-native-maps"
import { useSelector, useDispatch } from 'react-redux'
import * as Location from 'expo-location';
import { post } from "../../utilities/post"
import { showMessage, hideMessage } from "react-native-flash-message";
import { resetCart } from "../../redux/actions/CartAction"


const SelectLocation = ({navigation}) => {
    const mapView = React.useRef()
    const [region, setRegion] = React.useState({
        latitude: 10,
        longitude: 10,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
    })
    const [isMapReady, setIsMapReady] = React.useState(false)
    const [loading, setLoading] = React.useState(true)
    const [userLocation, setUserLocation] = React.useState("")
    const [regionChangeProgress, setRegionChangeProgress] = React.useState(false) 
    const [locationDescription, setLocationDescription] = React.useState({value: "", error: ""})


    const cart = useSelector((store) => store.cart)
    const user = useSelector((store) => store.user)
    let dispatch = useDispatch()
    // const [longitude, setLongitude] = React.useState("...")

    // const [location, setLocation] = React.useState(null);
    const [errorMsg, setErrorMsg] = React.useState(null);
    const [errorLog, setErrorLog] = React.useState([])
    
    const fetchAddress = () => {
        fetch("https://maps.googleapis.com/maps/api/geocode/json?address=" + region.latitude + "," + region.longitude + "&key=" + GOOGLE_API_KEY)
        .then((response) => response.json())
        .then((responseJson) => {
            const userLocation = responseJson.results[0].formatted_address;
            setUserLocation(userLocation)
            setRegionChangeProgress(false)
        });
    }

    const _onCompleteOrder = async () => {
        setLoading(true)
        const response = await post("/api/order", {
            userid: user.userid,
            dropOffLocation: JSON.stringify(region),
            locationGoogle: userLocation,
            locationDescription: locationDescription.value
        })

        if (response.status === true) {
            // console.log(response.neworder)

            cart.map( async (item) => {
                let res = await post("/api/orderitem", {
                    orderid: response.neworder.orderid,
                    fooditemid: item.fooditemid,
                    quantity: item.quantity,
                })

                if (res.status === false) {
                    console.warn("Failed! ", item)
                    setErrorLog([...errorLog, {item: item, message: res.message}])
                }

                return item
            })
            
            dispatch(resetCart())
            if (errorLog.length === 0) {
                showMessage({
                    message: "Order was sent successfully",
                    type: "success",
                });
                navigation.navigate("Home")
            } else {
                showMessage({
                    message: "Oops! It looks like some order went not sent",
                    type: "danger",
                });
                navigation.navigate("Home")
            }

        } else {
            dispatch(resetCart())
            showMessage({
                message: "Oops! It looks like your order was not sent",
                type: "danger",
            });
            navigation.navigate("Home")
        }
        setLoading(false)
    }

    const onMapReady = () => {
        // setIsMapReady(true)
    }

    const onRegionChange = region => {
        setRegion(region)
        setRegionChangeProgress(true)
        fetchAddress()
    }

    const onLocationSelect = () => {
        // alert(userLocation, JSON.stringify(region))
    }

    const renderOptions = () => {
        return (
            <View
                style={{
                    backgroundColor: COLORS.orange,
                }}
            >

                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingVertical: SIZES.padding * 2,
                        paddingHorizontal: SIZES.padding * 3
                    }}
                >
                    <View 
                        style={{ 
                            flexDirection: 'row', 
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <Image
                            source={icons.pin}
                            resizeMode="contain"
                            style={{
                                width: 20,
                                height: 20,
                                tintColor: COLORS.darkgray
                            }}
                        />
                        <Text style={{ marginLeft: SIZES.padding, ...FONTS.body3 }}>
                            {!regionChangeProgress? userLocation: "Identifying Location..."}
                        </Text>
                    </View>
                </View>

                {/* <View
                    style={{
                        // padding: SIZES.padding * 2,
                        flexDirection: "row",
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >

                    <TouchableOpacity
                        style={{
                            padding: SIZES.padding,
                            backgroundColor: "cornflowerblue",
                            alignItems: 'center',
                        }}
                        onPress={onLocationSelect}
                        // disabled={!regionChangeProgress}
                    >
                        <Text 
                            style={{ 
                                color: COLORS.white, 
                                ...FONTS.body3 
                            }}
                        >pick this location</Text>
                    </TouchableOpacity>
                </View> */}

                <View
                    style={{
                        justifyContent: "space-between",
                        // paddingVertical: SIZES.padding * 2,
                        paddingHorizontal: SIZES.padding * 3
                    }}
                >
                    <Text style={{ color: COLORS.white, marginBottom: 10, ...FONTS.h3 }}>Location Description(optional):</Text>
                    <TextInput 
                        placeholder="Provide a description of your location..." 
                        type="text"
                        value={locationDescription.value}
                        onChange={setLocationDescription}
                        error={locationDescription.error}
                    />
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
                        onPress={_onCompleteOrder}
                    >
                        <Text style={{ color: COLORS.white, ...FONTS.h2 }}>Complete Order</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    const renderMap = () => {
        return (
            <>{isMapReady === true?
            <MapView
                ref={mapView}
                provider={PROVIDER_GOOGLE}
                initialRegion={region}
                onMapReady={onMapReady}
                onRegionChangeComplete={onRegionChange}
                showsUserLocation={true}
                style={{ 
                    flex: 1,
                    width: "100%",
                    height: "100%"
                }}
            >
                <Marker
                    coordinate={{latitude: region.latitude, longitude: region.longitude}}
                    title="You are here"
                    draggable
                >
                    <Image
                        source={images.marker}
                        resizeMode="center"
                        style={{
                            width: 40,
                            height: 40
                        }}
                    />
                </Marker>  
            </MapView>
            : null}</>
        )
    }

    React.useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            // console.log(location)
            setRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01
            })
            setLoading(false)
            setIsMapReady(true)
            // setLocation({latitude: location.coords.latitude, longitude: location.coords.longitude});
        })();
        fetchAddress()
    }, [])

    if (loading) return (
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
            <ScrollView>
                <View
                    style={{
                        width: SIZES.width,
                        height: SIZES.height * .65,
                        backgroundColor: COLORS.appleGreen,
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    {renderMap()}
                </View>
                {renderOptions()}
            </ScrollView>
        </SafeAreaView>
    )
}

export default SelectLocation