import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { auth } from '../firebase/firebase.config';
import { onAuthStateChanged } from 'firebase/auth';
import { StartScreen, SignUpScreen, SignInScreen } from '../screens/Auth';
import { ProfileScreen, CreatePostScreen, PostsScreen } from '../screens/Main';
import { CommentsScreen, MapScreen, PostScreen } from '../screens/Post';
import { Logo } from '../components/Logo';
import {
  BottomTabParamList,
  PostStackParamList,
  AuthStackParamList,
  ProfileStackParamList,
} from './navigation.type';

const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const MainTab = createBottomTabNavigator<BottomTabParamList>();
const PostStack = createNativeStackNavigator<PostStackParamList>();
const ProfileStack = createNativeStackNavigator<ProfileStackParamList>();

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
          headerTitle: () => <Logo />,
          headerTitleAlign: 'center', // Android does not align 'center' by default
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
      screenOptions={{ tabBarShowLabel: false, headerShown: false }}
      initialRouteName="ProfileNativeStack"
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
          tabBarStyle: {
            display: 'none',
          },
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

const PostNativeStack = () => {
  return (
    <PostStack.Navigator initialRouteName="Post">
      <PostStack.Screen name="Post" component={PostScreen} />
      <PostStack.Screen name="Comments" component={CommentsScreen} />
      <PostStack.Screen
        name="Map"
        component={MapScreen}
        options={{ headerTitleAlign: 'center' }}
      />
    </PostStack.Navigator>
  );
};

const ProfileNativeStack = () => {
  return (
    <ProfileStack.Navigator
      initialRouteName="Profile"
      screenOptions={{ headerShown: false }}
    >
      <ProfileStack.Screen name="Profile" component={ProfileScreen} />
      <ProfileStack.Screen name="PostStack" component={PostNativeStack} />
    </ProfileStack.Navigator>
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
