import React  from "react";
import {
    View,
    Image,
    TouchableOpacity
} from "react-native"
import { createBottomTabNavigator, BottomTabBar } from "@react-navigation/bottom-tabs"
import {
    Home,
    Search,
    Notifications,
    Profile
} from "../screens"
import {COLORS, icons} from "../constants"

const Tab = createBottomTabNavigator()

const TabBarCustomButton = ({children, onPress}) => {

        return (
            <View style={{ flex: 1, alignItems: "center" }}>
                <TouchableOpacity
                    style={{
                        // top: -22.5,
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 50,
                        height: 50,
                        borderRadius: 25,
                        // backgroundColor: "white"
                    }}
                    onPress={onPress}
                    >
                        {children}
                    </TouchableOpacity>
            </View>
        )

}

const CustomTabBar = (props) => {
    return (
        <BottomTabBar
            {...props.props}
        />
    )
}

const Tabs = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                showLabel: false,
                style: {
                    position: 'absolute',
                    left: 0,
                    bottom: 0,
                    right: 0,
                    borderTopWidth: 0,
                    elevation: 0
                },
                tabBarStyle: {
                    backgroundColor: COLORS.yellow
                }
            }}
            tabBar={(props) => (
                <CustomTabBar
                    props={props}
                />
            )}
        >
            <Tab.Screen 
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image 
                            source={icons.cutlery}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? COLORS.primary : COLORS.white
                            }}
                        />
                    )
                }}
            />

            <Tab.Screen
                name="Search"
                component={Search}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={icons.search}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? COLORS.primary : COLORS.white
                            }}
                        />
                    ),
                    tabBarButton: (props) => (
                        <TabBarCustomButton
                            {...props}
                        />
                    )
                }}
            />

            <Tab.Screen
                name="Notifications"
                component={Notifications}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={icons.list}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? COLORS.primary : COLORS.white
                            }}
                        />
                    ),
                    tabBarButton: (props) => (
                        <TabBarCustomButton
                            {...props}
                        />
                    )
                }}
            />

            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={icons.user}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? COLORS.primary : COLORS.white
                            }}
                        />
                    ),
                    tabBarButton: (props) => (
                        <TabBarCustomButton
                            {...props}
                        />
                    )
                }}
            />

        </Tab.Navigator>
    )
}

export default Tabs