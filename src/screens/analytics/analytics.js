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
import { Header } from '../../components'
import { COLORS, FONTS, SIZES, images } from "../../constants"
import {
    LineChart,

  } from "react-native-chart-kit";
const Analytics = ({navigation}) => {
    const data=[ {value:50}, {value:80}, {value:90}, {value:70} ]

    const renderInviteCard = () => (
        <View
            style={{
                // height: SIZES.height * .35,
                // width: SIZES.width,
                margin: SIZES.padding,
                // backgroundColor: COLORS.appleGreen,
                borderRadius: 15,
            }}
        >
            <Text>Bezier Line Chart</Text>
            <LineChart
                data={{
                labels: ["January", "February", "March", "April", "May", "June"],
                datasets: [
                    {
                    data: [
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100
                    ]
                    }
                ]
                }}
                width={SIZES.width * .95} // from react-native
                height={220}
                yAxisLabel="$"
                yAxisSuffix="k"
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                backgroundColor: "#e26a00",
                backgroundGradientFrom: "#fb8c00",
                backgroundGradientTo: "#ffa726",
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                    borderRadius: 16
                },
                propsForDots: {
                    r: "6",
                    strokeWidth: "2",
                    stroke: "#ffa726"
                }
                }}
                // bezier
                style={{
                    marginVertical: 8,
                    borderRadius: 16
                }}
            />
        </View>
    )

    return (
        <SafeAreaView
            style={{
                flex: 1
            }}
        >
            <Header navigation={navigation} backBtn={true} />
            <ScrollView>
                {renderInviteCard()}
            </ScrollView>
        </SafeAreaView>
    )
}

export default Analytics