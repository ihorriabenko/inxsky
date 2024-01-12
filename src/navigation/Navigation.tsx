import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StartScreen, SignUpScreen, SignInScreen } from '../screens';
import { RootStackParamList } from './navigation.type';
import { Image } from 'react-native';

const Stack = createNativeStackNavigator<RootStackParamList>();

const NativeStackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen
          name="Start"
          component={StartScreen}
          options={{ headerShown: false }}
        />
        <Stack.Group
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
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="SignIn" component={SignInScreen} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NativeStackNavigation;
