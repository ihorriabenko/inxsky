import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { StartScreen, SignUpScreen, SignInScreen } from '../screens/Auth';
import { ProfileScreen, CreatePostScreen, PostsScreen } from '../screens/Main';
import { BottomTabParamList, RootStackParamList } from './navigation.type';

const AuthStack = createNativeStackNavigator<RootStackParamList>();
const MainTab = createBottomTabNavigator<BottomTabParamList>();

const AuthStackNavigation = () => {
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
        }}
      />
      <MainTab.Screen
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
        }}
      />
    </MainTab.Navigator>
  );
};

const isAuth = true;

export const Navigation = () => {
  return (
    <NavigationContainer>
      {isAuth ? <MainTabNavigation /> : <AuthStackNavigation />}
    </NavigationContainer>
  );
};
