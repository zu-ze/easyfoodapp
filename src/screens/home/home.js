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
import { Header, Categories, Dishes } from '../../components'
import { COLORS, SIZES, icons, } from "../../constants"
import { categoryData, restaurantData, dishData } from '../../constants/data'
import images from '../../constants/images'
import { get } from '../../utilities/get'
import styles from './style'

const Home = ({navigation}) => {

    const [categories, setCategories] = React.useState(categoryData)
    const [restaurants, setRestaurants] = React.useState([])
    const [currentLocation, setCurrentLocation] = React.useState()
    const [isLoading, setIsLoading] = React.useState(false)

    function getCategoryNameById(id) {
        let category = categories.filter(a => a.id == id)

        if (category.length > 0)
            return category[0].name

        return ""
    }

    const loadData = async () => {
        const res = await get("/api/foodservice");

        if (res.status === true) {
            setRestaurants(res.foodservices)
        }
        setIsLoading(true)
    }

    React.useEffect(() => {
        if (!isLoading) {
            loadData()
        }
    })

    const renderRestaurantsNear = () => {
        const renderRestaurant = ({item}) => (
            <TouchableOpacity
                style={{
                    marginBottom: SIZES.padding * 5
                }}
                onPress={() => {
                    navigation.navigate("Restaurant Profile", {
                        item: item, loc: currentLocation
                    })
                }}
            >
                {/* IMAGE */}
                <View
                    style={{
                        marginBottom: SIZES.padding
                    }}
                >
                    <Image 
                        source={images[item.photo]}
                        resizeMode="cover"
                        style={{
                            width: "100%",
                            height: 200,
                            borderRadius: SIZES.radius
                        }}
                    />

                    <View
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            height: 50,
                            width: SIZES.width * 0.3,
                            backgroundColor: COLORS.orange,
                            borderTopRightRadius: SIZES.radius,
                            borderBottomLeftRadius: SIZES.radius,
                            alignItems: "center",
                            justifyContent: "center",
                            ...styles.shadow
                        }}
                    >
                        {/* <Text style={{ ...SIZES.h4}}>{item.duration}</Text> */}
                    </View>
                </View>

                {/* RESTAURANT INFO */}
                <Text style={{...SIZES.body2}} >{item.name}</Text>
                
                <View
                    style={{
                        marginTop: SIZES.padding,
                        flexDirection: 'row'
                    }}
                >
                    {/* RATING */}
                    <Image 
                        source={icons.star}
                        style={{
                            height: 20,
                            width: 20,
                            tintColor: COLORS.primary,
                            marginRight: 10
                        }}
                    />
                    <Text style={{ ...SIZES.body3 }} >{item.rating}</Text>

                    {/* CATEGORIES */}
                    <View
                        style={{
                            flexDirection: 'row',
                            marginLeft: 10
                        }}
                    >
                        {/* {
                            item.categories.map((categoryId) => {
                                return (
                                    <View
                                        style={{
                                            flexDirection: 'row'
                                        }}
                                        key={categoryId}
                                    >
                                        <Text style={{...SIZES.body3}} >{getCategoryNameById(categoryId)}</Text>
                                        <Text style={{ ...SIZES.h3, color: COLORS.darkgray }}> . </Text>
                                    </View>
                                )
                            })
                        } */}

                        {/* PRICE */}
                        {/* {
                            [1, 2, 3].map((priceRating) => (
                                <Text
                                    key={priceRating}
                                    style={{
                                        ...SIZES.body3,
                                        color: (priceRating <= item.priceRating) ? COLORS.black : COLORS.darkgray
                                    }}
                                >$</Text>
                            ))
                        } */}
                    </View>
                </View>
            </TouchableOpacity>
        )

        return (
            <View
                style={{
                    paddingVertical: SIZES.padding * 2,
                    paddingHorizontal: SIZES.padding
                }}
            >
                <Text style={{...SIZES.h4, padding: SIZES.padding }} >Restaurant Near You</Text>
                {restaurants?.length === 0?
                    <Text>no food services near you</Text>
                :
                    <FlatList 
                        data={restaurants}
                        keyExtractor={item => `${item.foodserviceid}`}
                        renderItem={renderRestaurant}
                        contentContainerStyle={{
                            paddingHorizontal: SIZES.padding * 2,
                            paddingBottom: 30,
                            paddingTop: 20
                        }}
                    />
                }
            </View>
        )
    }

    return (
        <SafeAreaView style={{flex: 1}} >
            <Header navigation={navigation} />
            <FlatList 
                showsHorizontalScrollIndicator={false}
                nestedScrollEnabled={true}
                ListHeaderComponent={<>
                    {/* <Dishes navigation={navigation} title="Top Rated Dishes" data={dishData} /> */}
                    <Categories navigation={navigation} data={categoryData} />
                </>}
                ListFooterComponent={<>
                {renderRestaurantsNear()}
                </>}
            >
            </FlatList>
        </SafeAreaView>
    )
}

export default Home