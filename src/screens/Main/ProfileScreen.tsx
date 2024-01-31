import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ImageViewer } from '../../components/ImageViewer';
import { listenPosts } from '../../firebase/service/firebase.firestore';
import { PostsFromFirebase } from '../../firebase/service/firebase.type';
import { useAppDispatch } from '../../redux/redux.hook';
import { signOut } from '../../redux/auth/auth.action';
import { UserLogo } from '../../components/UserLogo';
import { AntDesign } from '@expo/vector-icons';
import { Location } from '../../components/Location';
import { HomeTabScreenProps } from '../../navigation/navigation.type';

type Props = HomeTabScreenProps<'Profile'>;
export const ProfileScreen = (props: Props) => {
  const { navigation } = props;
  const [posts, setPosts] = useState<PostsFromFirebase[]>([]);
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = listenPosts(setPosts);

    return unsubscribe;
  }, []);

  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        backgroundColor: '#fff',
      }}
    >
      <FlatList
        ListHeaderComponent={() => {
          return (
            <View style={s.header}>
              <UserLogo sizeCircle={45} sizeText={16} />
              <TouchableOpacity onPress={() => dispatch(signOut())}>
                <AntDesign name="logout" size={22} color="black" />
              </TouchableOpacity>
            </View>
          );
        }}
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const { description, url, location } = item;

          return (
            <View style={s.post}>
              <View style={s.userWrapper}>
                {location ? <Location {...location} /> : <View></View>}
                <UserLogo sizeCircle={38} sizeText={14} />
              </View>
              <TouchableOpacity
                style={s.postButton}
                onPress={() =>
                  navigation.navigate('PostDetails', {
                    url: item.url,
                    location: item.location,
                    description: item.description,
                  })
                }
              >
                {url && (
                  <View style={s.imageViewerWrapper}>
                    <ImageViewer uri={url} />
                  </View>
                )}
                {description && (
                  <Text style={s.description}>{description}</Text>
                )}
              </TouchableOpacity>
            </View>
          );
        }}
        contentContainerStyle={{
          paddingVertical: 20,
          gap: 20,
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const s = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingHorizontal: 16,
    paddingBottom: 7,
  },
  post: {
    paddingTop: 20,
    paddingHorizontal: 16,

    borderTopWidth: 0.2,
    borderTopColor: '#d2d2d7',
  },
  userWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  postButton: {
    width: 300,
  },
  imageViewerWrapper: {
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
  },
});
