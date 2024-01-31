import type {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { Location } from '../lib/type';

export type RootStackParamList = {
  Home: NavigatorScreenParams<HomeTabParamList>;
  Start: undefined;
  SignIn: undefined;
  SignUp: undefined;
  PostDetails: {
    location: Location | undefined;
    url: string | undefined;
    description: string;
  };
  Map: {
    latitude: number;
    longitude: number;
  };
  NotFound: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type HomeTabParamList = {
  Profile: undefined;
  Post: undefined;
  Feed: undefined;
};

export type HomeTabScreenProps<T extends keyof HomeTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<HomeTabParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
