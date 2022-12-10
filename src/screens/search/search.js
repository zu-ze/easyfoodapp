import React from "react"
import {
    SafeAreaView,
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    FlatList,
    TextInput
} from "react-native"
import { Header, SearchHistory } from '../../components'
import { COLORS, SIZES } from "../../constants"
import { categoryData } from "../../constants/data"
import styles from "./style"

const Search = ({navigation}) => {
    
    const [searchStr, setSearchStr] = React.useState({value: "", error: ""})

    const searchInput = () => (
        <View
            style={{
                padding: SIZES.padding,
            }}
        >
            <Text style={{ fontSize: SIZES.h4, padding: SIZES.padding }} >Search</Text>
            <TextInput
                style={{
                    height: 50,
                    backgroundColor: COLORS.white,
                    width: "100%",
                    borderRadius: SIZES.radius * .5,
                    paddingHorizontal: SIZES.padding,
                    fontSize: SIZES.body3
                }}
                placeholder="type here..." 
                inlineImageLeft="search_icon"
                returnKeyType="search"
                textContentType="name"
                value={searchStr.value}
                onChangeText={(txt) => setSearchStr({value: txt, error: ""})}
            />
        </View>
    )

    const  renderPopularCategories = () => {
        const renderListItem = ({item}) => (
            <TouchableOpacity 
                style={{
                    padding: SIZES.padding * 2,
                    backgroundColor: COLORS.orange,
                    marginBottom: 10,
                    borderRadius: SIZES.radius * .5,
                    ...styles.shadow
                }}
                onPress={() => {
                    navigation.navigate("Category Listing")
                }}
            >
                <Text style={{fontSize: SIZES.body3, color: COLORS.white}}>{item.name}</Text>
            </TouchableOpacity>
        )

        return (
            <View
                style={{ padding: SIZES.padding }}
            >
                <Text style={{ fontSize: SIZES.h4, padding: SIZES.padding }} >Popular Categories</Text>
                <FlatList 
                    data={categoryData}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => `${item.id}`}
                    renderItem={renderListItem}
                />
            </View>
        )
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <Header navigation={navigation} />
            <FlatList
                ListHeaderComponent={<>
                    {searchInput()}
                    <SearchHistory navigation={navigation} data={categoryData} />
                </>}
                ListFooterComponent={<>
                    {renderPopularCategories()}
                </>}
            >
            </FlatList>
        </SafeAreaView>
    )
}

export default Search