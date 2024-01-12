export type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Start: undefined;
  SignUp: undefined;
  SignIn: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
