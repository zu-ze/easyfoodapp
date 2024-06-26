import React, { useState } from 'react';
import { 
    StyleSheet, 
    Text, 
    TouchableOpacity,
    Modal,
    View,
    FlatList 
} from 'react-native';
import { SIZES } from '../../constants';
// import { Icon } from 'react-native-elements';


const DropDown = ({ label, data, onSelect }) => {
    const [visible, setVisible] = React.useState(false);
    const DropdownButton = React.useRef();
    const [dropdownTop, setDropdownTop] = React.useState(0);
    const [selected, setSelected] = useState(undefined);

    const toggleDropdown = () => {
        visible ? setVisible(false) : openDropdown();
    };
    
    const openDropdown = () => {
        DropdownButton.current.measure((_fx, _fy, _w, h, _px, py) => {
            setDropdownTop(py + h);
        });
        setVisible(true);
    };

    const onItemPress = (item) => {
        setSelected(item);
        onSelect(item);
        setVisible(false);
    };

    const renderDropdown = () => {
        // if (visible) {

        const renderItem = ({ item }) => (
            <TouchableOpacity style={styles.item} onPress={() => onItemPress(item)}>
                <Text>{item.label}</Text>
            </TouchableOpacity>
        );

        return (
            <Modal visible={visible} transparent animationType="none">
                <TouchableOpacity
                style={styles.overlay}
                onPress={() => setVisible(false)}
                >
                <View style={[styles.dropdown, { top: dropdownTop }]}>
                    <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    />
                </View>
                </TouchableOpacity>
            </Modal>
        );
        // }
    };

    return (
        <TouchableOpacity
            ref={DropdownButton}
            style={styles.button}
            onPress={toggleDropdown}
        >
            {renderDropdown()}
            <Text style={styles.buttonText}>
                {(selected && selected.label) || label}
            </Text>
            {/* <Icon type='font-awesome' name='chevron-down'/> */}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#efefef',
        height: 50,
        width: '90%',
        paddingHorizontal: 10,
        zIndex: 1,
    },
    buttonText: {
        flex: 1,
        textAlign: 'center',
    },
    dropdown: {
        position: 'absolute',
        backgroundColor: '#fff',
        width: '80%',
        shadowColor: '#000000',
        shadowRadius: 4,
        shadowOffset: { height: 4, width: 0 },
        shadowOpacity: 0.5,
    },
    item: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderBottomWidth: 1,
    },
    overlay: {
        width: SIZES.width,
        padding: SIZES.padding,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    }
});

export default DropDown;