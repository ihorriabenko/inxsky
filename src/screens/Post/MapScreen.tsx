import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export const MapScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <MapView
        style={s.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
      <Marker coordinate={{ latitude: 37.78825, longitude: -122.4324 }} />
    </View>
  );
};

const s = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
});
