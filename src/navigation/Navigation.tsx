import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { auth } from '../firebase/firebase.config';
import { onAuthStateChanged } from 'firebase/auth';
import { PostDetailsScreen } from '../screens/Post/PostDetailsScreen';
import { RootStackParamList, HomeTabParamList } from './navigation.type';
import { FeedScreen } from '../screens/Main/FeedScreen';
import { PostScreen } from '../screens/Main/PostScreen';
import { ProfileScreen } from '../screens/Main/ProfileScreen';
import { StartScreen } from '../screens/Auth/StartScreen';
import { SignInScreen } from '../screens/Auth/SignInScreen';
import { SignUpScreen } from '../screens/Auth/SignUpScreen';
import { Logo } from '../components/Logo';
import { MapScreen } from '../screens/Post/MapScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<HomeTabParamList>();

const Home = () => {
  return (
    <Tab.Navigator
      screenOptions={{ tabBarShowLabel: false }}
      initialRouteName="Profile"
    >
      <Tab.Screen
        name="Feed"
        component={FeedScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="home"
              size={24}
              color={focused ? '#0085ff' : 'black'}
            />
          ),
          title: 'Feed Future Feature',
        }}
      />
      <Tab.Screen
        name="Post"
        component={PostScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="pluscircleo"
              size={24}
              color={focused ? '#0085ff' : 'black'}
            />
          ),
          headerShown: false,
          tabBarStyle: {
            display: 'none',
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="user"
              size={28}
              color={focused ? '#0085ff' : 'black'}
            />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export const Navigation = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn ? (
          // Screens for logged in users
          <Stack.Group>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="PostDetails"
              component={PostDetailsScreen}
              options={{
                title: 'Post'
              }}
            />
            <Stack.Screen name="Map" component={MapScreen} />
          </Stack.Group>
        ) : (
          // Auth screens
          <Stack.Group>
            <Stack.Screen
              name="Start"
              component={StartScreen}
              options={{ headerShown: false }}
            />
            <Stack.Group
              screenOptions={{
                headerTitle: () => <Logo />,
                headerTitleAlign: 'center', // Android does not align 'center' by default
                headerShadowVisible: false,
              }}
            >
              <Stack.Screen name="SignIn" component={SignInScreen} />
              <Stack.Screen name="SignUp" component={SignUpScreen} />
            </Stack.Group>
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
