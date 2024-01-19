import { useEffect, useState } from 'react';
import { Button, FlatList, Image, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ProfileScreenProps } from '../../navigation/navigation.type';
import { auth } from '../../firebase/firebase.config';
import { useAppDispatch } from '../../redux/redux.hook';
import { signOut } from '../../redux/auth/auth.action';

export const ProfileScreen = (props: ProfileScreenProps) => {
  const { route, navigation } = props;
  const [posts, setPosts] = useState<any[]>([]);
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (route.params) setPosts((prevState) => [...prevState, route.params]);
  }, [route.params]);

  return (
    <View style={{ paddingTop: insets.top, paddingHorizontal: 16 }}>
      <FlatList
        data={posts}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 8 }}>
            <Image
              source={{ uri: item.photo }}
              style={{ height: 100, width: '100%' }}
            />
          </View>
        )}
      />
      <Button
        title="go to map"
        onPress={() => navigation.navigate('PostStack', { screen: 'Map' })}
      />
      <Button title="sign out" onPress={() => dispatch(signOut())} />
    </View>
  );
};
