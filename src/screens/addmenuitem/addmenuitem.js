import React from "react"
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    Image,
    FlatList,
    Button,
    Platform
} from "react-native"
import { Header } from '../../components'
import { launchImageLibrary } from 'react-native-image-picker';




const AddMenuItem = ({navigation}) => {
    const [photo, setPhoto] = React.useState(null);

    const createFormData = (photo, body = {}) => {
        const data = new FormData();
    
        data.append('photo', {
            name: photo.fileName,
            type: photo.type,
            uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
        });
    
        Object.keys(body).forEach((key) => {
            data.append(key, body[key]);
        });
    
        return data;
    };

    const handleChoosePhoto = () => {
      launchImageLibrary({ noData: true }, (response) => {
        // console.log(response);
        if (response) {
          setPhoto(response);
        }
      });
    };
  
    const handleUploadPhoto = () => {
      fetch(`${SERVER_URL}/api/upload`, {
        method: 'POST',
        body: createFormData(photo, { userId: '123' }),
      })
        .then((response) => response.json())
        .then((response) => {
          console.log('response', response);
        })
        .catch((error) => {
          console.log('error', error);
        });
    };

    return (
        <SafeAreaView>
            <Header navigation={navigation} backBtn={true} />
            <Text>AddMenuItem Screen</Text>
            {/* <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}> */}
            {photo && (
                <>
                <Image
                    source={{ uri: photo.uri }}
                    style={{ width: 300, height: 300 }}
                />
                <Button title="Upload Photo" onPress={handleUploadPhoto} />
                </>
            )}
            <Button title="Choose Photo" onPress={handleChoosePhoto} />
            {/* </View> */}
        </SafeAreaView>
    )
}

export default AddMenuItem