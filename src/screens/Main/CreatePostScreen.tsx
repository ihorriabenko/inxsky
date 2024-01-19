import { Camera, CameraType } from 'expo-camera';
import * as Location from 'expo-location';
import { useState } from 'react';
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import {
  BottomTabScreenProps,
  BottomTabParamList,
} from '../../navigation/navigation.type';
import { LocationObject } from 'expo-location';

type Props = BottomTabScreenProps<BottomTabParamList, 'CreatePost'>;
export const CreatePostScreen = (props: Props) => {
  const { navigation } = props;
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [cameraRef, setCameraRef] = useState<Camera | null>(null);
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [photoUri, setPhotoUri] = useState<string | undefined>();

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={s.container}>
        <Text style={{ textAlign: 'center' }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const toggleCameraType = () => {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  const takePhoto = async () => {
    const photo = await cameraRef?.takePictureAsync();
    setPhotoUri(photo?.uri);
  };

  const shareLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      return;
    }

    let location = await Location.getCurrentPositionAsync({});

    setLocation((prev) => ({
      ...prev,
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    }));
  };

  return (
    <View style={s.container}>
      <Camera style={s.camera} type={type} ref={setCameraRef}>
        {/* Image */}
        <View style={{ marginTop: 100 }}>
          <Image
            source={{ uri: photoUri }}
            style={{ width: 100, height: 100 }}
          />
          <TouchableOpacity
            style={{ width: 50, height: 20, backgroundColor: 'red' }}
            onPress={() =>
              navigation.navigate('ProfileNativeStack', {
                screen: 'Profile',
                params: {
                  photoUri,
                  ...location,
                },
              })
            }
          >
            <Text style={{ textAlign: 'center' }}>Send</Text>
          </TouchableOpacity>
        </View>
        {/* Buttons */}
        <TouchableOpacity
          style={{ height: 50, width: 50, backgroundColor: 'red' }}
          onPress={shareLocation}
        >
          <Text>Share location</Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.buttonToggle} onPress={toggleCameraType}>
          <AntDesign name="sync" size={26} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={s.button} onPress={takePhoto} />
      </Camera>
    </View>
  );
};

const s = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  button: {
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',

    width: 70,
    height: 70,
    borderRadius: 99,
    borderWidth: 3,
    borderColor: '#fff',

    backgroundColor: 'grey',
    opacity: 0.5,
  },
  buttonToggle: {
    position: 'absolute',
    bottom: 33,
    right: 55,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
