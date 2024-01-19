import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { StartScreen, SignUpScreen, SignInScreen } from '../screens/Auth';
import { ProfileScreen, CreatePostScreen, PostsScreen } from '../screens/Main';
import {
  BottomTabParamList,
  PostStackParamList,
  AuthStackParamList,
  ProfileStackParamList,
} from './navigation.type';
import { CommentsScreen, MapScreen, PostScreen } from '../screens/Post';
import { useEffect, useState } from 'react';
import { auth } from '../firebase/firebase.config';
import { onAuthStateChanged } from 'firebase/auth';

const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const MainTab = createBottomTabNavigator<BottomTabParamList>();
const PostStack = createNativeStackNavigator<PostStackParamList>();
const ProfileStack = createNativeStackNavigator<ProfileStackParamList>();

const PostNativeStack = () => {
  return (
    <PostStack.Navigator
      initialRouteName="Post"
      screenOptions={{ headerShown: false }}
    >
      <PostStack.Screen name="Post" component={PostScreen} />
      <PostStack.Screen name="Comments" component={CommentsScreen} />
      <PostStack.Screen name="Map" component={MapScreen} />
    </PostStack.Navigator>
  );
};

const ProfileNativeStack = () => {
  return (
    <ProfileStack.Navigator initialRouteName="Profile">
      <ProfileStack.Screen name="Profile" component={ProfileScreen} />
      <ProfileStack.Screen name="PostStack" component={PostNativeStack} />
    </ProfileStack.Navigator>
  );
};

const AuthNativeStackNavigation = () => {
  return (
    <AuthStack.Navigator initialRouteName="Start">
      <AuthStack.Screen
        name="Start"
        component={StartScreen}
        options={{ headerShown: false }}
      />
      <AuthStack.Group
        screenOptions={{
          headerTitle: () => (
            <Image
              source={require('../../assets/images/logo.png')}
              style={{ width: 50, height: 50 }}
            />
          ),
          headerTitleAlign: 'center',
          headerShadowVisible: false,
        }}
      >
        <AuthStack.Screen name="SignUp" component={SignUpScreen} />
        <AuthStack.Screen name="SignIn" component={SignInScreen} />
      </AuthStack.Group>
    </AuthStack.Navigator>
  );
};

const MainTabNavigation = () => {
  return (
    <MainTab.Navigator
      screenOptions={{ headerShown: false, tabBarShowLabel: false }}
    >
      <MainTab.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="home"
              size={24}
              color={focused ? '#0085ff' : 'black'}
            />
          ),
        }}
      />
      <MainTab.Screen
        name="CreatePost"
        component={CreatePostScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="pluscircleo"
              size={24}
              color={focused ? '#0085ff' : 'black'}
            />
          ),
          // tabBarStyle: {
          //   display: 'none'
          // }
        }}
      />
      <MainTab.Screen
        name="ProfileNativeStack"
        component={ProfileNativeStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="user"
              size={28}
              color={focused ? '#0085ff' : 'black'}
            />
          ),
        }}
      />
    </MainTab.Navigator>
  );
};

export const Navigation = () => {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setIsAuth(!!user);
    });
  }, []);

  return (
    <NavigationContainer>
      {isAuth ? <MainTabNavigation /> : <AuthNativeStackNavigation />}
    </NavigationContainer>
  );
};
