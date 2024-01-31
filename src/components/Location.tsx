import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

type Props = {
  country: string;
  city: string;
  latitude: number;
  longitude: number;
};
export const Location = (props: Props) => {
  const { country, city, latitude, longitude } = props;
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Map', { latitude, longitude })}
    >
      <Text style={s.textLocation}>
        <Ionicons name="location-outline" size={18} color="grey" />
        {country}, {city}
      </Text>
    </TouchableOpacity>
  );
};

const s = StyleSheet.create({
  textLocation: {
    fontSize: 15,
    fontWeight: '500',
    color: 'grey',
  },
});
