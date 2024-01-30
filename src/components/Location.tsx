import { StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  country: string;
  city: string;
};
export const Location = (props: Props) => {
  const { country, city } = props;

  return (
    <>
      <Text style={s.textLocation}>
        <Ionicons name="location-outline" size={18} color="grey" />
        {country}, {city}
      </Text>
    </>
  );
};

const s = StyleSheet.create({
  textLocation: {
    fontSize: 15,
    fontWeight: '500',
    color: 'grey',
  },
});
