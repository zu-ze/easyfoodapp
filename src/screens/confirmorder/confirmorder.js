import React from "react"
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    Image,
    FlatList,
    ActivityIndicator,
    Modal
} from "react-native"
import { Header } from '../../components'
import { WebView } from 'react-native-webview';
import { useSelector } from 'react-redux'
import styles from "./style";
import Feather from "react-native-vector-icons/Feather";

const ConfirmOrder = ({navigation}) => {
    const [showGateway, setShowGateway] = React.useState(false)
    const [prog, setProg] = React.useState(false)
    const [progClr, setProgClr] = React.useState('#000')
    const cart = useSelector((store) => store.cart)

    const webviewRef = React.useRef()

    function sendDataToWebView() {
        webviewRef.current.postMessage(JSON.stringify({
            type: "CART_DATA",
            cart: cart
        }));
    }
    
    function onMessage(e) {
        let data = e.nativeEvent.data;
        setShowGateway(false);
        let payment = JSON.parse(data);
        console.log(data);
        // if (payment.status === 'COMPLETED') {
        //     alert('PAYMENT MADE SUCCESSFULLY!');
        // } else {
        //     alert('PAYMENT FAILED. PLEASE TRY AGAIN.');
        // }
    }
    
    return (
        <SafeAreaView
            style={{flex: 1}}
        >
            <Header navigation={navigation} backBtn={true} />
            <View style={styles.container} >
                <View style={styles.btnCon}>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={() => {
                            // setShowGateway(true)
                            // let timer = setInterval(() => {
                            //     sendDataToWebView()
                            //     clearInterval(timer)
                            // }, 2000)
                            navigation.navigate("Select Location")
                        }}>
                        <Text style={styles.btnTxt}>Pay Using PayPal</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {showGateway ? (
            <Modal
            visible={showGateway}
            onDismiss={() => setShowGateway(false)}
            onRequestClose={() => setShowGateway(false)}
            animationType={"fade"}
            transparent>
                <View style={styles.webViewCon}>
                    <View style={styles.wbHead}>
                    <TouchableOpacity
                        style={{padding: 13}}
                        onPress={() => setShowGateway(false)}>
                        <Feather name={'x'} size={24} />
                    </TouchableOpacity>
                    <Text
                        style={{
                        flex: 1,
                        textAlign: 'center',
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: '#00457C',
                        }}>
                        PayPal GateWay
                    </Text>
                    <View style={{padding: 13, opacity: prog ? 1 : 0}}>
                        <ActivityIndicator size={24} color={progClr} />
                    </View>
                    </View>
                    <WebView
                        ref={webviewRef}
                        source={{uri: 'http://192.168.43.64:3000/paypal'}}
                        style={{flex: 1}}
                        onMessage={onMessage}
                        onLoadStart={() => {
                            setProg(true);
                            setProgClr('#000');
                        }}
                        onLoadProgress={() => {
                        setProg(true);
                        setProgClr('#00457C');
                        }}
                        onLoadEnd={() => {
                        setProg(false);
                        }}
                        onLoad={() => {
                        setProg(false);
                        }}
                    />
                </View>
            </Modal>
            ) : null}
        </SafeAreaView>
    )
}

export default ConfirmOrder