import {Image, Text, View} from 'react-native';
import {
  PostStackParamList,
  NativeStackScreenProps,
} from '../../navigation/navigation.type';
import {Location} from "../../components/Location";

type Props = NativeStackScreenProps<PostStackParamList, 'Post'>;
export const PostScreen = (props: Props) => {
  const {navigation, route} = props;
  const {location, url, description} = route.params;

  return (
    <View style={{flex: 1}}>
      {location?.country && location.city && <Location country={location.country} city={location.city}/>}
      {url && <Image source={{uri: url}} style={{flex: 0.8}}/>}
      <Text>{description}</Text>
    </View>
  );
};
