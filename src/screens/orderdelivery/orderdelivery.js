import React from "react"
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator
} from "react-native"
import MapView, {PROVIDER_GOOGLE, Marker} from "react-native-maps"
import MapViewDirections from "react-native-maps-directions"
import Icon  from 'react-native-vector-icons/Ionicons'
import { Header } from "../../components"
import * as Location from 'expo-location';
import { COLORS, FONTS, icons, SIZES, GOOGLE_API_KEY } from "../../constants"
import { get } from "../../utilities/get"

const OrderDelivery = ({route, navigation}) => {
    const mapView = React.useRef()
    const [isLoading, setIsLoading] = React.useState(true)
    const [restaurant, setRestaurant] = React.useState(null)
    const [packages, setPackages] = React.useState([])
    const [fromLocation, setFromLocation] = React.useState(null)
    const [toLocation, setToLocation] = React.useState(null)
    const [region, setRegion] = React.useState({
        latitude: 10,
        longitude: 10,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
    })

    const [duration, setDuration] = React.useState(0)
    const [isReady, setIsReady] = React.useState(false)
    const [angle, setAngle] = React.useState(0)

    React.useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }
            let location = await Location.getCurrentPositionAsync({});

            let { deliverytask } = route.params
    
            let fromLoc = {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01
            }
            let toLoc = JSON.parse(deliverytask.deliverytask.dropofflocation)
            
            let mapRegion = {
                latitude: (fromLoc.latitude + toLoc.latitude) / 2,
                longitude: (fromLoc.longitude + toLoc.longitude) / 2,
                latitudeDelta: Math.abs(fromLoc.latitude - toLoc.latitude) * 2,
                longitudeDelta: Math.abs(fromLoc.longitude - toLoc.longitude) * 2
            }

            let res = await get('/api/taskpackage/'+deliverytask.deliverytask.deliverytaskid)

            if (res.status === true) setPackages(res.taskpackages)
    
            setRegion(mapRegion)
            setFromLocation(fromLoc)
            setToLocation(toLoc)
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

    const _confirmDelivery = async () => {
        
    }

    function calculateAngle(coordinates) {
        let startLat = coordinates[0]["latitude"]
        let startLng = coordinates[0]["longitude"]
        let endLat = coordinates[1]["latitude"]
        let endLng = coordinates[1]["longitude"]
        let dx = endLat - startLat
        let dy = endLng - startLng

        return Math.atan2(dy, dx) * 180 / Math.PI
    }

    function zoomIn() {
        let newRegion = {
            latitude: region.latitude,
            longitude: region.longitude,
            latitudeDelta: region.latitudeDelta / 2,
            longitudeDelta: region.longitudeDelta / 2
        }

        setRegion(newRegion)
        mapView.current.animateToRegion(newRegion, 200)
    }

    function zoomOut() {
        let newRegion = {
            latitude: region.latitude,
            longitude: region.longitude,
            latitudeDelta: region.latitudeDelta * 2,
            longitudeDelta: region.longitudeDelta * 2
        }

        setRegion(newRegion)
        mapView.current.animateToRegion(newRegion, 200)
    }

    function renderMap() {
        const destinationMarker = () => (
            <Marker
                coordinate={toLocation}
            >
                <View
                    style={{
                        height: 40,
                        width: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: COLORS.white
                    }}
                >
                    <View
                        style={{
                            height: 30,
                            width: 30,
                            borderRadius: 15,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: COLORS.primary
                        }}
                    >
                        <Image
                            source={icons.pin}
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: COLORS.white
                            }}
                        />
                    </View>
                </View>
            </Marker>
        )

        const carIcon = () => (
            <Marker
                coordinate={fromLocation}
                anchor={{ x: 0.5, y: 0.5 }}
                flat={true}
                rotation={angle}
            >
                <Image
                    source={icons.car}
                    style={{
                        width: 40,
                        height: 40
                    }}
                />
            </Marker>
        )

        return (
            <View 
                style={{ 
                    flex: 1,
                    width: SIZES.width,
                    height: SIZES.height * .8,
                }}
            >
                <MapView
                    ref={mapView}
                    provider={PROVIDER_GOOGLE}
                    initialRegion={region}
                    style={{ flex: 1 }}
                >
                    <MapViewDirections
                        origin={fromLocation}
                        destination={toLocation}
                        apikey={GOOGLE_API_KEY}
                        strokeWidth={5}
                        strokeColor={COLORS.primary}
                        optimizeWaypoints={true}
                        onReady={result => {
                            setDuration(result.duration)

                            if (!isReady) {
                                // Fit route into maps
                                mapView.current.fitToCoordinates(result.coordinates, {
                                    edgePadding: {
                                        right: (SIZES.width / 20),
                                        bottom: (SIZES.height / 4),
                                        left: (SIZES.width / 20),
                                        top: (SIZES.height / 8)
                                    }
                                })

                                // Reposition the car
                                let nextLoc = {
                                    latitude: result.coordinates[0]["latitude"],
                                    longitude: result.coordinates[0]["longitude"]
                                }

                                if (result.coordinates.length >= 2) {
                                    let angle = calculateAngle(result.coordinates)
                                    setAngle(angle)
                                }

                                setFromLocation(nextLoc)
                                setIsReady(true)
                            }
                        }}
                    />
                    {destinationMarker()}
                    {fromLocation? carIcon() : null}
                </MapView>
            </View>
        )
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
                <Text style={{ color: COLORS.white, ...FONTS.body3 }}>{item.fooditem.name}</Text>
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


    function renderDeliveryInfo() {
        return (
            <View
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingVertical: SIZES.padding * 3,
                    paddingHorizontal: SIZES.padding * 2,
                    backgroundColor: COLORS.white
                }}
            >
                <View
                    style={{
                        width: SIZES.width,
                        paddingVertical: SIZES.padding * 3,
                        paddingHorizontal: SIZES.padding * 2,
                        borderRadius: SIZES.radius,
                        backgroundColor: COLORS.white
                    }}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {/* Avatar */}
                        <Image
                            source={restaurant?.courier.avatar}
                            style={{
                                width: 50,
                                height: 50,
                                borderRadius: 25
                            }}
                        />

                        <View style={{ flex: 1, marginLeft: SIZES.padding }}>
                            {/* Name & Rating */}
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ ...FONTS.h4 }}>{restaurant?.courier.name}</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Image
                                        source={icons.star}
                                        style={{ width: 18, height: 18, tintColor: COLORS.primary, marginRight: SIZES.padding }}
                                    />
                                    <Text style={{ ...FONTS.body3 }}>{restaurant?.rating}</Text>
                                </View>
                            </View>
                            {/* Restaurant */}
                            <Text style={{ color: COLORS.darkgray, ...FONTS.body4 }}>{restaurant?.name}</Text>
                        </View>
                    </View>

                    {/* ####################################################### */}
                    {/* TASK PACKAGES */}
                    {/* ####################################################### */}

                    <Text style={{ ...FONTS.h4 }}>{"Packages to deliver"}</Text>
                    <View
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                    {packages?.map((item) => {
                        return renderItem(item)
                    })}
                    </View>
                    {/* ####################################################### */}

                    {/* Buttons */}
                    <View
                        style={{
                            // flexDirection: 'row',
                            marginTop: SIZES.padding * 2,
                            justifyContent: 'space-between'
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                // flex: 1,
                                height: 70,
                                // marginBottom: 10,
                                backgroundColor: COLORS.primary,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 10
                            }}
                            onPress={_confirmDelivery}
                        >
                            <Text style={{ ...FONTS.h4, color: COLORS.white }}>Confirm Delivery</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        )
    }

    function renderButtons() {
        return (
            <View
                style={{
                    // position: 'absolute',
                    bottom: SIZES.height * 0.35,
                    right: SIZES.padding * 2,
                    width: 60,
                    height: 130,
                    justifyContent: 'space-between'
                }}
            >
                {/* Zoom In */}
                <TouchableOpacity
                    style={{
                        width: 60,
                        height: 60,
                        borderRadius: 30,
                        backgroundColor: COLORS.white,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onPress={() => zoomIn()}
                >
                    <Text style={{ ...FONTS.body1 }}>+</Text>
                </TouchableOpacity>

                {/* Zoom Out */}
                <TouchableOpacity
                    style={{
                        width: 60,
                        height: 60,
                        borderRadius: 30,
                        backgroundColor: COLORS.white,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onPress={() => zoomOut()}
                >
                    <Text style={{ ...FONTS.body1 }}>-</Text>
                </TouchableOpacity>
            </View>

        )
    }

    return (
        <View style={{ flex: 1 }}>
            <Header navigation={navigation} backBtn={true} />
            <ScrollView>
                <View
                    style={{
                        width: SIZES.width,
                        height: SIZES.height * .7,
                        backgroundColor: COLORS.appleGreen
                    }}
                >

                {renderMap()}
                </View>
                {/* {renderDestinationHeader()} */}
                {renderDeliveryInfo()}
                {/* {renderButtons()} */}
            </ScrollView>
        </View>
    )
}

export default OrderDelivery;