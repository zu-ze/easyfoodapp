import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { createStackNavigator } from "@react-navigation/stack"
import { NavigationContainer, DefaultTheme } from "@react-navigation/native"
// import { AppContext } from './src/components/appcontext/appcontext';
import { store } from './src/redux/store';
import { setUser } from './src/redux/actions/UserAction';
import FlashMessage from "react-native-flash-message";
import { showMessage, hideMessage } from "react-native-flash-message";

import Tabs from './src/navigation/tabs'
import { 
  DishProfile,
  CategoryListing,
  EditUserProfile,
  RestaurantMenu,
  RestaurantProfile,
  ShopingCart,
  UserOrderHistory,
  UserSettings,
  Tasks,
  UserFavourites,
  OrderDelivery,
  AddMenuItem,
  ConfirmOrder,
  DeliveryLocation,
  OrderStatus,
  SelectLocation,
  SignIn,
  SignUp,
  Welcome,
  EnterCode,
  Orders,
  Analytics,
  CashIn, 
  Workers,
  OrderUpdate,
  InviteWorker,
  ContactSupport,
  RegisterFoodService
} from './src/screens'
import { COLORS } from './src/constants';

const myTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: COLORS.papayawhip
  }
}

const Stack = createStackNavigator()


export default function App() {
  const [appReady, setAppReady] = React.useState(false)
  
  const RootStack = () => {
    const dispatch = useDispatch()
    const user = useSelector((store) => store.user)

    const checkUserCredentials = () => {
      AsyncStorage.getItem('userdetails')
      .then(result => {
        let usr = JSON.parse(result)
        if (result !== null) {
          dispatch(setUser(usr))
        } else {
          dispatch(setUser(null))
        }
        setAppReady(true)
        showMessage({
          message: "Welcome " + usr.username,
          // description: "This is our second message",
          type: "success",
        });
      })
      .catch(error => {
        console.log(error)
      })
    }
  
    
    
    if (!appReady) {
      checkUserCredentials()
      // return null
    }
    
    return (
    <NavigationContainer theme={myTheme} >
      <Stack.Navigator
          screenOptions={{
              headerShown: false,
              showLabel: false,
              style: {
                  position: 'absolute',
                  left: 0,
                  bottom: 0,
                  right: 0,
                  borderTopWidth: 0,
                  backgroundColor: "transparent",
                  elevation: 0
              }
          }}
          initialRouteName={'Tabs'}
      >
        {user?
        <>
          <Stack.Screen name="Tabs" component={Tabs} />
          <Stack.Screen name="Dish Profile" component={DishProfile} />
          <Stack.Screen name="Category Listing" component={CategoryListing} />
          <Stack.Screen name="Edit User Profile" component={EditUserProfile} />
          <Stack.Screen name="Restaurant Profile" component={RestaurantProfile} />
          <Stack.Screen name="Restaurant Menu" component={RestaurantMenu} />
          <Stack.Screen name="Shoping Cart" component={ShopingCart} />
          <Stack.Screen name="User Order History" component={UserOrderHistory} />
          <Stack.Screen name="User Settings" component={UserSettings} />
          <Stack.Screen name="User Favourites" component={UserFavourites} />
          <Stack.Screen name="User Tasks" component={Tasks} />
          <Stack.Screen name="Order Delivery" component={OrderDelivery} />
          <Stack.Screen name="Add Menu Item" component={AddMenuItem} />
          <Stack.Screen name="Confirm Order" component={ConfirmOrder} />
          <Stack.Screen name="Delivery Location" component={DeliveryLocation} />
          <Stack.Screen name="Select Location" component={SelectLocation} />
          <Stack.Screen name="Order Status" component={OrderStatus} />
          <Stack.Screen name="Orders" component={Orders} />
          <Stack.Screen name="Analytics" component={Analytics} />
          <Stack.Screen name="Cash In" component={CashIn} />
          <Stack.Screen name="Workers" component={Workers} />
          <Stack.Screen name="Order Update" component={OrderUpdate} />
          <Stack.Screen name="Invite Worker" component={InviteWorker} />
          <Stack.Screen name="Contact Support" component={ContactSupport} />
          <Stack.Screen name="Register Food Service" component={RegisterFoodService} />
          {/* <Stack.Screen name='Welcome' component={Welcome} /> */}
        </>
        :
        <>
          <Stack.Screen name='Welcome' component={Welcome} />
          <Stack.Screen name="Sign Up" component={SignUp} />
          <Stack.Screen name="Sign In" component={SignIn} />
          <Stack.Screen name="Enter Code" component={EnterCode} />
        </>
        }
      </Stack.Navigator>
    </NavigationContainer>
  )}

  return (
    <Provider store={store}  >
          <RootStack />
          <FlashMessage position={"top"} />
    </Provider>
  );
}
