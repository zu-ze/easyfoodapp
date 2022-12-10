import React from "react"
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    FlatList,
} from "react-native"
import { COLORS, SIZES, icons } from "../../constants"
import styles from './style'

const Categories = ({navigation, data}) => {

    const [categories, setCategories] = React.useState(data)

    const renderItem = ({item}) => {
        return (
            <TouchableOpacity
                style={{
                    padding: SIZES.padding,
                    paddingBottom: SIZES.padding * 2,
                    backgroundColor: COLORS.orange,
                    borderRadius: SIZES.radius,
                    alignItems: "center",
                    justifyContent: "center",
                    margin: SIZES.padding,
                    ...styles.shadow
                }}
                onPress={() => {
                    navigation.navigate("Category Listing")
                }}
            >
                <View
                    style={{
                        width: 70,
                        height: 50,
                        borderRadius: 25,
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: COLORS.lightGray
                    }}
                >
                    <Image 
                        source={item.icon}
                        resizeMode="contain"
                        style={{
                            width: 40,
                            height: 30
                        }}
                    />
                </View>
                <Text
                    style={{
                        marginTop: SIZES.padding,
                        color: COLORS.white,
                        ...SIZES.body5
                    }}
                >
                    {item.name}
                </Text>
            </TouchableOpacity>
        )
    }
    
    const renderFoodCategories = () => {
        return (
            <View
                // style={{ padding: SIZES.padding }}
            >
                <Text style={{ fontSize: SIZES.h4, padding: SIZES.padding }} >Dish Categories</Text>
                <FlatList 
                    nestedScrollEnabled={true}
                    data={categories}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => `${item.id}`}
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

export default Categories