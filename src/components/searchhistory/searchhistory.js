import React from "react"
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    FlatList,
} from "react-native"
import { COLORS, SIZES } from "../../constants"
import styles from './style'

const SearchHistory = ({navigation, data}) => {

    const [categories, setCategories] = React.useState(data)

    const renderItem = ({item}) => {
        return (
            <TouchableOpacity
                style={{
                    padding: SIZES.padding * .5,
                    paddingBottom: SIZES.padding * 2,
                    backgroundColor: COLORS.orange,
                    borderRadius: SIZES.radius * .5,
                    alignItems: "center",
                    justifyContent: "center",
                    margin: SIZES.padding,
                    ...styles.shadow
                }}
                onPress={() => {
                    navigation.navigate("Dish Profile")
                }}
            >
                <View
                    style={{
                        width: 110,
                        height: 70,
                        borderRadius: 15,
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: COLORS.lightGray
                    }}
                >
                    <Image 
                        source={item.icon}
                        resizeMode="contain"
                        style={{
                            width: "100%",
                            height: 30
                        }}
                    />
                </View>
                <Text
                    style={{
                        marginTop: SIZES.padding,
                        color: COLORS.black,
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
                <Text style={{ fontSize: SIZES.h4, padding: SIZES.padding }} >Your Search History</Text>
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

export default SearchHistory