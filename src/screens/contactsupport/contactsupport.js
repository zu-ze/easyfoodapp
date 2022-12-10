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
import AsyncStorage from "@react-native-async-storage/async-storage"
import { AppContext } from "../../components/appcontext/appcontext"

import { Header } from '../../components'
import { COLORS, images, SIZES } from "../../constants"
// import { restaurantData } from "../../constants/data"
import Icon  from 'react-native-vector-icons/Ionicons'
// import styles from './style'


const ContactSupport = ({navigation}) => {

    const {userdata, setUserdata} = React.useContext(AppContext)

    const [restaurant, setRestaurant] = React.useState()
    
    const _signOut = () => {
        AsyncStorage.removeItem('userdetails')
        .then(() => {
            setUserdata("")
        })
        .catch(error => {
            console.log(error)
        })
    }

    const ActionButton = ({title, icon, onPress}) => (
        <TouchableOpacity
            style={{
                padding: SIZES.padding * 2,
                borderRadius: SIZES.radius * .5,
                marginBottom: 10,
                // width: "100%",
                backgroundColor: COLORS.orange,
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                // ...styles.shadow
            }}
            onPress={onPress}
        >
            <Icon name={icon} size={25} color="white" />
            <Text style={{ fontSize: SIZES.body3, paddingLeft: 10, color: COLORS.white }} >{title}</Text>
        </TouchableOpacity>
    )

    const renderTop = () => (
        <View
            style={{
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <View
                style={{
                    width: "100%",
                    height: 220,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: COLORS.lightGray,
                    marginBottom: 20,
                    // ...styles.shadow
                }}            
            >
                <Image 
                    source={images.avatar_1}
                    resizeMode="cover"
                    style={{
                        width: "100%",
                        height: 220,
                        // borderRadius: SIZES.radius * 5
                    }}
                />
            </View>
        </View>
    )

    const renderOptions = () => (
            <View
                style={{
                    padding: SIZES.padding,
                    // alignItems: "center"
                }}
            >
                <ActionButton onPress={() => navigation.navigate('Register Food Service')} title={"Register a Food Service"} icon={"pizza-outline"} />
                <ActionButton onPress={""} title={"Register as Delivery Worker"} icon={"list-outline"} />
                <ActionButton onPress={""} title={"FAQ"} icon={"list-outline"} />
                <ActionButton onPress={""} title={"User Manual"} icon={"heart-outline"} />
            </View>
        )

    return (
        <SafeAreaView
            style={{
            flex: 1
        }}
        >
            <Header navigation={navigation} backBtn={true} />
            <FlatList
                ListHeaderComponent={<>
                    {renderTop()}
                </>}
                ListFooterComponent={<>
                    {renderOptions()}
                </>}
            >
            </FlatList>
        </SafeAreaView>
    )
}

export default ContactSupport