import { StyleSheet } from 'react-native'
import { COLORS, SIZES } from '../../constants';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.darkgray
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 1,
    },
    btn: {
        padding: SIZES.padding,
        marginBottom: SIZES.padding * .5,
        backgroundColor: COLORS.secondary,
        borderRadius: SIZES.radius * .5,
    }
})

export default styles;