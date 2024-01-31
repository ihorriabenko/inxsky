import { Image, StyleSheet, Text, View } from 'react-native';
import { RootStackScreenProps } from '../../navigation/navigation.type';
import { Location } from '../../components/Location';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = RootStackScreenProps<'PostDetails'>;
export const PostDetailsScreen = (props: Props) => {
  const { route } = props;
  const { location, url, description } = route.params;
  const insets = useSafeAreaInsets();

  return (
    <View style={[s.container, { paddingBottom: insets.bottom }]}>
      {location && (
        <View style={s.locationWrapper}>
          <Location {...location} />
        </View>
      )}
      {url && (
        <Image source={{ uri: url }} style={s.image} resizeMode="stretch" />
      )}
      {description && (
        <View style={s.descriptionWrapper}>
          <Text style={s.description}>{description}</Text>
        </View>
      )}
    </View>
  );
};

const s = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#fff',
  },
  locationWrapper: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  image: {
    width: '100%',
    height: '50%',
  },
  descriptionWrapper: {
    paddingTop: 8,
    paddingHorizontal: 16,
  },
  description: {
    fontSize: 16
  }
});
