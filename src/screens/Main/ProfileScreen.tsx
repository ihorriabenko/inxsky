import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ImageViewer} from '../../components/ImageViewer';
import {listenPosts} from '../../firebase/service/firebase.firestore';
import {PostsFromFirebase} from '../../firebase/service/firebase.type';
import {useAppDispatch} from '../../redux/redux.hook';
import {signOut} from '../../redux/auth/auth.action';
import {UserLogo} from '../../components/UserLogo';
import {AntDesign} from '@expo/vector-icons';
import {Location} from '../../components/Location';
import {NativeStackScreenProps, ProfileScreenProps, ProfileStackParamList} from "../../navigation/navigation.type";

// type Props = NativeStackScreenProps<ProfileStackParamList, 'Profile'>
type Props = ProfileScreenProps
export const ProfileScreen = (props: Props) => {
  const {navigation} = props
  const [posts, setPosts] = useState<PostsFromFirebase[]>([]);
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = listenPosts(setPosts)

    return unsubscribe
  }, []);

  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingHorizontal: 16,
        backgroundColor: '#fff'
      }}
    >
      <View style={s.header}>
        <UserLogo sizeCircle={45} sizeText={16}/>
        <TouchableOpacity onPress={() => dispatch(signOut())}>
          <AntDesign name="logout" size={22} color="black"/>
        </TouchableOpacity>
      </View>
      {posts && (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => {
            const {
              description,
              url,
              location: {city, country},
            } = item;

            return (
              <View>
                <View style={s.userWrapper}>
                  {country && city ? (
                    <TouchableOpacity onPress={() => navigation.navigate('PostStack', {
                      screen: 'Map',
                      params: {location: item.location}
                    })}>
                      <Location country={country} city={city}/>
                    </TouchableOpacity>
                  ) : (
                    <View></View>
                  )}
                  <UserLogo sizeCircle={38} sizeText={14}/>
                </View>
                <TouchableOpacity style={s.post} onPress={() => navigation.navigate('PostStack', {
                  screen: 'Post', params: {
                    url: item.url,
                    location: item.location,
                    description: item.description
                  }
                })}>
                  {url && <View style={s.imageViewerWrapper}><ImageViewer uri={url}/></View>}
                  {description && <Text style={s.description}>{description}</Text>}
                </TouchableOpacity>
              </View>
            );
          }}
          contentContainerStyle={{
            paddingVertical: 20,
            gap: 20
          }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const s = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingBottom: 7,
  },
  userWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',

    marginBottom: 8,
  },
  post: {
    width: 300,
  },
  imageViewerWrapper: {
    marginBottom: 8
  },
  description: {
    fontSize: 16,
  }
});
