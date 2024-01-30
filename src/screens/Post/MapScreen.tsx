import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { PostStackParamList } from '../../navigation/navigation.type';

type Props = NativeStackScreenProps<PostStackParamList, 'Map'>;
export const MapScreen = (props: Props) => {
  const { route } = props;
  const {
    location: { latitude, longitude },
  } = route.params;

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <MapView
        style={s.map}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker coordinate={{ latitude, longitude }} />
      </MapView>
    </View>
  );
};

const s = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
});
