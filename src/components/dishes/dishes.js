import React from "react"
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    FlatList,
} from "react-native"
import { COLORS, SIZES, images } from "../../constants"
// import styles from './style'

const Dishes = ({navigation, title ,data}) => {

    const [dishes, setDishes] = React.useState(data)
    // console.log(data)
    React.useEffect(() => {
        setDishes(data)
    })

    const renderItem = ({item}) => {
        return (
            <TouchableOpacity
                style={{
                    width: SIZES.width * .45,
                    height: SIZES.height * .3,
                    padding: SIZES.padding * .5,
                    backgroundColor: COLORS.orange,
                    borderRadius: SIZES.radius * .5,
                    alignItems: "center",
                    margin: SIZES.padding,
                    // ...styles.shadow
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
                        width: "100%",
                        height: "60%",
                        borderRadius: SIZES.radius * .5,
                    }}
                />
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%"
                    }}
                >                    
                    <Text
                        style={{
                            padding: SIZES.padding,
                            color: COLORS.white,
                            fontSize: SIZES.body4,
                            width: "70%",
                        }}
                    >
                        {item.name}
                    </Text>
                    <Text
                        style={{
                            padding: SIZES.padding,
                            color: COLORS.white,
                            fontSize: SIZES.body3,
                            width: "30%",
                        }}
                    >${item.price}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    
    const renderFoodCategories = () => {
        return (
            <View
                // style={{ padding: SIZES.padding }}
            >
                {title? 
                <Text style={{ fontSize: SIZES.h4, padding: SIZES.padding }} >{title}</Text>
                :null}
                
                <FlatList 
                    nestedScrollEnabled={true}
                    data={dishes}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={() => `${Math.random() * 190}`}
                    renderItem={renderItem}
                    contentContainerStyle={{
                    }}
                />
            </View>
        )
    }

    return (
        <>
        {renderFoodCategories()}
        </>
    )
}

export default Dishes