import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRef, useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import * as ExpoLocation from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { uploadPostToServer } from '../../firebase/service/firebase.firestore';
import { useAppSelector } from '../../redux/redux.hook';
import { selectUserId } from '../../redux/auth/auth.selector';
import { ImageViewer } from '../../components/ImageViewer';
import { ButtonCameraHelper } from '../../components/ButtonCameraHelper';
import { Location } from '../../components/Location';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { HomeTabParamList } from '../../navigation/navigation.type';
import { Location as LocationType } from '../../lib/type';

type Props = BottomTabScreenProps<HomeTabParamList, 'Post'>;
export const PostScreen = (props: Props) => {
  const { navigation } = props;
  const [cameraRef, setCameraRef] = useState<Camera | null>(null);
  const [type, setType] = useState(CameraType.back);
  const [isCamera, setIsCamera] = useState(false);
  const [location, setLocation] = useState<LocationType | null>(null);
  const [photoUri, setPhotoUri] = useState('');
  const [selectedImageUri, setSelectedImageUri] = useState('');
  const [description, setDescription] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);
  const userId = useAppSelector(selectUserId);
  const insets = useSafeAreaInsets();
  const canPost = description || selectedImageUri;

  const pickImageAsync = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) setSelectedImageUri(result.assets[0].uri);
    } catch (error) {
      console.error(error);
    }
  };

  const takePhoto = async () => {
    try {
      const photo = await cameraRef?.takePictureAsync();
      if (photo) setPhotoUri(photo.uri);
    } catch (error) {
      console.error(error);
    }
  };

  const toggleCameraType = () => {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  const shareLocation = async () => {
    try {
      let { status } = await ExpoLocation.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        return;
      }

      let {
        coords: { latitude, longitude },
      } = await ExpoLocation.getCurrentPositionAsync({});

      const geocode = await ExpoLocation.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      const { country, city } = geocode[0];

      if (country && city) {
        setLocation({
          latitude,
          longitude,
          country,
          city,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handlePost = async () => {
    try {
      await uploadPostToServer({
        userId,
        selectedImageUri,
        description,
        location,
      });

      garbageCollector();
      navigation.navigate('Profile');
    } catch (error) {
      console.error(error);
    }
  };

  const handleCamera = async () => {
    try {
      const permission = await Camera.requestCameraPermissionsAsync();
      if (!permission.granted) return;
      setIsCamera(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    garbageCollector();
    navigation.goBack();
  };

  const garbageCollector = () => {
    setDescription('');
    setLocation(null);
    setSelectedImageUri('');
  };

  return (
    <>
      {!isCamera ? (
        <View
          style={{
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            flex: 1,
            backgroundColor: '#fff',
          }}
        >
          {/* Header */}
          <View style={s.header}>
            <TouchableOpacity onPress={handleCancel}>
              <Text style={s.textCancel}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                paddingVertical: 7,
                paddingHorizontal: 14,
                borderRadius: 20,
                backgroundColor: '#0085ff',
                opacity: canPost ? 1 : 0.3,
              }}
              onPress={handlePost}
              disabled={canPost ? false : true}
            >
              <Text style={s.textPost}>Post</Text>
            </TouchableOpacity>
          </View>
          {/* Hero */}
          <KeyboardAvoidingView
            style={{ flex: 1, paddingBottom: insets.bottom }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
            <ScrollView style={s.hero}>
              {location && (
                <View style={{ marginBottom: 8 }}>
                  <Location {...location} />
                </View>
              )}
              {selectedImageUri && (
                <View style={{ flexDirection: 'row', marginBottom: 8 }}>
                  <ImageViewer uri={selectedImageUri} />
                  <TouchableOpacity onPress={() => setSelectedImageUri('')}>
                    <Ionicons name="close" size={20} color="grey" />
                  </TouchableOpacity>
                </View>
              )}
              <TextInput
                style={s.input}
                placeholder="Add description"
                value={description}
                onChangeText={(text) => {
                  setDescription(text);
                  scrollViewRef.current?.scrollToEnd({ animated: true });
                }}
                multiline
                scrollEnabled={false}
                maxLength={4096}
                autoFocus
              />
            </ScrollView>
            {/* Menu */}
            <View style={s.menu}>
              <View style={s.buttonsWrapper}>
                <TouchableOpacity
                  style={s.buttonMenuIcon}
                  onPress={pickImageAsync}
                >
                  <Ionicons name="image-outline" size={27} color="#0085ff" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={s.buttonMenuIcon}
                  onPress={handleCamera}
                >
                  <Ionicons name="camera-outline" size={27} color="#0085ff" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={s.buttonMenuIcon}
                  onPress={shareLocation}
                >
                  <Ionicons name="location-outline" size={27} color="#0085ff" />
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      ) : (
        <>
          {/* Camera */}
          {!photoUri ? (
            <Camera style={s.camera} type={type} ref={setCameraRef}>
              <View style={{ paddingTop: insets.top, paddingHorizontal: 16 }}>
                <ButtonCameraHelper
                  name={'close-outline'}
                  onPress={() => setIsCamera(false)}
                />
              </View>
              <TouchableOpacity style={s.buttonTakePhoto} onPress={takePhoto} />
              <TouchableOpacity
                style={s.buttonToggle}
                onPress={toggleCameraType}
              >
                <AntDesign name="sync" size={26} color="white" />
              </TouchableOpacity>
            </Camera>
          ) : (
            <View
              style={{
                paddingBottom: insets.bottom,
                flex: 1,
                backgroundColor: '#000',
              }}
            >
              <Image source={{ uri: photoUri }} style={s.photoReview} />
              <View style={s.reviewButtonsWrapper}>
                <ButtonCameraHelper
                  name={'close-outline'}
                  onPress={() => setPhotoUri('')}
                />
                <ButtonCameraHelper
                  name={'arrow-forward'}
                  onPress={() => {
                    setSelectedImageUri(photoUri);
                    setPhotoUri('');
                    setIsCamera(false);
                  }}
                />
              </View>
            </View>
          )}
        </>
      )}
    </>
  );
};

const s = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingHorizontal: 16,
    marginBottom: 8,
  },
  textCancel: {
    fontSize: 16,
  },
  textPost: {
    fontSize: 14,
    fontWeight: '700',

    color: '#fff',
  },
  menu: {
    borderTopWidth: 0.2,
    borderTopColor: '#d2d2d7',
  },
  buttonsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',

    paddingVertical: 5,
    paddingHorizontal: 16,
  },
  buttonMenuIcon: {
    marginRight: 18,
  },
  hero: {
    flex: 1,

    paddingTop: 8,
    paddingHorizontal: 16,
  },
  input: {
    paddingBottom: 60,

    fontSize: 16,
  },
  camera: {
    flex: 1,
  },
  buttonTakePhoto: {
    position: 'absolute',
    bottom: 90,
    alignSelf: 'center',

    width: 75,
    height: 75,
    borderRadius: 99,
    borderWidth: 3,

    borderColor: '#fff',
    backgroundColor: 'grey',
    opacity: 0.5,
  },
  buttonToggle: {
    position: 'absolute',
    bottom: 100,
    right: 50,

    alignItems: 'center',
    justifyContent: 'center',

    width: 45,
    height: 45,
    borderRadius: 99,

    backgroundColor: 'grey',
    opacity: 0.7,
  },
  photoReview: {
    flex: 1,
  },
  reviewButtonsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 8,
  },
});
