import React from "react"
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    Image,
    FlatList,
    ScrollView,
    ActivityIndicator
} from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useDispatch, useSelector } from 'react-redux'
import { resetUser } from "../../redux/actions/UserAction"
import { Header } from '../../components'
import { COLORS, images, SIZES } from "../../constants"
import Icon  from 'react-native-vector-icons/Ionicons'
import styles from './style'
import { get } from "../../utilities/get"


const Profile = ({navigation}) => {
    const [isLoading, setIsLoading] = React.useState(false)
    const user = useSelector((store) => store.user)
    const dispatch = useDispatch()
    const [reload, setReload] = React.useState(false)

    const _signOut = () => {
        AsyncStorage.removeItem('userdetails')
        .then(() => {
            dispatch(resetUser())
            setReload(true)
            navigation.navigate("Welcome")
            return
        })
        .catch(error => {
            console.log(error)
        })
    }

    const getfoodservice = async () => {
        setIsLoading(true)
        const res = await get('/api/foodservice/'+user.userid)

        if (res.status === true) {
            // console.log(res.foodservice)
            navigation.navigate("Restaurant Profile", {
                item: res.foodservice
            })
        } else {

        }
        setIsLoading(false)

    }

    const getfavourites = async () => {
        
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
                ...styles.shadow
            }}
            onPress={onPress}
        >
            <Icon name={icon} size={25} color="white" />
            <Text style={{ fontSize: SIZES.body3, paddingLeft: 10, color: COLORS.white }} >{title}</Text>
        </TouchableOpacity>
    )

    const renderUserDetails = () => (
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
                    ...styles.shadow
                }}            
            >
                <Image 
                    source={images.avatar_5}
                    resizeMode="cover"
                    style={{
                        width: "100%",
                        height: 220,
                    }}
                />
            </View>

            <Text style={{padding: SIZES.padding * .5, fontSize: SIZES.h3 }} >{user.username}</Text>
            <Text style={{padding: SIZES.padding * .5, fontSize: SIZES.body4 }} >{user.phonenumber}</Text>

            <TouchableOpacity  
                onPress={() => {
                    navigation.navigate("Edit User Profile")
                    
                }}
                style={{
                    padding: SIZES.padding,
                    backgroundColor: COLORS.secondary,
                    borderRadius: SIZES.radius * .5,
                    
                }}
            >
                <Text style={{ fontSize: SIZES.body4, color: COLORS.white }}>edit profile</Text>
            </TouchableOpacity>
        </View>
    )

    const renderOptions = () => (
            <View
                style={{
                    padding: SIZES.padding,
                    // alignItems: "center"
                }}
            >
                {user.role === 'food service owner'?
                <ActionButton onPress={getfoodservice} title={"My Food Service"} icon={"pizza-outline"} />
                : null
                }
                {user.role === 'delivery worker'?
                <ActionButton onPress={() => navigation.navigate("User Tasks")} title={"My Tasks"} icon={"list-outline"} />
                : null
                }
                <ActionButton onPress={() => navigation.navigate("User Order History")} title={"My Orders"} icon={"list-outline"} />
                <ActionButton onPress={getfavourites} title={"My Favourites"} icon={"heart-outline"} />
                <ActionButton onPress={() => navigation.navigate("Settings")} title={"Settings"} icon={"settings-outline"} />
                <ActionButton onPress={() => navigation.navigate('Contact Support')} title={"Contact Support"} icon={"help-outline"} />

                <View
                    style={{
                        alignItems: "center"
                    }}
                >
                    <TouchableOpacity  
                        onPress={_signOut}
                        style={{
                            padding: SIZES.padding,
                            marginTop: 10,
                            backgroundColor: COLORS.orange,
                            borderRadius: SIZES.radius * .5,
                            width: "30%",
                            height: 50,
                            justifyContent: "center",
                            alignItems: "center",
                            ...styles.shadow
                        }}
                    >
                        <Text style={{ fontSize: SIZES.body2, color: COLORS.white }}>sign out</Text>
                    </TouchableOpacity>
                </View>
            </View>
    )
    
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
    
    return (
        <SafeAreaView
            style={{
            flex: 1
        }}
        >
            <Header navigation={navigation} />
            <FlatList
                ListHeaderComponent={<>
                    {renderUserDetails()}
                </>}
                ListFooterComponent={<>
                    {renderOptions()}
                </>}
            >
            </FlatList>
        </SafeAreaView>
    )
}

export default Profile